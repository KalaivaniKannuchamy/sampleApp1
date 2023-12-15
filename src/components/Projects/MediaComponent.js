import React from 'react'
import { StyleSheet ,TouchableOpacity } from 'react-native'
import Images from '../../lib/Images'
import { View,Image } from '../common'
import TitleWithValue from './TitleWithValue'
const MediaComponent = ({images,socialMedia,socialId,onPress})=>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.menuMainViewStyle}>
        <Image
            source={images}
            resizeMode="contain"
            style={styles.sideIcon}
        />
        <TitleWithValue

            HeaderTitle={socialMedia}
            subHeaderTitle={socialId}
            subtextStyle={styles.subtextStyle}
            titleStyle={styles.titleStyle}
            containerStyle={styles.textStyleRequest}
        />
       
    </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    menuMainViewStyle: {
        flexDirection: 'row',
        paddingVertical: 5,
        // marginTop: 20,
        // paddingHorizontal: 10,
        alignItems: 'center',
    },
    textStyleRequest: {
        marginTop: 5,
        marginLeft: 10
    },
    subtextStyle:{
        fontSize: 14,
        marginTop:0  
    },
    titleStyle:{ 
        fontSize: 12
    }
})
export default MediaComponent;