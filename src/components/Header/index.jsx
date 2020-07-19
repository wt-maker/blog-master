import React from 'react'
import {Layout, Button} from 'antd'
import {withRouter} from 'react-router-dom'
import './header.scss'
const MyHeader = (props) => {

    const logout = () => {
        window.localStorage.removeItem('token')
        props.history.push('/')
    }

    return (
        <Layout.Header id="page-header">
            {props.title}
            <Button id="logout-button" size='large' onClick={logout}>logout</Button>
        </Layout.Header>
    )
}
export default withRouter(MyHeader)