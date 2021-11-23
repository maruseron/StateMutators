import { EagerStateMutator } from "./StateMutators.js";
export declare class SimpleStateMutator<T> implements EagerStateMutator<T> {
    private _value;
    constructor(value: T);
    mut(fn: (val: T) => T): T;
    get val(): T;
}
