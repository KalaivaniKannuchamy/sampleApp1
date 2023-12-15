import React from 'react'
import {StyleSheet} from 'react-native'
import { View } from '../common'
import GreyHeaderText from './GreyHeaderText'

const TotalAmount=({text,amount,amountStyle,totalView,TextStyle})=>{
    return(
        <View style={[styles.totalView,totalView]}>
        <GreyHeaderText
        text={text}
        TextStyle={[styles.TextStyle,TextStyle]}
        />
        <GreyHeaderText
        TextStyle={[styles.amount,amountStyle]}
         text={amount}
        />
    </View>
    )
}


const styles = StyleSheet.create({
totalView:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:10,
    marginTop:5,
},
amount:{
    marginRight:30,
    fontSize:12
},
TextStyle:{
    fontSize:12
}
})

export default TotalAmount;