import React, { useEffect, useRef } from 'react'
import { getArticleById } from '../../utils/api'
import MyHeader from '../../components/Header'
import 'github-markdown-css/github-markdown.css'
const divStyle = {
    'backgroundColor': 'white',
    'padding': '15px'
}
const ArticlePreview = (props) => {
    const params = new URLSearchParams(props.location.search)
    const id = params.get('id')
    const previewRef = useRef(null)
    useEffect(() => {
        if (id) {
            (async () => {
                let response = await getArticleById(id)
                previewRef.current.innerHTML = response.res.previewContent
            })()
        }
    })
    return (
        <div>
            <MyHeader title="源码列表" />
            <div className='markdown-body' style={divStyle}>
                <div ref={previewRef}></div>
            </div>
        </div>
    )
}

export default ArticlePreview