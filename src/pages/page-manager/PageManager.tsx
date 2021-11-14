import { FC, useEffect, useState } from 'react'
import { Table, Button, Input, Spin } from 'antd'
import { addPage, deleteJSON, delPage, generateJSON, getPages, publishProject } from '../../api'
import { useDispatch, } from 'react-redux'
import { Key, Widget } from '../../config/componentTypes'
import { findPageIndex, showError, showSuccess, storage } from '../../utils'
import { Link } from 'react-router-dom'
import { savePages, switchComponentData } from '../../store/actionCreater'
import AModal from '../../components/common/modal/AModal'
import {  ArrowLeftOutlined } from '@ant-design/icons';
import './page-manager.scss'
import { app, logintcb } from '../../utils/init-js-sdk'

export enum PageType {
    pageUrl = "pageUrl",
    description = "description",
    pageName = "pageName"
}

type Columns = Array<{
    title: string,
    dataIndex: string,
    key: string,
    render?: (...arg: any[]) => JSX.Element
}>

export interface PageItem {
    key?: Key,
    id?: string,
    pageUrl: string,
    pageName: string,
    description: string,
    componentData: Widget[]
}
const PageManager: FC = () => {

    const dispatch = useDispatch()
    const token = storage.get('token')

    const { TextArea } = Input

    const [tableData, setTableData] = useState<Array<PageItem>>([])
    useEffect(() => {

        const widthKey = (pages: Array<PageItem>) => {
            pages.forEach((page, index) => {
                page.key = index
            })
        }

        getPages().then(res => {
            const pages = res.data.data.pages as Array<PageItem>
            widthKey(pages)
            setTableData(pages)
            dispatch(savePages(pages))
        })
    }, [token, dispatch])

    const handleEditPage = (record: PageItem) => () => {
        const pageId = record.id as string
        storage.set('pageId', pageId)
        const componentData = record.componentData
        dispatch(switchComponentData(componentData))
    }

    const handleDelPage = (record: PageItem) => async () => {
        const pageId = record.id as string
        const result = await delPage(pageId)
        const message = result.data.message
        if (result.data.status === 200) {
            setTableData(pages => {
                const index = findPageIndex(pages, pageId)
                const newPages = [...pages]
                newPages.splice(index, 1)
                return newPages
            })
            showSuccess(message)
        } else {
            showError(message)
        }
    }

    const handleGererateJSON = async (record: PageItem) => {
        setLoading(true)
        const id = record.id as string
        const result = await generateJSON(id)
        const message = result.data.message
        //@ts-ignore
        const fileID = result.data.fileID
        if (result.data.status !== 200) {
            setLoading(false)
            return showError(message)
        } else {
            await logintcb()
            await app.downloadFile({
                fileID
            })
            showSuccess(message)
            setLoading(false)
            deleteJSON(fileID)
        }
    }

    const columns: Columns = [

        {
            title: '页面名称',
            dataIndex: 'pageName',
            key: 'age',
        },
        {
            title: '页面路径',
            dataIndex: 'pageUrl',
            key: 'name',
        },
        {
            title: '页面描述',
            dataIndex: "description",
            key: 'address',
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render(_, record: PageItem) {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}>
                        <Link to="/work">
                            <Button
                                onClick={handleEditPage(record)}
                                className="actions "
                            >编辑</Button>
                        </Link>
                        <Button
                            onClick={handleDelPage(record)}
                            className="actions"
                        >删除</Button>
                        <Button
                            onClick={() => handleGererateJSON(record)}
                            className="actions"
                        >生成JSON</Button>
                    </div>
                )
            }
        },
    ];

    const handleAddPage = () => {
        showModal()
    }

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = async () => {
        const result = await addPage(pageInfo)

        if (result.data.status === 200) {
            //@ts-ignore
            const id = result.data.page.id
            setTableData(pages => {
                const page = { ...pageInfo, key: pages.length, id }
                return [...pages, page]
            })
            showSuccess(result.data.message)
        } else {
            showError(result.data.message)
        }
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [pageInfo, setPageInfo] = useState<PageItem>({
        pageUrl: '',
        description: '',
        pageName: '',
        componentData: []
    })

    const handleInputChange = (type: PageType) => (e: any) => {
        const value = e.target.value
        setPageInfo((pageInfo) => {
            const info = pageInfo
            info[type] = value
            return info
        })
    }

    const [loading, setLoading] = useState<boolean>(false)

    const handlePulbish = async () => {
        setLoading(true)
        const result = await publishProject()
        const message = result.data.message

        if (result.data.status === 200) {
            setLoading(false)
            showSuccess(message)
        } else {
            setLoading(false)
            showError(message)
        }
    }

    return (
        <Spin size="large" spinning={loading}>
            <div className="page-manager">
                <div className="header">
                    <Link to='/home'>
                        <Button
                            className='back'
                            icon={<ArrowLeftOutlined />}
                        ></Button>
                    </Link>
                </div>
                <Table
                    className="table"
                    pagination={false}
                    columns={columns}
                    dataSource={tableData}
                />
                <div className="options">
                    <div onClick={handleAddPage} className="add-pages">
                        添加页面
                    </div>
                    <div onClick={handlePulbish} className="publish">
                        一键部署
                    </div>
                </div>

                <AModal
                    title="输入页面信息"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Input
                        onChange={handleInputChange(PageType.pageName)}
                        style={{
                            marginBottom: 10
                        }} placeholder="请输入页面名称" />
                    <Input
                        onChange={handleInputChange(PageType.pageUrl)}
                        style={{
                            marginBottom: 10
                        }} placeholder="请输入页面路径" />
                    <TextArea
                        onChange={handleInputChange(PageType.description)}
                        rows={4} placeholder="请输入页面描述" />
                </AModal>
            </div>
        </Spin>
    )
}

export default PageManager