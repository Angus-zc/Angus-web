import { FC } from 'react'
import { Radio } from 'antd'
import { Options } from '../../../config/options';
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../../store/reducers'
import { findMoveComponentIndex } from '../../../utils/index'
import { changeText } from '../../../store/actionCreater'
import './o-textalign-radio.scss'

interface IProps {
    type: Options
}

const OTextAlignRadio: FC<IProps> = () => {
    const dispatch = useDispatch()

    const getStore = (state: Store)=> state
    const {componentData, currActiveId} = useSelector(getStore)

    const index = findMoveComponentIndex(componentData, currActiveId)

    const getTextStyle = (state: Store)=>state.componentData[index]?.style!.textAlign
    const currTextStyle = useSelector(getTextStyle)

    const handleChangeTextStyle = (e: any) => {
        const value = e.target.value
        dispatch(changeText(value))
    }

    return (
        <div className="o-textalign-radio">
            <Radio.Group onChange={handleChangeTextStyle} value={currTextStyle}>
                <Radio value={'left'}>左对齐</Radio>
                <Radio value={'center'}>居中</Radio>
                <Radio value={'right'}>右对齐</Radio>
            </Radio.Group>
        </div>
    )
}

export default OTextAlignRadio