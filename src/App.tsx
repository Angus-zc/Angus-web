import { useEffect } from 'react'
import {  useDispatch } from 'react-redux'
import RouterView from './router/index'
import { storage } from './utils';
import './app.scss'
import request from './api/request';
import { Widget } from './config/componentTypes';
import { initComponentList, initWidgets } from './store/actionCreater';

export interface IWidget {
  component: string,
  config: string,
  style: string,
  schema: string,
  props: Widget
}

function App() {
  
  const dispatch = useDispatch()

  useEffect(() => {

    const token = storage.get('token')
    request.get('/widget/get_widgets',
        { token }
    )
        .then((result) => {

            const components = result.data.components as Array<IWidget>
            dispatch(initComponentList(components))

            components.forEach(async (item) => {
                const { component: c, style: s } = item
                const script = document.createElement('script')
                const link = document.createElement('link')

                script.src = c
                link.href = s
                link.rel = 'stylesheet'

                document.body.appendChild(script)
                document.head.appendChild(link)

                script.onload = () => {
                    dispatch(initWidgets(window.widgetCenter))
                }

            })

        })
}, [dispatch])

  return (
    <div className="App">
        <RouterView />
    </div>
  );
}

export default App;
