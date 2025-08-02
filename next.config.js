/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Next.js 15 optimization
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "localhost",
			},
		],
		formats: ["image/webp", "image/avif"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	experimental: {
		// Next.js 15 features
		optimizePackageImports: ["recharts", "lucide-react", "framer-motion"],
		scrollRestoration: true,
		webVitalsAttribution: ["CLS", "LCP"],
	},
	// Turbopack configuration (stable in Next.js 15)
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
	// Enhanced compiler optimizations
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
		reactRemoveProperties: process.env.NODE_ENV === "production",
	},
	// Bundle optimization
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			config.resolve.alias = {
				...config.resolve.alias,
				"react/jsx-runtime.js": "preact/compat/jsx-runtime",
			};
		}
		return config;
	},
	// Performance optimizations
	compress: true,
	poweredByHeader: false,
	generateEtags: false,
};

module.exports = nextConfig;
