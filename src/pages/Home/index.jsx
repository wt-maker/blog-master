import React from 'react'
import MyHeader from '../../components/Header'
import './home.scss'
const Home = (props) => {
    return (
        <div id="home-page">
            <MyHeader title="首页"></MyHeader>
            <section>
                欢迎来到WT博客后台管理
            </section>
        </div>
    )
}

export default Home