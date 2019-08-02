import React, { memo, FC } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { colors, styles } from '../constants';

interface Props {
  style?: any,
  onPress: (() => any);
  loading?: boolean;
}

const SIZE = 50;

const Container = styled.TouchableOpacity`
  width: 90px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${colors.blue};
  ${styles.centerContent}
`;

const CheckIcon = styled(Feather).attrs(({
  size: 30,
  name: 'check',
  color: colors.white,
}))``;

// const LoadingIndicator = styled.ActivityIndicator.attrs(({
//   size: 30,
//   color: colors.white,
// }))``;

const CheckButton: FC<Props> = memo(({
  style,
  onPress,
  loading,
}) => (
  <Container 
    style={style}
    disabled={loading}
    onPress={onPress}
  >
    {loading ? (
      <ActivityIndicator color={colors.white} />
    ): (
      <CheckIcon />
    )}
  </Container>
));

export default CheckButton;

