import { PageWrapper } from './PageWrapper';
import { Box, Text, Image, Carousel, Spinner, Anchor, Card, CardHeader, CardBody, CardFooter } from 'grommet';
import { useAppState } from '../store';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { BookWithDai } from '../components/buttons/BookWithDai';
import { MessageBox } from '../components/MessageBox';
import { ExternalLink } from '../components/ExternalLink';
//import * as Icons from 'grommet-icons';
import { getNetwork } from '../config';
import { centerEllipsis } from '../utils/strings';
import { useContract } from '../hooks/useContract';
// import { NavLink } from 'react-router-dom';
import { utils, BigNumber as BN } from 'ethers';
//import { Header } from './MyTokens';
// import { Text, Title } from '../components/StayVoucherQr';
import styled from 'styled-components';
import Logger from '../utils/logger';
import { getDate } from '../utils/dates';
import { FormCheckmark } from 'grommet-icons';
import { useWindowsDimension } from '../hooks/useWindowsDimension';

// Initialize logger
const logger = Logger('Space');

export const Description = styled(Text)`
  color: #0D0E0F;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  text-align: start;
`;

export const Contact = styled(Anchor)`
  color: #0D0E0F;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
`;
const GreenCheckmark = styled(FormCheckmark)`
  border-radius: 50%;
  background: #47A180;
  color: white;
`;

// const RedCheckmark = styled(FormCheckmark)`
//   border-radius: 50%;
//   background: white;
// `;

export const CustomText = styled(Text)`
  color: #0D0E0F;
  // font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

export const CustomBoldText = styled(Text)`
  color: #0D0E0F;
  // font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;


const CustomTitle = styled(Text)`
  color: #0D0E0F;
  font-weight: 500;
  font-size: 34px;
  line-height: 40px;
  // margin-bottom: .5rem;
`;

const ResponsiveColumn = (winWidth: number): string => {
  if (winWidth >= 1300) {
    return "250";
  } else if (winWidth >= 1000) {
    return "250";
  } else if (winWidth >= 768) {
    return "220";
  } else if (winWidth >= 600) {
    return "200";
  } else if (winWidth <= 500) {
    return "150";
  } else if (winWidth <= 400) {
    return "100";
  }
  return "180";
};

