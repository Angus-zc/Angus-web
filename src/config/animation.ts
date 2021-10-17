
type IAnimationConfig = Array<{
    label: string, 
    children: Array<{
        label: string,
        value: string
    }>
}>


// 如果要触发动画类名里面还要加上这个  animate__animated 

const animationConfig: IAnimationConfig = [
    {
        label: '强调',
        children:[
            {label: '反弹', value: 'animate__bounce'},
            {label: '闪光', value: 'animate__flash'},
            {label: '橡皮', value: 'animate__rubberBand'},
            {label: 'X摇动', value: 'animate__shakeX'},
            {label: 'Y摇动', value: 'animate__shakeY'},
            {label: '摇晃', value: 'animate__swing'},
            {label: '摇动', value: 'animate__wobble'},
            {label: '心跳', value: 'animate__heartBeat'},
        ]
    },
    {
        label: '进入',
        children:[
            {label: '上入', value: 'animate__backInDown'},
            {label: '左入', value: 'animate__backInLeft'},
            {label: '右入', value: 'animate__backInRight'},
            {label: '下入', value: 'animate__backInUp'},
            {label: '中入', value: 'animate__bounceIn'},
        ]
    },
    {
        label: '退出',
        children:[
            {label: '下出', value: 'animate__backOutDown'},
            {label: '左出', value: 'animate__backOutLeft'},
            {label: '右出', value: 'animate__backOutRight'},
            {label: '上出', value: 'animate__backOutUp'},
            {label: '中出', value: 'animate__bounceOut'},
        ]
    },
]
export default animationConfig