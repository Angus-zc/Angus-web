import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from "../../../store/reducers"
import { Button, Modal,  } from 'antd'
import { dispatchEvent, findMoveComponentIndex, getComponentList } from '../../../utils'
import EventBaseComponent from '../../common/base-component/EventBaseComponent'
import { IEvent } from '../../../config/events'
import './event-container.scss'

interface IProps {
    widgetId: number
}

const EventContainer: FC<IProps> = ({ widgetId }) => {

    const dispatch = useDispatch()

    const getStore = (state: Store) => state
    const { componentData, componentList } = useSelector(getStore)
    const index = findMoveComponentIndex(componentData, widgetId)
    
    const eventList = getComponentList(componentList)[index].event

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [currEvent, setCurrEvent] = useState<null | IEvent>(null)
    const [params, setParams] = useState<any>()

    const showModal = (event: IEvent) => {
        setCurrEvent(event)
        setIsModalVisible(true)
    }

    const handleOk = () => {
        const key = currEvent!.key
        const type = currEvent!.type
        dispatchEvent(type, dispatch, key, params)
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <div className="event-container">
            {
                eventList.map((event) => {
                    return <div key={event.key}>
                        <Button onClick={() => showModal(event)}>{event.label}</Button>
                    </div>
                })
            }
            {
                currEvent ? <Modal
                    title={currEvent?.label}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelText={'取消'}
                    okText={'确定'}
                >
                    <EventBaseComponent setParams={setParams} type={currEvent!.type} />
                </Modal> : null
            }
        </div>
    )
}

export default EventContainer