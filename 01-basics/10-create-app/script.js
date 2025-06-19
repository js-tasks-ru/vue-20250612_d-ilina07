import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',

  setup() {
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
    const date = formatter.format(new Date())

    return {
      date,
    }
  },

  template: `
    <div>Сегодня {{ date }}</div>
  `,
})

const app = createApp(App)
const vm = app.mount('#app')

window.vm = vm
