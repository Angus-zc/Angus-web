import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Widget } from '../../../config/componentTypes'
import { Store } from '../../../store/reducers'

export interface IBaseProps {
    widget: Widget
}
interface IProps extends IBaseProps { }

const BaseComponent: FC<IProps> = (props) => {

    const { widget } = props
    
    const getWidgetCenter = (store: Store) => store.widgetCenter
    const widgetCenter = useSelector(getWidgetCenter)
    
    const findWidget = (widgetCenter: Array<
        {
            component: any,
            config: Widget
        }>, type: string) => {
        return widgetCenter.find((w) => {
            return w.config.type === type
        })
    }

    const component = findWidget(widgetCenter, widget.type)
    
    if(component){
        const Component = component.component
        return <Component config={widget}/>
    }else{
        return null
    }

}

export default BaseComponent