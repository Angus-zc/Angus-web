import { Widget, Group } from '../config/componentTypes'
import { ActionTypes, Action, MenuType } from './actionType'
import { produce } from 'immer'
import { Reducer } from 'redux'
// import componentList from '../config/componentList'
import {
    findImageConfigIndex,
    findMoveComponentIndex,
    getChangeArr,
    isInStyle,
} from '../utils/index'
import { PageItem } from '../pages/page-manager/PageManager'
import { IWidget } from '../pages/work-place/components/component-list/ComponentList'

export type Store = {
    componentData: Widget[],
    componentList: Array<IWidget>,
    currActiveId: number,
    menu: {
        left: number,
        top: number,
        type: MenuType
    },
    shearPlate: null | Widget,
    snapshot: {
        snapshotData: Array<Widget[]>,
        currSnapshot: number,
    },
    editorSize: { width: number, height: number },
    group: Group,
    currPages: Array<PageItem>,
    widgetCenter: Array<{
        component: any,
        config: Widget
    }>
}

const initState: Store = {
    componentData: [],
    componentList: [],
    currActiveId: -1,
    menu: { left: 10, top: 10, type: MenuType.noMenu },
    shearPlate: null,
    snapshot: {
        snapshotData: [[]],
        currSnapshot: 0
    },
    editorSize: { width: 1200, height: 740 },
    group: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        borderWidth: 1,
        isActive: 0
    },
    currPages: [],
    widgetCenter: []
}

