import { FC } from 'react'
import { Radio } from 'antd';
import { Options } from '../../../config/options'
import { useDispatch, useSelector } from 'react-redux';
import { changeBorder } from '../../../store/actionCreater';
import { Store } from '../../../store/reducers'
import { findMoveComponentIndex } from '../../../utils/index'
import './o-border-radio.scss'


interface IProps {
    type: Options
}

const ORadio: FC<IProps> = () => {

    const dispatch = useDispatch()

    const getStore = (state: Store)=> state
    const {componentData, currActiveId} = useSelector(getStore)

    const index = findMoveComponentIndex(componentData, currActiveId)

    const getBorderStyle = (state: Store)=>state.componentData[index]?.style!.borderStyle
    const currBorderStyle = useSelector(getBorderStyle)

    const handleChangeBorderStyle = (e: any) => {
        const value = e.target.value
        dispatch(changeBorder(value))
    }

    return (
        <div className="o-border-radio">
            <Radio.Group value={currBorderStyle} onChange={handleChangeBorderStyle}>
                <Radio value={'solid'}>实线</Radio>
                <Radio value={'dashed'}>虚线</Radio>
            </Radio.Group>
        </div>
    );
}

export default ORadio