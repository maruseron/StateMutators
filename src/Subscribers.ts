export class SubscriberNode<T> {
    constructor(
        public prev: SubscriberNode<T> | null,
        public item: (item: T) => void,
        public next: SubscriberNode<T> | null
    ) {}
}

export class Subscribers<T> {
    first: SubscriberNode<T> | null = null;
    last: SubscriberNode<T>  | null = null;
    size: number;

    constructor() {
        this.size  = 0;
    }

    public add(sub: (item: T) => void): SubscriberNode<T> {
        const last = this.last;
        const newNode = new SubscriberNode<T>(last, sub, null!);
        this.last = newNode;
        if (last === null) {
            this.first = newNode;
        } else {
            last.next = newNode;
        }
        this.size++;
        return newNode;
    }

    public remove(sub: SubscriberNode<T>): void {
        const next  = sub.next;
        const prev  = sub.prev;

        if (prev === null) {
            this.first = next;
        } else {
            prev.next = next;
            sub.prev  = null;
        }

        if (next === null) {
            this.last = prev;
        } else {
            next.prev = prev;
            sub.next  = null;
        }
        this.size--;
    }

    public callAllWith(item: T): void {
        for (
            let nextItem = this.first, nextIndex = 0; 
            nextIndex < this.size; 
            nextItem = nextItem!.next, nextIndex++
        ) {
            nextItem!.item(item);
        }
    }
}