import api from "@/lib/api";

export interface PaymentResponse {
  token: string;
  redirect_url: string;
  orderId: string;
  clientKey: string;
  isProduction: boolean;
}

export const initiatePayment = async (
  plan: string,
  amount: number
): Promise<PaymentResponse> => {
  const response = await api.post("/payments", { plan, amount });
  return response.data.data || response.data;
};

export const checkPaymentStatus = async (orderId: string) => {
  const response = await api.post("/payments/check-status", { orderId });
  return response.data.data || response.data;
};
