import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "soft-white": "#fffdf8",
      },
    },
  },
  plugins: [],
} satisfies Config;
