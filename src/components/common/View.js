/**
 * Created by Eswar Sairam on 18/09/20
 **/

import React from 'react';
import {
  View as ReactView,
  StyleSheet,
  ViewPropTypes,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

const View = ({
  style,
  children,
  enable,
  requiredSafeArea,
  safeAreaColor,
  ...rest
}) => {
  return (
    <ReactView
      pointerEvents={enable ? 'auto' : 'none'}
      style={[styles.defaultStyle, style]}
      {...rest}>
      {requiredSafeArea ? (
        <SafeAreaView
          style={[
            styles.defaultStyle,
            style,
            {backgroundColor: safeAreaColor},
          ]}>
          {children}
        </SafeAreaView>
      ) : (
        children
      )}
    </ReactView>
  );
};

View.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.element,
  enable: PropTypes.bool,
  requiredSafeArea: PropTypes.bool,
  safeAreaColor: PropTypes.string,
};

View.defaultProps = {
  enable: true,
  requiredSafeArea: false,
};

const styles = StyleSheet.create({
  defaultStyle: {
    // backgroundColor: WHITE
  },
});

export default View;
