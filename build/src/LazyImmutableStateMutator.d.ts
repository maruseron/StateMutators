import { LazyStateMutator } from "./StateMutators.js";
export declare class LazyImmutableStateMutator<T> implements LazyStateMutator<T> {
    private initial;
    private operation;
    constructor(value: T, operation?: (value: T) => T);
    mut(operation: (value: T) => T): LazyImmutableStateMutator<T>;
    get val(): T;
}
