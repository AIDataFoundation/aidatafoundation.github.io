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
        theme: {
          primary: {
            DEFAULT: '#6366f1',
            light: '#818cf8',
            dark: '#4f46e5',
          },
          secondary: {
            DEFAULT: '#0891b2',
            light: '#22d3ee',
            dark: '#0e7490',
          },
          neutral: {
            DEFAULT: '#f8fafc',
            dark: '#0f172a',
          },
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
        "pulse-slow": {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 0.4 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
              color: '#6366f1',
              '&:hover': {
                color: '#818cf8',
              },
            },
            code: {
              color: '#f8f8f2',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#0f172a',
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
