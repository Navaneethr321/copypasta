import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { NavigationActions } from 'react-navigation';

import { auth } from './lib/services/firebase';
import { colors, Routes } from './lib/constants';
import { Toast } from './lib/components';
import { isWeb } from './lib/utils';
import { useToasts } from './lib/hooks';
import AppContainer from './containers';

if (isWeb) {
  document.body.style.backgroundColor = colors.black;
}

const App = () => {
  const [navigation, setNavigation] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const { toasts } = useToasts();

  useEffect(() => {
    auth.onAuthStateChanged(() => setInitialized(true));
  }, []);

  useEffect(() => {
    if (
      initialized && 
      navigation && 
      !auth.currentUser
    ) {
      navigation.dispatch(
        NavigationActions.navigate({ routeName: Routes.Login })
      );
    }
  }, [initialized, navigation, auth.currentUser]);

  return (
    <>
      <StatusBar hidden />
      {initialized 
        ? <AppContainer ref={ref => setNavigation(ref)} />
        : <AppLoading />
      }
      {toasts.map((text, i) => (
        <Toast 
          key={String(i)}
          text={text}
        />
      ))}
    </>
  )
}

export default App;
