import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants';

const CloseButton = styled(Ionicons).attrs(({
  size: 40,
  name: 'ios-close',
  color: colors.white,
}))``;

export default CloseButton;