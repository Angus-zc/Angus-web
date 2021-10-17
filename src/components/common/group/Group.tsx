import { FC, useMemo,  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { positionConfig } from '../../../config/editor'
import { changeGroup, moveComponent, moveGroup, scaleComponentAction } from '../../../store/actionCreater'
import { Store } from '../../../store/reducers'
import { mapChnageProperies, throttle } from '../../../utils'
import { getInGroupWidget, mapGroupProperies } from '../../../utils/group'
import './group.scss'


const Group: FC = () => {

    const dispatch = useDispatch()

    const getStore = (state: Store) => state
    const { group, componentData } = useSelector(getStore)

    const { height, width, isActive } = group

    const handleGroupMove = (e: any) => {
        e.stopPropagation()

        dispatch(changeGroup([
            { type: 'isActive', value: 1 }
        ]))

        const startX = e.clientX
        const startY = e.clientY

        const inGroupWidgets = getInGroupWidget(componentData, group)

        const move = throttle((e: any) => {

            const currX = e.clientX
            const currY = e.clientY

            const { left: currLeft, top: currTop } = group

            const left = currX - startX + currLeft
            const top = currY - startY + currTop

            dispatch(moveGroup({ left, top }))

            inGroupWidgets.forEach((widget) => {
                const left = currX - startX + widget.style.left
                const top = currY - startY + widget.style.top
                dispatch(moveComponent({
                    moveId: widget.id,
                    left,
                    top
                }))
            })
        })

        const up = () => {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
        }

        const addEvent = () => {
            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        }

        addEvent()
    }

    const handleScaleGroup = (type: positionConfig) => {

        return (e: any) => {

            e.stopPropagation()

            const startX = e.clientX
            const startY = e.clientY

            const inGroupWidgets = getInGroupWidget(componentData, group)

            const move = throttle((e: any) => {

                const currX = e.clientX
                const currY = e.clientY

                const { left: currLeft, top: currTop, height: currHeight, width: currWidth } = group
                const Xchange = currX - startX
                const Ychange = currY - startY
                let [left, top, newHeight, newWidth] = mapChnageProperies(type, Xchange, Ychange, currHeight, currWidth, currLeft, currTop)

                dispatch(changeGroup([
                    { type: 'height', value: newHeight },
                    { type: 'top', value: top },
                    { type: 'left', value: left },
                    { type: 'width', value: newWidth },
                ]))


                /*对group组件里面的widget进行收缩*/
                inGroupWidgets.forEach((widget) => {

                    const currHeight = widget.style.height
                    const currWidth = widget.style.width
                    const currLeft = widget.style.left
                    const currTop = widget.style.top
                    const id = widget.id

                    const [left, top, newHeight, newWidth] = mapGroupProperies(
                        type, Xchange, Ychange, currHeight, currWidth, currLeft, currTop
                    )

                    dispatch(scaleComponentAction({
                        type,
                        left,
                        top,
                        id,
                        width: newWidth,
                        height: newHeight   
                    }))
                })
            })
            const up = () => {
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }

            const addEvent = () => {
                document.addEventListener('mousemove', move)
                document.addEventListener('mouseup', up)
            }

            addEvent()
        }
    }

    const className = useMemo(() => isActive === 1 ? 'pointer' : '', [isActive])
    
    return (
        <div onMouseDown={handleGroupMove} style={group} className="group">
            <div style={{
                left: 0,
                top: height / 2,
                transform: 'translateY(-50%) translateX(-50%)',
            }} id='p1' className={className}
                onMouseDown={handleScaleGroup(positionConfig.left)}
            ></div>
            <div style={{
                left: 0,
                top: 0,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p2' className={className}
                onMouseDown={handleScaleGroup(positionConfig.leftTop)}
            ></div>
            <div style={{
                left: width / 2,
                top: 0,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p3' className={className}
                onMouseDown={handleScaleGroup(positionConfig.top)}
            ></div>
            <div style={{
                left: width,
                top: 0,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p4' className={className}
                onMouseDown={handleScaleGroup((positionConfig.rightTop))}
            ></div>
            <div style={{
                left: width,
                top: height / 2,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p5' className={className}
                onMouseDown={handleScaleGroup(positionConfig.right)}
            ></div>
            <div style={{
                left: width,
                top: height,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p6' className={className}
                onMouseDown={handleScaleGroup(positionConfig.rightBottom)}
            ></div>
            <div style={{
                left: width / 2,
                top: height,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p7' className={className}
                onMouseDown={handleScaleGroup(positionConfig.bottom)}
            ></div>
            <div style={{
                left: 0,
                top: height,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p8' className={className}
                onMouseDown={handleScaleGroup(positionConfig.leftBottom)}
            ></div>
        </div>
    )
}

export default Group