import { Dispatch } from 'redux';
import { parseApiError, parseResponseError, ParsedApiError } from './apiError';
import { openPaymentPopUp } from './mainActions';

export const dispatchGenerationError = (
  dispatch: Dispatch,
  parsed: ParsedApiError,
  setError: (message: string | null) => void
) => {
  if (parsed.kind === 'insufficient_credits') {
    dispatch<any>(
      openPaymentPopUp({
        balance: parsed.balance,
        required: parsed.required,
      })
    );
    setError(null);
    return;
  }

  setError(parsed.message);
};

export const handleAxiosGenerationError = (
  dispatch: Dispatch,
  e: unknown,
  setError: (message: string | null) => void
) => {
  dispatchGenerationError(dispatch, parseApiError(e), setError);
};

export const handleResponseGenerationError = (
  dispatch: Dispatch,
  data: Record<string, unknown> | undefined | null,
  setError: (message: string | null) => void
): boolean => {
  const parsed = parseResponseError(data);
  if (!parsed) return false;
  dispatchGenerationError(dispatch, parsed, setError);
  return true;
};
