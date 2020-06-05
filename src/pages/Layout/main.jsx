import React from 'react'
import { Layout } from 'antd';
import ArticleAdd from '../Article/add'
import ArticleDrafts from '../Article/drafts'
import ArticleList from '../Article/list'
import ArticleTags from '../Article/tags'
import SourceAdd from '../Source/add'
import SourceList from '../Source/list'
import { Switch, Route } from 'react-router-dom'

const { Content, Footer } = Layout;
export default class Main extends React.Component {

    render() {
        return (
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <Switch>
                        <Route path='/article/list' component={ArticleList}></Route>
                        <Route path='/article/add' component={ArticleAdd}></Route>
                        <Route path='/article/drafts' component={ArticleDrafts}></Route>
                        <Route path='/article/tags' component={ArticleTags}></Route>
                        <Route path='/source/list' component={SourceAdd}></Route>
                        <Route path='/source/add' component={SourceList}></Route>
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>wt blog</Footer>
            </Layout>
        )
    }
}