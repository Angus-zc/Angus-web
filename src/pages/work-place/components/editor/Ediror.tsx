import { FC, useEffect, useRef, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BaseComponent from '../../../../components/common/base-component/BaseComponent'
import { Store } from '../../../../store/reducers'
import { addComponentData, moveComponent, cancelPointerFocus, showMenu, changeGroup, switchComponentData } from '../../../../store/actionCreater'
import { Widget } from '../../../../config/componentTypes'
import Shape, { IProps } from '../../../../components/common/shape/Shape'
import { MenuType } from '../../../../store/actionType'
import { getComponentList, setSnapshot, throttle } from '../../../../utils/index'
import { closeGroup, getInGroupWidget, getMiniArea, } from '../../../../utils/group'
import Group from '../../../../components/common/group/Group'
import { getComponentData } from '../../../../api'
import './editor.scss'


const Editor: FC<{}> = () => {

    const getState = (state: Store) => state
    const {
        componentData,
        componentList,
        editorSize,
        group,
    } = useSelector<Store, Store>(getState)

    const getIndex = (e: any): number => parseInt(e.dataTransfer?.getData('index'))
    const getWidget = (list: Widget[], index: number): Widget => list[index]

    const dispatch = useDispatch()
    const editorRef = useRef<null | HTMLDivElement>(null)
    const editor = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        getComponentData().then(res => {
            const componentData = res.data.data
            dispatch(switchComponentData(componentData))
        })
    }, [dispatch])

    const getStartPosition = (e: any): { startLeft: number, startTop: number } => {

        const editorWrap = document.getElementById('editorRef')
        const header = document.getElementById('workHeader')

        const startLeft = e.clientX
            - editorWrap!.offsetLeft
            + editorWrap!.offsetWidth / 2
            + editorWrap!.scrollLeft

        const startTop = e.clientY
            - editorWrap!.offsetTop
            + editorWrap!.offsetHeight / 2
            - header!.offsetHeight
            + editorWrap!.scrollTop

        return {
            startLeft,
            startTop
        }
    }


    const handleDrop = (e: any) => {
        e.stopPropagation()
        e.preventDefault()

        const index = getIndex(e)

        const widget = { ...getWidget(getComponentList(componentList), index - 1) }

        widget.id = componentData.length
        widget.zIndex = 1

        dispatch(addComponentData<Widget>(widget))

        const { startLeft, startTop } = getStartPosition(e)

        dispatch(moveComponent({
            moveId: componentData.length,
            left: startLeft,
            top: startTop
        }))

        changeBorderColorToBlack()

        setSnapshot(dispatch)
    }

    const changeBorderColorToBlue = () => {
        editorRef.current!.style.border = 'blue solid 1px'
    }
    const changeBorderColorToBlack = () => {
        editorRef.current!.style.border = 'none'
    }

    const handleDragOver = (e: any) => {
        e.preventDefault()
        changeBorderColorToBlue()
    }


    const editorWidth = editor.current?.clientWidth as number
    const editorHeight = editor.current?.clientHeight as number

    const handleGroup = (e: any) => {

        /*先判断是否需要关闭group组件*/
        const isClear = closeGroup(e, dispatch, group)

        if (isClear) {
            const { startLeft, startTop } = getStartPosition(e)

            const Xstart = e.clientX
            const Ystart = e.clientY

            dispatch(changeGroup([
                { type: 'left', value: startLeft },
                { type: 'top', value: startTop },
                { type: 'borderWidth', value: 1 }
            ]))

            /*将group组件的状态设置为不选中*/
            dispatch(changeGroup([
                { type: 'isActive', value: 0 }
            ]))

            const move = throttle((e: any) => {

                const Xcurr = e.clientX
                const Ycurr = e.clientY

                const width = Xcurr - Xstart
                const height = Ycurr - Ystart

                dispatch(changeGroup([
                    { type: 'width', value: width },
                    { type: 'height', value: height },
                    { type: 'borderWidth', value: 1 }
                ]))
            })

            const up = (e: any) => {
                const Xcurr = e.clientX
                const Ycurr = e.clientY

                const width = Xcurr - Xstart
                const height = Ycurr - Ystart

                const widgets = getInGroupWidget(componentData, {
                    left: startLeft,
                    top: startTop,
                    width: width,
                    height: height,
                    borderWidth: 1
                })


                const { miniButtom, miniLeft, miniRight, miniTop } = getMiniArea(widgets)

                dispatch(changeGroup([
                    { type: 'left', value: miniLeft },
                    { type: 'top', value: miniTop },
                    { type: 'width', value: miniRight - miniLeft },
                    { type: 'height', value: miniButtom - miniTop },
                ]))
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }

            const addEvent = () => {
                document.addEventListener('mousemove', move)
                document.addEventListener('mouseup', up)
            }
            /*绑定事件*/
            addEvent()
        }

        /*隐藏菜单*/
        dispatch(showMenu({ left: 0, top: 0, menuType: MenuType.noMenu }))
        dispatch(cancelPointerFocus())
    }

    const handleShowMenu = (e: any) => {
        e.preventDefault()
        const isEditor = e.target.className === 'editor'
        const left = e.clientX
        const top = e.clientY

        if (isEditor) {
            const showEditorMenu = () => {
                dispatch(showMenu({ left, top, menuType: MenuType.editor }))
            }
            showEditorMenu()
        } else {
            const showWidgetMenu = () => {
                dispatch(showMenu({ left, top, menuType: MenuType.widget }))
            }
            showWidgetMenu()
        }
    }

    return (
        <div id='editorRef' ref={editorRef} className="editor-wrap">
            <div
                id="editor"
                ref={editor}
                onContextMenu={handleShowMenu}
                onMouseDown={handleGroup}
                onDragOver={handleDragOver}
                onDrop={handleDrop} className="editor"
                style={editorSize}
            >
                <Group />
                {
                    componentData.map((widget, index) => {
                        const config: IProps = {
                            editorWidth,
                            editorHeight,
                            id: widget.id,
                            editorRef
                        }
                        return (<Shape {...config} key={index}>
                            <BaseComponent widget={widget} />
                        </Shape>)
                    })
                }
            </div>
        </div>
    )
}

export default Editor