import { FC, Key, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import { login, register } from '../../api/index'
import { storage } from '../../utils/index'
import loginCheck from './hook/useLoginCheck'
import './login.scss'

const Login: FC = (props) => {
    /*消息提示*/
    const showSuccess = (msg: string) => {
        message.success(msg)
    }
    const showError = (msg: string) => {
        message.error(msg)
    }

    /*切换注册和登录的按钮*/
    const container = useRef<HTMLDivElement | null>(null)

    /*点击切换按钮*/
    const handleToggleClick = () => {
        container.current!.classList.add('active')
    }

    /*点击关闭注册界面*/
    const handleCloseRegister = () => {
        container.current!.classList.remove('active')
    }

    /*ref*/
    const registerNameRef = useRef<null | HTMLInputElement>(null)
    const registerPasswordRef = useRef<null | HTMLInputElement>(null)
    const registerConfirmRef = useRef<null | HTMLInputElement>(null)

    const loginNameRef = useRef<null | HTMLInputElement>(null)
    const loginPasswordRef = useRef<null | HTMLInputElement>(null)


    const storeInfo = (key: string, val: string | number | Record<Key, any>) => {
        storage.set(key, val)
    }

    /*登录逻辑*/
    const handleLogin = async () => {

        const username = loginNameRef.current!.value
        const password = loginPasswordRef.current!.value

        const result = await login(username, password)

        const { status, message, data = null, } = result.data

        if (status === 200) {

            storeInfo("userId", data?.userId)
            storeInfo("token", data?.token)
            storeInfo("userName", data?.userName)

            //@ts-ignore
            props.history.replace('/pageManager')
            showSuccess(message)
        } else {
            showError(message)
        }
    }

    /*注册逻辑*/
    const handleRegister = async () => {

        const username = registerNameRef.current!.value
        const password = registerPasswordRef.current!.value
        const confirmPassword = registerConfirmRef.current!.value

        // 注册逻辑
        const { flag, message } = loginCheck(username, password, confirmPassword)
        if (flag) {
            const result = await register(username, password)
            if (result.data.status === 200) {
                showSuccess(result.data.message)

                handleCloseRegister()
            } else {
                showError(result.data.message)
            }
        } else {
            showError(message)
        }
    }
    return (
        <div className="login-register">
            <div className="container " ref={container}>
                <div className="card"></div>
                <div className="card">
                    <h1 className="title" >登录</h1>
                    <form>
                        <div className="input-container">
                            <input ref={loginNameRef} autoComplete="off" type="#{type}" id="#{label}" required={true} />
                            <label htmlFor="#{label}">用户名</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input ref={loginPasswordRef} autoComplete="off" type="#{type}" id="#{label}" required={true} />
                            <label htmlFor="#{label}">密码</label>
                            <div className="bar"></div>
                        </div>
                        <div className="button-container">
                            <div onScroll={handleRegister} onClick={handleLogin}><span>登录</span></div>
                        </div>
                    </form>
                </div>
                <div className="card alt">
                    <div onClick={handleToggleClick} className="toggle"></div>
                    <h1 className="title">
                        注册
          <div onClick={handleCloseRegister} className="close"></div>
                    </h1>
                    <form>
                        <div className="input-container">
                            <input ref={registerNameRef} autoComplete="off" type="#{type}" id="#{label}" required={true} />
                            <label htmlFor="#{label}">用户名</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input ref={registerPasswordRef} autoComplete="off" type="#{type}" id="#{label}" required={true} />
                            <label htmlFor="#{label}">密码</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input ref={registerConfirmRef} autoComplete="off" type="#{type}" id="#{label}" required={true} />
                            <label htmlFor="#{label}">确认密码</label>
                            <div className="bar"></div>
                        </div>
                        <div className="button-container">
                            <div onClick={handleRegister}><span>提交注册</span></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)