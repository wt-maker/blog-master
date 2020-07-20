import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { withRouter } from 'react-router-dom'
import { getArticles, deleteArticle } from '../../utils/api'
import {initColumns} from './articleList.config'


const ArticleList = (props) => {
    
    const remove = async(id) => {
        await deleteArticle(id)
        setLoading(true)
    }

    const edit = (id) => {
        props.history.push(`/article/add?id=${id}`)
    }

    const preview = (id) => {
        props.history.push(`/article/preview?id=${id}`)
    }

    const columns = initColumns(preview, edit, remove)

    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(false)
    // useEffect的不作为componentDidUnmount的话
    //传入第二个参数时一定注意：第二个参数不能为引用类型，引用类型比较不出来数据的变化，会造成死循环
    useEffect(() => {
        let ummount = false
        setLoading(true);
        // 立即执行函数BUG
        (async () => {
            let {res} = await getArticles()
            if (!ummount) {
                setArticle(res)
            }
        })()
        setLoading(false)
        return () => ummount = true
    }, [loading])
    return (
        <section>
            <Table columns={columns} rowKey={record => record._id} dataSource={article} bordered='true' />
        </section>
    )
}

export default withRouter(ArticleList)