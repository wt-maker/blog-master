import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom' 
import { Form, PageHeader } from 'antd'
import InputForm from './inputForm'
import AreaForm from './areaFrom'
import ButtonForm from './buttonForm'
import axios from 'axios'
import {useLocation} from 'react-router-dom'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}

const ArticleAdd = (props) => {
    
    const [pageTitle, setPageTitle] = useState('') 
    const [article, setArticle] = useState({})
    const [editContent, setEditContent] = useState({})
    const [previewContent, setPreviewContent] = useState({})
    const params = new URLSearchParams(props.location.search)

    let location = useLocation()
    useEffect(() => {
        let id = params.get('id')
        if (id) {
            setPageTitle('编辑文章')
            axios.get(`/api/get/${id}`).then(
                (res)=>{
                    setArticle(res.data.res)
                    setEditContent(res.data.res.editContent)
                }
            )
        } else {
            setPageTitle('添加文章')
        }
    },[location])

    const onFinish = values => {
        const article = {...values, editContent, previewContent}
        axios.post('/api/addArticle',article).then(
            (res)=>{
                props.history.push('/article/list')
            },
            ({response})=>{
                console.log(response)
            }
        )
    }

    return (
        <Form {...layout} onFinish={onFinish}>
            <PageHeader className="site-page-header" title={pageTitle} />
            <InputForm article={article}/>
            <AreaForm editContent={editContent} setEditContent={setEditContent} setPreviewContent={setPreviewContent}/>
            <ButtonForm />
        </Form>
    )
}

export default withRouter(ArticleAdd)