import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { colors } from '../constants';

const LockButton = styled(Feather).attrs(({
  size: 25,
  name: 'lock',
  color: colors.blue
}))``;

export default LockButton;