import { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './index.css'
import Publications from '../components/Publications.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app
      .component('Publications', Publications)
  },
}
