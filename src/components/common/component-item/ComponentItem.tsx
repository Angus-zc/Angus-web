import { FC } from 'react'
import { Widget } from '../../../config/componentTypes'
import { Store } from '../../../store/reducers'
import { useSelector } from 'react-redux'
import './component-item.scss'
import { findIndexInComponentList, getComponentList } from '../../../utils'

interface IProps {
    widget: Widget
}

const ComponentItem: FC<IProps> = ({ widget }) => {

    const { label, type } = widget

    const getComponentListInStore = (store: Store) => store.componentList
    const componentList = useSelector(getComponentListInStore)


    const getIndex = () => {
        const index = findIndexInComponentList(
            getComponentList(componentList)
            , type
        )
        return (index + 1).toString()
    }
    const handleDrag = (e: any) => {
        e.dataTransfer?.setData('index', getIndex())
    }

    return (
        <div onDragStart={handleDrag} draggable className="component-item">
            {/* <div className={`icon iconfont ${icon}`}></div> */}
            <div className="text">{label}</div>
        </div>
    )
}

export default ComponentItem