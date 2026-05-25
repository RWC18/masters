import axios from 'axios';
import { STATUS_TYPES } from './constants';

export type ApiErrorKind =
  | 'insufficient_credits'
  | 'unauthorized'
  | 'validation'
  | 'server'
  | 'network'
  | 'generation'
  | 'unknown';

export interface ParsedApiError {
  kind: ApiErrorKind;
  message: string;
  status?: number;
  balance?: number;
  required?: number;
}

const defaultMessages: Record<ApiErrorKind, string> = {
  insufficient_credits: 'Insufficient credits',
  unauthorized: 'Please sign in to continue',
  validation: 'Invalid request. Please check your input.',
  server: 'Something went wrong on our side. Please try again.',
  network: 'Network error. Check your connection and try again.',
  generation: 'Generation failed. Please try again.',
  unknown: 'Something went wrong. Please try again.',
};

export const parseApiError = (e: unknown): ParsedApiError => {
  if (axios.isAxiosError(e)) {
    const status = e.response?.status;
    const data = e.response?.data as Record<string, unknown> | undefined;
    const message =
      (typeof data?.message === 'string' && data.message) ||
      defaultMessages.unknown;

    if (
      status === 402 ||
      message.toLowerCase().includes('insufficient credits')
    ) {
      return {
        kind: 'insufficient_credits',
        message,
        status: status || 402,
        balance: typeof data?.balance === 'number' ? data.balance : undefined,
        required:
          typeof data?.required === 'number' ? data.required : undefined,
      };
    }

    if (status === 401) {
      return { kind: 'unauthorized', message, status };
    }

    if (status === 400) {
      return { kind: 'validation', message, status };
    }

    if (status && status >= 500) {
      return { kind: 'server', message, status };
    }

    return { kind: 'unknown', message, status };
  }

  return { kind: 'network', message: defaultMessages.network };
};

export const parseResponseError = (
  data: Record<string, unknown> | undefined | null
): ParsedApiError | null => {
  if (!data || data.status !== STATUS_TYPES.ERROR) return null;

  const message =
    (typeof data.message === 'string' && data.message) ||
    defaultMessages.generation;

  if (message.toLowerCase().includes('insufficient credits')) {
    return {
      kind: 'insufficient_credits',
      message,
      balance: typeof data.balance === 'number' ? data.balance : undefined,
      required: typeof data.required === 'number' ? data.required : undefined,
    };
  }

  return { kind: 'generation', message };
};
