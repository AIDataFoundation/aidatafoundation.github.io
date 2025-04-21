/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#f8f8f2',
        bgGray : '#282a36',
        bgPrimary : '#191a21',
        grayFill : '#6b6f8c',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#f8f8f2',
            h1: {
              color: '#f8f8f2',
            },
            h2: {
              color: '#f8f8f2',
            },
            h3: {
              color: '#f8f8f2',
            },
            strong: {
              color: '#f8f8f2',
            },
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#60a5fa',
              },
            },
            code: {
              color: '#f8f8f2',
              backgroundColor: 'rgba(40, 42, 54, 0.5)',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#191a21',
              code: {
                backgroundColor: 'transparent',
                padding: '0',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
}
