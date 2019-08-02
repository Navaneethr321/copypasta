import React, { FC, memo, useState } from 'react';
import styled from 'styled-components/native';

import { Routes, colors } from '../lib/constants';
import { useNavigation } from '../lib/hooks';
import { signIn } from '../lib/services/cloudFunctions';
import { auth } from '../lib/services/firebase';
import { 
  Input,
  CheckButton,
  ScreenContainer,
  Content,
  PasswordInput,
} from '../lib/components';
import { 
  isValidFirebaseKey,
} from '../lib/utils';

const ErrorText = styled.Text`
  margin-bottom: 8px;
  color: ${colors.red};
`;

const UsernameInput = styled(Input).attrs(({
  spaceBottom: true,
  autoCorrect: false,
  placeholder: 'username',
  autoCompleteType: 'username',
}))``;

const StyledPasswordInput = styled(PasswordInput).attrs(({
  spaceBottom: true,
}))``;

const initialState = {
  username: '',
  password: '',
  loading: false,
  showPassword: false,
  error: null,
};

const OnboardingScreen: FC = memo(() => {
  const navigation = useNavigation();
  const [{
    loading,
    username,
    password,
    showPassword,
    error,
  }, setState] = useState(initialState);

  const mergeState = (newState: any) => {
    setState(s => ({ ...s, ...newState }));
  }

  const handleSubmit = async () => {
    mergeState({ loading: true });

    const res = await signIn({ username, password });
    const { data: { errorType, data: token } } = res;
    
    if (errorType === 'NEEDS_PASSWORD') {
      mergeState({
        loading: false,
        showPassword: true,
      });
      return;
    }

    if (errorType === 'WRONG_PASSWORD') {
      mergeState({ 
        loading: false,
        error: 'wrong password'
      });
      return;
    }

    if (token) {
      const user = await auth.signInWithCustomToken(token);
      if (user) navigation.navigate(Routes.Home); 
    }

    mergeState({ loading: false });
  };

  const setUsername = (username: string) => {
    mergeState({
      username,
      error: isValidFirebaseKey(username) 
        ? null
        : 'only letters and numbers in username'
    });
  }

  const setPassword = (password: string) => {
    mergeState({ password });
  }

  return (
    <ScreenContainer>
      <Content>
        <ErrorText>{error}</ErrorText>
        <UsernameInput 
          value={username}
          onChangeText={setUsername}
        />
        {showPassword && (
          <StyledPasswordInput 
            value={password}
            onChangeText={setPassword}
          />
        )}
        <CheckButton 
          loading={loading}
          onPress={handleSubmit}
        />
      </Content>
    </ScreenContainer>
  );
});

export default OnboardingScreen;
