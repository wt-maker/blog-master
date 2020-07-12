import React, { useEffect, useRef } from 'react'
import { getArticleById } from '../../../utils/api'
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
            getArticleById(id).then(
                (res) => {
                    console.log(res.data.res.previewContent)
                    previewRef.current.innerHTML = res.data.res.previewContent
                }
            )
        }
    })
    return (
        <div className='markdown-body' style={divStyle}>
            <div ref={previewRef}></div>
        </div>
    )
}

export default ArticlePreview