import { FC } from 'react'
import { Options } from '../../../config/options'
import { message } from 'antd'
import './o-input-file.scss'
import { uploadImage } from '../../../store/actionCreater'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../../store/reducers'

interface IProps {
    type: Options
}

const OInputFile: FC<IProps> = () => {
    const dispatch = useDispatch()

    const getActiveId = (state: Store) => state.currActiveId
    const activeId = useSelector(getActiveId)
    const showError = (msg: string) => message.success(msg)

    const handleFileChange = (e: any) => {
        const file = e.target.files[0]
        if (!file.type.includes('image')) {
            showError('只能上传图片')
            return
        }

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = (res) => {
            const url = res.target?.result as string
            dispatch(uploadImage({ url, id: activeId }))
        }
    }

    return (
        <div className="o-input-file">
            选择图片
            <input onChange={handleFileChange} type="file" />
        </div>
    )
}

export default OInputFile