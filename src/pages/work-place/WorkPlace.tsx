import { FC, useEffect } from 'react'
import Header from './components/header/Header'
import ComponentList from './components/component-list/ComponentList'
import Options from './components/options/Options'
import Editor from './components/editor/Ediror'
import Menu from '../../components/common/menu/Menu'
import { Prompt } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getPages } from '../../api'
import { setSnapshot, storage } from '../../utils'
import { PageItem } from '../page-manager/PageManager'
import './work-place.scss'
import { savePages } from '../../store/actionCreater'


const WorkPlace: FC = () => {
    const dispatch = useDispatch()
    const token = storage.get('token')
    useEffect(() => {
        const widthKey = (pages: Array<PageItem>) => {
            pages.forEach((page, index) => {
                page.key = index
            })
        }
        const snapshot = () =>{
            setSnapshot(dispatch)
        }

        getPages().then(res => {
            const pages = res.data.data.pages as Array<PageItem>
            widthKey(pages)
            dispatch(savePages(pages))
        })
        /**
         * 初始化快照的状态
         */
        snapshot()
    }, [token, dispatch])

    return (
        <div className="work-place" >
            <Menu />
            <Header />
            <div className="content">
                <ComponentList />
                <Editor />
                <Options />
            </div>
            <Prompt message={() => {
                // const { pathname } = location
                // let isPrompt = true
                // if (pathname === '/preview') {
                //     return isPrompt
                // }
                return '请确认已经保存好了数据,直接离开可能会造成数据丢失！'
            }} when={true} />
        </div>
    )
}

export default withRouter(WorkPlace)