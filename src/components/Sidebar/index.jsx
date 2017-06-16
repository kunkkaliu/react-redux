import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Icon} from 'antd';
import {Link} from 'react-router';
import Menus from '../Menus';


import './index.less'

const {Sider} = Layout;

class Sidebar extends React.PureComponent {

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const {collapsed} = this.props;
        console.log("Sidebar");
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className="ant-layout-logo"></div>
                <Menus type="sidebar" collapsed={collapsed} menuTheme="dark"/>
            </Sider>
        )
    }
}

Sidebar.propTypes = {
    collapsed: PropTypes.bool
};
Sidebar.contextTypes = {
    router: React.PropTypes.object
};

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
