import { PageWrapper } from './PageWrapper';
import { SearchForm } from '../components/search/SearchForm';
import { Box, Spinner, Text } from 'grommet';
import { SearchResultCard } from '../components/search/SearchResultCard';
import { useAppState } from '../store';
import { useSpaceSearch } from '../hooks/useSpaceSearch';
import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageBox } from '../components/MessageBox';
import styled from 'styled-components';
import { SpaceRecord } from '../store/actions';
import Logger from '../utils/logger';

const SEARCH_FORM_DISABLED = process.env.REACT_APP_SEARCH_FORM_DISABLED;

// Initialize logger
const logger = Logger('Search');

export const WhiteParagraph = styled(Text)`
  text-align: start;
  align-self: center;
  color: #fff;
  font-family: Inter;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0px;
  max-width: 50rem;
  margin-top: 5rem;
`;

export const WhiteParagraph18 = styled(Text)`
  text-align: start;
  align-self: center;
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  max-width: 50rem;
  margin-top: 2rem;
`;

const checkSpaceDatesRestrictions = (id: string, start: number, days: number) => {
  const restrictions: Record<string, { start: number, days: number, min: number }> = {
    // Hotel Pulitzer
    '0x7d1d4f2576df2029cb9eb2364fd402e48336ea7ff24426c146fe0af9d62cb84d': {
      start: 134,
      days: 3,
      min: 1
    },
    '0x3fd590383cd69b3570a65c1340ae7bf2c2861ba58884128e9b068ed6f3c111cf': {
      start: 134,
      days: 3,
      min: 1
    },
    // Hotel Regina
    '0x30c04b5667eea2d5cf91c8d630a870c040b1b1627843d5d281e4101efc99d922': {
      start: 134,
      days: 3,
      min: 1
    },
    '0x12b151e445694d511136eeb95169fd46379e19697d4488dc6637b93d4a037a8f': {
      start: 134,
      days: 3,
      min: 1
    },
    // Hotel Roger De Lluria
    '0xf74f70c31b638cc35c844a44993c78d24943fd5a2a79502507de0db3515cdfea': {
      start: 134,
      days: 3,
      min: 3
    },
    '0x6abd388e0b94564cb4bbecc06ebe587dab37325cf583bdc785bc27fafb16908f': {
      start: 134,
      days: 3,
      min: 3
    },
    // Le Méridien Barcelona
    '0x8251843e35e1f83aa0279b186ae94b0e23c6d59f8341f112619054249e7449a3': {
      start: 134,
      days: 2,
      min: 1
    },
    '0xf6484ff43435f7ffd23efa68466db925af72b530f438bda8e58ec5547fa7251b': {
      start: 134,
      days: 2,
      min: 1
    },
    // Sercotel Porta de Barcelona
    '0x3753f44bb3ec91ee3d481791a8e4709396ef586eaac3f8c319fbcc0e2998bde1': {
      start: 132,
      days: 6,
      min: 1
    },
    '0x94c96011b7f6378ec85d964d8e2b427a5b8a6adf8fa72595bf690b56ee83699c': {
      start: 132,
      days: 6,
      min: 1
    },
    // Sercotel Sant Boi
    '0x97fb9ffdaefa48c77920451a63a99d62f768df1d2e29faf2dd095f2cafad541c': {
      start: 132,
      days: 6,
      min: 1
    },
    '0x76a2e69d85f3d32b340e91efafa5e219148ca5886eb841a5cdef10b2337b59aa': {
      start: 132,
      days: 6,
      min: 1
    },
    // Sercotel Cornella
    '0x6c19a035fe41a43311069ca94877936e16339377d7b23c646279c684995dd2a9': {
      start: 132,
      days: 6,
      min: 1
    },
    '0xc173612c0a7432a8616f5df648d133dbabec6be8e6e6ad494ef1136a785fb4f1': {
      start: 132,
      days: 6,
      min: 1
    },
  };

  if (restrictions[id]) {
    const startRule = start >= restrictions[id].start;
    const endRule = (start + days) <= (restrictions[id].start + restrictions[id].days);
    const minRule = days >= restrictions[id].min;
    return startRule && endRule && minRule;
  }

  return true;
};

export const Search = () => {
  console.log("Search :: start")

  const { searchSpaces } = useAppState();
  const { search } = useLocation();

  const { startDay, numberOfDays, roomsNumber } = useMemo(() => {
    const params = new URLSearchParams(search);
    const startDay = Number(params.get('startDay'));
    const numberOfDays = Number(params.get('numberOfDays'));
    const roomsNumber = Number(params.get('roomsNumber'));
    return {
      startDay,
      numberOfDays,
      roomsNumber
    }
  }, [search])

  const [loading, noResults, error] = useSpaceSearch(startDay, numberOfDays, roomsNumber);
  const [searchActivated, setSearchActivated] = useState<boolean>(false);
  const [afterLoading, setAfterLoading] = useState<boolean>(false);
  const [filteredSpaces, setFilteredSpaces] = useState<SpaceRecord[]>([]);
  const [searchFormDisabled] = useState<boolean>((SEARCH_FORM_DISABLED === 'true'));

  useEffect(
    () => {
      if (!loading) {
        setTimeout(() => setAfterLoading(false), 1000);
      } else {
        setSearchActivated(true);
        setAfterLoading(true);
      }
    },
    [loading]
  );

  useEffect(
    () => {
      if (
        (!searchSpaces || !searchSpaces.length) ||
        (roomsNumber === 0)
      ) {
        logger.debug('Reset filtered spaces: search result is empty');
        setFilteredSpaces([]);
        return;
      }

      const filtered = searchSpaces.filter(
        (space: SpaceRecord) => space.available &&
          space.available >= roomsNumber &&
          checkSpaceDatesRestrictions(space.id, startDay, numberOfDays)
      );
      logger.debug('Filtered spaces', filtered);

      setFilteredSpaces(filtered);

      return () => {
        logger.debug('Reset filtered spaces: dependencies changed');
        setFilteredSpaces([]);
      };
    },
    [searchSpaces, startDay, numberOfDays, roomsNumber]
  );

  return (
    <PageWrapper>
      <Box align='center' margin={{ bottom: 'small' }}>
        <Text size='3rem'>ETHBarcelona</Text>
        <Text size='xlarge'>
          July 6 - 8
        </Text>
      </Box>

      {
        !searchFormDisabled &&
        <Box margin={{ bottom: 'medium' }}>
          <SearchForm
            startDay={startDay}
            numberOfDays={numberOfDays}
            initRoomsNumber={roomsNumber}
          />
        </Box>
      }

      <MessageBox type='error' show={!!error}>
        <Box direction='row'>
          <Box>
            {error}
          </Box>
        </Box>
      </MessageBox>

      {loading || afterLoading ? <Spinner color='accent-1' alignSelf='center' size='large' /> : null}

      <MessageBox type='info' show={
        searchActivated &&
        !afterLoading &&
        (noResults || filteredSpaces.length === 0)
      }>
        <Text>
          No Rooms Found
        </Text>
      </MessageBox>

      {filteredSpaces.length > 1 ? <Text size='1rem'>The listings are ranked randomly</Text> : null}
      <Box border={{
        color: 'black',
        side: 'top',
        size: '1.5px ',
      }}
        margin={{ top: 'small' }}
      >
        {filteredSpaces.map((space) =>
          <SearchResultCard
            key={space.contractData.spaceId}
            space={space}
            numberOfDays={numberOfDays}
            roomsNumber={roomsNumber}
          />
        )}
      </Box>
    </PageWrapper >
  );
};
