import { FC, useState } from 'react'
import { Button, message } from 'antd'
import animationConfig from '../../../config/animation'
import { useDispatch } from 'react-redux'
import { addAnimation, clearAnimation } from '../../../store/actionCreater'
import './animation-container.scss'

const AnimationContainer: FC = () => {
    const dispatch = useDispatch()

    const showSuccess = (msg: string) => {
        message.success(msg)
    }
    const showError = (msg: string) => {
        message.error(msg)
    }

    const [currAnimate, setCurrAnimate] = useState<string>('')

    const handleMouseEnter = (animationName: any) => {
        return () => {
            setCurrAnimate(animationName)
        }
    }

    const handleMouseLeave = () => {
        return () => {
            setCurrAnimate('')
        }
    }

    const handleSelectorClick = (animationName: string, label: string) => {
        try {
            dispatch(addAnimation(animationName))
            showSuccess(label)
        } catch (err) {
            showError(err as string)
        }
    }

    const hoverClass = (animationName: string) =>
        animationName === currAnimate ?
            (`${animationName}  animate__animated`) : ''


    const handleClear = () => {
        try {
            dispatch(clearAnimation())
            showSuccess('清除成功！')
        } catch (err) {
            showError(err as string)
        }
        
    }

    return (
        <div className="animation-container">
            <h4>● 操作</h4>
            <Button onClick={handleClear} className="option-button">清除动画</Button>
            {
                animationConfig.map((item) => {
                    return (
                        <div key={item.label} className="item">
                            <h4>● {item.label}</h4>
                            <div className="container">
                                {
                                    item.children.map((animation) => {
                                        const value = animation.value
                                        const label = animation.label
                                        return <Button
                                            key={label}
                                            className="button"
                                            onMouseEnter={handleMouseEnter(value)}
                                            onMouseLeave={handleMouseLeave()}
                                            onClick={() => handleSelectorClick(value, label)}
                                        >
                                            <span className={hoverClass(value)}>{label}</span>
                                        </Button>
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AnimationContainer