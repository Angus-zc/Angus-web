import { Switch, Route, Redirect } from 'react-router-dom'
import { Component } from 'react'
import { message } from 'antd'
import { IRoute } from './config'
import { isLogin } from '../utils/index'

interface IProps {
    routerMap: Readonly<IRoute[]>
}

class RouterGuard extends Component<IProps, {}> {

    /*找到要跳转的那个路由配置*/
    targetRoute = (target: string,
        routerMap: Readonly<IRoute[]>
    ): IRoute | undefined => {
        return routerMap.find((item) => {
            return item.path === target
        })
    }

    render() {
        return (
            <Switch>
                <Route render={({ location }) => {

                    const { pathname } = location

                    const target = this.targetRoute(pathname, this.props.routerMap)

                    if (pathname === '/') {
                        return <Redirect to='/home'></Redirect>
                    }
                    if (isLogin()) {

                        if (pathname === '/login') {
                            message.error('您已经登陆了!')
                            return <Redirect to="/home"></Redirect>
                        }

                        if (!target) {
                            message.error('页面不存在！')
                            return <Redirect to='/error'></Redirect>
                        }
                    } else {
                        if (target) {
                            const { auth } = target!

                            if (auth) {
                                message.error('请先登录！')

                                return <Redirect to="/home"></Redirect>
                            }
                        } else {
                            message.error('页面不存在！')
                            return <Redirect to='/error'></Redirect>
                        }
                    }

                    return (
                        this.props.routerMap.map(({ component, path, exect }) => {
                            const config = {
                                component,
                                path,
                                exect: (exect === true ? exect : false)
                            }
                            return <Route key={path} {...config}></Route>
                        })
                    )
                }}>
                </Route>
            </Switch>
        )
    }
}

export default RouterGuard