import LbButton from './components/button'
import LbInput from './components/input'
import type { App } from 'vue'

export const LbUIinstall = (app: App) => {
  [LbButton, LbInput].forEach((component) => {
    app.component(component.name as string, component)
  })
}

export {
  LbButton,
  LbInput
}
