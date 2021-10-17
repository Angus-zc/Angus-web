import { Widget } from '../config/componentTypes'
import { ICurrInfo, IShouldShowLineResult } from './index'
import { near } from '../config/constant'

export const shouldShowLine = (currInfo: ICurrInfo, componentData: Widget[], currId: number): IShouldShowLineResult => {
  let Yleft = false, Ycenter = false, Yright = false, Xtop = false, Xcenter = false, Xbottom = false

  const { currHeight, offsetLeft, offsetTop, currWidth } = currInfo

  const getOtherComponent = () => {

    const result = [...componentData].filter((item) => {
      return item.id !== currId
    })

    return result
  }

  const otherComponentData = getOtherComponent()


  const isNear = (curr: number, target: number): boolean => {
    if (curr >= target - near && curr <= target + near) {
      return true
    }
    return false
  }

  /*判断是否需要显示左边的标线*/
  const showYLeft = () => {

    otherComponentData.forEach((item: Widget) => {

      const { style = {} as Widget } = item
      /*判断当前是否应该显示标线*/
      const isShow: boolean = isNear(offsetLeft, style.left)
        || isNear(offsetLeft, style.left + style.width / 2)
        || isNear(offsetLeft, style.left + style.width)

      if (isShow) {
        Yleft = true
      }
    })
  }

  const showYcneter = () => {
    otherComponentData.forEach((item: Widget) => {
      const { style } = item
      const center = offsetLeft + currWidth / 2
      const isShow: boolean = isNear(center, style.left)
        || isNear(center, style.left + style.width / 2)
        || isNear(center, style.left + style.width)

      if (isShow) {
        Ycenter = true
      }
    })
  }

  const showYright = () => {
    otherComponentData.forEach((item: Widget) => {
      const { style } = item

      const right = offsetLeft + currWidth
      const isShow: boolean = isNear(right, style.left)
        || isNear(right, style.left + style.width / 2)
        || isNear(right, style.left + style.width)

      if (isShow) {
        Yright = true
      }
    })
  }

  const showXtop = () => {
    otherComponentData.forEach((item: Widget) => {
      const { style } = item

      const top = offsetTop
      const isShow: boolean = isNear(top, style.top)
        || isNear(top, style.top + style.height / 2)
        || isNear(top, style.top + style.height)

      if (isShow) {
        Xtop = true
      }
    })
  }


  const showXcenter = () => {
    otherComponentData.forEach((item: Widget) => {
      const { style } = item

      const center = offsetTop + currHeight / 2
      const isShow: boolean = isNear(center, style.top)
        || isNear(center, style.top + style.height / 2)
        || isNear(center, style.top + style.height)

      if (isShow) {
        Xcenter = true
      }
    })
  }


  const showXbottom = () => {
    otherComponentData.forEach((item: Widget) => {
      const { style } = item

      const bottom = offsetTop + currHeight
      const isShow: boolean = isNear(bottom, style.top)
        || isNear(bottom, style.top + style.height / 2)
        || isNear(bottom, style.top + style.height)

      if (isShow) {
        Xbottom = true
      }
    })
  }



  showYLeft()
  showYcneter()
  showYright()
  showXtop()
  showXcenter()
  showXbottom()

  return { Yleft, Ycenter, Yright, Xtop, Xcenter, Xbottom }
}