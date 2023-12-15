/** 
 * Created by Eswar Sairam on 19/09/20
 * In thi class it requires 3 inputs. 
 * 1) style of a image.
 * 2) source of a image
 * 3) resizeMode of a image
 * 4) placeHolder of the image to shw as defalut until image load. It should give like this require('path/of/image')
 * 5) (...rest) other one properties of the Image
 **/

import React, { useState } from 'react';
import { View, Image as ReactImage, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import { GRAY_TEXT, PRIMARY_BUTTON } from '../../lib/colors';
import Images from '../../lib/Images';

const Image = ({ style, source, resizeMode, placeHolder, ...rest }) => {

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
        <View style={styles.container}>
            {(source && source.uri) ? (
                <View>
                    {!loaded && <ReactImage resizeMode={'contain'} style={[styles.placeholderImage, style]} source={placeHolder} />}
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
        </View>
    )
}

Image.propTypes = {
    style: ReactImage.propTypes.style,
    source: PropTypes.any,
    resizeMode: PropTypes.string,
    placeHolder: PropTypes.any,
}

Image.defaultProps = {
    placeHolder: Images.noImage,
    resizeMode: 'cover'
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        justifyContent: 'center'
    },
    defaultStyle: {
        overflow: 'hidden',
        // width: Dimensions.get('window').width,
        // minHeight: 200
    },
    fastImage: {
        flex: 1
    },
    placeholderImage:{
        overflow: 'hidden',
        // borderWidth:1,
        // borderColor:GRAY_TEXT
    }
})

export default Image;