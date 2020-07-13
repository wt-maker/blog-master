import React from 'react'
import { Layout, Row, Col, Input, Form, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { userLogin } from '../../utils/api'
import './login.scss'

const LoginPage = (props) => {

    const onFinish = (data) => {
        userLogin(data).then(
            (response) => {
                if (response.status === 200) {
                    window.localStorage.setItem('token', JSON.stringify(response.data.res))
                    props.history.push('/')
                }
            },
            ({ response }) => {
                console.log(response)
                message.error('用户名或密码错误，请重新输入')
            }
        )
    }
    return (
        <Form onFinish={onFinish} layout='horizontal' className="addTag">
            <Layout id="login-page">

                <div id="login-logo">
                    <a href="/">
                        博客后台管理
                        </a>
                </div>

                <div id="login-form">
                    <h4 className="title">
                        <div id="login-title">
                            <a>登录</a>
                            {/*  <b>·</b>
                                <a>注册</a> */}
                        </div>
                    </h4>
                    <Form.Item
                        name='username'
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
                    </Form.Item>
                    <Button type="primary" shape="round" id="login-button" htmlType='submit'>
                        登录
                        </Button>
                </div>

            </Layout>
        </Form>
    )
}

export default LoginPage
