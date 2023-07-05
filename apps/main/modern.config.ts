import { appTools, defineConfig } from '@modern-js/app-tools'
import { garfishPlugin } from '@modern-js/plugin-garfish'

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
    server: {
        port: 4000,
    },
    runtime: {
        router: true,
        masterApp: {
            apps: [
                {
                    name: 'Editor',
                    entry: 'http://0.0.0.0:4001',
                },
            ],
        },
    },
    plugins: [appTools(), garfishPlugin()],
})
