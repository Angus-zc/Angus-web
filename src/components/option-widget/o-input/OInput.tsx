import { FC } from 'react'
import { Input } from 'antd'
import { Options } from '../../../config/options'
import { changeContent } from '../../../store/actionCreater'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../../store/reducers'
import { findMoveComponentIndex, isInStyle,  } from '../../../utils/index'
import './o-input.scss'

interface IProps {
    type: Options
}

const OInput: FC<IProps> = ({ type }) => {

    const dispatch = useDispatch()

    const getStore = (state: Store) => state
    const { currActiveId, componentData } = useSelector<Store, Store>(getStore)

    const thisIndex = findMoveComponentIndex(componentData, currActiveId) as number

    const getCurrValue = (): string => {
        let currValue = ' '
        if (isInStyle(componentData[thisIndex], type)) {
            currValue = componentData[thisIndex]?.style![type]
        } else {
            currValue = componentData[thisIndex][type]
        }
        return currValue
    }
    const currValue = getCurrValue()

    const handleChangeInfo = (e: any) => {
        let value = e.target.value

        if (type !== Options.propValue && type !== Options.linkTo) {
            value = Number.parseInt(e.target.value === '' ? 0 : e.target.value)
        }
        
        const dispatchChange = () => {
            dispatch(changeContent({
                type,
                value,
            }))
        }

        dispatchChange()

    }

    return (
        <div className="o-input">
            <Input value={currValue} onChange={handleChangeInfo}></Input>
        </div>
    )
}

export default OInput