import { Key, Widget } from '../config/componentTypes'
import { positionConfig } from '../config/editor'
import { Action } from '../store/actionType'
import { addEvent, setShapshotActioin } from '../store/actionCreater'
import { eventList, EventTypes } from '../config/events'
import { message } from 'antd'
import { PageItem } from '../pages/page-manager/PageManager'
import { IWidget } from '../pages/work-place/components/component-list/ComponentList'

/*本地存储*/
export const storage = {
  get(key: string) {
    try {
      const item = localStorage.getItem(key)
      return item && JSON.parse(item)
    } catch (e) {
      return localStorage.getItem(key)
    }
  },
  set(key: string, val: string | number | Record<any, any>) {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    } else if (typeof val === 'number') {
      val = val + ""
    }
    return localStorage.setItem(key, val)
  },
  clear() {
    return localStorage.clear()
  }
}

/*判断是否登录*/
export const isLogin = (): boolean => {
  return storage.get('token') !== null
}

/*找到componentData中的image配置*/
export function findImageConfigIndex(componentList: Widget[], id: number): number {
  return componentList.findIndex((widget) => {
    return widget.id === id
  })
}

export const findMoveComponentIndex = (componentList: Widget[], id: number) => {
  return componentList.findIndex((widget) => {
    return widget?.id === id
  })
}

export const getPosition = (componentData: Widget[], id: number): {
  currLeft: number,
  currTop: number,
  currHeight: number,
  currWidth: number
} => {
  const index = findMoveComponentIndex(componentData, id)

  const currLeft = componentData[index]?.style!.left
  const currTop = componentData[index]?.style!.top

  const currWidth = componentData[index]?.style!.width
  const currHeight = componentData[index]?.style!.height
  return {
    currLeft,
    currTop,
    currHeight,
    currWidth
  }
}

export const throttle = (fn: (...arg: Array<any>) => any) => {
  let run = true

  return function () {
    if (!run) return
    run = false
    window.requestAnimationFrame(() => {
      //@ts-ignore
      fn.apply(this, arguments)
      run = true
    })
  }
}

export const debounce = (
  fn: (...arg: Array<any>) => any,
  interval = 500
) => {
  let timer: any

  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, arguments)
    }, interval);
  }
}

export function getChangeArr<
  T extends string = string
>(str: T): Array<string
> {
  return str.split(' ')
}

export const mapChnageProperies = (
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

/*这个属性在style里面就返回true，否则返回false*/
export const isInStyle = (thisConfig: Widget, properity: string) => {

  const thisArr = thisConfig ? Reflect.ownKeys(thisConfig) : []

  const result = thisArr.findIndex((item) => {
    return item === properity
  })

  return result === -1
}


export interface IShouldShowLineResult {
  Yleft: boolean,
  Ycenter: boolean,
  Yright: boolean,
  Xtop: boolean,
  Xcenter: boolean,
  Xbottom: boolean
}

export interface ICurrInfo {
  offsetLeft: number,
  offsetTop: number,
  currHeight: number,
  currWidth: number
}

export const setSnapshot = (dispatch: (action: Action) => void) => {
  dispatch(setShapshotActioin())
}

export const dispatchEvent = (
  type: EventTypes,
  dispatch: (action: Action) => void,
  key: Key,
  params: any
) => {
  switch (type) {
    case EventTypes.message:
      dispatch(addEvent({
        key,
        params
      }))
      break;

    case EventTypes.redirect:
      dispatch(addEvent({
        key,
        params
      }))
      break;

    default:
      break;
  }
}

export const getClassList = (animationList: string[]) => {
  const classNameStr = animationList.join(' ')
  return classNameStr
}

export const showSuccess = (msg: string) => {
  message.success(msg)
}

export const showError = (msg: string) => {
  message.error(msg)
}

export const findPageIndex = (pages: PageItem[], id: string) => {
  return pages.findIndex((page) => {
    return page.id === id
  })
}

export const getComponentList = (
  components: Array<IWidget>
): Array<Widget> => {
  return components.map(c => {
    const widget = { ...c.props }
    widget.event = eventList
    widget.animation = []
    return widget
  })
}

export const findIndexInComponentList = (
  componentList: Array<Widget>,
  type: string
) => {
  return componentList.findIndex((w) => {
    return w.type === type
  })
}