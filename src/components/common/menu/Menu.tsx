import { FC, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuType } from '../../../store/actionType'
import { Store } from '../../../store/reducers'
import { deletewWidget, showMenu, changeAcitveComponent, toTop, toBottom, copyWidget, pasteWidget } from '../../../store/actionCreater'
import './menu.scss'
import { findMoveComponentIndex, setSnapshot } from '../../../utils'

const Menu: FC = () => {

    const dispatch = useDispatch()

    const getMenuInfo = (state: Store) => state.menu
    const { left, top, type } = useSelector(getMenuInfo)

    const isShow = useMemo(() => type !== MenuType.noMenu ? 'menu' : '', [type])


    const closeMenu = () => {
        dispatch(showMenu({ left: 0, top: 0, menuType: MenuType.noMenu }))
    }

    const handleDeleteWidget = () => {
        dispatch(deletewWidget())
        dispatch(changeAcitveComponent(-1))
        closeMenu()
        setSnapshot(dispatch)
    }

    const handleTopClick = () => {
        dispatch(toTop())
        closeMenu()
        setSnapshot(dispatch)
    }

    const handleBottomClick = () => {
        dispatch(toBottom())
        closeMenu()
        setSnapshot(dispatch)
    }


    const getStore = (state: Store) => state
    const { componentData, currActiveId } = useSelector(getStore)
    const currIndex = findMoveComponentIndex(componentData, currActiveId)
    const currWidget = componentData[currIndex]
    const handleCopyClick = () => {
        dispatch(copyWidget(currWidget))
        closeMenu()
    }

    const handlePasteWidget = (e: any) => {
        const editorWrap = document.getElementById('editorRef')
        const header = document.getElementById('workHeader')
        const startLeft = e.clientX - editorWrap!.offsetLeft + editorWrap!.offsetWidth / 2 + editorWrap!.scrollLeft
        const startTop = e.clientY - editorWrap!.offsetTop + editorWrap!.offsetHeight / 2 - header!.offsetHeight + editorWrap!.scrollTop
        dispatch(pasteWidget({ left: startLeft, top: startTop }))
        closeMenu()
    }


    const handleCutClick = () => {
        dispatch(copyWidget(currWidget))
        dispatch(deletewWidget())
        closeMenu()
        setSnapshot(dispatch)
    }

    return (
        <div style={{ left, top }} className={isShow}>
            {
                type === MenuType.noMenu ? '' : (
                    type === MenuType.widget ? (
                        <div className="menu-widget">
                            <div onClick={handleCopyClick} className="item">复制</div>
                            <div onClick={handleCutClick} className="item">剪切</div>
                            <div onClick={handlePasteWidget} className="item">粘贴</div>
                            <div onClick={handleDeleteWidget} className="item">删除</div>
                            <div onClick={handleTopClick} className="item">置顶</div>
                            <div onClick={handleBottomClick} className="item">置底</div>
                        </div>
                    ) : (
                        <div className="menu-editor">
                            <div onClick={handlePasteWidget} className="item">粘贴</div>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Menu