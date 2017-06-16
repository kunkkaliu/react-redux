import React, {Component} from 'react';
import {Route, IndexRedirect} from 'react-router';
import api from '../api';

import App from '../views/App';
import Home from '../views/Home';
import Login from '../views/Login';
import Form from '../views/Form';
import Table from '../views/Table';
import Page2 from '../views/Page2';
import Error from '../components/Error';

//按需加载组件,不过有问题,依赖的ant-design的组件还是在每一个子模块中都加载了
// const Home = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../views/Home'))
//     },'home')
// };

const validate = function (next, replace, callback) {
    api.get('/has_access', {
        data: {
            code: 'xx'
        }
    }).then(function (result) {
        if (result.code == -1) {
            replace('/403');
            callback();
        } else {
            callback();
        }
    }, function (error) {
        if (error) {
            replace('/login');
            callback();
        }
    });
};

const otherRedirect = (next, replace, callback) => {
    replace('/my');
    callback();
};

const routes = (
    <Route path="/">
        <IndexRedirect to="my"/>
        <Route component={App}>
            <Route path="pages1">
                <Route path="home" component={Home} onEnter={validate}/>
                <Route path="form" component={Form} onEnter={validate}/>
            </Route>
            <Route path="pages2">
                <Route path="table" component={Table} onEnter={validate}/>
                <Route path="card" component={Page2} onEnter={validate}/>
            </Route>
            <Route path="my" component={Error} onEnter={validate}/>
        </Route>
        <Route path="403" component={Error}/>
        <Route path="*" onEnter={otherRedirect}/>
    </Route>
);

export default routes;