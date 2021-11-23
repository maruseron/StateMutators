export interface EagerStateMutator<T> {
    mut(fn: (val: T) => T): T;
    get val(): T;
}
export interface LazyStateMutator<T> {
    mut(fn: (val: T) => T): LazyStateMutator<T>;
    get val(): T;
}
