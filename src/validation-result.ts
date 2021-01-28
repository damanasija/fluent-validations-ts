import {Consumer} from "./interfaces";

class ValidationResult {
    public static SUCCESS: ValidationResult = new ValidationResult(true, "");
    readonly #isSuccessful: boolean;
    readonly #failureReason: string;

    private constructor(isSuccessful: boolean, failureReason: string) {
        this.#isSuccessful = isSuccessful;
        this.#failureReason = failureReason;
    }

    get isSuccessful(): boolean {
        return this.#isSuccessful;
    }

    get failureReason(): string {
        return this.#failureReason;
    }

    public onFailureConsume(callback: Consumer<string>) {
        if (!this.isSuccessful) {
            callback(this.failureReason);
        }
    }

    public static unsuccessfulBecause(failureReason: string) {
        return new ValidationResult(false, failureReason);
    }
}

export {ValidationResult};