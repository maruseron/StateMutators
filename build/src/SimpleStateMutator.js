export class SimpleStateMutator {
    _value;
    constructor(value) {
        this._value = value;
    }
    mut(fn) {
        return this._value = fn(this._value);
    }
    get val() {
        return this._value;
    }
}
