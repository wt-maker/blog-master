import React, { useEffect, useRef, useState } from 'react'
import { Card, Button } from 'antd'
import { getArticleById } from '../../utils/api'
import { ArrowLeftOutlined } from '@ant-design/icons'
import 'github-markdown-css/github-markdown.css'
import './articlePreview.scss'
const ArticlePreview = (props) => {
    const params = new URLSearchParams(props.location.search)
    const id = params.get('id')
    const previewRef = useRef(null)

    const [title, setTitle] = useState('')
    useEffect(() => {
        if (id) {
            (async () => {
                let response = await getArticleById(id)
                setTitle(response.res.title)
                previewRef.current.innerHTML = response.res.previewContent
            })()
        }
    })
    return (
        <Card className="article-preview-card" title={
            <div>
                <Button style={{border: 'none'}}><ArrowLeftOutlined onClick={() => props.history.goBack()}/></Button>
                文章预览：{title}
            </div>
        }>
            <div className='markdown-body'>
                <div ref={previewRef}></div>
            </div>
        </Card>
    )
}

export default ArticlePreview