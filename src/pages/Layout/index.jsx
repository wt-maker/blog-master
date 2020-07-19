import React from 'react'
import LeftNav from '../../components/LeftNav'
import Main from './main'
import { Layout } from 'antd'

const PageLayout = (props) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <LeftNav {...props}/>
            <Main {...props}/>
        </Layout>
    )
}

export default PageLayout