export const Space: React.FC = () => {
  const {
    account,
    lodgingFacilities,
    searchSpaces,
    // themeMode,
    searchParams,
    provider,
    ipfsNode,
    bootstrapped
  } = useAppState();
  const { winWidth } = useWindowsDimension();

  const query = window.location.pathname.substring(7);
  const space = useMemo(() => searchSpaces.find((space) => space.id === query), [searchSpaces, query]);
  const facility = useMemo(() => lodgingFacilities.find((facility) => {
    const space = facility.spaces.find((space => space.contractData.spaceId === query))
    if (space) {
      return true
    }
    return false
  }), [query, lodgingFacilities]);

  const [contract, , errorContract] = useContract(provider, ipfsNode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [tokenId, setTokenId] = useState<string | undefined>();
  const [hash, setHash] = useState('');

  useEffect(() => {
    setError(errorContract);
  }, [errorContract]);

  const hashLink = useMemo(() => {
    const network = getNetwork()
    return hash ? `${network.blockExplorer}/tx/${hash}` : null
  }, [hash])

  const bookHandler = useCallback(
    async () => {
      try {
        setLoading(true)
        if (!contract) {
          throw new Error('Contract is not connected');
        }
        if (searchParams === undefined) {
          throw new Error('searchParams is undefined');
        }
        if (space === undefined) {
          throw new Error('space is undefined');
        }
        if (!account) {
          throw new Error('account is undefined');
        }
        if (!provider) {
          throw new Error('provider is undefined');
        }
        const balance = await provider.getBalance(account)
        const total = BN.from(space.contractData.pricePerNightWei)
          .mul(BN.from(searchParams.numberOfDays));

        // const total = Number(utils.formatUnits(space.contractData.pricePerNightWei, 'ether')) * Number(searchParams.numberOfDays);

        logger.debug('balance', balance.toString());
        logger.debug('price', total.toString());

        if (balance.lt(total)) {
          throw new Error('not enough xDAI')
        }

        setError(undefined);

        const res = await contract.book(
          space.id,
          searchParams.startDay,
          searchParams.numberOfDays,
          searchParams.roomsNumber,
          undefined,
          setHash
        );
        setTokenId(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError((error as Error).message);
      }
    },
    [account, contract, provider, searchParams, space]
  );

  const isLoading = useMemo(() => !!bootstrapped && !!contract, [bootstrapped, contract]);

  const searchQuery = useMemo(() => {
    return new URLSearchParams([
      ['startDay', String(searchParams?.startDay)],
      ['numberOfDays', String(searchParams?.numberOfDays)],
      ['roomsNumber', String(searchParams?.roomsNumber)],
    ])
  }, [searchParams]);

  const numberDays = useMemo(
    () => searchParams?.numberOfDays || 1,
    [searchParams]
  );

  const roomsNumber = useMemo(
    () => searchParams?.roomsNumber || 1,
    [searchParams]
  );

  const getPrice = useCallback(
    (nights: number, roomsNumber: number): string => {
      const perNight = BN.from(space?.contractData.pricePerNightWei ?? 0);
      return utils.formatUnits(
        perNight.mul(BN.from(nights)).mul(BN.from(roomsNumber)),
        'ether'
      );
    },
    [space]
  );

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Search',
          path: `/search?${searchQuery}`
        }
      ]}
    >
      <MessageBox type='info' show={!isLoading}>
        <Box direction='row'>
          <Box>
            The Dapp is synchronizing with the smart contract. Please wait..&nbsp;
          </Box>
          <Spinner color='black' />
        </Box>
      </MessageBox>

      {/* <MessageBox type='info' show={!!tokenId}>
        <Box direction='row'>
          <Box>
            Booked successfully!
            <NavLink to={`/tokens?tokenId=${tokenId}`}> Check details </NavLink>
            <NavLink to='https://discord.gg/kZYnMncsg4'> Join our discord</NavLink>
          </Box>
        </Box>
      </MessageBox> */}

      {!!tokenId ? <Card round={false}>
        <CardHeader border={{ color: '#47A180' }} background='#CBF7DC' align='center' justify='center' pad='0.75rem'>
          <GreenCheckmark color='white' />
          <Text color='#47A180'>
            Booking Successful
          </Text>
        </CardHeader>
        <CardBody border={{ color: '#999EAB', side: "vertical" }} pad='1rem' direction='row' align='center' justify='around'>
          <Box>
            <CustomTitle>{facility?.name}</CustomTitle>
            <CustomText>{facility?.address.streetAddress + ', ' + facility?.address.locality}</CustomText>
            <CustomText>{facility?.type}, {numberDays} {numberDays === 1 ? 'night' : 'nights'}</CustomText>
            <CustomText>{getDate(searchParams?.startDay ?? 0).toFormat('dd.MM.yy')}-{getDate(Number(searchParams?.startDay ?? 0) + Number(numberDays)).toFormat('dd.MM.yy')}</CustomText>
            <CustomText>{getPrice(numberDays, roomsNumber)} xDAI</CustomText>
            <CustomBoldText weight={800}> Token Id#{tokenId}</CustomBoldText>
          </Box>
          <Box>
            <Image
              height={ResponsiveColumn(winWidth)}
              width={ResponsiveColumn(winWidth)}
              style={{ borderRadius: '50%' }}
              src={facility?.media.logo}
            />
          </Box>
        </CardBody>
        <CardFooter border={{ color: '#999EAB', side: "bottom" }} />
      </Card> : null}

      {!!tokenId ? <Box pad='small'>
        <CustomText textAlign='center'>Make sure to save your token ID# so that you can use it to check-in at the hotel, if you go to the “My Tokens” section you can also download the QR code.</CustomText>
      </Box> : null}

      {/* {!!error ? <Card round={false}>
        <CardHeader border={{ color: '#47A180' }} background='#DB717A' align='center' justify='center' pad='0.75rem'>
          <RedCheckmark color='#47A180' />
          <Text color='white'>
            Booking Failed
          </Text>
        </CardHeader>
        <CardBody border={{ color: '#999EAB', side: "vertical" }} pad='1rem' direction='row' align='center' justify='around'>
          <Box>
            <CustomTitle>{facility?.name}</CustomTitle>
            <CustomText>{facility?.address.streetAddress + ', ' + facility?.address.locality}</CustomText>
            <CustomText>{getDate(searchParams?.startDay ?? 0).toFormat('MM.dd.yy')}-{getDate(Number(searchParams?.startDay ?? 0) + Number(numberDays)).toFormat('MM.dd.yy')}</CustomText>
            <CustomText>{facility?.type}, {numberDays} {numberDays === 1 ? 'room' : 'rooms'}</CustomText>
            <CustomText>{getPrice(numberDays, roomsNumber)} xDAI</CustomText>
          </Box>
          <Box>
            <Image
              height='250'
              width='250'
              style={{ borderRadius: '50%' }}
              src={facility?.media.logo}
            />
          </Box>
        </CardBody>
        <CardFooter border={{ color: '#999EAB', side: "bottom" }}>
          {error}
        </CardFooter>
      </Card> : null}

      {!!error ? <Box pad='small'>
        <CustomText textAlign='center'>In the future, you can see the details of the reservation in your personal account section "Bookings"</CustomText>
      </Box> : null} */}

      {isLoading && !space && <Box> No space with given id </Box>}
      {isLoading && !!space && !tokenId &&
        <Box align='center' overflow='hidden'>
          <Image
            height='150'
            width='150'
            style={{ borderRadius: '50%' }}
            src={facility?.media.logo}
          />

          <Text weight={500} size='2rem' margin='small'>
            {facility?.name}
          </Text>
          <Text weight={500} size='1.5rem'>
            {space.name}
          </Text>
          {!!facility &&
            <Box align='center' justify='between' direction='row' style={{ fontSize: '1em' }} margin='medium'>
              <Anchor
                size='small'
                label={facility.address.streetAddress + ', ' + facility.address.locality}
                href={'https://www.openstreetmap.org/search?query=' + encodeURI(facility.address.streetAddress + ', ' + facility.address.locality)}
                target="_blank"
                style={{ fontSize: '1em', lineHeight: '1.4em', color: 'black' }}
              />
              &nbsp;&nbsp;&nbsp;
              <Anchor
                size='small'
                label={facility?.contact?.website ?? ''}
                href={facility?.contact?.website}
                title={facility?.name}
                target="_blank"
                style={{ fontSize: '1em', lineHeight: '1.4em', color: 'black' }}
              />
              &nbsp;&nbsp;&nbsp;
              <Anchor
                size='large'
                label={facility.contact?.email}
                href={`mailto:${facility.contact?.email}`}
                title={facility?.name}
                target="_blank"
                style={{ fontSize: '1em', lineHeight: '1.4em', color: 'black' }}
              />
              <Anchor
                size='large'
                label={facility.contact?.phone}
                href={`tel:${facility.contact?.phone}`}
                title={facility?.name}
                target="_blank"
                style={{ fontSize: '1em', lineHeight: '1.4em', marginLeft: '0.25rem', color: 'black' }}
              />
            </Box>
          }

          <Box
            fill
            align='center'
            margin={{ bottom: 'large' }}
          >
            <Description>{space.description}</Description>
          </Box>

          <Box fill align='center' margin={{ bottom: 'xlarge' }}>
            <Carousel height='large' width='xxlarge'>
              {space.media.images?.map((space, i) =>
                <Image
                  key={i}
                  width='xlarge'
                  fit="cover"
                  alignSelf='center'
                  src={space.uri}
                />
              )}
            </Carousel>
          </Box>

          <Box fill direction='row' align='center' justify='between'>
            <Text size='xxlarge' weight='bold'>{numberDays} nights, {roomsNumber} room{roomsNumber > 1 ? 's' : ''}</Text>
            <Box align='center' margin='medium'>
              <BookWithDai
                onClick={bookHandler}
                loading={loading}
                disabled={!!tokenId}
                text={'Book for ' + getPrice(numberDays, roomsNumber) + ' xDAI'}
              />

              {hashLink !== null ?
                <ExternalLink href={hashLink} label={centerEllipsis(hash)} />
                : null}
            </Box>
          </Box>

          <Box fill pad={{ top: 'medium' }}>
            <MessageBox type='error' show={!!error}>
              <Box direction='row'>
                <Box>
                  {error}
                </Box>
              </Box>
            </MessageBox>
          </Box>
        </Box>
      }
    </PageWrapper>
  );
};
