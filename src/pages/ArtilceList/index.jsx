import React, { useState, useEffect } from 'react'
import { Table, Card, Button, Form, Input, Select, Pagination  } from 'antd'
import { withRouter } from 'react-router-dom'
import { getArticles, deleteArticle, getTags } from '../../utils/api'
import { initColumns } from './articleList.config'
import { ARTICLE_LIST_PAGE_SIZE } from '../../common/constants'
import './article-list.scss'

const ArticleList = (props) => {

    const [form] = Form.useForm();
    const [tags, setTags] = useState([])
    const [total, setTotal] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [keywords, setKeywords] = useState('')
    const [tag, setTag] = useState('')

    const remove = async (id) => {
        await deleteArticle(id)
        setLoading(true)
    }

    const edit = (id) => {
        props.history.push(`/article/add?id=${id}`)
    }

    const preview = (id) => {
        props.history.push(`/article/preview?id=${id}`)
    }

    const columns = initColumns(preview, edit, remove, currentPage, ARTICLE_LIST_PAGE_SIZE)

    const searchArticle = async (data={}) => {

        if (data.keywords) {
            setKeywords(data.keywords)
        }
        if (data.tag) {
            setTag(data.tag)
        }
        data = {
            tag,
            keywords,
            ...data,
            limit: ARTICLE_LIST_PAGE_SIZE
        }
        let {res} = await getArticles(data)
        setArticle(res.data)
        setTotal(res.paginateInfo.total)
        setCurrentPage(res.paginateInfo.current_page)
    }

    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(false)
    // useEffect的不作为componentDidUnmount的话
    //传入第二个参数时一定注意：第二个参数不能为引用类型，引用类型比较不出来数据的变化，会造成死循环
    useEffect(() => {

        let unmount = false
        setLoading(true);
        (async () => {
            let response = await getTags()
            if (!unmount) {
                setTags(response.res)
            }
        })();

        // 立即执行函数BUG
        (async()=>await searchArticle())()
        setLoading(false)
        return () => unmount = true
    }, [loading])

    const { Option } = Select
    const onFinish = (values) => {
        (async () => await searchArticle({ keywords: values.keywords, tag: values.tag }))()
    }
    const reset = () => {
        setCurrentPage(1)
        setKeywords('')
        setTag('');
        (async()=>await searchArticle())()
    }
    const paginateChange = (page) => {
        (async()=>await searchArticle({page}))()
    }
    return (
        <section>
            <Card
                id="article-card"
                extra={
                    <Form
                        form={form}
                        name="article-search"
                        className="article-search"
                        onFinish={onFinish}
                        layout="inline"
                    >
                        <Form.Item
                            name="keywords"
                            label="关键字"
                        >
                            <Input allowClear placeholder="标题,关键字" />
                        </Form.Item>

                        <Form.Item
                            name="tag"
                            label="标签"
                        >
                            <Select
                                allowClear
                                showSearch
                                style={{ width: 200 }}
                                placeholder="选择标签"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    tags.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Button htmlType='submit' shape='round' type='primary'>检索</Button>
                        <Button shape='round' type='ghost' onClick={() => reset()}>重置</Button>
                    </Form>
                }
            >
                <Table
                    columns={columns}
                    rowKey={record => record._id}
                    dataSource={article}
                    bordered='true'
                    pagination={false}
                />
                <Pagination
                    className="article-list-paginate"
                    total={total}
                    current={currentPage}
                    defaultPageSize={ARTICLE_LIST_PAGE_SIZE}
                    onChange={paginateChange}
                    showQuickJumper={true}
                />
            </Card>
        </section>
    )
}

export default withRouter(ArticleList)