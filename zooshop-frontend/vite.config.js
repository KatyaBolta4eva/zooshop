import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const isDev = mode !== 'production';

	return {
		plugins: [
			react({
				babel: {
					plugins: isDev ? ['check-prop-types'] : [],
				},
			}),
		],
		server: {
			proxy: {
				'/api': {
					target: 'http://localhost:3000',
					changeOrigin: true,
					secure: false,
					cookieDomainRewrite: 'localhost',
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	};
});
