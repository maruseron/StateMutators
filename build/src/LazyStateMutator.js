export class LazyStateMutator {
    initial;
    operation;
    constructor(value, operation) {
        this.initial = value;
        this.operation = operation ?? (() => value);
    }
    mut(operation) {
        const current = this.operation;
        this.operation = (value) => operation(current(value));
        return this;
    }
    get val() {
        return this.operation(this.initial);
    }
}
