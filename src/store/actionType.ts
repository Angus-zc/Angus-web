export type Action<T = any> = {
    type: string,
    payload?: T
}

export enum ActionTypes {
    addComponentData = 'ADD_COMPONENT_DATA',
    deleteComponentData = 'DELETE_COMPONENT_DATA',
    uploadImage = "UPLOAD_IMAGE",
    moveComponent = "MOVE_COMPONENT",
    changeAcitveComponent = "CHANGE_ACTIVE_COMPONENT",
    scaleComponent = "SCALE_COMPONENT",
    changeContent = 'CHANGE_CONTENT',
    changeBorderStyle = 'CHANGE_BORDER_STYLE',
    changeTextAlign = 'CHANGE_TEXT_ALIGN',
    changeColor = 'CHANGE_COLOR',
    changeTextContent = 'CHANGE_TEXT_CONTENT',
    changeLeft = "CHANGE_LEFT",
    changeTop = 'CHANEG_TOP',
    cancelFocus = "CANCEL_FOCUS",
    showMenu = "SHOW_MENU",
    deleteWidget = 'DELETE_WIDGET',
    toTop = "TO_TOP",
    toBottom = 'TO_BOTTOM',
    copy = "COPY",
    paste = "PASTE",
    clearEditor = "CLEAR_EDITOR",
    setSnapshot = "SET_SPAPSHOT",
    cancel = 'CANCEL',
    changeEditorSize = 'CHANGE_DEITOR_SIZE',
    addEvent = 'ADD_EVENT',
    addAnimation = 'ADD_ANIMATION',
    clearAnimation = "CLEAR_ANIMATION",
    changeGroup = "CHANGE_GROUP",
    moveGroup = "MOVE_GROUP",
    switchCurrComponentData = 'SWITCH_CURR_COMPONENT_DATA',
    savePages = "SAVE_PAGES",
    saveComponentToPages = "SAVE_COMPONENT_TO_PAGES",
    initWidgets = "INIT_WIDGETS",
    initComponentList = 'INIT_COMPONENT_LIST'
}

export enum MenuType{
    editor = 'EDITOR',
    widget = "WIDGET",
    noMenu = "NO_MENU"
} 
