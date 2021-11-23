import { Subscribers } from "./Subscribers.js";
export class ObservableStateMutator {
    _value;
    _subs;
    constructor(value) {
        this._value = value;
        this._subs = new Subscribers();
    }
    mut(fn) {
        try {
            return this._value = fn(this._value);
        }
        finally {
            this._subs.callAllWith(this._value);
        }
    }
    get val() {
        return this._value;
    }
    subscribe(consumer) {
        const node = this._subs.add(consumer);
        return { unsubscribe: () => this._subs.remove(node) };
    }
}
