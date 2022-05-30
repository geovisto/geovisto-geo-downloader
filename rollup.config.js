import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import autoprefixer from 'autoprefixer';
import postcssCopy from 'postcss-copy';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy'


const packageJson = require('./package.json');

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        nodeResolve({ browser: true }),
        typescript({ useTsconfigDeclarationDir: true }),
        babel({
            exclude: [
                'node_modules/**',
                'src/*/*.stories.(js|jsx|ts|tsx)',
            ],
            babelHelpers: 'runtime',
        }),
        commonjs(),
        postcss({
            extract: true,
            plugins: [postcssCopy({ dest: 'dist' }), autoprefixer()],
            minimize: true,
            sourceMap: true,
            modules: false,
            extensions: ['.sass', '.css', '.scss']
        }),
        json({ compact: true }),
        copy({
            targets: [
              { src: ['src/static_downloader/admin_levels.json', 'src/static_downloader/iso3166_countries.json'], dest: 'dist/static_downloader' }]
        })
    ],
    external: id => id.includes('@babel/runtime'),
    onwarn: function (warning, warn) {
        if(warning.code === 'CIRCULAR_DEPENDENCY') {
            if(warning.importer.startsWith("node_modules/d3-transition")) return;
            if(warning.importer.startsWith("node_modules/d3-selection")) return;
            if(warning.importer.startsWith("node_modules/d3-interpolate")) return;
            if(warning.importer.startsWith("node_modules/d3-voronoi")) return;
        } else if(warning.code === 'THIS_IS_UNDEFINED') {
            // turf problems
            return;
        }
        console.log(warning);
        warn(warning);
    }
};
