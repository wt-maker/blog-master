import React from 'react'
export const fundColumns = [
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
    }
]