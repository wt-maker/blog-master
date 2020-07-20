import React from 'react'
import MyLink from '../../components/Link'
import { Space, Popconfirm } from 'antd'

export const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

export const initColumns = (remove) => {
    const columns = [
        {
            title: 'No.',
            key: 'no',
            width: 100,
            render: (text, record, dataIndex) => <span>{dataIndex + 1}</span>
        },
        {
            title: 'serialNumber',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            width: 200
        },
        {
            title: 'fundName',
            dataIndex: 'name',
            key: 'name',
            width: 300
        },
        {
            title: 'position',
            dataIndex: 'position',
            key: 'position',
            width: 200
        },
        {
            title: 'applies',
            dataIndex: 'applies',
            key: 'applies'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm title="确认删除?" onConfirm={() => { remove(record.id)}}>
                        <MyLink>删除</MyLink>
                    </Popconfirm>
                </Space>
            ),
        }
    ]
    return columns
}
