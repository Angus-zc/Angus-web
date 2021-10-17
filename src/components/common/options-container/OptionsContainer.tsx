import { useSelector } from "react-redux"
import { Store } from "../../../store/reducers"
import { optionsConfig } from '../../../config/options'
import OptionBaseComponent from '../../common/base-component/OptionBaseComponent'
import './option-container.scss'


const OptionsContainer = () => {
    /*得到当前的激活组件的id*/
    const getActiveId = (state: Store) => state.currActiveId
    const activeId = useSelector(getActiveId)

    /*得到当前激活组件的配置*/
    const getThisWidgetConfig = (state: Store) => {
        const widget = { ...state.componentData[activeId], ...{ ...state.componentData[activeId] }.style }
        return widget
    }
    const thisWidgetConfig = useSelector(getThisWidgetConfig)

    return (
        <div className="options-container">
            {
                Object.keys(thisWidgetConfig).map((item: any, index) => {
                    const title = optionsConfig[item]

                    if (title !== undefined) {
                        return (
                            <div key={index} className="option-container">
                                <div className="title">●{title}</div>
                                <OptionBaseComponent type={item} />
                            </div>
                        )
                    } else {
                        return null
                    }
                })
            }
        </div>
    )
}

export default OptionsContainer