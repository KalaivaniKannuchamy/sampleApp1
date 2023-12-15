import React from 'react';
import { StyleSheet , Image} from 'react-native';
import { BLACK, PRIMARY_BUTTON } from '../../lib/colors';
import { BOLD, REGULAR } from '../../lib/FontFamily';
import Images from '../../lib/Images';
import { View, Text } from '../common'


const ImageWithText = () => {
    return (
        <View style={styles.splashContainer}>
            <Image
                source={Images.newvendoricon}
                resizeMode="contain"
                style={{ width: 150, height: 70, alignSelf: 'center' }}
            />
            {/* <Image
                source={Images.spalshlogo}
                resizeMode="cover"
            />
            <Text fontWeight={BOLD} style={[styles.splashText]}>Vendor <Text fontWeight={REGULAR} style={[styles.splashText, { color: BLACK }]}>Portal</Text></Text> */}
        </View>
    )
}


const styles = StyleSheet.create({
    splashContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    splashText: {
        fontSize: 22,
        letterSpacing: 1,
        marginTop: 5,
        color: PRIMARY_BUTTON
    }
})


export default ImageWithText;