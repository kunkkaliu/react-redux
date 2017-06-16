import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Icon, Dropdown, Menu, Popover} from 'antd';
import Menus from '../Menus';
import './index.less'

const {Header} = Layout;

export default class commonHeader extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            isNavbar: document.body.clientWidth < 769,
            menuPopoverVisible: false
        }
    }

    componentDidMount() {
        let tid;
        window.onresize = () => {
            clearTimeout(tid);
            tid = setTimeout(() => {
                const isNavbar = document.body.clientWidth < 769;
                if (isNavbar != this.state.isNavbar) {
                    this.setState({
                        isNavbar: isNavbar
                    });
                }
            }, 300)
        }
    }

    componentWillUnmount() {
        window.onresize = null;
    }

    handleLogOut = () => {
        const {logout} = this.props;
        logout().payload.promise.then(() => {
            this.context.router.replace('/login');
        });
    }

    switchMenuPopover = (e) => {
        this.setState({
            menuPopoverVisible: e
        });
    }

    render() {
        const {profile, collapsed} = this.props;
        const {isNavbar, menuPopoverVisible} = this.state;
        let username = profile.user ? profile.user.name : '';
        console.log("Header");
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.handleLogOut}>注销</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Header>
                {
                    isNavbar ?
                        <Popover overlayClassName="popover-menu" placement="bottomLeft" trigger="click"
                                 onVisibleChange={this.switchMenuPopover} visible={menuPopoverVisible}
                                 content={<Menus type="header" collapsed={false} menuTheme="light" callback={this.switchMenuPopover}/>}>
                            <div className="button-icon">
                                <Icon type="bars"/>
                            </div>
                        </Popover>
                        :
                        <div className="button-icon" onClick={this.props.toggle}>
                            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
                        </div>
                }
                <Dropdown overlay={menu} trigger={isNavbar ? ['click'] : ['hover']}>
                    <a className="ant-dropdown-link" href="#" style={{marginRight: '16px'}}>
                        <Icon type="user" /> {username} <Icon type="down" />
                    </a>
                </Dropdown>
            </Header>
        )
    }
}

commonHeader.contextTypes = {
    router: PropTypes.object.isRequired
};

