import {
  EqualityChecker,
  State,
  StateSelector,
  StoreApi,
} from 'zustand/vanilla';

type TUseBoundStore<
  T extends State,
  CustomStoreApi extends StoreApi<T> = StoreApi<T>
> = {
  (): T;
  <U>(selector: StateSelector<T, U>, equalityFn?: EqualityChecker<U>): U;
} & CustomStoreApi;

type StateLockable = {
  status: string;
};

type TLockStatus<S extends StateLockable> = <U = void>(
  toStatus?: S['status'],
  work?: (state: S) => Promise<U>
) => Promise<U>;

export const withLockStatus = <S extends StateLockable>(
  useStore: TUseBoundStore<S, StoreApi<S>> & {
    lockStatus?: TLockStatus<S>;
    initialStatus?: S['status'];
  }
) => {
  const initialStatus = useStore.getState().status;
  useStore.lockStatus = <U = void>(
    toStatus?: S['status'],
    work?: (state: S) => Promise<U>
  ): Promise<U> => {
    if (work && !toStatus) {
      throw new Error('toStatus should not be nullish when work is provided');
    }
    let result: U;
    const checkAndWork = async (state: S, unsub?: () => void) => {
      if (state.status === initialStatus) {
        if (toStatus) {
          useStore.setState({
            status: toStatus,
          });
          if (useStore.getState().status !== toStatus) {
            throw new Error('Not immediately set state');
          }
        }
        if (unsub) unsub();
        if (work) result = await work(state);
        useStore.setState({
          status: initialStatus,
        });
        return true;
      }
      return false;
    };
    return new Promise<U>((resolve) => {
      const state: S = useStore.getState();
      checkAndWork(state).then((passed) => {
        if (passed) return resolve(result);

        const unsub = useStore.subscribe(async (state) => {
          const passed = await checkAndWork(state, unsub);
          if (passed) {
            return resolve(result);
          }
        });
      });
    });
  };

  return useStore as TUseBoundStore<S, StoreApi<S>> & {
    lockStatus: TLockStatus<S>;
    initialStatus: string;
  };
};
