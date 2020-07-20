import React from 'react'
import { Popconfirm, Space } from 'antd'
import dayjs from 'dayjs'
import MyLink from '../../components/Link'

const colorCellStyle = {
    background: 'transparent',
    height: '28px',
    width: '28px',
    cursor: 'pointer',
    position: 'relative',
    outline: 'none',
    'borderRadius': '50%',
    transition: 'box-shadow 100ms ease 0s'
}

export const computeColumns = (color, setColor, isEditing, save, cancel, editingKey, edit, deleteTag) => {

    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            editable: true,
        },
        {
            title: '标签颜色',
            dataIndex: 'color',
            key: 'color',
            width: '25%',
            editable: true,
            render: (text) =>
                <div
                    tabIndex="0"
                    style={{
                        ...colorCellStyle,
                        'boxShadow': text + ' 0px 0px 0px 15px inset'
                    }}>
                </div>
        },
        {
            title: '更新时间',
            dataIndex: 'update_dt',
            key: 'update_dt',
            width: '25%',
            render: (text) => <div>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div>
        },
        {
            title: 'action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing(record)
                return editable ? (
                    <span>
                        <Space size="middle">
                            <MyLink
                                onClick={() => save(record)}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                保存
                            </MyLink>
                            <MyLink onClick={cancel}>
                                取消
                            </MyLink>
                        </Space>
                    </span>
                ) : (
                        <span>
                            <Space size="middle">
                                <MyLink disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    修改
                                </MyLink>
                                <Popconfirm title="确认删除?" onConfirm={() => deleteTag(record._id)}>
                                    <MyLink>删除</MyLink>
                                </Popconfirm>
                            </Space>
                        </span>
                    )
            },
        },
    ]

    return columns.map(col => {
        if (!col.editable) {
            return {
                ...col
            }
        }

        return {
            ...col,
            onCell: record => ({
                record,
                color,
                setColor,
                inputType: col.dataIndex === 'color' ? 'color' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            }),
        }
    })
}