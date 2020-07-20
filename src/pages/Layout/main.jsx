import React from 'react'
import { Layout } from 'antd';
import { Switch } from 'react-router-dom'
import { RouteWithSubRoutes } from '../../router'
import MyHeader from '../../components/Header'
import './main.scss'

const { Content, Footer } = Layout;
const Main = (props) => {
    return (
        <Layout className="site-layout">
            <MyHeader title="首页"></MyHeader>
            <Content>
                {
                    props.children ?
                        <Switch>
                            {
                                props.children.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
                            }
                        </Switch> : null
                }

            </Content>
            <Footer style={{ textAlign: 'center' }}>wt blog</Footer>
        </Layout>
    )
}

export default Main