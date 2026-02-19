/**
 * Lighthouse CI configuration for all frontend applications.
 * Run: npx lhci autorun
 */
module.exports = {
  ci: {
    collect: {
      url: [
        // SI Public (most important for SEO/performance)
        'http://localhost:3002/',
        'http://localhost:3002/embaixador',
        'http://localhost:3002/eventos',
        'http://localhost:3002/contactos',

        // WN News Portal
        'http://localhost:3003/',
        'http://localhost:3003/arquivo',
        'http://localhost:3003/pesquisa',

        // SGC Admin (logged-in performance)
        'http://localhost:3001/',

        // GPJ Admin
        'http://localhost:4200/',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
        },
        chromeFlags: '--no-sandbox --headless',
      },
    },

    assert: {
      assertions: {
        // Performance
        'categories:performance': ['error', { minScore: 0.80 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],

        // Accessibility
        'categories:accessibility': ['warn', { minScore: 0.90 }],

        // Best Practices
        'categories:best-practices': ['warn', { minScore: 0.90 }],

        // SEO (important for public sites SI + WN)
        'categories:seo': ['warn', { minScore: 0.90 }],
      },
    },

    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports',
    },
  },
};
