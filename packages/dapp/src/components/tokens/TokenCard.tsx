import type { TokenData } from 'stays-core';
import { Box, Grid, Image, Spinner, Text } from 'grommet';
// import { useGoToMessage } from '../hooks/useGoToMessage';
import { LodgingFacilityRecord } from '../../store/actions';
import { utils, BigNumber as BN } from 'ethers';
// import { CustomButton } from '../components/SearchResultCard';
import { getDate } from '../../utils/dates';
import styled from 'styled-components';
import { useWindowsDimension } from '../../hooks/useWindowsDimension';
import { Label } from '../search/SearchForm';
import { StayVoucherQr } from '../StayVoucherQr';
import { useAppState } from '../../store';
import { useGetToken } from '../../hooks/useMyTokens';
import { MessageBox } from '../MessageBox';

// const ResponsiveColumn = (winWidth: number): string => {
//   if (winWidth >= 1300) {
//     return "250";
//   } else if (winWidth >= 1000) {
//     return "250";
//   } else if (winWidth >= 768) {
//     return "220";
//   } else if (winWidth >= 600) {
//     return "200";
//   } else if (winWidth <= 500) {
//     return "150";
//   } else if (winWidth <= 400) {
//     return "100";
//   }
//   return "180";
// };

export const CustomText = styled(Text)`
  color: #0D0E0F;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const HotelTitle = styled(Text)`
  color: #000;
  font-family: 'Inter';
  margin-bottom: .5rem;
  font-style: normal;
font-weight: 500;
font-size: 34px;
line-height: 40px;
`;

export interface TokenCardProps extends TokenData {
  onClick?: () => void,
  // children?: ReactChild | null,
  facility?: LodgingFacilityRecord;
  // status?: string;
  tokenId?: string;
  withRpcProvider?: boolean;
  // owner?: string;
  // facilityOwner: string | undefined;

  data?: TokenData;
}

export const TokenCard = ({
  image,
  name,
  tokenId,
  attributes,
  onClick = () => { },
  facility,
  // status,
  withRpcProvider = false,
  // owner,
  // facilityOwner
}: TokenCardProps) => {
  const { winWidth } = useWindowsDimension();
  const { provider, ipfsNode } = useAppState();

  const [token, facilityOwner, tokenLoading, tokenError] = useGetToken(
    provider,
    ipfsNode,
    tokenId
  );
  if (tokenLoading) {
    return <Spinner color='black' />
  }
  if (!facility || !attributes || !token || !facilityOwner || !tokenId) {
    return null
  }
  const parseTrait = (trait: string): any => {
    return (attributes || []).find(attr => attr.trait_type === trait)?.value ?? ''
  };
  const space = facility.spaces.find(space => space.contractData.spaceId === parseTrait('spaceId').toLowerCase())
  const quantity = Number(parseTrait('quantity'))
  const numberOfDays = Number(parseTrait('numberOfDays'))
  const total = BN.from(space?.contractData.pricePerNightWei || 0).mul(BN.from(numberOfDays)).mul(BN.from(quantity)).toString();
  const totalEther = utils.formatUnits(total, 'ether');


  return (
    <Grid
      pad='medium'
      style={{
        borderBottom: '1px solid black',
        textAlign: winWidth > 768 ? 'start' : 'center',
      }}
      columns={winWidth > 768 ? ['12rem', 'auto', '13rem'] : ['auto']}
      onClick={() => onClick()}
    >
      <Box pad='small' align='center' justify='center'>
        <Image
          height={150}
          width={150}
          style={{ borderRadius: '50%' }}
          src={image}
        />
      </Box>
      <Box pad='small'>
        <HotelTitle>{facility.name}</HotelTitle>
        <Label style={{
          padding: ' 0 0.75rem',
          background: '#E3E7EC',
          borderRadius: '1.5rem',
          height: '2rem',
          textAlign: 'center',
          lineHeight: '2rem',
          fontWeight: '300',
          fontSize: '0.75rem',
          color: '#0D0E0F',
          alignSelf: winWidth > 768 ? 'start' : 'center',
          minWidth: '4rem'
        }}>{token?.status}</Label>
        <CustomText>{facility.address.streetAddress}, {facility.address.postalCode} {facility.address.locality}, {facility.address.country}. </CustomText>
        <CustomText>{Number(parseTrait('numberOfDays'))} {Number(parseTrait('numberOfDays')) === 1 ? 'night' : 'nights'},  {quantity} {quantity === 1 ? 'room' : 'rooms'} </CustomText>
        <CustomText>{getDate(parseTrait('startDay')).toFormat('dd.MM.yyyy')}-{getDate(Number(parseTrait('startDay')) + Number(parseTrait('numberOfDays'))).toFormat('dd.MM.yyyy')}</CustomText>
        <Text size="xlarge">
          {totalEther} xDAI
        </Text>
      </Box>

      <Box
        pad='small'
        alignSelf={'start'}
        style={winWidth > 768 ? { justifySelf: 'flex-end' } : {}}
      >
        <Box>
          {!withRpcProvider &&
            <StayVoucherQr
              provider={provider}
              from={token.owner}
              to={facilityOwner}
              tokenId={tokenId}
              onError={err => console.log(err)}
              name={name}
              attributes={attributes}
              facility={facility}
              pricePerNightWei={'0'}
            />
          }
          <Text alignSelf='center' size='1rem' weight={700}> Token Id#{tokenId}</Text>
        </Box>
        <MessageBox type='error' show={!!tokenError}>
          <Box>
            {tokenError}
          </Box>
        </MessageBox>
      </Box>
    </Grid>
  );
};
