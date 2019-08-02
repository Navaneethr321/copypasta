import React, { FC, memo, useState } from 'react';
import Modal from 'modal-enhanced-react-native-web';
import styled from 'styled-components/native';

import { colors, styles } from '../constants';
import { 
  setPassword as setUserPassword
} from '../services/cloudFunctions';
import { toastEmitter } from '../services/emitter';
import PasswordInput from './PasswordInput';
import { 
  CheckButton,
} from '../components';

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

const SetupPasswordModal: FC<Props> = memo(({
  visible,
  onBackdropPress,
}) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const didClickSubmit = async () => {
    setLoading(true);
    const { data: { success } } = await setUserPassword({ password });
    if (success) {
      toastEmitter.emit('showToast', {
        text: `updated password!`
      });
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
      style={{ alignItems: 'center', justifyContent: 'center' }}
      isVisible={visible}
      onBackdropPress={onBackdropPress}
    >
        <Content>
          <>
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