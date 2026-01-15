import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { CreateSpendingDto } from './dto/create-spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { BudgetsService } from '../budgets/budgets.service';

@Injectable()
export class SpendingService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private budgetsService: BudgetsService,
  ) {}

  async findAll(userId: string, filters?: any) {
    const where: any = { userId };
    const limit = filters?.limit ? Number(filters.limit) : 50;
    const page = filters?.page ? Number(filters.page) : 1;
    const skip = (page - 1) * limit;

    if (filters?.startDate || filters?.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = new Date(filters.startDate);
      if (filters.endDate) where.date.lte = new Date(filters.endDate);
    }

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.checked !== undefined) {
      where.checked = filters.checked === 'true';
    }

    // New Logic: Exclude Income if requested
    if (filters?.excludeIncome === 'true') {
      const setup = await this.prisma.setupConfig.findUnique({
        where: { userId },
        select: { incomeSources: true },
      });

      if (setup && setup.incomeSources.length > 0) {
        if (where.category) {
          if (setup.incomeSources.includes(where.category)) {
            return {
              spending: [],
              pagination: { page, limit, total: 0, totalPages: 0 },
            };
          }
        } else {
          where.category = {
            notIn: setup.incomeSources,
          };
        }
      }
    }

    const spending = await this.prisma.spending.findMany({
      where,
      orderBy: { date: 'desc' },
      take: limit,
      skip: skip,
    });

    const total = await this.prisma.spending.count({ where });

    return {
      spending,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(userId: string, data: CreateSpendingDto) {
    const spending = await (this.prisma.spending as any).create({
      data: {
        userId,
        ...data,
        date: data.date ? new Date(data.date) : new Date(),
      },
    });

    // Check budget alerts asynchronously
    this.checkBudgetAlerts(userId, spending.category, spending.date);

    return spending;
  }

  async update(id: string, userId: string, data: UpdateSpendingDto) {
    const updateData: any = { ...data };
    if (data.date) {
      updateData.date = new Date(data.date);
    }

    const spending = await this.prisma.spending.update({
      where: { id, userId },
      data: updateData,
    });

    // Check budget alerts asynchronously
    this.checkBudgetAlerts(userId, spending.category, spending.date);

    return spending;
  }

  async remove(id: string, userId: string) {
    return this.prisma.spending.delete({
      where: { id, userId },
    });
  }

  private async checkBudgetAlerts(userId: string, category: string, date: Date) {
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;

      // 1. Get Setup Config for Income Sources
      const setup = await this.prisma.setupConfig.findUnique({
        where: { userId },
        select: { incomeSources: true },
      });

      const incomeSources = setup?.incomeSources || [];
      const isIncome = incomeSources.includes(category);

      // If it's income, we might want to check if it's a good news?
      // But the user asked for Spending > Income alert.

      // 2. Get the Budget for this month
      const budget = await this.budgetsService.findOne(userId, yearMonth);
      if (!budget) return;

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      // 3. Calculate Total Expenses for this month
      const allSpending = await this.prisma.spending.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate,
          },
          category: {
            notIn: incomeSources,
          },
        },
      });

      const totalExpenses = allSpending.reduce((sum, s) => sum + Number(s.amount), 0);
      const totalIncomeBudgeted = budget.summary.totalIncome;

      // Alert 1: Expenses > Income
      if (totalExpenses > totalIncomeBudgeted) {
        await this.notificationsService.create(
          userId,
          'Overspent!',
          `Your total expenses (Rp ${totalExpenses.toLocaleString()}) have exceeded your total income (Rp ${totalIncomeBudgeted.toLocaleString()}) this month.`,
          'WARNING',
        );
      }

      // Alert 2: Category Limit & Warning
      if (!isIncome) {
        const categorySpending = allSpending
          .filter((s) => s.category === category)
          .reduce((sum, s) => sum + Number(s.amount), 0);

        const categoryBudget = (budget.expenses as any)[category] || 0;

        if (categoryBudget > 0) {
          if (categorySpending > categoryBudget) {
            await this.notificationsService.create(
              userId,
              'Budget Limit Exceeded',
              `You have spent Rp ${categorySpending.toLocaleString()} in ${category}, which exceeds your budget of Rp ${categoryBudget.toLocaleString()}.`,
              'WARNING',
            );
          } else if (categorySpending >= categoryBudget * 0.9) {
            await this.notificationsService.create(
              userId,
              'Budget Warning',
              `You have reached ${Math.round((categorySpending / categoryBudget) * 100)}% of your budget for ${category}. Current spending: Rp ${categorySpending.toLocaleString()} / Rp ${categoryBudget.toLocaleString()}.`,
              'WARNING',
            );
          }
        }
      }
    } catch (error) {
      console.error('Error checking budget alerts:', error);
    }
  }
}
