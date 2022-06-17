import { useContext } from 'react';
import { Box, Spinner, Text, ResponsiveContext } from 'grommet';
import { Login, Logout } from 'grommet-icons';
import styled from 'styled-components';
import { useAppState } from '../../store';
import { StyledButton } from './index';
import { useLocation } from 'react-router-dom';

const InnerSpinner = styled(Spinner)`
  margin-left: 8px;
`;

export const SignInButton = () => {
  const size = useContext(ResponsiveContext);
  const { isConnecting, signIn } = useAppState();
  const location = useLocation();
  const color = location.pathname === '/' ? 'white' : 'black'
  const colorReverse = location.pathname === '/' ? 'black' : 'white'
  
  return (
    <StyledButton
    style={{
      color: colorReverse,
      background: color
    }}
      onClick={() => signIn()}
      disabled={isConnecting}
    >
      {() => (
        <Box direction='row' align='center' pad='small'>
          {size !== 'small' &&
            <Text>
              {isConnecting ? 'Connecting' : 'Connect'}
            </Text>
          }
          {size === 'small' &&
            <Login color={colorReverse} />
          }
          {isConnecting && <InnerSpinner />}
        </Box>
      )}
    </StyledButton>
  )
};

export const SignOutButton = () => {
  const size = useContext(ResponsiveContext);
  const { isConnecting, signOut } = useAppState();
  const location = useLocation();
  const color = location.pathname === '/' ? 'white' : 'black'
  const colorReverse = location.pathname === '/' ? 'black' : 'white'

  return (
    <StyledButton
      style={{
        color: colorReverse,
        background: color
      }}
      onClick={() => signOut()}
      disabled={isConnecting}
    >
      {() => (
        <Box direction='row' align='center' pad='small'>
          {size !== 'small' &&
            <Text>
              {isConnecting ? 'Connecting' : 'Disconnect'}
            </Text>
          }
          {size === 'small' &&
            <Logout color={colorReverse} />
          }
          {isConnecting && <InnerSpinner />}
        </Box>
      )}
    </StyledButton>
  )
};
