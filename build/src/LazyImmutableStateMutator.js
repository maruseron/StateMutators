export class LazyImmutableStateMutator {
    initial;
    operation;
    constructor(value, operation) {
        this.initial = value;
        this.operation = operation ?? (() => value);
    }
    mut(operation) {
        return new LazyImmutableStateMutator(this.initial, (value) => operation(this.operation(value)));
    }
    get val() {
        return this.operation(this.initial);
    }
}
