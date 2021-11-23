import { EagerStateMutator } from "./StateMutators.js";
import { Subscribers } from "./Subscribers.js";

export class ObservableStateMutator<T> implements EagerStateMutator<T> {
    private _value: T;
    private _subs: Subscribers<T>;
    constructor(value: T) {
        this._value = value;
        this._subs  = new Subscribers<T>();
    }

    public mut(fn: (val: T) => T): T {
        try {
            return this._value = fn(this._value);
        } finally {
            this._subs.callAllWith(this._value);
        }
    }

    public get val(): T {
        return this._value;
    }

    public subscribe(consumer: (item: T) => void): { unsubscribe: () => void } {
        const node = this._subs.add(consumer);
        return { unsubscribe: () => this._subs.remove(node) };
    }
}