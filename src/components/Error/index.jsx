import React from 'react';
import {Icon} from 'antd';
import './index.less';

/**
 * 显示错误信息
 * 可以当404页来用
 */
class Error extends React.PureComponent {

    render() {
        const {errorMsg, route} = this.props;
        let msg = "404 Not Found";
        const path = route && route.path;
        switch (path) {
            case "403":
                msg = "您没有相关权限!";
                break;
            default:
                msg = errorMsg || '404 Not Found';
        }
        return (
            <div className="not-found">
                <div style={{ fontSize:32 }}><Icon type="frown-o"/></div>
                <h1>{msg}</h1>
            </div>
        );
    }

}

export default Error;