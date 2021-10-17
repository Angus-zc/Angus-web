import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Button, Input, } from 'antd'
import { cancelOption, changeEditorSize, clearEditor, saveComponentToPages, switchComponentData } from '../../../../store/actionCreater'
import { setSnapshot, showError, showSuccess, storage } from '../../../../utils/index'
import { Store } from '../../../../store/reducers'
import { closeGroup } from '../../../../utils/group'
import { saveData } from '../../../../api'
import { LeftCircleOutlined } from '@ant-design/icons';
import pageSchema from '../../../../utils/pageSchema.json'
import { Widget } from '../../../../config/componentTypes'
import valid from '../../../../utils/schema'
import './header.scss'
import { ONLINE } from '../../../../api/request'

export enum InputType {
    name = "name",
    description = "description",
    author = "author"
}

const Header: FC = (props) => {

    const dispatch = useDispatch()

    const getStore = (state: Store) => state
    const { componentData, group, currPages } = useSelector(getStore)

    const handleClearEditor = (e: any) => {
        dispatch(clearEditor())
        closeGroup(e, dispatch, group)
        setSnapshot(dispatch)
    }

    const handleCancel = () => {
        dispatch(cancelOption())
    }

    const getEditorSize = (state: Store) => state.editorSize
    const { height, width } = useSelector(getEditorSize)

    const handleWidthChange = (e: any) => {
        const width = parseFloat(e.target.value)
        dispatch(changeEditorSize({ width }))
    }

    const handleHeightChange = (e: any) => {
        const height = parseFloat(e.target.value)
        dispatch(changeEditorSize({ height }))
    }

    const handleSave = async () => {
        const pageId = storage.get('pageId')
        const result = await saveData(componentData, pageId)
        const message = result.data.message
        if (result.data.status === 200) {
            showSuccess(message)
        } else {
            showError(message)
        }
    }

    const handleToPreview = () => {
        //@ts-ignore
        props.history.push('/preview')
        const pageId = storage.get('pageId')
        /*找到当前的index*/
        const index = currPages.findIndex((page) => {
            return page.id === pageId
        })
        const url = currPages[index]?.pageUrl
        dispatch(saveComponentToPages({
            componentData: componentData ? componentData : [],
            url
        }))
    }

    const handleUploadJSON = (e: any) => {
        const json = e.target.files[0]

        if (!json.type.includes('application/json')) {
            showError('只能上传JSON格式的文件！')
            return
        }

        const reader = new FileReader()
        reader.readAsText(json)

        const changeComponentData = (componentData: Widget[]) => {
            dispatch(switchComponentData(componentData))
        }

        reader.onload = (res) => {
            const text = res.target?.result as string
            const pageData = JSON.parse(text)
            const { isValid, message } = valid(pageSchema, pageData)
            if (isValid) {
                changeComponentData(pageData)
                showSuccess('导入成功！')
            } else {
                showError(message)
            }
        }
    }

    const userId = storage.get('userId')

    return (
        <div id="workHeader" className="work-header">
            <Link to='/pageManager'>
                <Button
                    className='back'
                    icon={<LeftCircleOutlined />}
                >返回</Button>
            </Link>
            <Button onClick={handleCancel}>撤销</Button>
            <Button onClick={handleToPreview}>预览</Button>
            <Button onClick={handleSave}>保存</Button>
            <Button onClick={handleClearEditor}>清空</Button>
            <Button  >导入JSON <input className='upload-json' onChange={handleUploadJSON} type="file" /></Button>
            <div className="change-editor">页面大小</div>
            <Input onChange={handleWidthChange} defaultValue={width} size='small' />  &nbsp; <span className="sub">x</span>  &nbsp;
            <Input onChange={handleHeightChange} defaultValue={height} size='small' />
            <div className='online_address'><a target='_blank' rel="noopener noreferrer" href={ONLINE + userId}>项目地址</a></div>
        </div>
    )
}

export default withRouter(Header)