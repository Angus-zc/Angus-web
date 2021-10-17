import { useDispatch } from 'react-redux'
import { FC, useEffect, useState } from 'react'
import ComponentItem from '../../../../components/common/component-item/ComponentItem'
import './component-list.scss'
import request from '../../../../api/request'
import { storage } from '../../../../utils'
import { initComponentList, initWidgets } from '../../../../store/actionCreater'
import { Widget } from '../../../../config/componentTypes'
import { Spin } from 'antd'

export interface IWidget {
    component: string,
    config: string,
    style: string,
    schema: string,
    props: Widget
}

const ComponentList: FC = () => {

    const [loading, setLoading] = useState(false)
    const loadComponent = () => setLoading(true)
    const loadComponentFinish = () => setLoading(false)

    const dispatch = useDispatch()
    const [componentList, setComponentList] = useState<Array<IWidget>>([])

    useEffect(() => {

        loadComponent()

        const token = storage.get('token')
        request.get('/widget/get_widgets',
            { token }
        )
            .then((result) => {

                const components = result.data.components as Array<IWidget>
                setComponentList(components)

                dispatch(initComponentList(components))

                components.forEach(async (item) => {
                    const { component: c, style: s } = item
                    const script = document.createElement('script')
                    const link = document.createElement('link')

                    script.src = c
                    link.href = s
                    link.rel = 'stylesheet'

                    document.body.appendChild(script)
                    document.head.appendChild(link)

                    script.onload = () => {
                        dispatch(initWidgets(window.widgetCenter))
                        loadComponentFinish()
                    }

                })

            })
    }, [dispatch])

    return (
        <div className="component-list">
            <Spin size='large' className="loading" spinning={loading}>
                {
                    componentList.map((widget, index) => {
                        const { props } = widget
                        return (
                            <ComponentItem key={index} widget={props} />
                        )
                    })
                }
            </Spin>
        </div>
    )
}

export default ComponentList