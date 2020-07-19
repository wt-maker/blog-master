import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { menuList } from './menu.config'
import * as Icon from '@ant-design/icons/lib';
import { Link } from 'react-router-dom'
import './side.scss'
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const LeftNav = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} id="page-side">
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" id="page-menu">
                {
                    menuList.map((menu) => {
                        const iconType = menu.icon
                        if (!menu.child) {
                            return (
                                <Item key={menu.key} icon={React.createElement(
                                    Icon[iconType],
                                    {
                                        style: { fontSize: '16px', color: 'white' }
                                    }
                                )}>
                                    <span><Link to={menu.path}>{menu.content}</Link></span>
                                </Item>
                            )
                        } else {
                            return (
                                <SubMenu key={menu.key} title={menu.title} icon={React.createElement(
                                    Icon[iconType],
                                    {
                                        style: { fontSize: '16px', color: 'white' }
                                    }
                                )}>
                                    {menu.child.map(menu => (
                                        <Item key={menu.key} title={menu.title}>
                                            <Link to={menu.path}>{menu.content}</Link>
                                        </Item>
                                    ))}
                                </SubMenu>
                            )
                        }
                    })
                }
            </Menu>
        </Sider>
    )
}

export default LeftNav