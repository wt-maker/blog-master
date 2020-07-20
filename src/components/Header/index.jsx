import React from 'react'
import { Layout, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { menuList } from '../LeftNav/menu.config'
import './header.scss'
const MyHeader = (props) => {

    const getTitle = (list) => {
        for (let menu of list) {
            if (!menu.child) {
                if (menu.path === props.location.pathname) {
                    return menu.content
                }
            } else {
                let result = getTitle(menu.child)
                if (result) {
                    return result
                }
            }
        }
    }

    const logout = () => {
        window.localStorage.removeItem('token')
        props.history.push('/')
    }

    return (
        <Layout.Header id="page-header">
            <div className="header-left">
                <span>{getTitle(menuList)}</span>
                <div className="header-logo">
                </div>
            </div>
            <div className="header-right">
                <Button id="logout-button" size='large' onClick={logout}>logout</Button>
            </div>

        </Layout.Header>
    )
}
export default withRouter(MyHeader)