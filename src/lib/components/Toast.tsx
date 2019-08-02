import React, { FC, memo, useMemo, useEffect } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { colors, styles } from '../constants';

const {
  Value
} = Animated;

interface Props {
  text: string;
}

const Container = styled(Animated.View)`
  position: absolute;
  top: 20px;
  align-self: center;
  height: 50px;
  width: 250px;
  border-radius: 4px;
  background-color: ${colors.gray};
  ${styles.centerContent}
`;

const Text = styled.Text`
  font-weight: bold;
  color: ${colors.white};
`;

const Toast: FC<Props> = memo(({ text }) => {
  const {
    scale,
    opacity,
  } = useMemo(() => ({
    scale: new Value(0.95),
    opacity: new Value(0),
  }), []);

  useEffect(() => {
    Animated.timing(
      opacity, 
      { 
        duration: 300,
        toValue: 1, 
        useNativeDriver: true, 
      }
    ).start();
    Animated.timing(
      scale, 
      { 
        duration: 300,
        toValue: 1, 
        useNativeDriver: true, 
      }
    ).start();


    return () => {
      Animated.timing(
        opacity, 
        { 
          duration: 300,
          toValue: 1, 
          useNativeDriver: true, 
        }
      ).start();
    }
  }, []);

  return (
    <Container 
      style={{ 
        opacity,
        transform: [
          { scaleX: scale }, 
          { scaleY: scale }
        ],
      }}
    >
      <Text>{text}</Text>
    </Container>
  )
});

export default Toast;
