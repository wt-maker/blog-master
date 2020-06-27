import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, PageHeader } from 'antd'
import InputForm from './inputForm'
import AreaForm from './areaFrom'
import ButtonForm from './buttonForm'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}

const ArticleAdd = (props) => {

    const [form] = Form.useForm()
    const [pageTitle, setPageTitle] = useState('')
    const [editContent, setEditContent] = useState('')
    const [previewContent, setPreviewContent] = useState('')
    const [tags, setTags] = useState([])
    const params = new URLSearchParams(props.location.search)

    let location = useLocation()
    useEffect(() => {

        axios.get('/api/getAllTags').then(
            (res) => {
                setTags(res.data.res)
            }
        )

        let id = params.get('id')
        if (id) {
            setPageTitle('编辑文章')
            axios.get(`/api/get/${id}`).then(
                (res) => {
                    let article = res.data.res
                    setEditContent(article.editContent)
                    setPreviewContent(article.previewContent)
                    let tags = article.tag.map(item => item.name)
                    form.setFieldsValue({
                        title: article.title,
                        keywords: article.keywords,
                        description: article.description,
                        tag:tags
                    })
                }
            )
        } else {
            setPageTitle('添加文章')
        }
    }, [location])

    const addArticle = (article) => {
        axios.post('/api/addArticle', article).then(
            () => {
                props.history.push('/article/list')
            },
            ({ response }) => {
                console.log(response)
            }
        )
    }

    const editArticle = (article, id) => {
        article = {
            ...article,
            update_dt:Date.now()
        }
        axios.post(`/api/update/${id}`, article).then(
            () => {
                props.history.push('/article/list')
            },
            ({ response }) => {
                console.log(response)
            }
        )
    }
    const onFinish = values => {
        let id = params.get('id')
        values.tag = tags.filter(item=>values.tag.includes(item.name)).map(item => item._id)

        let article = { ...values, editContent, previewContent }
        console.log(article)
        
        if (id) {
            editArticle(article, id)
        } else {
            addArticle(article)
        }
    }
    
    return (
        <Form {...layout} onFinish={onFinish} form={form}>
            <PageHeader className="site-page-header" title={pageTitle} />
            <InputForm tags={tags}/>
            <AreaForm editContent={editContent} previewContent={previewContent} setEditContent={setEditContent} setPreviewContent={setPreviewContent} />
            <ButtonForm />
        </Form>
    )
}

export default withRouter(ArticleAdd)