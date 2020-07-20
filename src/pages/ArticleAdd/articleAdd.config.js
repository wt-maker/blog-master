const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')

export const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
}

export const md = new MarkdownIt({
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