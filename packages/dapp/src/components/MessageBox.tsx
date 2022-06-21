import type { ReactNode } from 'react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Text } from 'grommet';
import { StatusInfo, Alert } from 'grommet-icons';

export const allowedMessageBoxTypes = [
  'info',
  'warn',
  'error'
];

export type MessageBoxTypes = typeof allowedMessageBoxTypes[number];

export interface MessageBoxProps {
  type: MessageBoxTypes;
  show: boolean;
  children?: ReactNode;
  onClose?: () => void
}

export const MessageBox = ({
  type = 'info',
  show = false,
  children,
  onClose
}: MessageBoxProps) => {

  if (!show) {
    return null;
  }

  return (
    <Card margin={{ vertical: 'small' }} round={false}>
      {type === 'info' &&
        <CardHeader border={{ color: '#47A180' }} background='#CBF7DC' align='center' justify='center' pad='0.75rem'>
          <StatusInfo color='#47A180' />
          <Text color='#47A180'>
            Info
          </Text>
        </CardHeader>
      }
      {type === 'warn' &&
        <CardHeader border={{ color: '#47A180' }} background='#fff9ba' align='center' justify='center' pad='0.75rem'>
          <Alert size='small' />
          <Text>
            Warning
          </Text>
        </CardHeader>
      }
      {type === 'error' &&
        <CardHeader border={{ color: '#47A180' }} background='#DB717A' align='center' justify='center' pad='0.75rem'>
          <Alert color='white' />
          <Text color='white'>
            Error
          </Text>
        </CardHeader>
      }
      <CardBody background='white' border={{ color: '#999EAB', side: "vertical" }} pad='1rem' direction='row' align='center' justify='around'>
        <Box>
          {children}
        </Box>
      </CardBody>
      <CardFooter border={{ color: '#999EAB', side: "bottom" }}>
        {typeof onClose === 'function' &&
          <Box>
            <Button primary onClick={onClose} label='close' />
          </Box>
        }
      </CardFooter>
    </Card>
  );
};
