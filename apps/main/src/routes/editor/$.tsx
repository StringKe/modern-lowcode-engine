import { useModuleApps } from '@modern-js/plugin-garfish/runtime'

export default function() {
    const { Editor } = useModuleApps()
    return <Editor />
}
