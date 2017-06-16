import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import NavPath from '../../components/NavPath';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import {fetchProfile, logout} from '../../actions/auth';
import {getAllMenu} from '../../actions/menu';
import {appMenu} from '../../utils';
import Router from '../../components/Router';

import './index.less';

const {Content} = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
        const menuMap = new Map();
        const browseMenu = (item) => {
            menuMap.set(item.key, item);
            if (item.child) {
                item.child.forEach(browseMenu);
            }
        };
        appMenu.forEach(browseMenu);
        this.menuMap = menuMap;
        this.Router = new Router(this.props.routes);
    }

    getChildContext() {
        return {
            Router: this.Router,
            menuMap: this.menuMap
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    componentWillMount() {

    }

    componentDidMount() {
        const {actions, getAllMenu} = this.props;
        actions.fetchProfile();
        getAllMenu();
    }

    componentWillReceiveProps(nextProps, nextState) {
        const routes = nextProps.routes;
        if(routes != this.props.routes) {
            this.Router.dispatch(routes);
        }
    }

    render() {
        const {auth, actions} = this.props;
        console.log("App");
        return (
            <Layout className="ant-layout-has-sider">
                <Sidebar collapsed={this.state.collapsed} />
                <Layout>
                    <Header profile={auth} logout={actions.logout} collapsed={this.state.collapsed} toggle={this.toggle} />
                    <Content style={
                        {
                            padding: '0 16px',
                            //overflow: 'initial', 添加该属性后可以让header footer跟着content滚动
                        }
                    }>
                        <NavPath />
                        <div style={{ minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}

App.propTypes = {
    user: PropTypes.object,
    children: PropTypes.node
};

App.childContextTypes = {
    Router: PropTypes.object,
    menuMap: PropTypes.object
};

const mapStateToProps = (state) => {
    const {auth} = state;
    return {
        auth: auth ? auth : null
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({fetchProfile, logout}, dispatch),
        getAllMenu: bindActionCreators(getAllMenu, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
