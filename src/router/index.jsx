import PageLayout from '../pages/Layout'
import ArticleAdd from '../pages/ArticleAdd'
import ArticleDrafts from '../pages/ArticleDrafts'
import ArticleList from '../pages/ArtilceList'
import ArticlePreview from '../pages/ArticlePreview'
import TagList from '../pages/TagList'
import FundList from '../pages/FundList'
import LoginPage from '../pages/Login'
import Home from '../pages/Home'
import StockDetail from '../pages/StockDetail'
import StockList from '../pages/StockList'
import { Route } from 'react-router-dom'
import loginStatus from '../utils/login'
import React from 'react'

export const routes = [
    {
        path: '/login',
        component: LoginPage
    },
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
                path: '/tag/manage',
                component: TagList
            },
            {
                path: '/fund/list',
                component: FundList
            },
            {
                path: '/stock/detail',
                component: StockDetail
            },
            {
                path: '/stock/list',
                component: StockList
            },
            {
                path: '/',
                component: Home
            }
        ]
    }
]

export const RouteWithSubRoutes = (route) => {

    return (
        <Route
            path={route.path}
            render={props => {
                if (loginStatus()) {
                    return (
                        <route.component {...props} {...route} />
                    )
                } else {

                    window.localStorage.removeItem('token')
                    return (
                        <LoginPage {...props}/>
                    )
                }
            }
            }
        />
    )
}
