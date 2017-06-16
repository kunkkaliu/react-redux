import React from 'react';
import {Row, Col, Table, Alert, Icon} from 'antd';
import PanelBox from '../../components/PanelBox';

import './index.less'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    width: 150,
}, {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const tableData = [];
for (let i = 0; i < 100; i++) {
    tableData.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

export default class Home extends React.PureComponent {
    constructor() {
        super()
    }

    componentWillMount() {
    }

    componentWillReceiveProps() {
    }

    callback() {

    }

    render() {
        console.log("home");
        return (
            <div>
                <Alert
                    message="消息提示的文案"
                    description="消息提示的辅助性文字介绍消息提示的辅助性文，字介绍消息提示的辅助性文字介绍"
                    type="info"
                    showIcon
                    style={{marginBottom: '10px'}}
                />
                <Row gutter={16} type="flex" justify="space-between">
                    <Col xs={24} md={14}>
                        <Row gutter={16} type="flex" justify="space-between">
                            <Col xs={24} md={8}>
                                <PanelBox className="card-item">
                                    <Icon type="pay-circle-o"/>
                                    <ul>
                                        <li>$25,000</li>
                                        <li>今日收入</li>
                                    </ul>
                                </PanelBox>
                            </Col>
                            <Col xs={24} md={8}>
                                <PanelBox className="card-item">
                                    <Icon type="pay-circle-o"/>
                                    <ul>
                                        <li>$25,000</li>
                                        <li>今日收入</li>
                                    </ul>
                                </PanelBox>
                            </Col>
                            <Col xs={24} md={8}>
                                <PanelBox className="card-item">
                                    <Icon type="pay-circle-o"/>
                                    <ul>
                                        <li>$25,000</li>
                                        <li>今日收入</li>
                                    </ul>
                                </PanelBox>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <PanelBox title="最近的数据">
                    <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 50 }} scroll={{ y: 240 }}/>
                </PanelBox>
            </div>
        )
    }
}
