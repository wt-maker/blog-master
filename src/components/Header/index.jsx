import React from 'react'
import { Layout, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import './header.scss'
const MyHeader = (props) => {

    const logout = () => {
        window.localStorage.removeItem('token')
        props.history.push('/')
    }

    return (
        <Layout.Header id="page-header">
            <div className="header-left">
                <span>{props.title}</span>
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