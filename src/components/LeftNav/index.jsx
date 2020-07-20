import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { menuList } from './menu.config'
import { useLocation, Link } from 'react-router-dom'
import * as Icon from '@ant-design/icons/lib';
import './side.scss'
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const LeftNav = (props) => {


    const [collapsed, setCollapsed] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState([])
    const [openKeys, setOpenKeys] = useState([])
    const location = useLocation()
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    const getSelectKey = (list, pathname) => {
        for (let menu of list) {
            if (!menu.child) {
                if (menu.path === pathname) {
                    return { selectedKey: menu.key }
                }
            } else {
                let result = getSelectKey(menu.child, pathname)
                if (result) {
                    return { ...result, openKey: menu.key }
                }
            }
        }
    }

    useEffect(() => {
        let { selectedKey, openKey } = getSelectKey(menuList, props.location.pathname)
        setSelectedKeys([selectedKey])
        setOpenKeys([...openKeys, openKey])
    }, [location])

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} id="page-side">
            <Menu theme="dark"
                mode="inline"
                id="page-menu"
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={(openKeys) => {
                    setOpenKeys([...openKeys])
                }}
            >
                {
                    menuList.map((menu) => {
                        let iconType = menu.icon
                        if (!menu.child) {
                            return (
                                <Item key={menu.key} icon={React.createElement(
                                    Icon[iconType],
                                    {
                                        style: { fontSize: '16px', color: 'white' }
                                    }
                                )}>
                                    <Link to={menu.path}>{menu.content}</Link>
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
                                    {menu.child.map(menu => {
                                        return (
                                            <Item key={menu.key} title={menu.title} icon={React.createElement(
                                                Icon[menu.icon],
                                                {
                                                    style: { fontSize: '16px', color: 'white' }
                                                }
                                            )}>
                                                <Link to={menu.path}>{menu.content}</Link>
                                            </Item>
                                        )
                                    })}
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