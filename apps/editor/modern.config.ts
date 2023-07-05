import { appTools, defineConfig } from '@modern-js/app-tools'
import { garfishPlugin } from '@modern-js/plugin-garfish'

const needCSSModuleLoader = [['lowcode-plugin-code-editor', 'ErrorBoundary/ErrorBoundary.less']]

function unpkg(name: string, version: string, path: string) {
    const isStyle = path.endsWith('.css')
    const url = `https://unpkg.com/${name}@${version}/${path}`
    return {
        tag: isStyle ? 'link' : 'script',
        attrs: {
            ...(isStyle ? { rel: 'stylesheet', href: url } : {}),
            ...(!isStyle ? { src: url } : {}),
            crossorigin: 'anonymous',
            ['no-entry']: 'true',
        },
    }
}


// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
    server: {
        port: 4001,
    },
    runtime: {
        router: true,
    },
    deploy: {
        microFrontend: true,
    },
    html: {
        inject: 'body',
        tags: [
            {
                tag: 'script',
                attrs: {
                    type: 'garfish-config',
                },
                children: `\n${JSON.stringify(
                    {
                        sandbox: {
                            noEntryScripts: ['ant-design-icons', 'alifd', 'moment', 'lodash', 'alicdn.com'],
                        },
                    },
                    null,
                    4,
                )}\n`,
            },
            {
                'tag': 'link',
                'attrs': {
                    'href': 'https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/variables.css',
                    'rel': 'stylesheet',
                },
            },
            {
                'tag': 'link',
                'attrs': {
                    'href': 'https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/dist/next.var.min.css',
                    'rel': 'stylesheet',
                },
            },
            {
                'tag': 'link',
                'attrs': {
                    'rel': 'stylesheet',
                    'href': 'https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.1.8-beta.6/dist/css/engine-core.css',
                },
            },
            {
                'tag': 'link',
                'attrs': {
                    'rel': 'stylesheet',
                    'href': 'https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.6-beta.28/dist/css/engine-ext.css',
                },
            },
            unpkg('react', '18.2.0', 'umd/react.production.min.js'),
            unpkg('react-dom', '18.2.0', 'umd/react-dom.production.min.js'),
            unpkg('prop-types', '15.8.1', 'prop-types.js'),
            // {
            //     'tag': 'script',
            //     'attrs': {
            //         ['no-entry']: 'true',
            //         'crossorigin': 'anonymous',
            //         'src': 'https://g.alicdn.com/code/lib/react/16.14.0/umd/react.production.min.js',
            //     },
            // },
            // {
            //     'tag': 'script',
            //     'attrs': {
            //         ['no-entry']: 'true',
            //         'crossorigin': 'anonymous',
            //         'src': 'https://g.alicdn.com/code/lib/react-dom/16.14.0/umd/react-dom.production.min.js',
            //     },
            // },
            // {
            //     'tag': 'script',
            //     'attrs': {
            //         ['no-entry']: 'true',
            //         'crossorigin': 'anonymous',
            //         'src': 'https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js',
            //     },
            // },
            {
                'tag': 'script',
                'attrs': {
                    ['no-entry']: 'true',
                    'crossorigin': 'anonymous',
                    'src': 'https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js',
                },
            },
            {
                'tag': 'script',
                'attrs': {
                    ['no-entry']: 'true',
                    'crossorigin': 'anonymous',
                    'src': 'https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js',
                },
            },
            {
                'tag': 'script',
                'attrs': {
                    ['no-entry']: 'true',
                    'crossorigin': 'anonymous',
                    'src': 'https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js',
                },
            },
            {
                'tag': 'script',
                'attrs': {
                    ['no-entry']: 'true',
                    'crossorigin': 'anonymous',
                    'src': 'https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js',
                },
            },
            {
                'tag': 'script',
                'attrs': {
                    ['no-entry']: 'true',
                    'crossorigin': 'anonymous',
                    'src': 'https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.1.8-beta.6/dist/js/engine-core.js',
                },
            },
            {
                'tag': 'script',
                'attrs': {
                    ['no-entry']: 'true',
                    'crossorigin': 'anonymous',
                    'src': 'https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.6-beta.28/dist/js/engine-ext.js',
                },
            },
        ],
    },
    output: {
        cssModules: {
            auto: (resourcePath) => {
                if (/\.module\.\w+$/i.test(resourcePath)) {
                    return true
                }
                return needCSSModuleLoader.some(([pkg, path]) => {
                    return (
                        resourcePath.includes(`node_modules`) &&
                        resourcePath.includes(pkg) &&
                        resourcePath.endsWith(path)
                    )
                })
            },
        },
        disableCssModuleExtension: true,
        disableNodePolyfill: false,
        externals: {
            react: 'var window.React',
            'react-dom': 'var window.ReactDOM',
            'prop-types': 'var window.PropTypes',
            '@alifd/next': 'var window.Next',
            '@alilc/lowcode-engine': 'var window.AliLowCodeEngine',
            '@alilc/lowcode-editor-core': 'var window.AliLowCodeEngine.common.editorCabin',
            '@alilc/lowcode-editor-skeleton': 'var window.AliLowCodeEngine.common.skeletonCabin',
            '@alilc/lowcode-designer': 'var window.AliLowCodeEngine.common.designerCabin',
            '@alilc/lowcode-engine-ext': 'var window.AliLowCodeEngineExt',
            '@ali/lowcode-engine': 'var window.AliLowCodeEngine',
            moment: 'var window.moment',
            lodash: 'var window._',
        },
    },
    plugins: [appTools(), garfishPlugin()],
})
