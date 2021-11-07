import esbuild = require('esbuild');
import esbuildPnpPlugin = require('@yarnpkg/esbuild-plugin-pnp');

const { pnpPlugin } = esbuildPnpPlugin;

const build = async () => {
    try {
        await esbuild.build({
            entryPoints: ['./source/index.ts'],
            outfile: 'build/card.js',
            bundle: true,
            minify: true,
            platform: 'node',
            target: 'node14',
            sourcemap: false,
            plugins: [pnpPlugin()]
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

build();
