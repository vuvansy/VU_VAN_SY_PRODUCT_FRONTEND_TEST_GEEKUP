import { useEffect, useState } from 'react';
import { ProfileOutlined, SolutionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link to='/albums'>Albums</Link>,
        key: '/albums',
        icon: <ProfileOutlined />,
    },
    {
        label: <Link to='/users'>Users</Link>,
        key: '/users',
        icon: <SolutionOutlined />
    },

];


const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [activeMenu, setActiveMenu] = useState('');

    useEffect(() => {
        const pathRoot = '/' + location.pathname.split('/')[1];

        const matchedItem = items.find(
            (item): item is MenuItem & { key: string } =>
                typeof item?.key === 'string' && pathRoot.startsWith(item.key)
        );

        const key = matchedItem?.key ?? '/albums';
        setActiveMenu(key);
    }, [location]);

    return (
        <Layout style={{ minHeight: '100vh', position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    top: 16,
                    left: collapsed ? 30 : 20, // dịch vị trí theo trạng thái Sider
                    zIndex: 1000,
                    transition: 'left 0.3s ease',
                }}
            >
                <Link to="/">
                    <img
                        src="/geekup-logo-general.svg"
                        alt="GEEK Up"
                        style={{
                            height: 40,
                            width: 100,
                        }}
                    />
                </Link>
            </div>
            <Sider
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                    {/* <Link to="/">
                        <img className='w-[100px]' src='/geekup-logo-general.svg' alt='GEEK Up - PF GI' />
                    </Link> */}
                </div>

                <Menu
                    style={{ paddingTop: 8 }}
                    selectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content
                    style={{
                        margin: '24px',
                        height: 'calc(100vh - 64px)',
                        overflow: 'auto',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutAdmin;