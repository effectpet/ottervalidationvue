# OtterValidationVue

> Fast, lightweight validation with full typescript support for Vue 3

OtterValidationVue is a Vue 3 wrapper for [OtterValidation](https://github.com/effectpet/ottervalidation)

## Installation

```bash
npm install ottervalidationvue
```


## Full example with Vue 3 class component
```html
<template>
  <form novalidate @submit.prevent="submit()">
    <label for="email">Username</label>
    <input id="email" v-model="ovv.object.email.model" type="text">
    <small v-if="ovv.object.email.errors" v-text="$t(ovv.object.email.errors[0])" />
    <br>
    <label for="password">Password</label>
    <input id="password" v-model="ovv.object.password.model" type="password">
    <template v-if="ovv.object.password.errors">
      <small v-for="error in ovv.object.password.errors[0]" :key="error" v-text="error" />
    </template>
    <br>
    <input type="submit" text="Submit">
  </form>
</template>
```
```javascript
<script lang="ts">
  import { Vue } from "vue-class-component";
  import { createOVV, OVValidation, OVVConfiguration } from "ottervalidationvue";

  interface Form {
    email: string;
    password: string;
  }

  export default class LoginForm extends Vue {
    public form: Form = {
      email: "",
      password: "",
    };

    public validation: OVValidation<Form> = {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minLength: 8,
        maxLength: 128,
        minLowerCase: 1,
        minUpperCase: 1,
        minNumeric: 1,
        minSymbol: 1,
      },
    };

  public configuration: OVVConfiguration = {
    errorMessage: {
      prefix: "validation",
    },
  };

  public ovv = createOVV(
    this.form,
    this.validation,
    this.configuration
  );

  public submit(): void {
    if (this.ovv.errors) {
      return;
    }

    // Submit this.form
  }
}
</script>
```

## Validation types

See [Readme#validation-types](https://github.com/effectpet/ottervalidation#validation-types) inside OtterValidation


## Configuration

OVVConfiguration extends from OVConfiguration and has currently no specific keys.

See [Readme#Configuration](https://github.com/effectpet/ottervalidation#configuration) and [Example](https://github.com/effectpet/ottervalidation#configuration-example) inside OtterValidation


## Contributing

``` bash
# install dependencies
npm install

# run linter
npm run lint
```

## License

[MIT](https://opensource.org/licenses/MIT)
