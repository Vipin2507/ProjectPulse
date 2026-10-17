import { ApiError } from '@/lib/api/client';

export async function withMock<T>(produce: () => T): Promise<T> {
  const duration = 400 + Math.floor(Math.random() * 301);
  await new Promise((resolve) => setTimeout(resolve, duration));
  if (typeof window !== 'undefined') {
    const fail = new URLSearchParams(window.location.search).get('fail');
    if (fail === '1') {
      throw new ApiError(500, 'Forced mock failure');
    }
  }
  return produce();
}
