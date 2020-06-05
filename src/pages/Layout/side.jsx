import React from 'react'
import { Layout, Menu} from 'antd';
import { menuList } from './menu.config'
import * as Icon from'@ant-design/icons/lib';
import { Link } from 'react-router-dom'
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

export default class Side extends React.Component {

    state = {
        collapsed: false,
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    }

    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {
                        menuList.map((menu) => {
                            const iconType = menu.icon
                            if (!menu.child) {
                                return (
                                    <Item key={menu.key} icon={React.createElement(
                                        Icon[iconType],
                                        {
                                            style:{ fontSize: '16px', color: '#08c' }
                                        }
                                    )}>
                                        <span>{menu.content}</span>
                                    </Item>
                                )
                            } else {
                                return (
                                    <SubMenu key={menu.key} title={menu.title} icon={React.createElement(
                                        Icon[iconType],
                                        {
                                            style:{ fontSize: '16px', color: '#08c' }
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
}