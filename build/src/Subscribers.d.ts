export declare class SubscriberNode<T> {
    prev: SubscriberNode<T> | null;
    item: (item: T) => void;
    next: SubscriberNode<T> | null;
    constructor(prev: SubscriberNode<T> | null, item: (item: T) => void, next: SubscriberNode<T> | null);
}
export declare class Subscribers<T> {
    first: SubscriberNode<T> | null;
    last: SubscriberNode<T> | null;
    size: number;
    constructor();
    add(sub: (item: T) => void): SubscriberNode<T>;
    remove(sub: SubscriberNode<T>): void;
    callAllWith(item: T): void;
}
