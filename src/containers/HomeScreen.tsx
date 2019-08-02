import React, { FC, memo, useEffect, useState } from 'react';
import { Clipboard } from 'react-native'; 
import styled from 'styled-components/native';

import { Routes } from '../lib/constants';
import { auth } from '../lib/services/firebase';
import { 
  Input,
  CheckButton,
  ScreenContainer,
  PastesList,
  Content,
  LogoutButton,
  InfoButton,
  SetupPasswordModal,
} from '../lib/components';
import { 
  useNavigation, 
  useToasts,
  useUser, 
} from '../lib/hooks';

const StyledInfoButton = styled(InfoButton)`
  position: absolute;
  top: 15px;
  left: 15px;
`;

const StyledLogoutButton = styled(LogoutButton)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const StyledContent = styled(Content)`
  justify-content: flex-end;
`;

const PasteContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const PasteCheck = styled(CheckButton)`
  position: absolute;
  top: 60;
`;

const PastesContainer = styled.View`
  z-index: -1;
  margin-top: 15px;
  height: 60%;
  width: 100%;
  overflow-y: hidden;
`;

const PasteInput = styled(Input).attrs(({
  placeholder: 'text you want to save'
}))``;

const HomeScreen: FC = memo(() => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const { displayToast } = useToasts();
  const { userData, addPaste } = useUser();

  const didClickAddPaste = () => {
    addPaste(text);
    displayToast('pasted text!');
    setText('');
  }

  const didClickLogOut = async () => {
    await auth.signOut();
    navigation.navigate(Routes.Login);
  }

  const didClickSetupPassword = () => {
    setPasswordModalVisible(true);
  }

  const didClickSetupPasswordBackdrop = () => {
    setPasswordModalVisible(false);
  }

  const handlePastePress = async (text: string) => {
    await Clipboard.setString(text);
    displayToast('copied text!');
  }

  return (
    <ScreenContainer>
      <SetupPasswordModal 
        visible={passwordModalVisible}
        onBackdropPress={didClickSetupPasswordBackdrop}
      />
      {userData && (
        <>
          {!userData.hasPassword && (
            <StyledInfoButton onPress={didClickSetupPassword} />
          )}
          <StyledLogoutButton onPress={didClickLogOut} />
          <StyledContent>
            <PasteContainer>
              <PasteInput 
                value={text}
                onChangeText={setText}
              />
              {text !== '' && (
                <PasteCheck 
                  onPress={didClickAddPaste}
                />
              )}
            </PasteContainer>
            <PastesContainer>
              <PastesList 
                pastes={userData.pastes}
                onPastePress={handlePastePress}
              />
            </PastesContainer>  
          </StyledContent>
        </>
      )}
    </ScreenContainer>
  );
});

export default HomeScreen;
