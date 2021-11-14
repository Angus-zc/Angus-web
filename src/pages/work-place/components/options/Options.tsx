import { FC, useMemo } from 'react'
import { Tabs } from 'antd';
import { Store } from '../../../../store/reducers'
import OptionsContainer from '../../../../components/common/options-container/OptionsContainer'
import { useSelector } from 'react-redux';
import EventContainer from '../../../../components/common/event-container/EventContainer'
import AnimationContainer from '../../../../components/common/animation-container/AnimationContainer'
import './options.scss'



const { TabPane } = Tabs;

const Options: FC = () => {

    const getStore = (state: Store) => state
    const { currActiveId } = useSelector(getStore)

    const isActive = useMemo(() => currActiveId !== -1, [currActiveId])

    return (
        <div className="options">
            <Tabs centered defaultActiveKey="1" >
                <TabPane tab="属性" key="1">
                    {
                        !isActive ? <div style={{ textAlign: 'center' }}>请选择组件</div> : <OptionsContainer />
                    }
                </TabPane>
                <TabPane tab="动画" key="2">
                    {
                        !isActive ? <div style={{ textAlign: 'center' }}>请选择组件</div> : <AnimationContainer />
                    }
                </TabPane>
                <TabPane tab="事件" key="3">
                    {
                        !isActive ? <div style={{ textAlign: 'center' }}>请选择组件</div> : <EventContainer widgetId={currActiveId} />
                    }
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Options

