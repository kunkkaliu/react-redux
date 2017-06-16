import React from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb} from 'antd';

import './index.less';

class NavPath extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            routes: null
        }
    }

    componentDidMount() {
        this.context.Router.subscribe('navpath', () => this.forceUpdateRoutes());
    }

    componentWillUnmount() {
        this.context.Router.unsubscribe('navpath');
    }

    forceUpdateRoutes = () => {
        this.setState({
            routes: this.context.Router.routes
        })
    }

    render() {
        console.log("nav path");
        const {menuMap, Router} = this.context;
        const routes = this.state.routes || Router.routes;
        const bread = [];
        routes.forEach((route)=> {
            const item = menuMap.get(route.path);
            if(item) {
                bread.push(<Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>);
            }
        });
        return (
            <Breadcrumb style={{ margin: '20px 0' }}>
                <Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>
                {bread}
            </Breadcrumb>
        )
    }
}

NavPath.contextTypes = {
    Router: PropTypes.object,
    menuMap: PropTypes.object
};

export default NavPath;
