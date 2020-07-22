import React, { useState, useEffect } from 'react'
import { Table, Form, Card, Button, Modal } from 'antd'
import { addTag, getTags, updateTagById, deleteTagById } from '../../utils/api'
import { PlusCircleOutlined } from '@ant-design/icons';
import { computeColumns } from './tagListConfig'
import EditableCell from './editableCell'
import TagAdd from '../TagAdd'
import './tagList.scss'

const TagList = () => {

    const [form] = Form.useForm()
    const [data, setData] = useState([])
    const [editingKey, setEditingKey] = useState('')
    const [color, setColor] = useState('')
    const [updateFlg, setUpdateFlg] = useState(false)
    const [visible, setVisible] = useState(false)
    const isEditing = record => record._id === editingKey

    const formRef = React.createRef();

    useEffect(() => {
        let unmount = false;
        (async () => {
            let { res } = await getTags()
            if (!unmount) {
                setData(res)
            }
        })()

        return () => unmount = true
    }, [editingKey, updateFlg])

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

    const handleOk = async () => {

        formRef.current.validateFields()
            .then(values => {
                let name = values.tag
                let color = values.color.hex;

                (async () => {
                    await addTag({ name, color })
                    setVisible(false)
                    setUpdateFlg(!updateFlg)
                })()
            }).catch(errorInfo => { })
    }

    const mergedColumns = computeColumns(color, setColor, isEditing, save, cancel, editingKey, edit, deleteTag)

    return (
        <section>

            <Form form={form} component={false}>
                <Card id="tag-card" title="标签列表"
                    extra={<Button type="primary" onClick={()=>setVisible(true)}>
                        <PlusCircleOutlined />添加标签
                            </Button>}
                >
                    <section id="table-section">
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
                                onChange: cancel
                            }}
                            rowKey={record => record._id}
                        />
                    </section>
                </Card>
            </Form>
            <div>
                <Modal
                    title="添加标签"
                    visible={visible}
                    okText="保存"
                    cancelText="取消"
                    onOk={handleOk}
                    onCancel={()=>setVisible(false)}
                >
                    <TagAdd formRef={formRef} visible={visible}/>
                </Modal>
            </div>
        </section>
    )
}
export default TagList