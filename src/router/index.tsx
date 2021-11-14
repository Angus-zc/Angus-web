import { HashRouter as Router } from 'react-router-dom'
import RouterGuard from './RouterGuard'
import routerMap from './config'
import { Component, Suspense } from 'react';


class RouterView extends Component {
    render() {
        return (
            <Router>
                <Suspense fallback={''}>
                    <RouterGuard routerMap={routerMap} />
                </Suspense>
            </Router>
        )
    }
}

export default RouterView