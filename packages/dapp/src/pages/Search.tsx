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
  const restrictions: Record<string, { start: number, days: number }> = {
    '0x1d50703e2ae2f103b45d81812d328567c2383f120024d888b646e9bffb2630c0': {
      start: 54,
      days: 8
    },
    '0xac6bde3c8b75bb65189ab09c634a903a78b35c1acb1653b664e71a406c2f6a94': {
      start: 54,
      days: 8
    }
  };
  return restrictions[id]
    ? restrictions[id].start === start &&
    restrictions[id].days === days
    : true;
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

      <Text size='1rem'>The listings are ranked randomly</Text>
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
