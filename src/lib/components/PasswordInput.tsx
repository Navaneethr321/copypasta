import styled from 'styled-components/native';

import Input from './Input';

const PasswordInput = styled(Input).attrs(({
  autoCorrect: false,
  secureTextEntry: true,
  placeholder: 'password',
  autoCompleteType: 'password',
}))``;

export default PasswordInput;