import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MessageLists from '../../Messages/listView';
import { getObject } from '../../../middleware';
import { createChatChannel } from '../../../actions/chat';
import { connect } from 'react-redux';

var chanelObj = {
    firstUser: "Amit",
    secondUser: "Payal"
}

class Chat extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        console.log("MsgPrppp", props)
        // this.state = {
        //     channelId: null,
        // };

    }

    // componentDidMount() {
    //     getObject('UserId').then((obj) => {
    //         this.setState({ loading: true }, () => {
    //             this.props.dispatch(createChatChannel(obj, chanelObj, (res, data) => {
    //                 console.log('---->> ', data);
    //                 this.setState({
    //                     channelId: data.id,
    //                 })
    //             }))
    //         })
    //     })
    // } channelId={this.state.channelId}

    render() {
        return (
            <MessageLists {...this.props} />
        )
    }
}

function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        // ChatData: entities.chat
    };
}

export default connect(mapStateToProps)(Chat);


