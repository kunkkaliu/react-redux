import React from 'react';

import './index.less'


export default class Home extends React.PureComponent {
    constructor() {
        super()
    }

    render() {
        console.log("home");
        return (
            <div>
                hello baby!
            </div>
        )
    }
}
