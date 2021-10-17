import { Action, ActionTypes, MenuType } from './actionType'
import { Group, Key, Widget } from '../config/componentTypes'
import { positionConfig } from '../config/editor'
import { Options } from '../config/options'
import { PageItem } from '../pages/page-manager/PageManager'
import { IWidget } from '../pages/work-place/components/component-list/ComponentList'


export function addComponentData<T = Widget>(payload: T): Action<T> {
    return {
        type: ActionTypes.addComponentData,
        payload: payload
    }
}

export function uploadImage<T = { url: string, id: number }>(payload: T): Action<T> {
    return {
        type: ActionTypes.uploadImage,
        payload: payload
    }
}

export const moveComponent = (payload: {
    moveId: number,
    left: number,
    top: number,
}): Action => {
    return {
        type: ActionTypes.moveComponent,
        payload: payload
    }
}

export const changeAcitveComponent = (payload: number): Action<number> => {
    return {
        type: ActionTypes.changeAcitveComponent,
        payload: payload
    }
}

interface IScaleComponent {
    id: number,
    left: number,
    top: number,
    width: number,
    height: number,
    type: positionConfig
}

export const scaleComponentAction = (
    payload: IScaleComponent):
    Action<IScaleComponent> => {
    return {
        type: ActionTypes.scaleComponent,
        payload: payload
    }
}

export const changeContent = (payload: {
    type: Options,
    value: number,
}): Action => {
    return {
        type: ActionTypes.changeContent,
        payload: payload
    }
}

export const changeBorder = (payload: string): Action<string> => {
    return {
        type: ActionTypes.changeBorderStyle,
        payload: payload
    }
}

export const changeText = (payload: string): Action<string> => {
    return {
        type: ActionTypes.changeTextAlign,
        payload: payload
    }
}

export const changeColor = (payload: {
    type: Options,
    value: string
}): Action<{ type: Options, value: string }> => {
    return {
        type: ActionTypes.changeColor,
        payload: payload
    }
}

export const changeTextContent = (payload: string): Action<string> => {
    return {
        type: ActionTypes.changeTextContent,
        payload: payload
    }
}

export const cancelPointerFocus = (): Action => {
    return {
        type: ActionTypes.cancelFocus
    }
}

export const showMenu = (position: { left: number, top: number, menuType: MenuType }): Action => {
    const { left, top, menuType } = position
    return {
        type: ActionTypes.showMenu,
        payload: {
            left,
            top,
            menuType
        }
    }
}

export const deletewWidget = (): Action => {
    return {
        type: ActionTypes.deleteWidget
    }
}

export const toTop = (): Action => {
    return {
        type: ActionTypes.toTop
    }
}

export const toBottom = (): Action => {
    return {
        type: ActionTypes.toBottom
    }
}

export const copyWidget = (payload: Widget): Action => {
    return {
        type: ActionTypes.copy,
        payload: payload
    }
}

export const pasteWidget = (payload: { left: number, top: number }) => {
    return {
        type: ActionTypes.paste,
        payload: payload
    }
}

export const clearEditor = (): Action => {
    return {
        type: ActionTypes.clearEditor
    }
}

export const setShapshotActioin = (): Action => {
    return {
        type: ActionTypes.setSnapshot
    }
}

export const cancelOption = (): Action => {
    return {
        type: ActionTypes.cancel
    }
}

export const changeEditorSize = (payload: { width?: number, height?: number }): Action => {
    return {
        type: ActionTypes.changeEditorSize,
        payload: payload
    }
}

export const addEvent = (payload: {
    key: Key,
    params: any
}): Action => {
    return {
        type: ActionTypes.addEvent,
        payload: payload
    }
}

export const addAnimation = (payload: string): Action => {
    return {
        type: ActionTypes.addAnimation,
        payload: payload
    }
}

export const clearAnimation = (): Action => {
    return {
        type: ActionTypes.clearAnimation,
    }
}

export const changeGroup = (payload: Array<{
    type: keyof Group,
    value: number
}>): Action => {
    return {
        type: ActionTypes.changeGroup,
        payload: payload
    }
}

export const moveGroup = (payload: {
    left: number,
    top: number
}): Action => {
    return {
        type: ActionTypes.moveGroup,
        payload: payload
    }
}

export const switchComponentData = (componentData: Widget[]) => {
    return {
        type: ActionTypes.switchCurrComponentData,
        payload: componentData
    }
}

export const savePages = (pages: Array<PageItem>): Action => {
    return {
        type: ActionTypes.savePages,
        payload: pages
    }
}

export const saveComponentToPages = (
    payload: {
        componentData: Array<Widget>,
        url: string
    }): Action => {
    return {
        type: ActionTypes.saveComponentToPages,
        payload: payload
    }
}

export const initWidgets = (widgets: Array<{
    component: any,
    config: Widget
}>): Action => {
    return {
        type: ActionTypes.initWidgets,
        payload: widgets
    }
}

export const initComponentList = (
    componentList: Array<IWidget>
): Action => {
    return {
        type: ActionTypes.initComponentList,
        payload: componentList
    }
}