# vue-suggest

An inline typeahead component for Vue.js

## Requirements

- vue
- vue-resource

## Example

![demo](https://raw.githubusercontent.com/invokemedia/vue-suggest/master/demo.gif)

## Usage

```html
<template>
  <div>
    <suggest
      name="country" 
      param="query" 
      url="/api/countries" 
      v-bind:format="formatCountries"
      v-bind:onSuggest="handleOnSuggest"/>
    <input 
      type="hidden" 
      v-model="countryId"/>
  </div>
</template>
```

```js
<script>
export default {
  data () {
    return {
      countryId: null
    }
  },
  methods: {
    formatCountries (data) {
      return data.map((country) => {
        return {
          id: country.uuid,
          name: country.iso
      })      
    },
    handleOnSuggest (country) {
      this.countryId = country.id
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

**onResponse:** (optional) Callback for formatting suggestions.

**onSuggestion:** (optional) Callback that will be triggered when a suggestion is complete.

### Events

**Tab:** Input the current suggestion.

**Return:** Input the current suggestion.

**Up Arrow:** Show the previous suggestion.

**Right Arrow:** Input the current suggestion.

**Down Arrow:** Show the next suggestion.
