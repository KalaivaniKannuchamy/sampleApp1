import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Button, Text } from '../../components/common';
import { PRIMARY_BUTTON, WHITE, GREEN, NEW_FLASHED_BLUE } from '../../lib/colors';
import { MEDIUM, SEMIBOLD, BOLD, REGULAR } from '../../lib/FontFamily';
const screenWidth = Math.round(Dimensions.get('window').width);

const PrimaryButton = (props) => {
  const { text, buttonStyle, onPress, backColor,textStyle, buttonColor, ...rest } = props;
const color = backColor ? GREEN : buttonColor ? buttonColor : NEW_FLASHED_BLUE
  return (
    <Button  style={[styles.button, buttonStyle,{backgroundColor: color}]} {...rest}
      onPress={onPress}>
      <Text fontWeight={SEMIBOLD} style={[styles.text, textStyle]}>{text}</Text>
    </Button>

  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    //marginHorizontal : 25,
    //flex : 1,
    width:'85%',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center'
  },
  text: {
    color: WHITE,
    fontSize: 16,
  }
});

export default PrimaryButton;
