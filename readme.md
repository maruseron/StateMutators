# State Holders
This thing here was born from a conversation with a dear friend about JavaScript, pointers to primitives and proxies. It's a pretty simple implementation of some containers for mutable state, some lazy, some observable.

As a disclaimer, I'd like to point out this is not production quality stuff - this is just a very bare-bones test.

## StateMutators
They're a couple umbrella interfaces that represent one of these boxes, so you can expect them as arguments of a function.
```ts
interface EagerStateMutator<T> {
    // mut mutates the internal state of the container. It returns the modified state.
    public mut(fn: (val: T) => T): T;
    // val is a getter that returns the current value of type T of the StateMutator.
    public get val(): T;
}

interface LazyStateMutator<T> {
    // mut queries a mutation for the internal container state and returns a LazyStateMutator.
    public mut(fn: (val: T) => T): LazyStateMutator<T>;
    // val computes and returns the queried operations on the state.
    public get val(): T;
}
```
The point of the `StateMutator` interface is so it can be used like this:
```ts
// pointer can be a SimpleStateMutator, an ObservableStateMutator, etc
function incrementPointer(pointer: EagerStateMutator<number>): void {
    pointer.mut(i => ++i);
}
```

## SimpleStateMutator
Insanely simple implementation. It works like this:
```ts
const sm = new SimpleStateMutator(5);
sm.val; // 5
incrementPointer(sm);
sm.val; // 6
```

## LazyMutableStateMutator
Mutable, but the value is only ever computed when called. The mut only queries the operation, instead of instantly mapping the state.
```ts
const sm = new LazyMutableStateMutator(5);
sm.val; // 5
incrementPointer(sm);
sm["initial"] // private, but still 5
sm.val; // 6. initial is now 6 too
```

## LazyImmutableStateMutator
I don't see myself using this thing ever, but it's basically the same as above, except the query is done through a new StateMutator instance.
```ts
const lmsm = new LazyMutableStateMutator(5);
sm.mut(fn) === lmsm; // true, same instance

const lism = new LazyImmutableStateMutator(5);
sm.mut(fn) === lism; // false, new mutator. can't send as a pointer
```

## ObservableStateMutator
Although still trivial, the longest of the bunch. It's a SimpleStateMutator you can subscribe to, with the mut function pushing the new state into the subscribers. Still simple to use:
```ts
const osm = new ObservableStateMutator(5);
const subscription = osm.subscribe(x => console.log("listened to change:", x));
sm.val; // 5;
incrementPointer(sm); // logs "listened to change: 6"
sm.val; // 6;
```