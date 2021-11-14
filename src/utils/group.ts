import { positionConfig } from "../config/editor"
import { Group, Widget } from "../config/componentTypes"
import { changeGroup } from "../store/actionCreater"
import { Action } from "../store/actionType"

export const isInGroup = (e: any, group: Group): boolean => {
    const editorWrap = document.getElementById('editorRef')
    const header = document.getElementById('workHeader')

    const startLeft = group.left
        - editorWrap!.scrollLeft
        + editorWrap!.offsetLeft
        - editorWrap!.offsetWidth / 2

    const startTop = group.top
        - editorWrap!.scrollTop
        + editorWrap!.offsetTop
        - editorWrap!.offsetHeight / 2
        + header!.offsetHeight

    const endLeft = startLeft + group.width
    const endTop = startTop + group.height

    const X = e.clientX
    const Y = e.clientY

    const isClear: boolean =
        X >= startLeft &&
        X <= endLeft &&
        Y >= startTop &&
        Y <= endTop

    return !isClear
}

export const closeGroup = (
    e: any,
    dispatch: (actiono: Action) => any,
    group: Group
): boolean => {
    const clear = isInGroup(e, group)

    if (clear) {
        dispatch(changeGroup([
            { type: 'left', value: 0 },
            { type: 'top', value: 0 },
            { type: 'width', value: 0 },
            { type: 'height', value: 0 },
            { type: 'borderWidth', value: 0 }
        ]))
        return true
    }

    return false
}

export const getInGroupWidget = (
    componentData: Widget[],
    group: Group
): Widget[] => {

    const { left, top, width, height } = group

    /*得出在group组件里面的组件数组*/
    const inGroupWidget = componentData.filter((widget) => {
        const flag = widget.style.left >= left
            && widget.style.top >= top
            && widget.style.width + widget.style.left <= left + width
            && widget.style.height + widget.style.top <= top + height
        return flag
    })

    return inGroupWidget
}

export const getMiniArea = (groupWidgets: Widget[]): {
    miniLeft: number,
    miniTop: number,
    miniRight: number,
    miniButtom: number
} => {

    if (groupWidgets.length === 0) return {
        miniButtom: 0,
        miniLeft: 0,
        miniRight: 0,
        miniTop: 0
    }

    let miniLeft = groupWidgets[0]?.style.left,
        miniTop = groupWidgets[0]?.style.top,
        miniRight = miniLeft + groupWidgets[0]?.style.width,
        miniButtom = miniTop + groupWidgets[0]?.style.height

    groupWidgets.forEach((widget) => {

        const widgetLeft = widget.style.left
        const widgetRight = widget.style.left + widget.style.width
        const widgetTop = widget.style.top
        const widgetBottom = widget.style.top + widget.style.height

        if (widgetLeft < miniLeft) {
            miniLeft = widgetLeft
        }
        if (widgetTop < miniTop) {
            miniTop = widgetTop
        }
        if (widgetBottom > miniButtom) {
            miniButtom = widgetBottom
        }
        if (widgetRight > miniRight) {
            miniRight = widgetRight
        }
    })


    return {
        miniLeft,
        miniTop,
        miniRight,
        miniButtom
    }
}

export const mapGroupProperies = (
    type: positionConfig,
    Xchange: number,
    Ychange: number,
    currHeight: number,
    currWidth: number,
    currLeft: number,
    currTop: number
  ) => {
    let left = currLeft, top = currTop, newHeight = currHeight, newWidth = currWidth
  
    const leftTopF = () => {
      left = Xchange + currLeft
      top = Ychange + currTop
      newWidth = -Xchange + currWidth
      newHeight = -Ychange + currHeight
    }
  
    const topF = () => {
      left = currLeft
      top = Ychange + currTop
      newWidth = currWidth
      newHeight = -Ychange + currHeight
    }
  
    const rightTopF = () => {
      left = currLeft
      top = Ychange + currTop
      newWidth = Xchange + currWidth
      newHeight = -Ychange + currHeight
    }
  
    const rightF = () => {
      left = currLeft
      top = currTop
      newWidth = Xchange + currWidth
      newHeight = currHeight
    }
  
    const rightBottomF = () => {
      left = currLeft
      top = currTop
      newWidth = Xchange + currWidth
      newHeight = Ychange + currHeight
    }
  
    const bottomF = () => {
      left = currLeft
      top = currTop
      newWidth = currWidth
      newHeight = Ychange + currHeight
    }
  
    const leftBottomF = () => {
      left = Xchange + currLeft
      top = currTop
      newWidth = -Xchange + currWidth
      newHeight = Ychange + currHeight
    }
  
    const leftF = () => {
      left = Xchange + currLeft
      top = currTop
      newWidth = -Xchange + currWidth
      newHeight = currHeight
    }
  
    switch (type) {
      case positionConfig.leftTop:
        leftTopF()
        break;
      case positionConfig.top:
        topF()
        break;
      case positionConfig.rightTop:
        rightTopF()
        break;
      case positionConfig.right:
        rightF()
        break;
      case positionConfig.rightBottom:
        rightBottomF()
        break;
      case positionConfig.bottom:
        bottomF()
        break;
      case positionConfig.leftBottom:
        leftBottomF()
        break;
      case positionConfig.left:
        leftF()
        break;
      default:
        break;
    }
    return [left, top, newHeight, newWidth]
  }