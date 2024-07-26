// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	modules: ["@pinia/nuxt"],
	css: ["~/assets/css/tailwind.css", "animate.css"],
	ssr: false,
	devtools: { enabled: false },
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
