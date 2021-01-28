interface Validation {
    checkCondition(): boolean;

    getFailureMessage(): string;

}

interface Supplier<T> {
    (): T;
}

interface Consumer<T> {
    (arg: T): void;
}

interface Condition {
    (): boolean;
}

export {Validation, Condition, Consumer, Supplier};