import React from 'react'
import { Layout } from 'antd';
import ArticleAdd from '../Article/add'
import ArticleDrafts from '../Article/drafts'
import ArticleList from '../Article/list'
import ArticlePreview from '../Article/preview'
import TagList from '../Tag/list'
import TagAdd from '../Tag/add'
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
                        <Route path='/article/preview' component={ArticlePreview}></Route>
                        <Route path='/tag/list' component={TagList}></Route>
                        <Route path='/tag/add' component={TagAdd}></Route>
                        <Route path='/source/list' component={SourceAdd}></Route>
                        <Route path='/source/add' component={SourceList}></Route>
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>wt blog</Footer>
            </Layout>
        )
    }
}