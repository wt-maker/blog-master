import React, { useState, useEffect } from 'react'
import { Table, Input, Popconfirm, Form, Space } from 'antd'
import { CirclePicker } from 'react-color'
import { getTags, updateTagById, deleteTagById } from '../../utils/api'
import dayjs from 'dayjs'
import MyHeader from '../../components/Header'
import MyLink from '../../components/Link'
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    children,
    setColor,
    color,
    ...restProps
}) => {

    const handleChangeColor = (color) => {
        setColor(color.hex)
    }
    const inputNode = inputType === 'color' ? <CirclePicker color={color} onChange={handleChangeColor} /> : <Input />
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `请输入${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
}

const TagList = () => {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [color, setColor] = useState('')
    const [updateFlg, setUpdateFlg] = useState(false)
    const isEditing = record => record._id === editingKey;
    useEffect(() => {
        let unmount = false;
        (async () => {
            let {res} = await getTags()
            if (!unmount) {
                setData(res)
            }
        })()

        return () => unmount = true
    }, [editingKey, color, updateFlg])

    const edit = record => {
        form.setFieldsValue({
            ...record,
        })
        setEditingKey(record._id)
        setColor(record.color)
    }

    const cancel = () => {
        setEditingKey('')
    }

    const save = async record => {
        let row = await form.validateFields()
        let request_body = {
            name: row.name,
            color: color,
            update_dt: Date.now()
        };
        (async () => {
            await updateTagById(record._id, request_body)
            setEditingKey('')
        })()
    }

    const deleteTag = async id => {
        (async () => {
            await deleteTagById(id)
            setUpdateFlg(!updateFlg)
        })()
    }

    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: '标签颜色',
            dataIndex: 'color',
            key: 'color',
            width: '10%',
            editable: true,
            render: (text) =>
                <div
                    tabIndex="0"
                    style={{
                        background: 'transparent',
                        height: '28px',
                        width: '28px',
                        cursor: 'pointer',
                        position: 'relative',
                        outline: 'none',
                        'borderRadius': '50%',
                        'boxShadow': text + ' 0px 0px 0px 15px inset',
                        transition: 'box-shadow 100ms ease 0s'
                    }}>
                </div>
        },
        {
            title: '更新时间',
            dataIndex: 'update_dt',
            key: 'update_dt',
            width: '15%',
            render: (text) => <div>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div>
        },
        {
            title: 'action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
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
    ];
    const mergedColumns = columns.map(col => {
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

    return (
        <Form form={form} component={false}>
            <MyHeader title="标签列表" />
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                rowKey={record => record._id}
            />
        </Form>
    )
}
export default TagList