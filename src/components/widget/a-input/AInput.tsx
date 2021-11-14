import { FC } from 'react'
import {  Widget } from '../../../config/componentTypes'
import './a-input.scss'

interface IProps {
    widget: Widget
}


const AInput: FC<IProps> = ({ widget }) => {

    const { style, placeholder } = widget

    return (
        <input style={style} 
        placeholder={placeholder} 
        className="a-input">
        </input>
    )
}
export default AInput