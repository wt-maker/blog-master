import React from 'react'
import { Input, Form } from 'antd'
import { CirclePicker } from 'react-color'
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
    )
}

export default EditableCell