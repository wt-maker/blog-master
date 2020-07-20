import React from 'react'
import dayjs from 'dayjs'
import MyLink from '../../components/Link'
import { Tag, Space, Popconfirm } from 'antd'

export const initColumns = (preview, edit, remove) => {
    let columns = [
        {
            title: 'No.',
            key: 'no',
            width: 20,
            render: (text, record, dataIndex) => <span>{dataIndex + 1}</span>
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 300
        },
        {
            title: '标签',
            dataIndex: 'tag',
            key: 'tag',
            width: 300,
            render: (text) => {
                return (
                    <div>
                        {text.map(tag => {
                            return (
                                <Tag color={tag.color} key={tag.color}>
                                    {tag.name}
                                </Tag>
                            )
                        })}
                    </div>)
            }
        },
        {
            title: '关键字',
            dataIndex: 'keywords',
            key: 'keywords',
            width: 300
        },
        {
            title: '更新日期',
            dataIndex: 'update_dt',
            key: 'description',
            width: 250,
            render: (text) => <div>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div>
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <MyLink onClick={() => preview(record._id)}>预览</MyLink>
                    <MyLink onClick={() => edit(record._id)}>编辑</MyLink>
                    <Popconfirm title="确认删除?" onConfirm={() => remove(record._id)}>
                        <MyLink>删除</MyLink>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    return columns
}