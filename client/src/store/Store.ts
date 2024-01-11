import { useCallback, useRef, useSyncExternalStore } from "react";

type Subscriber<State> = (state: State) => void

export class Store<State extends Record<string, any>> {
    private subscribers = new Set<Subscriber<State>>();

    constructor(private state: State) { }

    getState() {
        return this.state;
    }

    setState(newState: State | ((state: State) => State)) {
        this.state = typeof newState === 'function' ?
            newState(this.state) : newState;
        this.emit();
    }

    updateState(partialState: Partial<State>) {
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

export function createStore<State extends Record<string, any>>(state: State) {
    return new Store(state);
}

export function createSelectorHook<State extends Record<string, any>>(
    store: Store<State>
) {
    return function useSelector<R>(selector: (state: State) => R): R {
        let currentState = useRef<R>(selector(store.getState()));

        const getSnapshot = () => selector(store.getState())

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