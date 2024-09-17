import App from './App'
//import MyComponent from './component/MyComponent.vue'
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  //app.component('my-component',MyComponent)
  return {
    app
  }
}