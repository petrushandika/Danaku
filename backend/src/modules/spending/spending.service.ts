import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { CreateSpendingDto } from './dto/create-spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';

@Injectable()
export class SpendingService {
  constructor(private prisma: PrismaService) {}

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
        // If a specific category is requested, we strictly check overlap?
        // Actually, simpler logic: Add 'notIn' condition.
        // If 'where.category' is set (string), it overrides or conflicts?
        // Prisma 'where' object structure:
        // If where.category is scalar string, we can't add NOT IN easily without changing structure to AND.
        // Let's check if 'category' filter is present.
        if (where.category) {
          // If the specifically requested category IS an income source, result should be empty.
          if (setup.incomeSources.includes(where.category)) {
            return {
              spending: [],
              pagination: { page, limit, total: 0, totalPages: 0 },
            };
          }
        } else {
          // General exclusion
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
    return (this.prisma.spending as any).create({
      data: {
        userId,
        ...data,
        date: data.date ? new Date(data.date) : new Date(),
      },
    });
  }

  async update(id: string, userId: string, data: UpdateSpendingDto) {
    const updateData: any = { ...data };
    if (data.date) {
      updateData.date = new Date(data.date);
    }

    return this.prisma.spending.update({
      where: { id, userId },
      data: updateData,
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.spending.delete({
      where: { id, userId },
    });
  }
}
