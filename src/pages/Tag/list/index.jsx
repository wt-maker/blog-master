import React, { useState, useEffect} from 'react'
import { Table, Input, Popconfirm, Form, PageHeader } from 'antd'
import { CirclePicker } from 'react-color'
import dayjs from 'dayjs'
import axios from 'axios'

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
    const inputNode = inputType == 'color' ? <CirclePicker color={color} onChange={handleChangeColor} /> : <Input />
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
};

const ArticleTags = () => {
    
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [color, setColor] = useState('')
    const isEditing = record => record._id === editingKey;

    useEffect(()=>{
        axios.get('/api/getAllTags').then(
            (response) => {
                let tags = response.data.res
                setData(tags)
            },
            ({response}) => {
                console.log(response)
            }
        )
    },[editingKey,color])

    const edit = record => {
        form.setFieldsValue({
            ...record,
        })
        setEditingKey(record._id);
        setColor(record.color)
    }

    const cancel = () => {
        setEditingKey('');
    }

    const save = async record => {
        let row = await form.validateFields();
        console.log(row)
        let request_body = {
            name:row.name,
            color:color,
            update_dt:Date.now()
        }
        
        try {
            axios.post(`/api/updateTag/${record._id}`,request_body).then(
                ()=>{
                    setEditingKey('')
                }
            )
        } catch (error) {
            console.log('Validate Failed:', error);
        }
    }

    const deleteTag = async id => {
        console.log(id)
        try {
            axios.get(`/api/deleteTag/${id}`).then(
                ()=>{
                    setEditingKey('')
                }
            )
        } catch (error) {
            
        }
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
            width: '15%',
            editable: true,
        },
        {
            title: '更新时间',
            dataIndex: 'update_dt',
            key: 'update_dt',
            width: '15%',
            render: (text)=><div>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div>
        },
        {
            title: 'action',
            dataIndex: 'action',
            key: 'action',
            render: (_,record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                        </a>
                        <Popconfirm title="确认取消?" onConfirm={cancel}>
                            <a>取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <span>
                            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                                修改
                            </a>
                            <Popconfirm title="确认删除?" onConfirm={deleteTag(record._id)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    );
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
                inputType: col.dataIndex === 'color' ? 'color' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                setColor:setColor,
                color
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <PageHeader className="site-page-header" title="标签列表" />
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
    );
}
export default ArticleTags
