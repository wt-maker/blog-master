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
    const [tag, setTag] = useState('')
    const [updateFlg, setUpdateFlg] = useState(false)
    const [visible, setVisible] = useState(false)
    const isEditing = record => record._id === editingKey

    useEffect(() => {
        let unmount = false;
        (async () => {
            let { res } = await getTags()
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
    const showModal = () => {
        setTag('')
        setColor('rgb(244, 67, 54)')
        setVisible(true)
    }

    const handleOk = () => {
        let request_body = {
            name: tag,
            color: color
        };
        (async () => {
            await addTag(request_body)
            setVisible(false)
            setUpdateFlg(!updateFlg)
        })()
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const mergedColumns = computeColumns(color, setColor, isEditing, save, cancel, editingKey, edit, deleteTag)

    return (
        <section>

            <Form form={form} component={false}>
                <Card id="tag-card" title="标签列表"
                    extra={<Button type="primary"onClick={showModal}>
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
                    onCancel={handleCancel}
                >
                    <TagAdd setColor={setColor} setTag={setTag} color={color}/>
                </Modal>
            </div>
        </section>
    )
}
export default TagList