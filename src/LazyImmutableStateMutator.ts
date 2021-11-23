import { LazyStateMutator } from "./StateMutators.js";

export class LazyImmutableStateMutator<T> implements LazyStateMutator<T> {
    private initial: T;
    private operation: (value: T) => T;
    constructor(value: T, operation?: (value: T) => T) {
        this.initial = value;
        this.operation = operation ?? (() => value);
    }

    public mut(operation: (value: T) => T): LazyImmutableStateMutator<T> {
        return new LazyImmutableStateMutator<T>(this.initial, 
            (value: T) => operation(this.operation(value)));
    }

    public get val(): T {
        return this.operation(this.initial);
    }
}