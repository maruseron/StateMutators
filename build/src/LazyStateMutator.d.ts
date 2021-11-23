export declare class LazyStateMutator<T> {
    private initial;
    private operation;
    constructor(value: T, operation?: (value: T) => T);
    mut(operation: (value: T) => T): this;
    get val(): T;
}
