import React from 'react'

const style = {
    'backgroundColor': 'rgba(0, 0, 0, 0)',
    'border': 'none',
    'color': '#40a9ff',
    'fontSize': '13px',
    'cursor': 'pointer',
    'outline': 'none'
}
export default class MyLink extends React.Component {
    render() {
        return (
            <button className="link-button" {...this.props} style={style}></button >
        )
    }
}