import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'
import '@mdi/font/css/materialdesignicons.css'

export const vuetify = createVuetify({
  components: {
    VBottomSheet,
    ...components
  },
  directives,
  theme: {
    themes: {
      light: {
        dark: true
      }
    }
  },
  icons: {
    defaultSet: 'mdi'
  }
})
