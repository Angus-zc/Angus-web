import { FC, useCallback, useMemo, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../../store/reducers'
import {
    throttle,
    getPosition,
    mapChnageProperies,
    IShouldShowLineResult,
    findMoveComponentIndex,
    setSnapshot
} from '../../../utils/index'
import { adsorb } from '../../../utils/absorb'
import { shouldShowLine } from '../../../utils/markLine'
import { moveComponent,
     changeAcitveComponent
     , scaleComponentAction,
      showMenu } from '../../../store/actionCreater'
import { positionConfig } from '../../../config/editor'
import { produce } from 'immer'
import { MenuType } from '../../../store/actionType'
import './shape.scss'


export interface IProps {
    id: number,
    editorWidth: number,
    editorHeight: number,
    editorRef: any
}

enum ActionTypes {
    changeShowLine = 'CHANGE_SHOW_LINE',
    clearLine = "CLEAR_LINE"
}

interface Action<T = any> {
    type: ActionTypes,
    payload?: T
}

const initMarkLineStore = {
    Yleft: false,
    Ycenter: false,
    Yright: false,
    Xtop: false,
    Xcenter: false,
    Xbottom: false
}

const reducer = produce((
    state: IShouldShowLineResult,
    action: Action<{ type: keyof IShouldShowLineResult, value: boolean }>
) => {
    const { type, payload } = action

    switch (type) {
        case ActionTypes.changeShowLine:
            //@ts-ignore
            state[payload.type] = payload.value
            break;
        case ActionTypes.clearLine:
            Reflect.ownKeys(state).forEach((item) => {
                //@ts-ignore
                state[item] = false
            })
            break;

        default:
            break;
    }
})


const Shape: FC<IProps> = (props) => {

    const { editorHeight, editorWidth, id } = props
    const dispatch = useDispatch()

    const getStore = (state: Store) => state
    const store = useSelector(getStore)
    const { currActiveId, componentData } = store
    const isActive = useMemo<string>(() =>
        currActiveId === id ? 'pointer' : '',
        [id, currActiveId])

    const widgetIndex = findMoveComponentIndex(componentData, id)
    const getStyle = (state: Store) => state.componentData[widgetIndex]?.style
    const { left, top, width, height } = useSelector(getStyle)

    /*改变当前聚焦的组件*/
    const changeActive = (id: number) => dispatch(changeAcitveComponent(id))

    const defaultStyle = {
        left,
        top,
    }

    const shapeRef = useRef<null | HTMLDivElement>(null)

    const [markLineStore, markLineDispatch] = useReducer(reducer, initMarkLineStore)

    const showMarkLine = (info: IShouldShowLineResult) => {
        Reflect.ownKeys(info).forEach((item: any) => {
            markLineDispatch({
                type: ActionTypes.changeShowLine,
                //@ts-ignore
                payload: { type: item, value: info[item] }
            })
        })
    }

    const moveComponentHanderFactory = (id: number) => {
        return (e: any) => {
            e.stopPropagation()
            changeActive(id)

            // 取消显示的菜单
            dispatch(showMenu({ left: 0, top: 0, menuType: MenuType.noMenu }))

            const startX = e.clientX
            const startY = e.clientY


            const move = throttle((e: any) => {

                const currX = e.clientX
                const currY = e.clientY

                const { currLeft, currTop, currHeight, currWidth } = getPosition(componentData, id)

                let left = currX - startX + currLeft
                let top = currY - startY + currTop

                if (left <= 0) left = 0
                if (top <= 0) top = 0
                if (left >= editorWidth - currWidth) left = editorWidth - currWidth
                if (top >= editorHeight - currHeight) top = editorHeight - currHeight

                /*显示标线的逻辑*/
                // const offsetLeft = shapeRef.current!.offsetLeft as number
                // const offsetTop = shapeRef.current!.offsetTop as number

                dispatch(moveComponent({
                    moveId: id,
                    left,
                    top
                }))

                /*吸附的逻辑*/
                adsorb({ currHeight, offsetLeft: left, offsetTop: top, currWidth }, componentData, id, dispatch)
                /*显示基线的逻辑*/
                const showInfo = shouldShowLine({ currHeight, offsetLeft: left, offsetTop: top, currWidth }, componentData, id)
                showMarkLine(showInfo)
            })

            const up = () => {
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
                markLineDispatch({
                    type: ActionTypes.clearLine,
                })
                setSnapshot(dispatch)
            }

            const addEvent = () => {
                document.addEventListener('mousemove', move)
                document.addEventListener('mouseup', up)
            }

            addEvent()
        }
    }

    const handleMoveClick = moveComponentHanderFactory(id)

    const scaleComponent = (id: number, type: positionConfig) => {
        return (e: any) => {

            e.stopPropagation()
            const startX = e.clientX
            const startY = e.clientY

            const move = throttle((e: any) => {

                
                const currX = e.clientX
                const currY = e.clientY

                const { currLeft, currTop, currHeight, currWidth } = getPosition(componentData, id)

                const Xchange = currX - startX
                const Ychange = currY - startY
                let [left, top, newHeight, newWidth] = mapChnageProperies(type, Xchange, Ychange, currHeight, currWidth, currLeft, currTop)

                if (left <= 0) left = 0
                if (top <= 0) top = 0
                if (left >= editorWidth - currWidth) left = editorWidth - currWidth
                if (top >= editorHeight - currHeight) top = editorHeight - currHeight


                dispatch(scaleComponentAction({
                    id,
                    top,
                    left,
                    height: newHeight,
                    width: newWidth,
                    type
                }))


            })
            const up = () => {
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
                setSnapshot(dispatch)
            }

            const addEvent = () => {
                document.addEventListener('mousemove', move)
                document.addEventListener('mouseup', up)
            }

            addEvent()
        }
    }

    const maxiWidth = Math.max(editorWidth, editorHeight)

    /*判断是否应该显示这个组件的标线*/
    const isShowMarkLine = useCallback((type: keyof IShouldShowLineResult) => {
        return (currActiveId === id && markLineStore[type] === true) ? 'line' : ''
    }, [id, currActiveId, markLineStore])



    return (

        <div ref={shapeRef} onMouseDown={handleMoveClick} style={defaultStyle} className="shape">

            <div style={{
                left: 0,
                top: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
                height: 2 * maxiWidth,
                position: 'absolute',
                transition: 'all .5s'
            }} className={isShowMarkLine('Yleft')}></div>
            <div style={{
                left: '50%',
                top: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
                height: 2 * maxiWidth,
                position: 'absolute',
                transition: 'all .5s'
            }} className={isShowMarkLine('Ycenter')}></div>
            <div style={{
                left: '100%',
                top: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
                height: 2 * maxiWidth,
                position: 'absolute',
                transition: 'all .5s'
            }} className={isShowMarkLine('Yright')}></div>
            <div style={{
                top: 0,
                left: "50%",
                transform: 'translateY(-50%) translateX(-50%) rotate(90deg)',
                height: 2 * maxiWidth,
                position: 'absolute',
                transition: 'all .5s'
            }} className={isShowMarkLine('Xtop')}></div>
            <div style={{
                top: '50%',
                left: "50%",
                transform: 'translateY(-50%) translateX(-50%) rotate(90deg)',
                height: 2 * maxiWidth,
                position: 'absolute',
                transition: 'all .5s'
            }} className={isShowMarkLine('Xcenter')}></div>
            <div style={{
                top: '100%',
                left: "50%",
                transform: 'translateY(-50%) translateX(-50%) rotate(90deg)',
                height: 2 * maxiWidth,
                position: 'absolute',
                transition: 'all .5s'
            }} className={isShowMarkLine('Xbottom')}></div>

            <div style={{
                left: 0,
                top: height / 2,
                transform: 'translateY(-50%) translateX(-50%)',
            }} id='p1' className={isActive}
                onMouseDown={scaleComponent(id, positionConfig.left)}
            ></div>
            <div style={{
                left: 0,
                top: 0,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p2' className={isActive}
                onMouseDown={scaleComponent(id, positionConfig.leftTop)}
            ></div>
            <div style={{
                left: width / 2,
                top: 0,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p3' className={isActive}
                onMouseDown={scaleComponent(id, positionConfig.top)}
            ></div>
            <div style={{
                left: width,
                top: 0,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p4' className={isActive}
                onMouseDown={scaleComponent(id, positionConfig.rightTop)}
            ></div>
            <div style={{
                left: width,
                top: height / 2,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p5' className={isActive}
                onMouseDown={scaleComponent(id, positionConfig.right)}
            ></div>
            <div style={{
                left: width,
                top: height,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p6' className={isActive}
                onMouseDown={scaleComponent(id, positionConfig.rightBottom)}
            ></div>
            <div style={{
                left: width / 2,
                top: height,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p7' className={isActive}
                onMouseDown={scaleComponent(id, positionConfig.bottom)}
            ></div>
            <div style={{
                left: 0,
                top: height,
                transform: 'translateY(-50%) translateX(-50%)'
            }} id='p8' className={isActive}
                onMouseDown={scaleComponent(id, positionConfig.leftBottom)}
            ></div>

            {props.children}
        </div>
    )
}

export default Shape

