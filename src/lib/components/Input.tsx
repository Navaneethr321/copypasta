import styled from 'styled-components/native';

import { colors } from '../constants';

const Input = styled.TextInput`
  width: 100%;
  min-height: 50px;
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 20px;
  border-radius: 25px;
  color: ${colors.white};
  background-color: ${colors.gray};
  margin-bottom: ${props => props.spaceBottom ? 12 : 0}px;
`;

export default Input;
