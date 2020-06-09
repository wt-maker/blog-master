import React, { useState, useEffect} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, PageHeader } from 'antd';
import dayjs from 'dayjs'
import axios from 'axios'

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
                            message: `Please Input ${title}!`,
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
    },[editingKey])

    const edit = record => {
        form.setFieldsValue({
            ...record,
        })
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async record => {
        let row = await form.validateFields();
        let request_body = {
            ...row,
            update_dt:Date.now()
        }
        
        try {
            axios.post(`/api/updateTag/${record._id}`,request_body).then(
                ()=>{
                    setEditingKey('')
                }
            )
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

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
            editable: false,
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
                            Save
                        </a>
                        <Popconfirm title="确认取消?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </a>
                    );
            },
        },
    ];
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
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