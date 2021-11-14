import { lazy } from 'react'

const Login = lazy(() => import('../pages/login/Login'))
const Home = lazy(() => import('../pages/home/Home'))
const WorkPlace = lazy(() => import('../pages/work-place/WorkPlace'))
const ErrorPage = lazy(() => import('../pages/error/Error'))
const Preview = lazy(() => import('../pages/preview/Preview'))
const PageManager = lazy(() => import('../pages/page-manager/PageManager'))

export interface IRoute {
    component: any,
    path: string,
    exect: boolean,
    auth?: boolean
}

const routerMap: Readonly<IRoute[]> = [
    { component: Login, path: '/login', exect: true },
    { component: WorkPlace, path: '/work', exect: true, auth: true },
    { component: Home, path: '/home', exect: true },
    { component: Preview, path: '/preview', exect: true, auth: true },
    { component: PageManager, path: '/pageManager', exect: true, auth: true },
    { component: ErrorPage, path: '/error', exect: true },
]

export default routerMap