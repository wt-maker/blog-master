import React, { useRef, useEffect, useState} from 'react'
import { Row, Col } from 'antd'
import 'highlight.js/styles/vs2015.css'
import 'github-markdown-css/github-markdown.css'
const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')

const divStyle = {
    'border': '1px solid #a0b3d6',
    'backgroundColor': 'white',
    'fontSize': '12px',
    'wordWrap': 'break-word',
    'overflowX': 'hidden',
    'overflowY': 'auto'
}

const childStyle = {
    'marginLeft': 'auto',
    'height': '500px',
    'marginRight': 'auto',
    'padding': '20px',
    'outline': '0',
}
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str, true).value;
            } catch (__) { }
        }
        return ''
    }
})
const AreaForm = (props) => {

    // 编辑画面预览画面同步
    const changeScrollTop = () => {

        const editArea = document.querySelector('.content-edit')
        const previewArea = document.querySelector('.markdown-body')
        const editChild = editArea.querySelector('.content-child')
        const previewChild = previewArea.querySelector('.content-child')
        const scale = (previewArea.offsetHeight - previewChild.scrollHeight) / (editArea.offsetHeight - editChild.scrollHeight)

        let currentArea = 1
        editArea.addEventListener('mouseover', function () {
            currentArea = 1
        })
        previewArea.addEventListener('mouseover', function () {
            currentArea = 2
        })
        editArea.addEventListener('scroll', function () {
            if (currentArea === 1) {
                previewArea.scrollTop = editArea.scrollTop * scale
            }
        })
        previewArea.addEventListener('scroll', function () {
            if (currentArea === 2) {
                editArea.scrollTop = previewArea.scrollTop / scale
            }
        })
    }

    const {editContent, previewContent, setEditContent, setPreviewContent} = props
    const previewRef = useRef(null)
    const editRef = useRef(null)
    const [loading, setLoading] = useState(false)
    // 画面初期加载
    useEffect(() => {
        changeScrollTop()
        if (loading === false && editContent && previewContent) {
            editRef.current.innerHTML = editContent
            previewRef.current.innerHTML = previewContent
            setLoading(true)
        }
    })

    const onContentChange = (e) => {
        let previewHtml = md.render(e.target.innerText)
        previewRef.current.innerHTML = previewHtml
        setEditContent(e.target.innerText)
        setPreviewContent(previewHtml)
    }
    return (
        <React.Fragment>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <div className='content-edit' style={divStyle}>
                        <div
                            contentEditable='plaintext-only'
                            onInput={onContentChange}
                            className='content-child'
                            style={childStyle}
                            ref={editRef}
                        >
                        
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className='markdown-body' style={divStyle}>
                        <div
                            className='content-child'
                            style={childStyle}
                            ref={previewRef}
                        >

                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AreaForm