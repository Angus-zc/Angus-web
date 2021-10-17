import { FC } from 'react'
import {  Widget } from '../../../config/componentTypes'
import './a-image.scss'

export interface imageConfig {
   widget: Widget
}

const AImage: FC<imageConfig> = ({ widget }) => {
    const { style, url, title } = widget

    const handleImageDown = (e: any) => {
        e.preventDefault()
    }

    return (
        <div className="a-image">
            <img
                title={title}
                onMouseDown={handleImageDown}
                style={style}
                src={url} alt={title}
            />
        </div>
    )
}

export default AImage