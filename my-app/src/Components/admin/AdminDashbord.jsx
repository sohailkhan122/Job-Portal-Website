import React, { useState } from 'react';
import {
  ContactsOutlined,
  DisconnectOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import ApplyUser from './ApplyUser';
import { useNavigate } from 'react-router-dom';
import DisabledJobs from './DisabledJobs';
import AdminJobs from './AdminJobs';

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');
  const handleMenuClick = (key) => {
    setSelectedMenuKey(key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedMenuKey) {
      case '1':
        return <ApplyUser />;
      case '2':
        return <AdminJobs />;
      case '3':
        return <DisabledJobs />;
      case '4':
        return navigate('/login');
      default:
        return null;
    }
  };

  return (
    <Layout style={{ width: '100%', height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h1 style={{ color: 'white', padding: '10px' }}>Admin Dashboard</h1>
        <Menu
          style={{ marginTop: '20px' }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenuKey]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'User Apply',
            },
            {
              key: '2',
              icon: <ContactsOutlined />,
              label: 'Created Jobs',
            },
            {
              key: '3',
              icon: <DisconnectOutlined />,
              label: 'Disabled Jobs',
            },
            {
              key: '4',
              icon: <LoginOutlined />,
              label: 'Log Out',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'scroll'
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
