import React from 'react'
import Side from './side'
import Main from './main'
import { Layout } from 'antd'

const PageLayout = (props) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Side {...props}/>
            <Main {...props}/>
        </Layout>
    )
}

export default PageLayout