import { FC } from 'react'
import {  Widget } from '../../../config/componentTypes'
import './a-button.scss'

export interface ButtonConfig {
    widget:Widget
}

const AButton: FC<ButtonConfig> = ({ widget }) => {
    const { propValue, style, title } = widget

    return (
        <button title={title} style={style} className="a-button">
            {propValue}
        </button>
    )
}
export default AButton