# vue-suggest

An inline typeahead component for Vue.js

### Requirements

- vue
- vue-resource

### Usage

```
<suggest name="country" param="query" url="/api/countries" v-bind:format="formatCountries"/>
```

### Events

**Tab:** Input the current suggestion.
**Return:** Input the current suggestion.
**Down Arrow:** Show the next suggestion.
**Up Arrow:** Show the previous suggestion.

