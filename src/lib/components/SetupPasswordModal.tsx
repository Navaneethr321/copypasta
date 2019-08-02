import React, { FC, memo, useState } from 'react';
import { Modal as NativeModal, Platform } from 'react-native';
import WebModal from 'modal-enhanced-react-native-web';
import styled from 'styled-components/native';

import { colors, styles } from '../constants';
import { 
  setPassword as setUserPassword
} from '../services/cloudFunctions';
import { useToasts } from '../hooks'; 
import PasswordInput from './PasswordInput';
import CheckButton from './CheckButton';
import CloseButton from './CloseButton';

interface Props {
  visible: boolean;
  onBackdropPress: (() => any);
}

const PromptText = styled.Text`
  font-size: 20px;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 15px;
  color: ${colors.white};
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const StyledPasswordInput = styled(PasswordInput).attrs(({
  spaceBottom: true,
}))``;

const ConfirmPasswordInput = styled(PasswordInput).attrs(({
  spaceBottom: true,
  placeholder: 'confirm password',
}))``;

const Content = styled.View`
  width: 320px;
  height: 300px;
  padding: 32px;
  border-radius: 16px;
  background-color: ${colors.black};
  ${styles.centerContent}
`;

const Modal = Platform.OS === 'web' ? WebModal : NativeModal;


const SetupPasswordModal: FC<Props> = memo(({
  visible,
  onBackdropPress,
}) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const { displayToast } = useToasts();

  const didClickSubmit = async () => {
    setLoading(true);
    const { data: { success } } = await setUserPassword({ password });
    if (success) {
      displayToast('updated password!')
    }
    onBackdropPress();
    setLoading(false);
  }

  const showSubmit = (
    password !== '' &&
    password === confirm
  );

  return (
    <Modal 
      animationType='slide'
      transparent
      style={{ alignItems: 'center', justifyContent: 'center' }}
      visible={visible}
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      onRequestClose={()=>{}}
    >
      <Content>
        <>
          {Platform.OS !== 'web' && (
            <StyledCloseButton onPress={onBackdropPress} />
          )}
          <PromptText>
            Create a password to protect your pastes
          </PromptText>
          <StyledPasswordInput 
            onChangeText={setPassword}
          />
          <ConfirmPasswordInput 
            onChangeText={setConfirm}
          />
          {showSubmit && (
            <CheckButton 
              loading={loading}
              onPress={didClickSubmit}
            />
          )}
        </>
      </Content>
    </Modal>
  );
});

export default SetupPasswordModal;