import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, message } from 'antd'
import logo from '../../logo.svg'
import { isLogin, storage } from '../../utils'
import { githubUrl } from '../../config/constant'
import './home.scss'

const Home: FC = () => {

    const showSuccess = (msg: string) => {
        message.success(msg)
    }
    const showError = (msg: string) => {
        message.error(msg)
    }

    /*退出登录*/
    const logout = () => {
        if (isLogin()) {
            try {
                storage.clear()
                showSuccess('退出登录成功！')
            } catch (err) {
                showError('退出登录失败！')
            }

        } else {
            showError('您还未登录！')
        }
    }

    return (
        <div className="home">
            <ul className="binner">
                <li className="text "><a href={githubUrl}>Github</a></li>
                <li className="text"><Link to="/login">登录 / 注册</Link></li>
                <li className="text" onClick={logout}>注销</li>
            </ul>
            <div className="middle">
                <ul className="home-content-info">
                    <li className='title '>极 简 制 作, 一 键 呈 现</li>
                    <li className='info '>
                        1. 选择页面 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        2. 编辑内容  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        3. 一键发布
                    </li>
                    <li className="start-use "><Button ><Link to="/pageManager">开始使用</Link></Button></li>
                </ul>
                <img className="logo " src={logo} alt="" />
            </div>
            <footer>快速、简单、易用的可视化搭建平台</footer>
            <div className='footer-text'>零门槛快速搭建、快速投放。数据实时回流，方便及时快速调整投放策略&方案</div>
        </div>
    )
}
export default Home