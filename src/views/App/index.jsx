import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Footer from '../../components/Footer';

import './index.less';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("App");
        return (
            <div>
                {this.props.children}
                <Footer></Footer>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node
};

const mapStateToProps = (state) => {
    return {

    };
};

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
