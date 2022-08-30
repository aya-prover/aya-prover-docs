import { defineClientConfig } from '@vuepress/client';
import Publications from './components/Publications.vue';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Publications', Publications)
  },
  setup() { },
  rootComponents: [],
})