import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
// Styles
import 'antd/dist/antd.css';
import './assets/css/navigation.css';

// Components
import Clients from './client';
import Recharge from './recharge';
import Payment from './payment';
import Balance from './balance';

const { Header, Content, Footer } = Layout;


const TopMenu = () => {
    
    const [selected, setSelected] = useState(localStorage.getItem("nav") === undefined ? 1 : localStorage.getItem("nav"))
    const setNavigation = (key) => {
        setSelected(key);
        localStorage.setItem("nav", key)
    }
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selected]}>
                    <Menu.Item key="1" onClick={() => setNavigation(1)}>Registrar cliente</Menu.Item>
                    <Menu.Item key="2" onClick={() => setNavigation(2)}>Recargar billetera</Menu.Item>
                    <Menu.Item key="3" onClick={() => setNavigation(3)}>Pagar</Menu.Item>
                    <Menu.Item key="4" onClick={() => setNavigation(4)}>Consultar saldo</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout"  style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380, marginTop: 40, minHeight: "85vh" }}>
                    {String(selected) === String(1) ? <Clients/> : null}
                    {String(selected) === String(2) ? <Recharge/> : null}
                    {String(selected) === String(3) ? <Payment/> : null}
                    {String(selected) === String(4) ? <Balance/> : null}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', height: "65px", width: "100%", position:"absolute", bottom: 0 }}>Footer ©2021 </Footer>
        </Layout>
    );
}

export default TopMenu
