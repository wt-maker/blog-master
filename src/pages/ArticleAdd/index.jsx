import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Form } from 'antd'
import InputForm from './inputForm'
import AreaForm from './areaFrom'
import ButtonForm from './buttonForm'
import { getArticleById, addArticle, updateArticle, getTags } from '../../utils/api'
import MyHeader from '../../components/Header'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
}

const ArticleAdd = (props) => {

    const [form] = Form.useForm()
    const [pageTitle, setPageTitle] = useState('')
    const [editContent, setEditContent] = useState('')
    const [previewContent, setPreviewContent] = useState('')
    const [tags, setTags] = useState([])
    const params = new URLSearchParams(props.location.search)

    useEffect(() => {
        let unmount = false;
        (async () => {
            let response = await getTags()
            if (!unmount) {
                setTags(response.res)
            }
        })()

        let id = params.get('id')
        if (id) {
            setPageTitle('编辑文章');
            (async() => {
                let {res} = await getArticleById(id)
                if (!unmount) {
                    setEditContent(res.editContent)
                    setPreviewContent(res.previewContent)
                    let tags = res.tag.map(item => item.name)
                    form.setFieldsValue({
                        title: res.title,
                        keywords: res.keywords,
                        description: res.description,
                        tag: tags
                    })
                }
            })()
            
        } else {
            setPageTitle('添加文章')
        }
        return () => unmount = true
    }, [pageTitle])

    const saveArticle = async (article) => {
        await addArticle(article)
        props.history.push('/article/list')
    }

    const editArticle = async (article, id) => {
        article = {
            ...article,
            update_dt: Date.now()
        }
        await updateArticle(id, article)
        props.history.push('/article/list')
    }
    const onFinish = values => {
        let id = params.get('id')
        values.tag = tags.filter(item => values.tag.includes(item.name)).map(item => item._id)

        let article = { ...values, editContent, previewContent }

        if (id) {
            editArticle(article, id)
        } else {
            saveArticle(article)
        }
    }

    return (
        <Form {...layout} onFinish={onFinish} form={form}>
            <MyHeader title={pageTitle} />
            <InputForm tags={tags} />
            <AreaForm editContent={editContent} previewContent={previewContent} setEditContent={setEditContent} setPreviewContent={setPreviewContent} />
            <ButtonForm />
        </Form>
    )
}

export default withRouter(ArticleAdd)