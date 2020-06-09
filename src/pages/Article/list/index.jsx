import React, {useState, useEffect} from 'react'
import { Table, Tag, Space, PageHeader} from 'antd'
import {withRouter} from 'react-router-dom' 
import dayjs from 'dayjs'
import axios from 'axios'
const  ArticleList = (props) => {
    const columns = [
        {
            title: 'No.',
            key: 'no',
            width: 20,
            render: (text,record,dataIndex) => <span>{dataIndex+1}</span>
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 300
        },
        {
            title: '标签',
            dataIndex: 'tag',
            key: 'tag',
            width: 300
        },
        {
            title: '关键字',
            dataIndex: 'keywords',
            key: 'keywords',
            width: 300
        },
        {
            title: '更新日期',
            dataIndex: 'update_dt',
            key: 'description',
            width: 250,
            render: (text)=><div>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div>
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>预览</a>
                    <a onClick={()=>editArticle(record._id)}>编辑</a>
                    <a onClick={()=>deleteArticle(record._id)}>删除</a>
                </Space>
            ),
        },
    ];

    const deleteArticle = (_id) => {
        axios.get(`/api/delete/${_id}`).then(
            (res)=>{
                setLoading(true)
            },
            ({response}) => {
                console.log(response)
            }
        )
    }

    const editArticle = (_id) => {
        props.history.push(`/article/add?id=${_id}`)
    }

    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(false)
    // useEffect的不作为componentDidUnmount的话
    //传入第二个参数时一定注意：第二个参数不能为引用类型，引用类型比较不出来数据的变化，会造成死循环
    useEffect(()=>{

        setLoading(true)

        axios.get('/api/getArticles').then(
            (res)=>{
                setArticle(res.data.res)
            },
            ({response})=>{
                console.log(response)
            }
        )
        setLoading(false)
    },[loading])

    return (
        <section>
            <PageHeader className="site-page-header" title="文章列表" />
            <Table columns={columns} rowKey={record => record._id} dataSource={article} bordered='true'/>
        </section>
    )
}

export default withRouter(ArticleList)