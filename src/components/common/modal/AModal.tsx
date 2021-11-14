import { FC } from 'react'
import { Modal } from 'antd'

interface IProps {
    title: string
    visible: boolean
    onOk?: (...arg: any) => void
    onCancel?: (...arg: any) => void
    okText?: string
    cancelText?: string,
    width?: number | string
}

const AModal: FC<IProps> = (props) => {

    const { children,
        title,
        visible,
        onOk,
        onCancel,
        okText,
        cancelText,
        width } = props

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
            width={width ? width : 520}
        >
            {children}
        </Modal>
    )
}
export default AModal