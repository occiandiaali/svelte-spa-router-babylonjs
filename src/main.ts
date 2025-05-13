// import { mount } from 'svelte'
// import './app.css'
// import App from './App.svelte'

// const app = mount(App, {
//   target: document.getElementById('app')!,
// })

// export default app

import { mount } from 'svelte'
import './main.css'
import Main from './Main.svelte'

const app = mount(Main, {
  target: document.getElementById('app')!,
})

export default app
