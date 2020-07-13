import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Form } from 'antd'
import InputForm from './inputForm'
import AreaForm from './areaFrom'
import ButtonForm from './buttonForm'
import { getArticleById, addArticle, updateArticle, getTags } from '../../../utils/api'
import { useLocation } from 'react-router-dom'
import MyHeader from '../../Layout/header'

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
    var _ummount = false
    useEffect(() => {

        getTags().then(
            (res) => {
                if (!_ummount) {
                    setTags(res.data.res)
                }
            }
        )

        let id = params.get('id')
        if (id) {
            setPageTitle('编辑文章')
            getArticleById(id).then(
                (res) => {
                    if (!_ummount) {
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
                }
            )
        } else {
            setPageTitle('添加文章')
        }
        return () => _ummount = true
    }, [location])

    const saveArticle = (article) => {
        addArticle(article).then(
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
        updateArticle(id, article).then(
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
        
        if (id) {
            editArticle(article, id)
        } else {
            saveArticle(article)
        }
    }
    
    return (
        <Form {...layout} onFinish={onFinish} form={form}>
            <MyHeader title={pageTitle} />
            <InputForm tags={tags}/>
            <AreaForm editContent={editContent} previewContent={previewContent} setEditContent={setEditContent} setPreviewContent={setPreviewContent} />
            <ButtonForm />
        </Form>
    )
}

export default withRouter(ArticleAdd)