/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      "colors": {
        "secondary-fixed": "#adecff",
        "on-primary-fixed-variant": "#0040a2",
        "secondary-fixed-dim": "#5dd6f3",
        "primary-fixed": "#dae2ff",
        "surface-variant": "#e1e2e4",
        "surface-container-high": "#e7e8ea",
        "on-tertiary-container": "#72e9af",
        "outline-variant": "#c3c6d6",
        "surface-container-lowest": "#ffffff",
        "on-secondary": "#ffffff",
        "error": "#ba1a1a",
        "on-secondary-fixed": "#001f26",
        "surface-container": "#edeef0",
        "primary": "#003d9b",
        "background": "#f8f9fb",
        "surface-container-low": "#f3f4f6",
        "primary-fixed-dim": "#b2c5ff",
        "on-tertiary-fixed-variant": "#005235",
        "error-container": "#ffdad6",
        "on-primary": "#ffffff",
        "surface-bright": "#f8f9fb",
        "on-primary-container": "#c4d2ff",
        "on-tertiary": "#ffffff",
        "surface-container-highest": "#e1e2e4",
        "on-primary-fixed": "#001848",
        "outline": "#737685",
        "secondary-container": "#6ae1ff",
        "on-background": "#191c1e",
        "inverse-on-surface": "#f0f1f3",
        "tertiary-fixed-dim": "#65dca4",
        "on-secondary-container": "#006374",
        "on-surface-variant": "#434654",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "surface": "#f8f9fb",
        "secondary": "#00687a",
        "tertiary-fixed": "#82f9be",
        "surface-dim": "#d9dadc",
        "tertiary": "#004e32",
        "inverse-primary": "#b2c5ff",
        "surface-tint": "#0c56d0",
        "on-surface": "#191c1e",
        "primary-container": "#0052cc",
        "inverse-surface": "#2e3132",
        "on-tertiary-fixed": "#002113",
        "tertiary-container": "#006844",
        "on-secondary-fixed-variant": "#004e5d"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "sm": "12px",
        "margin-desktop": "32px",
        "margin-mobile": "16px",
        "max-width": "1280px",
        "lg": "40px",
        "base": "8px",
        "gutter": "24px",
        "md": "24px",
        "xl": "64px",
        "xs": "4px"
      },
      "fontFamily": {
        "headline-lg-mobile": ["Inter"],
        "headline-lg": ["Inter"],
        "body-md": ["Inter"],
        "label-md": ["Inter"],
        "display-lg": ["Inter"],
        "title-lg": ["Inter"],
        "headline-md": ["Inter"],
        "body-lg": ["Inter"]
      },
      "fontSize": {
        "headline-lg-mobile": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "title-lg": ["20px", { "lineHeight": "28px", "fontWeight": "500" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}

