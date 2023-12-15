/** 
 * Created by Eswar Sairam on 17/09/20
 * In thi class it requires 2 inputs. One is style and (...rest) other one properties of the text.
 * 1) style is the style given to text title style.
 * 2) (...rest) other one properties of the Button for the properties you check https://callstack.github.io/react-native-paper/text.html.
 **/

import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-paper';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import {
  AsyncStorage,

  View
} from '../../components/common';
import strings from '../../lib/AppStrings';
import AsyncStorageKeys from '../../lib/AsyncStorageKeys';
import { WHITE, BLACK, NOTIFICATION_COLOR, PRIMARY_BUTTON } from '../../lib/colors';
import WSCall from './WSHelper/WSCall';

const NotificationBadge = ({ hideNotification, onNotificationClick ,homeIcon,notiIcon}) => {


  const [notifications, setNotificationCount] = useState(0)
  useEffect(() => {
    callNotificationApi()
  }, [])
  const callNotificationApi = async () => {
    const customerId = await AsyncStorage.getData(AsyncStorageKeys.customer_id)
    var inputParams = {
      customer_id: customerId,
    }

    WSCall.getResponse(strings.api_names.notification_count, inputParams, 'post', async (response, error) => {
      if (response != null) {
        if (response.settings.success == 1) {
          console.log("running",response);
          setNotificationCount(response.data.notification_count)
          let stringArary = await AsyncStorage.getData(AsyncStorageKeys.user_data)
          if (!(stringArary == '')) {
            var userData = JSON.parse(stringArary)
            console.log("runningdata",userData);
            userData[0].notificationCount = response.data.notification_count
            AsyncStorage.saveData(AsyncStorageKeys.user_data, JSON.stringify(userData));
          }

        }
      }
    })
  }




  return (
    <TouchableOpacity
      onPress={() => {
        if (onNotificationClick != null) {
          onNotificationClick()
        }
      }}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
      {
        hideNotification == true ?
          <View style={{ width: 40 }} /> :
          <View style={{ alignSelf: 'center', }}>
            <NotificationIcon
              name={'notifications-sharp'}
              color={homeIcon ? '#222222' : WHITE}
              size={28}
              style={{
                marginEnd: 10,
                marginTop: 5
              }}
              onPress={() => {

              }} />
            {
              notifications == 0 ? null :
                <Badge
                  style={[styles.bagdeStyle,{
                    bottom : 14,
                    left : 10,
                    backgroundColor: homeIcon ? PRIMARY_BUTTON : NOTIFICATION_COLOR,
                    borderColor : homeIcon ? WHITE :PRIMARY_BUTTON,
                  }]}
                  size={20}
                >{notifications.length > 2 ? '99+' : notifications }</Badge>
            }

          </View>
      }

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bagdeStyle: {
    position: 'absolute',
    //end: 5,
    marginTop: 5,
    borderWidth : 1,
    borderColor :PRIMARY_BUTTON,
    
    // color:BLACK
  },


});


export default NotificationBadge;