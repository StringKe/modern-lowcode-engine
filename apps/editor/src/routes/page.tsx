import { initEditor } from '@/editor'
import React from 'react'

const Index = () => {
    const ref = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        initEditor(ref.current!).then(() => {
            console.log('editor init success')
        }).catch(() => {
            console.log('editor init failed')
        })
    }, [])
    return <div ref={ref} id={'lce-container'} />
}

export default Index
