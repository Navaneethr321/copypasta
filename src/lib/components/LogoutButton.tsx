import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { colors } from '../constants';

const LogoutButton = styled(Feather).attrs(({
  size: 25,
  name: 'power',
  color: colors.white
}))``;

export default LogoutButton;