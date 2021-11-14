import { FC } from 'react'
import {  Widget } from '../../../config/componentTypes'
// import { useDispatch } from 'react-redux'
// import { changeTextContent } from '../../../store/actionCreater'
import './a-text.scss'


export interface textConfig {
    widget: Widget
}

const AText: FC<textConfig> = ({ widget }) => {
    // const dispatch = useDispatch()
    const { style, propValue, title } = widget

    // const handleInput = (e: any) => {
    //     const value = e.target.innerText
    //     dispatch(changeTextContent(value))
    // }

    return (
        // contentEditable='true' suppressContentEditableWarning onInput={handleInput} 
        <div
            title={title}
            style={style}
            className="a-text">
            {propValue}
        </div>
    )
}

export default AText