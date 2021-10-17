import {  FC } from "react"
import { EventTypes } from "../../../config/events"
import { Input } from 'antd'

interface IProps {
    type: EventTypes,
    setParams: React.Dispatch<any>
}

const EventBaseComponent: FC<IProps> = ({ type, setParams }) => {

    const handleChangeParams = (e: any) => {
        const value = e.target.value
        setParams(value)
    }

    switch (type) {
        case EventTypes.message:
            return <Input onChange={handleChangeParams} placeholder="请输入提示内容" />

        case EventTypes.redirect:
            return <Input onChange={handleChangeParams} placeholder="请输入URL" />

        default:
            return null
    }
}

export default EventBaseComponent