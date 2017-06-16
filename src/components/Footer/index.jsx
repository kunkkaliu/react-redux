import React from 'react'

import { Layout } from 'antd'

import './index.less'

const { Footer } = Layout;

export default class commonFooter extends React.PureComponent {
  constructor () {
    super()
  }

  render () {
    console.log("footer");
    return (
      <Footer style={{ textAlign: 'center' }}>
        瓜子无线 版权所有 © 2017 wuxian.guazi.com
      </Footer>
    )
  }
}
