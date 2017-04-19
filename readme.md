# vue-suggest

An inline typeahead component for Vue.js

## Requirements

- vue
- vue-resource

## Usage

```
<template>
  <div>
    <suggest
      name="country" 
      param="query" 
      url="/api/countries" 
      v-bind:format="formatCountries"/>
  </div>
</template>

<script>
export default {
  methods: {
    formatCountries (data) {
      return data.map((country) => {
        return country.name
      })      
    }
  }
}
</script>

<style>
suggest-wrapper {
  .suggest-results {
    padding: .5rem 0;
  }
} 
</style>
```

### Arguments

**name:** (required) The name of the html input.

**url:** (required)

**param:** (optional)

**format:** (optional)


### Events

**Tab:** Input the current suggestion.

**Return:** Input the current suggestion.

**Down Arrow:** Show the next suggestion.

**Up Arrow:** Show the previous suggestion.

