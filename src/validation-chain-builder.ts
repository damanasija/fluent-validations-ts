import {Condition, Supplier, Validation} from "./interfaces";
import {ValidationChain} from "./validation-chain";
import {ValidationResult} from "./validation-result";

class ValidationChainBuilder {
    readonly #validations: Array<Validation>;

    public constructor() {
        this.#validations = new Array<Validation>();
    }

    public includeAll(chainSupplier: Supplier<ValidationChain>) {
        this.#validations.push(new LazilyEvaluatedComposedChainValidation(chainSupplier));
        return this;
    }

    public checkThat(condition: Condition, invalidityMessage: string) {
        this.#validations.push(new ConditionBasedValidation(condition, invalidityMessage));
        return this;
    }

    public addValidation(validation: Validation) {
        this.#validations.push(validation);
    }

    public build() {
        return new ValidationChain(this.#validations);
    }
}

class LazilyEvaluatedComposedChainValidation implements Validation {
    #evaluatedResult!: ValidationResult;
    readonly #validationChainSupplier: Supplier<ValidationChain>;

    constructor(validationChainSupplier: Supplier<ValidationChain>) {
        this.#validationChainSupplier = validationChainSupplier;
    }

    public checkCondition(): boolean {
        this.#evaluatedResult = this.#validationChainSupplier().evaluate();
        return this.#evaluatedResult.isSuccessful;
    }

    public getFailureMessage(): string {
        return this.#evaluatedResult.failureReason;
    }
}

class ConditionBasedValidation implements Validation {
    readonly #condition: Condition;
    readonly #failureMessage: string;

    constructor(condition: Condition, invalidityMessage: string) {
        this.#condition = condition;
        this.#failureMessage = invalidityMessage;
    }

    public getFailureMessage() {
        return this.#failureMessage;
    }

    public checkCondition(): boolean {
        return this.#condition();
    }
}

function builder(): ValidationChainBuilder {
    return new ValidationChainBuilder();
}

export {builder};