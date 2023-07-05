import { Loading } from '@alifd/next'
import { injectComponents } from '@alilc/lowcode-plugin-inject'
import ReactRenderer from '@alilc/lowcode-react-renderer'
import { assetBundle, AssetLevel, AssetLoader, buildComponents } from '@alilc/lowcode-utils'
import { isArray, mergeWith } from 'lodash'
import React, { useState } from 'react'
import appHelper from '../../editor/appHelper'
import {
    getPackagesFromLocalStorage,
    getPreviewLocale,
    getProjectSchemaFromLocalStorage,
    setPreviewLocale,
} from '../../editor/services/mockService'

const getScenarioName = function() {
    if (location.search) {
        return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general'
    }
    return 'general'
}

const SamplePreview = () => {
    const [data, setData] = useState({})

    async function init() {
        const scenarioName = getScenarioName()
        const packages = getPackagesFromLocalStorage(scenarioName)
        const projectSchema = getProjectSchemaFromLocalStorage(scenarioName)
        const {
            componentsMap: componentsMapArray,
            componentsTree,
            i18n,
            dataSource: projectDataSource,
        } = projectSchema
        const componentsMap: any = {}
        componentsMapArray.forEach((component: any) => {
            componentsMap[component.componentName] = component
        })
        const pageSchema = componentsTree[0]

        const libraryMap = {}
        const libraryAsset: any[] = []
        packages.forEach(({ package: _package, library, urls, renderUrls }: any) => {
            // @ts-ignore
            libraryMap[_package] = library
            if (renderUrls) {
                libraryAsset.push(renderUrls)
            } else if (urls) {
                libraryAsset.push(urls)
            }
        })

        const vendors = [assetBundle(libraryAsset, AssetLevel.Library)]

        // TODO asset may cause pollution
        const assetLoader = new AssetLoader()
        await assetLoader.load(libraryAsset)
        // @ts-ignore
        const components = await injectComponents(buildComponents(libraryMap, componentsMap) as never)

        setData({
            schema: pageSchema,
            components,
            i18n,
            projectDataSource,
        })
    }

    const { schema, components, i18n = {}, projectDataSource = {} } = data as any

    if (!schema || !components) {
        init()
        return <Loading fullScreen />
    }
    const currentLocale = getPreviewLocale(getScenarioName())

    if (!(window as any).setPreviewLocale) {
        // for demo use only, can use this in console to switch language for i18n test
        // 在控制台 window.setPreviewLocale('en-US') 或 window.setPreviewLocale('zh-CN') 查看切换效果
        (window as any).setPreviewLocale = (locale: string) => setPreviewLocale(getScenarioName(), locale)
    }

    function customizer(objValue: [], srcValue: []) {
        if (isArray(objValue)) {
            return objValue.concat(srcValue || [])
        }
    }

    return (
        <div className="lowcode-plugin-sample-preview">
            <ReactRenderer
                className="lowcode-plugin-sample-preview-content"
                schema={{
                    ...schema,
                    dataSource: mergeWith(schema.dataSource, projectDataSource, customizer),
                }}
                components={components}
                locale={currentLocale}
                messages={i18n}
                appHelper={appHelper}
            />
        </div>
    )
}

export default SamplePreview
