import { useContext, useMemo } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Image, Header, Box, ResponsiveContext } from 'grommet';
import { useAppState } from '../store';
// import { usePageTitle } from '../hooks/usePageTitle';
import { Account } from '../components/Account';
import { SignInButton, SignOutButton } from '../components/buttons/web3Modal';
import { GlobalMenu } from './Routes';

export const AppHeader = () => {
  const size = useContext(ResponsiveContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { account } = useAppState();
  // const title = usePageTitle();
  const returnLocation = useMemo(
    () => (state as any)?.location as Location,
    [state]
  );

  return (
    <Header
      pad='medium'
      style={{
        position: 'relative',
        background: '#611FF2',
        width: '100vw',
      }}
      responsive={true}
    >
      {(returnLocation && account) &&
        <Navigate to={returnLocation} state={null} />
      }
      <Box direction='row' gap={size}>
        <GlobalMenu />
      </Box>

      <Box>
      </Box>
      <Box>
      </Box>
      <Image
        src='/logo.png'
        height='32px'
        onClick={() => navigate('/')}
      />
      <Image
        fit="cover"
        src='/bg-img.svg'
        color='#611FF2'
        style={{
          width: '100vw',
          // height: '100vh',
          position: 'absolute',
          left: '0',
          bottom: '-1.5rem',
          zIndex: '-100'
        }}
      />

      <Box direction='row' align='center' gap={size}>
        <Account account={account} />
        <Box>
          {account
            ? <SignOutButton />
            : <SignInButton />
          }
        </Box>
        {/* <SwitchThemeMode /> */}
      </Box>
    </Header>
  );
};
