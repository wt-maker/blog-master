import React from 'react'
import { Layout } from 'antd';
import { Switch } from 'react-router-dom'
import { RouteWithSubRoutes } from '../../router'

const { Content, Footer } = Layout;
const Main = (props) => {
    return (
        <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
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