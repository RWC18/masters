import axios from 'axios';
import { fetchWallet, purchasePack } from './billingActions';

jest.mock('axios');

describe('billingActions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchWallet returns payload data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: { balance: 10, packs: [], transactions: [] } } } as any);
    await expect(fetchWallet()).resolves.toEqual({ balance: 10, packs: [], transactions: [] });
  });

  it('fetchWallet returns null on error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('boom'));
    await expect(fetchWallet()).resolves.toBeNull();
  });

  it('purchasePack returns success data', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { data: { balance: 40 } } } as any);
    await expect(purchasePack('basic')).resolves.toEqual({ ok: true, balance: 40 });
  });

  it('purchasePack returns fallback message on failure', async () => {
    mockedAxios.post.mockRejectedValueOnce({ response: { data: { message: 'No credits' } } });
    await expect(purchasePack('basic')).resolves.toEqual({ ok: false, message: 'No credits' });

    mockedAxios.post.mockRejectedValueOnce({});
    await expect(purchasePack('basic')).resolves.toEqual({ ok: false, message: 'Purchase failed' });
  });
});
