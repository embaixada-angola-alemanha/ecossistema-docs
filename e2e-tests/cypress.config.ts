import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: { runMode: 1, openMode: 0 },
    screenshotOnRunFailure: true,
    video: true,
    videoCompression: 32,
    env: {
      SGC_URL: 'http://localhost:3001',
      SI_URL: 'http://localhost:3002',
      WN_URL: 'http://localhost:3003',
      GPJ_URL: 'http://localhost:4200',
      SGC_API: 'http://localhost:8081/api/v1',
      SI_API: 'http://localhost:8082/api/v1',
      WN_API: 'http://localhost:8083/api/v1',
      GPJ_API: 'http://localhost:8084/api/v1',
      KEYCLOAK_URL: 'http://localhost:8080',
    },
  },
});
