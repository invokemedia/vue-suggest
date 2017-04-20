const KEY_TAB = 9
const KEY_RETURN = 13
const KEY_LEFT = 37
const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_DOWN = 40

window.Vue.component('suggest', {
  template: `
  <div 
    class="suggest-wrapper" 
    :style="styles['suggest-wrapper']"
  >
    <input 
      type="text" 
      autocomplete="off" 
      spellcheck="false" 
      :placeholder="placeholder"
      :style="styles['suggest-input']"
      :name="name"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @blur="handleBlur"
      v-model="content"
    />
    <div 
      class="suggest-results"
      :style="styles['suggest-results']"
      @click="selected"
      v-if="suggestion"
    >
      {{ suggestion.name }}
    </div>
  </div>`,
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    param: {
      type: String,
      required: false,
      default: 'q'
    },
    onSuggestion: {
      type: Function,
      required: false,
      default: (suggestion) => {
        return suggestion
      }
    },
    format: {
      type: Function,
      required: false,
      default: (data) => {
        return data
      }
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      content: this.value,
      suggestions: [],
      index: 0,
      styles: {
        'suggest-wrapper': {
          position: 'relative'
        },
        'suggest-input': {
          //background: 'transparent',
          //margin: 0
        },
        'suggest-results': {
          cursor: 'pointer',
          position: 'absolute',
          opacity: '.4',
          top: 0,
          left: 0
        }
      }
    }
  },
  computed: {
    suggestion () {
      return this.suggestions[this.index] || null
    }
  },
  methods: {
    selected () {
      this.onSuggestion(this.suggestion)
      this.content = this.suggestion.name
      this.suggestions = []
    },
    handleKeydown (e) {
      // e.which for Firefox support.
      const keyCode = (e.which || e.keyCode)
      // Listen for the tab key.
      if (keyCode == KEY_TAB || keyCode == KEY_RIGHT) {
        // Submit the current suggestion.
        if (this.suggestion) {
          this.selected()
        }
      } 
      // Listen for the return key.
      else if (keyCode == KEY_RETURN) {
        if (this.suggestion) {
          this.selected()
          e.preventDefault()
        }
      }
      // Listen for the up/down keys.
      else if ([KEY_DOWN, KEY_UP].indexOf(keyCode) > -1) {
        e.preventDefault()
        // Down.
        if (keyCode == KEY_DOWN) {
          this.index++;
        }
        // Up.
        else if (keyCode == KEY_UP) {
          this.index--;
        }
      }
    },
    handleKeyup (e) {
      // e.which for Firefox support.
      const keyCode = (e.which || e.keyCode)
      // Have the arrow keys been pressed?
      if ([KEY_TAB, KEY_RETURN, KEY_UP, KEY_RIGHT, KEY_DOWN].indexOf(keyCode) > -1) {
        return
      } else if (e.target.value.length > 0) {
        clearTimeout(this.keyupTimeout)
        this.keyupTimeout = setTimeout(() => {
          this.$http.get(this.url, { params: { [this.param]: e.target.value }}).then((rep) => {
            this.suggestions = this.format(rep.data)
            this.index = 0
          })
        }, 300)
      } else {
        this.suggestions = []
      }
    },
    handleBlur (e) {
      clearTimeout(this.blurTimeout)
      // Debounce clearing the suggestion so a user can click on it.
      this.blurTimeout = setTimeout(() => {
        this.suggestions = []
      }, 300)
    }
  }
})
