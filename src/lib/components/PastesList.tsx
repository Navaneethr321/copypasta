import React, { FC, memo } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../constants';
import { Paste } from '../types';
import PasteItem from './PasteItem';
 
interface Props {
  pastes: Array<Paste>;
  onPastePress: ((text: string) => any);
}

const ListContainer = styled.View`
  flex: 1;
`;

const Spacer = styled.View`
  height: 15px;
`;

const Gradient = styled(LinearGradient).attrs(({
  colors:[colors.black, 'rgba(36, 37, 41, 0)'],
}))`
  top: 0;
  left: 0;
  z-index: 99;
  position: absolute;
  height: 20px;
  width: 100%;
`;

const BottomGradient = styled(LinearGradient).attrs(({
  colors:['rgba(36, 37, 41, 0)', colors.black],
}))`
  bottom: 0;
  left: 0;
  position: absolute;
  height: 20px;
  width: 100%;
`;

const PastesList: FC<Props> = memo(({
  pastes,
  onPastePress,
}) => (
  <ListContainer>
    <FlatList 
      keyExtractor={({ date }) => String(date)}
      ListHeaderComponent={<Spacer />}
      ListFooterComponent={<Spacer />}
      contentContainerStyle={{
        width: '100%',
      }}
      data={pastes}
      renderItem={({ item }) => (
        <PasteItem 
          date={item.date}
          text={item.text}
          onPress={() => onPastePress(item.text)}
        />
      )}
    />
    <Gradient />
    <BottomGradient />
  </ListContainer>
));

export default PastesList;
