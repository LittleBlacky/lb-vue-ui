import LbButton from './components/button'
import LbInput from './components/input'
import LbIcon from './components/icon'
import type { App } from 'vue'

export const LbUIinstall = (app: App) => {
  [LbButton, LbInput, LbIcon].forEach((component) => {
    app.component(component.name as string, component)
  })
}

export {
  LbButton,
  LbInput,
  LbIcon
}
