import { FC } from "react"
import { Link } from 'react-router-dom'
import './guide-post.scss'

export interface IProps {
    left: number,
    top: number,
    width: number,
    height: number,
    content: string
}

const GuidePost: FC<IProps> = (props) => {

    const { left, top, content, width, height } = props

    const style = { left: left + 'vw', top:top + 'vh', width, height }

    return (
        <Link className="link" to="/work"> <div style={style} className="guide-post">
            {content}
        </div></Link>
    )
}

export default GuidePost