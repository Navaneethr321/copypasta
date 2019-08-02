import { NavigationContext } from 'react-navigation';
import { useContext } from 'react';

const useNavigation = () => {
  return useContext(NavigationContext);
};

export default useNavigation;