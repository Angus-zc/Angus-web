import { FC } from 'react'
import {  Widget } from '../../../config/componentTypes'
import './a-rectangle.scss'

interface IProps {
    widget: Widget
}

const ARectAngle: FC<IProps> = ({ widget }) => {

    const { style, propValue, title } = widget
    return (
        <div
            title={title}
            style={style}
            className="a-rect-angle">
            {propValue}
        </div>
    )
}

export default ARectAngle