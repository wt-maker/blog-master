import React from 'react'
import Side from './side'
import Main from './main'
import { Layout } from 'antd';

export default class PageLayout extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Side />
                <Main />
            </Layout>
        )
    }
}