import { FC, useMemo, useState } from 'react'
import { animatePrefix } from '../../../config/constant'
import { Widget } from '../../../config/componentTypes'
import { EventTypes } from '../../../config/events'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import './preview-wrap.scss'
import { Store } from '../../../store/reducers'
import { switchComponentData } from '../../../store/actionCreater'

interface IProps {
    widget: Widget
}

const PreviewWrap: FC<IProps> = ({ widget, children }) => {

    const dispatch = useDispatch()

    const getCurrPages = (state: Store)=>state.currPages
    const currPages = useSelector(getCurrPages)

    /*保存事件类型对应的回调函数*/
    const eventPool = {
        [EventTypes.message]: (msg: string) => {
            message.warn(msg)
        },
        [EventTypes.redirect]: (url: string) => {
            if (url.startsWith('/')) {
                const index = currPages.findIndex((page)=>{
                    return page.pageUrl === url
                }) 
                const targetPage = currPages[index]?.componentData
                dispatch(switchComponentData(targetPage))
            } else {
                window.location.href = url
            }
        }
    }

    const { style, event, animation } = widget
    const animations = Array.from(new Set<string>(animation))

    const position = {
        left: style.left,
        top: style.top
    }

    const handleClick = () => {
        event.forEach((e)=>{
            const params = e.params
            if(params) eventPool[e.type](params)
        })
    }
    const defaultClass = useMemo(() => 'preview-wrap'
        + ' '
        + animatePrefix
        + ' '
        + animations[0], [ animations])

    const [currAnimatioin, setCurrAnimation] = useState<string>(defaultClass)
    const [currIndex, setCurrIndex] = useState<number>(1)


    const handleAnimatioinEnd = () => {
        setCurrIndex(i => {
            setCurrAnimation(curr => curr + " " + animations[currIndex])
            return i + 1
        })
    }

    return (
        <div
            onClick={handleClick}
            style={position}
            className={currAnimatioin}
            onAnimationEnd={handleAnimatioinEnd}
        >
            {children}
        </div>
    )
}
export default PreviewWrap