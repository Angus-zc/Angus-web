import { FC, useState } from 'react'
import { ChromePicker } from 'react-color';
import { Button } from 'antd'
import { Options } from '../../../config/options'
import { changeColor } from '../../../store/actionCreater'
import './o-color-selector.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../../store/reducers';
import { findMoveComponentIndex } from '../../../utils';

interface IProps {
    type: Options
}

const OColorSelector: FC<IProps> = ({ type }) => {

    const dispatch = useDispatch()

    const getStore = (state: Store) => state
    const { componentData, currActiveId } = useSelector(getStore)
    const thisIndex = findMoveComponentIndex(componentData, currActiveId)
    const getColor = (state: Store) => state.componentData[thisIndex]?.style[type]
    const currColor = useSelector(getColor)

    const [showColorPicker, setShowColorPicker] = useState<boolean>(false)

    const handleShowChangeColor = () => {
        setShowColorPicker(color => !color)
    }

    const handleChangeColor = (color: any) => {
        dispatch(changeColor({
            type,
            value: color.hex
        }))
    }

    return (
        <div className="o-color-selector">
            <Button onClick={handleShowChangeColor} size='small'>选择颜色</Button>
            {showColorPicker ? <ChromePicker color={currColor} onChange={handleChangeColor} className="color-picker" /> : null}
        </div>
    )
}

export default OColorSelector