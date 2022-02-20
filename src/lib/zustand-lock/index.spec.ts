import create from 'zustand';

import { withLockStatus } from '@/lib/zustand-lock/withLockStatus';

interface CartState {
  status: 'idle' | 'creating' | 'adding' | 'updating' | 'removing' | 'idle';
}
const useStore = withLockStatus(
  create<CartState>(() => ({
    status: 'idle',
  }))
);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('zustand lock', () => {
  it('each call should block and get executed sequentially', async () => {
    const stack: number[] = [];
    for (let index = 0; index < 10; index++) {
      {
        useStore.lockStatus('creating', async () => {
          await delay(10);
          stack.push(index);
          return {
            result: 'OK',
          };
        });
      }
    }
    await useStore.lockStatus();
    expect(stack).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
