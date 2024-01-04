
export interface Subscriber<State> {

}


export class Store<State extends Record<string, any>> {
    private subscribers = new Set<Subscriber<State>>();

    constructor(private state: State) { }

    getValue() {
        return this.state;
    }

    setValue(newState: State | ((state: State) => State)) {
        this.state = typeof newState === 'function' ?
            newState(this.state) : newState;
        this.emit();
    }

    updateValue(partialState: Partial<State>) {
        this.state = { ...this.state, ...partialState }
        this.emit();
    }

    subscribe(subscriber: Subscriber<State>) {
        this.subscribers.add(subscriber);

        return () => this.subscribers.delete(subscriber)
    }

    private emit() {
        this.subscribers.forEach((subscriber) => subscriber(this.state));
    }
}

export function createSelectorHook<State extends Record<string, any>>(
    store: Store<State>
) {
    return function useSelector<R>(selector: (state: State) => R =
        (state) => state as R): R {
        let currentState = useRef<R>(selector(store.getValue()));

        const getSnapshot = () => selector(store.getValue())

        return useSyncExternalStore(
            useCallback(cb => {
                return store.subscribe((state) => {
                    const nextState = selector(state);
                    if (currentState.current !== nextState) {
                        currentState.current = nextState;
                        cb();
                    }
                });
            }, []),
            getSnapshot,
            getSnapshot,
        );
    }
}