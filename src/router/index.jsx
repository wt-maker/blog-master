import PageLayout from '../pages/Layout'
import ArticleAdd from '../pages/Article/add'
import ArticleDrafts from '../pages/Article/drafts'
import ArticleList from '../pages/Article/list'
import ArticlePreview from '../pages/Article/preview'
import TagList from '../pages/Tag/list'
import TagAdd from '../pages/Tag/add'
import SourceAdd from '../pages/Source/add'
import SourceList from '../pages/Source/list'
import FundList from '../pages/Fund/list'
import { Route } from 'react-router-dom'
import React from 'react'

export const routes = [
    {
        path: '/',
        component: PageLayout,
        children: [
            {
                path: '/article/list',
                component: ArticleList
            },
            {
                path: '/article/add',
                component: ArticleAdd
            },
            {
                path: '/article/drafts',
                component: ArticleDrafts
            },
            {
                path: '/article/preview',
                component: ArticlePreview
            },
            {
                path: '/tag/list',
                component: TagList
            },
            {
                path: '/tag/add',
                component: TagAdd
            },
            {
                path: '/source/list',
                component: SourceList
            },
            {
                path: '/source/add',
                component: SourceAdd
            },
            {
                path: '/fund/list',
                component: FundList
            }
        ]
    }
]

export const RouteWithSubRoutes = (route) => (
    <Route 
        path={route.path}
        render={props => (
            <route.component {...props} {...route}/>
        )}
    />
)

