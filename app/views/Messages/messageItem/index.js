import React from 'react'
import { View, Text } from 'react-native'
import { BannerView } from '../CardView';
import ChatBubble from '../chatbubble';
import { TEXT_TYPE, IMAGE_TYPE, VIDEO_TYPE, BANNER_TYPE, CNF_TYPE } from "../data"
import ImageView from '../imageView';
import VideoView from '../videoView';

const MessageItem = ({ ...props }) => {
    const { data } = props;
    let activeItem = null;
    debugger;
    if (data.hasOwnProperty("messageType")) {
        if (data.messageType === BANNER_TYPE) {
            activeItem = <BannerView
                {...props}
            />
        }
        else {
            activeItem = <ChatBubble
                {...props}
            />
        }
    } else {    // need to remove messageType  will came always
        activeItem = <BannerView
            {...props}
        />

    }

    return activeItem;
}

export default MessageItem