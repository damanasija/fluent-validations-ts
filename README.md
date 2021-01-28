# fluent-validations-ts
Fluent validations using builder, CoR and composite patterns.

## Examples
```
    const stringValue = "this is a string";
    const result = ValidationChain.builder()
        .checkThat(() => 5 <= stringValue.length, "length can't be less than 5")
        .includeAll(() => supplyOtherChain())   // include other chains using composite pattern
        .build()
        .evaluate();
    result.onFailureConsume(failureMessage => {
        // do something with the failureMessage;
    });
```