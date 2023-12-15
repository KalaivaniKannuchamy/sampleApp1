import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, useWindowDimensions } from 'react-native'
import { COMPLETED_CLR, CURRENT_CLR, PLACEHOLDER } from '../../lib/colors';
import { isTablet } from 'react-native-device-info';


const height = Dimensions.get('screen').height
const Flowstep = ({ currentScreen }) => {
    const width = useWindowDimensions().width

    const FlowData = [
        {
            "id": "1",
            "completed": false,
            "current": false
        },
        {
            "id": "2",
            "completed": false,
            "current": false
        },
        {
            "id": "3",
            "completed": false,
            "current": false
        },
        {
            "id": "4",
            "completed": false,
            "current": false
        },
        {
            "id": "5",
            "completed": false,
            "current": false
        },
        {
            "id": "6",
            "completed": false,
            "current": false
        }
    ]
    const tempData1 = ["1", "2", "3", "4", "5", "6"]
    const [tempData, setTempData] = useState(FlowData)
    useEffect(() => {
        colorFlow()
    }, [])
    const colorFlow = () => {
        let arr = [...tempData]
        for (let elem of arr) {
            if (currentScreen > elem.id) {
                elem.completed = true;
            }
            else if (currentScreen === elem.id) {
                elem.current = true;
                break;
            }

        }
        setTempData(arr)
    }
    return (
        <View style={[styles.container,{width: width - 35}]}>
            {
                tempData.map((item, index) => {
                    return (
                        <View key={item.index} style={styles.mapContainer}>
                            <View
                                style={[styles.sphere,
                                {
                                    borderColor: item.current === true ? CURRENT_CLR : item.completed === true ? COMPLETED_CLR : PLACEHOLDER,
                                    height: isTablet() ?  width * 0.03 : width * 0.04 ,
                                    width: isTablet() ?  width * 0.03 : width * 0.04 ,
                                    borderRadius: isTablet() ?  width * 0.015 : width * 0.02 ,
                                    backgroundColor: item.current === true ? CURRENT_CLR : item.completed === true ? COMPLETED_CLR : 'transparent'
                                }]}
                            />
                            {
                                item.id == "6" ?
                                    null :
                                    (
                                        tempData1.map((elem, index) => {
                                            return (
                                                <View
                                                    style={[styles.borderline, {
                                                        borderColor: item.current === true || item.completed === true ? COMPLETED_CLR : PLACEHOLDER,
                                                        width: isTablet() ?  (((width - 35) - width * 0.03) / 6 - 12) / 6 :  (((width - 35) - width * 0.04) / 6 - 12) / 6.5,
                                                    }]}
                                                />

                                            )
                                        })
                                    )

                            }

                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    mapContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    sphere: {

        borderWidth: 2,
    },
    borderline: {

        marginHorizontal: 1,
        borderRadius: 1,
        borderWidth: 0.5,
    }

})


export default Flowstep;
