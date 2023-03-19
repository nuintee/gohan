import { BASE_URL } from '@/config/env'
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: BASE_URL || 'http://localhost:3000',
  },
})
