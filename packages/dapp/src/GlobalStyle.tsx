import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { generate } from 'grommet/themes/base';
import { deepMerge } from 'grommet/utils';
import { useLocation } from 'react-router-dom';
import { useAppState } from './store';

const baseTheme = deepMerge(grommet, {
  ...generate(16),
  tab: {
    color: '#000',
    border: {
      color: '#fff'
    },
    hover: {
      color: '#000',
    },
    active: {
      color: '#000'
    }
  }
});

export const GlobalStyle: React.FC = ({ children }) => {
  const { themeMode } = useAppState();
  const location = useLocation();

  return (
    <Grommet
      theme={baseTheme}
      themeMode={themeMode}
      style={{
        height: 'auto',
        minHeight: '100vh',
        background: location.pathname === '/' ? 'url(/bg.png) no-repeat center center fixed' : '',
        backgroundSize: location.pathname === '/' ? 'cover' : ''
      }}
    >
      {children}
    </Grommet>
  );
};
