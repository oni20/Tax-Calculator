import React from 'react';
import PropTypes from 'prop-types';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const LottiePlayer = (props) => {
    const { imageSource, imageStyle, visibleControl, isAutoPlay, isLoop, isKeepLastFrame } = props;

    return (
        <Player
            autoplay={isAutoPlay}
            loop={isLoop}
            src={imageSource}
            style={imageStyle}
            keepLastFrame={isKeepLastFrame}
        >
            <Controls visible={visibleControl} buttons={['play', 'repeat', 'frame', 'debug']} />
        </Player>
    );
};

LottiePlayer.defaultProps = {
    isAutoPlay: true,
    isLoop: true,
    imageStyle: { height: '300px', width: '300px' },
    isKeepLastFrame: false
};

LottiePlayer.propTypes = {
    imageSource: PropTypes.string.isRequired
};

export default LottiePlayer;