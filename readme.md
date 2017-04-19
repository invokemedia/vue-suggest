# vue-suggest

An inline typeahead component for Vue.js

## Requirements

- vue
- vue-resource

## Example

![demo](https://raw.githubusercontent.com/invokemedia/vue-suggest/master/demo.gif)

## Motivation

Vue Suggest attempts to provide provide a typeahead solution that is less intrusive on mobile devices as it does not present any dropdowns. Vue Suggest uses a native input field which means it will work with form events.

## Usage

```html
<template>
  <div>
    <suggest
      name="country" 
      param="query" 
      url="/api/countries" 
      v-bind:format="formatCountries"/>
  </div>
</template>
```

```js
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
```

```css
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

**url:** (required) The url that will be called on keyup.

**param:** (optional) The query parameter key used in the url on keyup.

**format:** (optional) Callback for formatting suggestions.


### Events

**Tab:** Input the current suggestion.

**Return:** Input the current suggestion.

**Up Arrow:** Show the previous suggestion.

**Right Arrow:** Input the current suggestion.

**Down Arrow:** Show the next suggestion.
