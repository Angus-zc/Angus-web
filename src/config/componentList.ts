import { produce } from 'immer'
import { Widget, CommonProperies, CommonStyle } from './componentTypes'
import { eventList } from './events'
import { imageUrl } from './constant'

// export enum WidgetType {
//     AText = 'AText',
//     AImage = "AImage",
//     AButton = "AButton",
//     ARectangle = "ARectAngle",
//     AInput = "AInput",
//     ARound = 'ARound'
// }

/*公共样式*/
export const commonStyle: CommonStyle = {
    rotate: 0,
    opacity: 1
}

/*公共属性*/
export const commonProperies: CommonProperies = {
    animation: [],
    style: {},
    isLock: false
}

/*全局的组件信息的初始值*/
const componentList: Widget[] = [
    {
        id: 1,
        type: "AText",
        label: '文字',
        propValue: '文字',
        icon: 'icon-wenzi',
        title: '',
        event: [],
        style: {
            width: 200,
            height: 43,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 3,
            backgroundColor: '',
            textAlign: 'center',
            color: 'black',
            left: 0,
            top: 0,
        },
    },
    {
        id: 2,
        type: "AButton",
        label: '按钮',
        propValue: '按钮',
        icon: 'icon-anniu',
        event: [],
        title: '',
        style: {
            width: 80,
            height: 40,
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 0,
            textAlign: 'center',
            color: 'black',
            borderWidth: 1,
            borderColor: '',
            backgroundColor: '',
            borderStyle: 'solid',
            left: 0,
            top: 0,
        },
    },
    {
        id: 3,
        type: "ARectangle",
        label: '矩形',
        propValue: '',
        icon: 'icon-juxing',
        event: [],
        title: '',
        style: {
            width: 250,
            height: 130,
            borderRadius: 0,
            fontSize: 14,
            fontWeight: 500,
            borderWidth: 1,
            textAlign: 'left',
            backgroundColor: '',
            borderStyle: 'solid',
            borderColor: '#000F',
            color: 'black',
            left: 0,
            top: 0,
        },
    },
    {
        id: 4,
        type: "AImage",
        label: '图片',
        icon: 'icon-image',
        url: imageUrl,
        event: [],
        title: '',
        style: {
            width: 200,
            height: 150,
            borderWidth: 1,
            borderRadius: 0,
            borderStyle: 'solid',
            borderColor: '#CECECE',
            left: 0,
            top: 0,
        },
    },
    {
        id: 5,
        type: "AInput",
        label: '输入',
        propValue: '',
        icon: 'icon-shurukuang',
        placeholder: '请输入内容',
        event: [],
        title: '',
        style: {
            width: 250,
            height: 40,
            fontSize: 12,
            fontWeight: 500,
            borderWidth: 1,
            borderColor: '#CECECE',
            borderRadius: 1,
            left: 0,
            top: 0,
            paddingLeft: 5,
            outLine: 'none',
        },
    },
    {
        id: 6,
        type: "ARound",
        label: '圆形',
        propValue: '',
        icon: 'icon-shurukuang',
        event: [],
        title: '',
        style: {
            width: 200,
            height: 200,
            fontSize: 12,
            fontWeight: 500,
            borderWidth: 1,
            borderColor: '#CECECE',
            borderRadius: 100,
            borderStyle: 'solid',
            left: 0,
            top: 0,
        },
    },
]

const newList = componentList.map(produce((item) => {

    item.event = eventList
    item.animation = commonProperies.animation
    item.isLock = commonProperies.isLock

    // item.style.opacity = commonStyle.opacity
    // item.style.rotate = commonStyle.rotate

}))

// export default newList