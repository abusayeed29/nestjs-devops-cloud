import { apiClient } from "./axios.config";
import type {
  CreatePaymentIntentRequest,
  ConfirmPaymentRequest,
  PaymentResponse,
} from "@/types/payment.types";

export const PaymentService = {
  createPaymentIntent: async (
    data: CreatePaymentIntentRequest
  ): Promise<PaymentResponse> => {
    console.log("data", data);
    const response = await apiClient.post<PaymentResponse>(
      "/payments/create-intent",
      data
    );
    return response.data;
  },

  confirmPayment: async (
    data: ConfirmPaymentRequest
  ): Promise<PaymentResponse> => {
    const response = await apiClient.post<PaymentResponse>(
      "/payments/confirm",
      data
    );
    return response.data;
  },
};

export type {
  CreatePaymentIntentRequest,
  ConfirmPaymentRequest,
  PaymentResponse,
};
