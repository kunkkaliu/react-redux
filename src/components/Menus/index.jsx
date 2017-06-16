import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router';
import {updateOpenKeys} from '../../actions/menu';

const SubMenu = Menu.SubMenu;

import './index.less';

class Menus extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            routes: null
        }
    }

    forceUpdateRoutes() {
        this.setState({
            routes: this.context.Router.routes
        })
    }

    componentDidMount() {
        const {menuMap, Router} = this.context;
        Router.subscribe(`menus${this.props.type}`, () => this.forceUpdateRoutes());
        let openkeys = [];
        Router.routes.forEach((route)=> {
            const item = menuMap.get(route.path);
            if(item && item.child && item.child.length > 0) {
                openkeys.push(`sub${item.key}`);
            }
        });
        this.props.updateOpenKeys(openkeys);
    }

    componentWillUnmount() {
        this.context.Router.unsubscribe(`menus${this.props.type}`);
    }

    onOpenChange = (openKeys) => {
        const props = this.props;
        const latestOpenKey = openKeys.find(key => !(props.openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = [].concat(latestOpenKey);
        }
        this.props.updateOpenKeys(nextOpenKeys);
    }


    menuClickHandle = (item) => {
        this.props.callback && this.props.callback(false);
    }

    getMenus = (items, path) => {
        return items.map((item, i) => {
            if(!item.child || item.child.length == 0) {
                return (
                    <Menu.Item key={'menu' + item.key}>
                        <Link to={path + '/' + item.key}>{<span>{item.icon && <Icon type={item.icon} />}<span className="nav-menu-text">{item.name}</span></span>}</Link>
                    </Menu.Item>
                )
            }
            return (
                <SubMenu
                    key={'sub' + item.key}
                    title={<span>{item.icon && <Icon type={item.icon} />}<span className="nav-sub-text">{item.name}</span></span>}
                >
                    {this.getMenus(item.child, path + '/' + item.key)}
                </SubMenu>
            )
        })
    }

    render() {
        let {items, collapsed, menuTheme, openKeys} = this.props;
        const {menuMap, Router} = this.context;
        const routes = this.state.routes || Router.routes;
        console.log("Menus");
        let menuProps = !collapsed ? {
            onOpenChange: this.onOpenChange,
            openKeys: openKeys
        } : {};
        let activeKey = '';
        routes.forEach((route)=> {
            const item = menuMap.get(route.path);
            if(item) {
                activeKey = 'menu' + item.key;
            }
        });
        return (
            <Menu
                {...menuProps}
                mode={collapsed ? 'vertical' : 'inline'} theme={menuTheme}
                selectedKeys={[activeKey]}
                onClick={this.menuClickHandle}
            >
                {this.getMenus(items, '')}
            </Menu>
        )
    }
}

Menus.propTypes = {
    items: PropTypes.array,
    openKeys: PropTypes.array,
    collapsed: PropTypes.bool,
    menuTheme: PropTypes.string,
    callback: PropTypes.func,
    type: PropTypes.string
};

Menus.defaultProps = {
};

Menus.contextTypes = {
    Router: PropTypes.object,
    menuMap: PropTypes.object
};

function mapStateToProps(state) {
    return {
        items: state.menu.items,
        openKeys: state.menu.openKeys
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateOpenKeys: bindActionCreators(updateOpenKeys, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menus)
