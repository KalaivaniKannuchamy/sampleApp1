/** 
 * Created by Eswar Sairam on 19/09/20
 * In thi class it requires 3 inputs. 
 * 1) style of a image.
 * 2) source of a image
 * 3) resizeMode of a image
 * 4) placeHolder of the image to shw as defalut until image load. It should give like this require('path/of/image')
 * 5) (...rest) other one properties of the Image
 **/

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Dimensions, Image as ReactImage, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../../lib/Images';

const ImageButton = ({touchableStyle, disable,containerStyle,style, source, resizeMode, placeHolder, onPress, ...rest }) => {

    const [loaded, setLoaded] = useState(false)

    const fastImageResizeMode = () => {
        switch (resizeMode) {
            case "contain":
                return FastImage.resizeMode.contain
            case "center":
                return FastImage.resizeMode.center
            case "cover":
                return FastImage.resizeMode.cover
            case "stretch":
                return FastImage.resizeMode.stretch
            default:
                return FastImage.resizeMode.cover
        }
    }

    return (
        <View pointerEvents={ disable ? 'none' : 'auto'} style={[styles.container,containerStyle]}>
            <TouchableOpacity
                activeOpacity={1}
                style={touchableStyle}
                onPress={onPress}>
                {(source && source.uri) ? (
                    <View>
                        {!loaded && <ReactImage style={[styles.defaultStyle, style]} source={placeHolder} />}
                        <FastImage
                            style={[styles.defaultStyle, style, loaded ? { position: 'relative' } : { position: 'absolute' }]}
                            source={source}
                            resizeMode={fastImageResizeMode()}
                            onLoadEnd={() => {
                                setLoaded(true)
                            }}
                        />
                    </View>
                ) : <ReactImage style={[styles.defaultStyle, style]} {...rest} source={source} resizeMode={resizeMode} />}

            </TouchableOpacity>
        </View>
    )
}

ImageButton.propTypes = {
    style: ReactImage.propTypes.style,
    source: PropTypes.any,
    resizeMode: PropTypes.string,
    placeHolder: PropTypes.any,
}

ImageButton.defaultProps = {
    placeHolder: images.logo_4_line,
    resizeMode: 'cover',
    disable:false
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        justifyContent: 'center'
    },
    defaultStyle: {
        overflow: 'hidden',
        // width: Dimensions.get('window').width,
        // height: 200
    },
    fastImage: {
        flex: 1
    }
})

export default ImageButton;