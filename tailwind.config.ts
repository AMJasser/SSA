import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#006C35",
                    secondary: "#5A884F",
                    accent: "#B3A369",
                    neutral: "#003057",
                    "base-100": "FFFFFF",
                    info: "#3abff8",
                    success: "#36d399",
                    warning: "#fbbd23",
                    error: "#f87272"
                }
            }
        ]
    },
    plugins: [require("daisyui")]
};
export default config;
