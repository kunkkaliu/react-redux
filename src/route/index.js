import React, {Component} from 'react';
import {Route, IndexRedirect} from 'react-router';
import api from '../api';

import App from '../views/App';
import Home from '../views/Home';

//按需加载组件,不过有问题,依赖的ant-design的组件还是在每一个子模块中都加载了
// const Home = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../views/Home'))
//     },'home')
// };

const validate = function (next, replace, callback) {
    callback();
};

const routes = (
    <Route path="/">
        <IndexRedirect to="home"/>
        <Route component={App}>
            <Route path="home" component={Home} onEnter={validate}/>
        </Route>
    </Route>
);

export default routes;