import { EagerStateMutator } from "./StateMutators.js";

export class SimpleStateMutator<T> implements EagerStateMutator<T> {
    private _value: T;
    constructor(value: T) {
        this._value = value;
    }

    public mut(fn: (val: T) => T): T {
        return this._value = fn(this._value);
    }

    public get val(): T {
        return this._value;
    }
}
