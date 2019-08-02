import React, { FC, memo } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { colors } from '../constants';
 
interface Props {
  date: Date;
  text: string;
  onPress: ((text: string) => any);
}

const Container = styled.TouchableOpacity`
  margin-top: 4px;
  margin-bottom: 4px;
  min-height: 25px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${colors.gray};
`;

const TextContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const DateText = styled.Text`
  font-size: 10px;
  margin-bottom: 2px;
  color: ${colors.lightGray};
`;

const PasteText = styled.Text`
  width: 90%;
  color: ${colors.white};
`;

const ClipboardIcon = styled(Feather).attrs(({
  size: 20,
  name: 'clipboard',
  color: colors.lightGray,
}))``;

const PasteItem: FC<Props> = memo(({
  date,
  text,
  onPress,
}) => (
  <Container onPress={onPress}>
    <DateText>{dayjs(date).format('DD/MM/YY h:mm A')}</DateText>
    <TextContainer>
      <PasteText>{text}</PasteText>
      <ClipboardIcon />
    </TextContainer>
  </Container>
)); 

export default PasteItem;
