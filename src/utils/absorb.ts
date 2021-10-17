import { Widget } from "../config/componentTypes"
import { Action, ActionTypes } from "../store/actionType"
import { ICurrInfo } from './index'
import { distance } from '../config/constant'

export const adsorb = (
    currInfo: ICurrInfo,
    componentData: Widget[],
    currId: number,
    dispatch: (action: Action) => void
  ) => {
  
    const { offsetLeft, offsetTop, currHeight, currWidth } = currInfo
  
    /*判断当前的位置是否在目标位置的distance之内*/
    const betweenDistance = (curr: number, target: number): boolean => {
      if ((curr >= (target - distance)) && (curr <= (target + distance))) return true
      return false
    }
  
    const getOtherComponent = () => {
  
      const result = [...componentData].filter((item) => {
        return item.id !== currId
      })
  
      return result
    }
  
    const otherComponentData = getOtherComponent()
  
    otherComponentData.forEach((widget: Widget) => {
  
      const left = offsetLeft
      const right = offsetLeft + currWidth
      const top = offsetTop
      const bottom = offsetTop + currHeight
  
  
      /*右边这条边和其他组件左边边的比较*/
      if (betweenDistance(right, widget.style.left)) {
        dispatch({
          type: ActionTypes.changeLeft,
          payload: {
            left: widget.style.left - currWidth,
            id: currId
          }
        })
      }
  
      /*右边这条边和其他组件中间边的比较*/
      if (betweenDistance(right, widget.style.left + widget.style.width / 2)) {
        dispatch({
          type: ActionTypes.changeLeft,
          payload: {
            left: widget.style.left + widget.style.width / 2 - currWidth,
            id: currId
          }
        })
      }
  
      /*右边这条边和其他组件左边边的比较*/
      if (betweenDistance(right, widget.style.left + widget.style.width)) {
        dispatch({
          type: ActionTypes.changeLeft,
          payload: {
            left: widget.style.left + widget.style.width - currWidth,
            id: currId
          }
        })
      }
  
  
      /*左边这条边和其他组件左边边的比较*/
      if (betweenDistance(left, widget.style.left)) {
        dispatch({
          type: ActionTypes.changeLeft,
          payload: {
            left: widget.style.left,
            id: currId
          }
        })
      }
  
      /*左边这条边和其他组件中间边的比较*/
      if (betweenDistance(left, widget.style.left + widget.style.width / 2)) {
        dispatch({
          type: ActionTypes.changeLeft,
          payload: {
            left: widget.style.left + widget.style.width / 2,
            id: currId
          }
        })
      }
  
      /*左边这条边和其他组件右边边的比较*/
      if (betweenDistance(left, widget.style.left + widget.style.width)) {
        dispatch({
          type: ActionTypes.changeLeft,
          payload: {
            left: widget.style.left + widget.style.width,
            id: currId
          }
        })
      }
  
  
  
      /*下面这条边和其他组件上面边的比较*/
      if (betweenDistance(bottom, widget.style.top)) {
        dispatch({
          type: ActionTypes.changeTop,
          payload: {
            top: widget.style.top - currHeight,
            id: currId
          }
        })
      }
  
      /*下面这条边和其他组件中间边的比较*/
      if (betweenDistance(bottom, widget.style.top + widget.style.height / 2)) {
        dispatch({
          type: ActionTypes.changeTop,
          payload: {
            top: widget.style.top + widget.style.height / 2 - currHeight,
            id: currId
          }
        })
      }
  
      /*下面这条边和其他组件中间边的比较*/
      if (betweenDistance(bottom, widget.style.top + widget.style.height)) {
        dispatch({
          type: ActionTypes.changeTop,
          payload: {
            top: widget.style.top + widget.style.height - currHeight,
            id: currId
          }
        })
      }
  
  
      /*上面这条边和其他组件上面边的比较*/
      if (betweenDistance(top, widget.style.top)) {
        dispatch({
          type: ActionTypes.changeTop,
          payload: {
            top: widget.style.top,
            id: currId
          }
        })
      }
  
      /*上面这条边和其他组件中间边的比较*/
      if (betweenDistance(top, widget.style.top + widget.style.height / 2)) {
        dispatch({
          type: ActionTypes.changeTop,
          payload: {
            top: widget.style.top + widget.style.height / 2,
            id: currId
          }
        })
      }
  
      /*上面这条边和其他组件底边边的比较*/
      if (betweenDistance(top, widget.style.top + widget.style.height)) {
        dispatch({
          type: ActionTypes.changeTop,
          payload: {
            top: widget.style.top + widget.style.height,
            id: currId
          }
        })
      }
  
    })
  }