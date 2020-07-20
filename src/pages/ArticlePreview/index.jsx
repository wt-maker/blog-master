import React, { useEffect, useRef } from 'react'
import { getArticleById } from '../../utils/api'
import 'github-markdown-css/github-markdown.css'
import './articlePreview.scss'
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
            <div className='markdown-body'>
                <div ref={previewRef}></div>
            </div>
        </div>
    )
}

export default ArticlePreview