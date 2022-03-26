import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// параметры для svelte.compile (https://svelte.dev/docs#svelte_compile)
	compilerOptions: {},

	// массив расширений, которые будут считаться компонентами Svelte
	extensions: ['.svelte'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({})],

	kit: {
		adapter: adapter(),
		amp: false,
		appDir: '_app',
		browser: {
			hydrate: true,
			router: true
		},
		csp: {
			mode: 'auto',
			directives: {
				'default-src': undefined
				// ...
			}
		},
		files: {
			assets: 'static',
			lib: 'src/lib',
			routes: 'src/routes',
			template: 'src/app.html'
		},
		floc: false,
		inlineStyleThreshold: 0,
		methodOverride: {
			parameter: '_method',
			allowed: []
		},
		package: {
			dir: 'package',
			// кроме файлов .d.ts и начинающихся с нижнего подчеркивания
			exports: (filepath) => !/^_|\/_|\.d\.ts$/.test(filepath),
			files: () => true,
			emitTypes: true
		},
		paths: {
			assets: '',
			base: ''
		},
		prerender: {
			concurrency: 1,
			crawl: true,
			enabled: true,
			entries: ['*'],
			onError: 'fail'
		},
		routes: (filepath) => !/(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/.test(filepath),
		serviceWorker: {
			register: true,
			files: (filepath) => !/\.DS_Store/.test(filepath)
		},
		trailingSlash: 'never',
		version: {
			name: Date.now().toString(),
			pollInterval: 0
		},
		vite: () => ({
			resolve: {
				alias: {
					'@components': path.resolve('./src/components'),
					$types: path.resolve('./src/types'),
					$lib: path.resolve('./src/lib')
				}
			}
		})
	}
};

export default config;