export const reducer: Reducer<Store, Action> = produce((state: Store = initState, action: Action) => {

    const { componentData, menu, shearPlate } = state

    switch (action.type) {
        case ActionTypes.addComponentData:
            componentData.push(action.payload)
            break;

        case ActionTypes.uploadImage:
            const index = findImageConfigIndex(componentData, action.payload.id)
            componentData[index].url = action.payload.url
            break;

        case ActionTypes.moveComponent:
            const { left, top, moveId } = action.payload
            const moveIndex = findMoveComponentIndex(componentData, moveId)

            componentData[moveIndex].style.left = left
            componentData[moveIndex].style.top = top
            break;
        case ActionTypes.changeAcitveComponent:
            state.currActiveId = action.payload
            break;

        case ActionTypes.scaleComponent:
            const shapeProperies = getChangeArr(action.payload.type)
            const scaleIndex = findMoveComponentIndex(componentData, action.payload.id)
            shapeProperies.forEach((item) => {
                componentData[scaleIndex].style![item] = action.payload[item]
            })
            break;
        case ActionTypes.changeContent:
            const changeContentIndex = findMoveComponentIndex(componentData, state.currActiveId)
            
            const inStyle = isInStyle(componentData[changeContentIndex], action.payload.type)
            if (inStyle) {
                componentData[changeContentIndex].style![action.payload.type] = action.payload.value
            } else {
                componentData[changeContentIndex][action.payload.type] = action.payload.value
            }
            break;
        case ActionTypes.changeBorderStyle:
            const changeBorderIndex = findMoveComponentIndex(componentData, state.currActiveId)
            componentData[changeBorderIndex].style!.borderStyle = action.payload
            break;
        case ActionTypes.changeTextAlign:
            const changeTextIndex = findMoveComponentIndex(componentData, state.currActiveId)
            componentData[changeTextIndex].style!.textAlign = action.payload
            break;
        case ActionTypes.changeColor:
            const changeColorIndex = findMoveComponentIndex(componentData, state.currActiveId)
            componentData[changeColorIndex].style![action.payload.type] = action.payload.value
            break;
        case ActionTypes.changeTextContent:
            const changeTextContentIndex = findMoveComponentIndex(componentData, state.currActiveId)
            componentData[changeTextContentIndex].propValue = action.payload
            break;
        case ActionTypes.changeLeft:
            const changeLeftIndex = findMoveComponentIndex(componentData, action.payload.id)
            componentData[changeLeftIndex].style.left = action.payload.left
            break;
        case ActionTypes.changeTop:
            const changeTopIndex = findMoveComponentIndex(componentData, action.payload.id)
            componentData[changeTopIndex].style.top = action.payload.top
            break;

        case ActionTypes.cancelFocus:
            state.currActiveId = -1
            break;
        case ActionTypes.showMenu:
            menu.left = action.payload.left
            menu.top = action.payload.top
            menu.type = action.payload.menuType
            break;
        case ActionTypes.deleteWidget:
            const deleteWidgetIndex = findMoveComponentIndex(componentData, state.currActiveId)
            componentData.splice(deleteWidgetIndex, 1)
            break;
        case ActionTypes.toTop:
            const toTopIndex = findMoveComponentIndex(componentData, state.currActiveId)
            componentData.push(componentData[toTopIndex])
            componentData.splice(toTopIndex, 1)
            break;
        case ActionTypes.toBottom:
            const toBottomIndex = findMoveComponentIndex(componentData, state.currActiveId)
            const thisToBottomWidget = componentData[toBottomIndex]
            componentData.splice(toBottomIndex, 1)
            componentData.unshift(thisToBottomWidget)
            break;
        case ActionTypes.copy:
            state.shearPlate = action.payload
            break;
        case ActionTypes.paste:
            if (shearPlate) {
                shearPlate.style.left = action.payload.left
                shearPlate.style.top = action.payload.top
                shearPlate.id = componentData.length
                componentData.push(shearPlate)
            }
            break;
        case ActionTypes.clearEditor:
            state.componentData = []
            break;

        case ActionTypes.setSnapshot:
            const thisSnapshot  = state.componentData
            state.snapshot.snapshotData.push(thisSnapshot)
            state.snapshot.currSnapshot += 1
            break;
        case ActionTypes.cancel:
            if (state.snapshot.currSnapshot > 0) {
                state.componentData = state.snapshot.snapshotData[state.snapshot.currSnapshot - 1]
                state.snapshot.snapshotData.pop()
                state.snapshot.currSnapshot -= 1
            }

            if (state.snapshot.currSnapshot === 0) {
                state.componentData = state.snapshot.snapshotData[0]
            }
            break;
        case ActionTypes.changeEditorSize:
            if (action.payload.width) state.editorSize.width = action.payload.width
            if (action.payload.height) state.editorSize.height = action.payload.height
            break;
        case ActionTypes.addEvent:
            const addEventIndex = findMoveComponentIndex(componentData, state.currActiveId)
            componentData[addEventIndex].event[action.payload.key].params = action.payload.params
            break;
        case ActionTypes.addAnimation:
            const animationName = action.payload
            const addAnimationIndex = findMoveComponentIndex(componentData, state.currActiveId)
            componentData[addAnimationIndex].animation?.push(animationName)
            break;
        case ActionTypes.clearAnimation:
            const clearIndex = findMoveComponentIndex(componentData, state.currActiveId)
            componentData[clearIndex].animation = []
            break;
        case ActionTypes.changeGroup:
            action.payload.forEach((item: { type: keyof Group, value: number }) => {
                state.group[item.type] = item.value
            })
            break;
        case ActionTypes.moveGroup:
            state.group.left = action.payload.left
            state.group.top = action.payload.top
            break;
        case ActionTypes.switchCurrComponentData:
            state.componentData = action.payload
            break;
        case ActionTypes.savePages:
            state.currPages = action.payload
            break;
        case ActionTypes.saveComponentToPages:
            const pageIndex = state.currPages.findIndex((page)=>{
                return page.pageUrl === action.payload.url
            })
            state.currPages[pageIndex].componentData = action.payload.componentData
            break;
        case ActionTypes.initWidgets:
            const initComponents = action.payload
            state.widgetCenter = initComponents
            break;
        
        case ActionTypes.initComponentList:
            state.componentList = action.payload
        break;
        
    }
}, initState)

