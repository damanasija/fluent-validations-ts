import {Validation} from "./interfaces";
import {ValidationResult} from "./validation-result";

class ValidationChain {
    readonly #validations: Array<Validation>;

    constructor(validations: Array<Validation>) {
        this.#validations = validations;
    }

    public evaluate(): ValidationResult {
        const firstFailed = this.firstFailed();
        return !firstFailed
            ? ValidationResult.SUCCESS
            : ValidationResult.unsuccessfulBecause(firstFailed.getFailureMessage());
    }

    private firstFailed(): Validation | undefined {
        return this.#validations
            .find(validation => !validation.checkCondition());
    }

    // public allFailed(): Array<ValidationResult> {
    //     return this.#validations
    //         .filter(validation => !validation.checkCondition())
    //         .map(validation => ValidationResult.unsuccessfulBecause(validation.getInvalidityMessage()));
    // }
}


export {ValidationChain};

