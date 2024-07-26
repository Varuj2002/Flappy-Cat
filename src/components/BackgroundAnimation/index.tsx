import React, {useEffect, useRef} from 'react';
import {Animated, Easing, ImageBackground} from 'react-native';

import backgroundImage from '../../images/cloud.jpg';
import styles from './styles';

const BackgroundAnimation = () => {
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  const ANIMATION_TO_VALUE = 1;
  const ANIMATION_DURATION = 5000;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -281],
  });

  const AnimatedImageBackground =
    Animated.createAnimatedComponent(ImageBackground);

  return (
    <AnimatedImageBackground
      resizeMode="repeat"
      style={[
        styles.background,
        {
          transform: [
            {
              translateX: translateAnimation,
            },
          ],
        },
      ]}
      source={backgroundImage}
    />
  );
};

export default BackgroundAnimation;
