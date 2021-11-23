import { EagerStateMutator } from "./StateMutators.js";
export declare class ObservableStateMutator<T> implements EagerStateMutator<T> {
    private _value;
    private _subs;
    constructor(value: T);
    mut(fn: (val: T) => T): T;
    get val(): T;
    subscribe(consumer: (item: T) => void): {
        unsubscribe: () => void;
    };
}
