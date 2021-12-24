import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from '@src/stores';
import React from 'react';
import colorOpacity from '@src/utils/color-opacity';
import theme from '@src/utils/theme';
import RootNavigator from '@src/pages';

const AppRoot: React.FC = () => {
  const { loading } = useSelector((state) => state.appNotification);
  return (
    <>
      <Spinner
        visible={loading}
        textContent="Please wait..."
        overlayColor={colorOpacity(theme.vars.black, 0.5)}
        textStyle={{ color: theme.vars.white }}
      />
      <RootNavigator />
    </>
  );
};

export default AppRoot;
