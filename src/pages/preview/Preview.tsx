import { Store } from "../../store/reducers"
import { useDispatch, useSelector } from 'react-redux'
import GuidePost, { IProps } from '../../components/common/guidepost/GuidePost'
import BaseComponent from '../../components/common/base-component/BaseComponent'
import PreviewWrap from '../../components/common/preview-wrap/PreviewWrap'
import { useEffect } from "react"
import { getPages } from "../../api"
import { storage } from "../../utils"
import { PageItem } from "../page-manager/PageManager"
import { savePages } from "../../store/actionCreater"

const Preview = () => {

    const getComponentData = (state: Store) => state.componentData
    const componentData = useSelector(getComponentData)

    const guidePostConfig: IProps = {
        left: 90,
        top: 5,
        content: '关闭',
        width: 100,
        height: 50
    }

    const dispatch = useDispatch()
    const token = storage.get('token')
    
    useEffect(() => {
        const widthKey = (pages: Array<PageItem>) => {
            pages.forEach((page, index) => {
                page.key = index
            })
        }

        getPages().then(res => {
            const pages = res.data.data.pages as Array<PageItem>
            widthKey(pages)
            dispatch(savePages(pages))
        })
    }, [token, dispatch])

    return (
        <div className="preview">
            <GuidePost  {...guidePostConfig} />
            {
                componentData.map((widget) => {
                    return (
                        <PreviewWrap key={widget.id} widget={widget}>
                            <BaseComponent widget={widget} />
                        </PreviewWrap>
                    )
                })
            }
        </div>
    )
}

export default Preview