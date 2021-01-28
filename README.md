# fluent-validtions-ts
Fluent validations using builder, CoR and composite patterns.

## Examples
```
    const stringValue = "this is a string";
    const result = ValidationChain.builder()
        .checkThat(() => stringValue.length > 5, "lenght can't be less than 5")
        .includeAll(() => buildEmptyChain())   // include other chains (composite pattern)
        .build()
        .evaluate();
    result.onFailureConsume(failureMessage => {
        // do something with the failureMessage;
    });
```