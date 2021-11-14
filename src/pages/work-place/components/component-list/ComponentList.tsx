import { useSelector } from 'react-redux'
import { FC } from 'react'
import ComponentItem from '../../../../components/common/component-item/ComponentItem'
import './component-list.scss'
import { Widget } from '../../../../config/componentTypes'
import { Spin } from 'antd'
import { Store } from '../../../../store/reducers'

export interface IWidget {
    component: string,
    config: string,
    style: string,
    schema: string,
    props: Widget
}

const ComponentList: FC = () => {

    const componentList = useSelector((store: Store) => store.componentList)
    const wingetCenter = useSelector((store: Store) => store.widgetCenter)

    return (
        <div className="component-list">
            <Spin
                size="large"
                spinning={wingetCenter.length > 0 ? false : true}
                className='loading'
            >
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