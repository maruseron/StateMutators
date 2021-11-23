export interface StateMutator<T> {
    mut(fn: (val: T) => T): unknown;
    get val(): any;
}
