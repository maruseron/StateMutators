export class SubscriberNode {
    prev;
    item;
    next;
    constructor(prev, item, next) {
        this.prev = prev;
        this.item = item;
        this.next = next;
    }
}
export class Subscribers {
    first = null;
    last = null;
    size;
    constructor() {
        this.size = 0;
    }
    add(sub) {
        const last = this.last;
        const newNode = new SubscriberNode(last, sub, null);
        this.last = newNode;
        if (last === null) {
            this.first = newNode;
        }
        else {
            last.next = newNode;
        }
        this.size++;
        return newNode;
    }
    remove(sub) {
        const next = sub.next;
        const prev = sub.prev;
        if (prev === null) {
            this.first = next;
        }
        else {
            prev.next = next;
            sub.prev = null;
        }
        if (next === null) {
            this.last = prev;
        }
        else {
            next.prev = prev;
            sub.next = null;
        }
        this.size--;
    }
    callAllWith(item) {
        for (let nextItem = this.first, nextIndex = 0; nextIndex < this.size; nextItem = nextItem.next, nextIndex++) {
            nextItem.item(item);
        }
    }
}
