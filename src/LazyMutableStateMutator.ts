import { LazyStateMutator } from "./StateMutators.js";

export class LazyMutableStateMutator<T> implements LazyStateMutator<T> {
    private initial: T;
    private operation: (value: T) => T;
    constructor(value: T, operation?: (value: T) => T) {
        this.initial = value;
        this.operation = operation ?? (() => value);
    }

    public mut(operation: (value: T) => T): this {
        const current = this.operation;
        this.operation = (value: T) => operation(current(value));
        return this;
    }

    public get val(): T {
        return this.operation(this.initial);
    }
}