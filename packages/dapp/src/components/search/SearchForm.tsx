import { DateTime } from 'luxon';
import { Box, TextInput, DateInput, Button } from 'grommet';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components';
import { getDate } from '../../utils/dates';
import { FormSearch as Search } from 'grommet-icons';
import { useWindowsDimension } from '../../hooks/useWindowsDimension';

export const Label = styled.div`
  @include g-font($g-fontsize-xs,$glider-color-text-labels,$g-fontweight-normal);
  // margin-left: 4px;
  font-weight: 700;
`;

export const RoomsNumber = styled(TextInput)`
  // height: 2.5rem;
  background: white;
  color: #999EAB;
  // border: 1px solid black;
  // border-radius: 2.5rem;
  &:hover,&:active {
    box-shadow: 0px 0px 0px 2px black;
  }
  -moz-appearance: textfield;
  -webkit-appearance: none;
`;

export const parseDateToDays = (dayZero: DateTime, firstDate: DateTime, secondDate: DateTime) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const startDay = Math.round(firstDate.diff(dayZero).toMillis() / oneDay)
  const numberOfDays = Math.round(secondDate.diff(firstDate).toMillis() / oneDay)
  return {
    startDay,
    numberOfDays
  }
};

const today = DateTime.now().set({ hour: 1 });
const tomorrow = today.plus({ days: 1 });

const defaultStartDay = DateTime.fromISO('2022-07-06');
const defaultEndDay = DateTime.fromISO('2022-07-09');

const defaultStartDate = today.toMillis() > defaultStartDay.toMillis() ? today.toISO() : defaultStartDay.toISO()
const defaultEndDate = tomorrow.toMillis() > defaultEndDay.toMillis() ? tomorrow.toISO() : defaultEndDay.toISO()

export const SearchForm: React.FC<{
  startDay?: number | undefined,
  numberOfDays?: number | undefined,
  initRoomsNumber?: number | undefined,
}> = ({ startDay, numberOfDays, initRoomsNumber }) => {
  const navigate = useNavigate();
  const [departureDate, setDepartureDate] = useState<string>(defaultStartDate);
  const [returnDate, setReturnDate] = useState<string>(defaultEndDate);
  const [roomsNumber, setRoomsNumber] = useState<number>(initRoomsNumber ?? 1);
  const { winWidth } = useWindowsDimension();
  useEffect(() => {
    if (!!startDay && !!numberOfDays) {
      const departureDay = getDate(startDay);
      const returnDay = getDate(startDay + numberOfDays);

      setDepartureDate(departureDay.toISO());
      setReturnDate(returnDay.toISO());
    }
  }, [startDay, numberOfDays]);

  const handleDateChange = ({ value }: { value: string[] }) => {
    if (today.toMillis() > DateTime.fromISO(value[0]).toMillis()) {
      setDepartureDate(today.toISO())
    } else {
      setDepartureDate(value[0])
    }

    if (tomorrow.toMillis() > DateTime.fromISO(value[1]).toMillis()) {
      setReturnDate(tomorrow.toISO())
    } else {
      setReturnDate(value[1])
    }
  }

  const handleSearch = useCallback(
    () => {
      const { startDay, numberOfDays } = parseDateToDays(
        getDate(0),
        DateTime.fromISO(departureDate),
        DateTime.fromISO(returnDate)
      );
      const query = new URLSearchParams([
        ['startDay', String(startDay)],
        ['numberOfDays', String(numberOfDays)],
        ['roomsNumber', String(roomsNumber)],
      ]);
      navigate(`/search?${query}`, { replace: true });
    },
    [navigate, departureDate, returnDate, roomsNumber]
  );

  return (
    <Box
      direction='row'
      alignSelf='center'
      align='center'
      background='white'
      justify='between'
      width='31rem'
      height='4rem'
      border={{ color: 'black' }}
      round='large'
      pad='small'
    >
      <Box
        margin={{ left: 'small' }}
      >
        <Label style={{ marginLeft: '0.5rem' }}>Barcelona</Label>
      </Box>
      <Box
        direction='column'
        margin={{
          right: 'small',
          bottom: winWidth > 410 ? '0.5rem' : ''
        }}
      >
        <Label style={{ marginLeft: '0' }}>When</Label>
        <DateInput
          // plain
          buttonProps={{
            label: `${DateTime.fromISO(departureDate).toFormat('dd.MM.yy')}-${DateTime.fromISO(returnDate).toFormat('dd.MM.yy')}`,
            size: 'large',
            icon: undefined,
            plain: true,
            color: '#999EAB',
            style: {
              marginTop: winWidth > 410 ? '0.5rem' : '',
              background: 'white',
            }
          }}
          calendarProps={{
            bounds: [defaultStartDay.toISO(), defaultEndDay.toISO()],
            fill: false,
            alignSelf: 'center',
            margin: 'small',
            size: 'medium'
          }}
          value={[departureDate, returnDate]}
          onChange={({ value }) => handleDateChange({ value } as { value: string[] })}
        />
      </Box>
      <Box
        width='80px'
        direction='column'
        margin={{ right: 'small' }}
      >
        <Label style={{ marginLeft: '0.5rem' }}>Rooms</Label>
        <Box>
          <RoomsNumber
            plain
            size='medium'
            focusIndicator={false}
            suggestions={['1', '2', '3', '4', '5', '6', '7']}
            placeholder='Rooms number'
            value={roomsNumber}
            type='number'
            min={1}
            onSelect={({ suggestion }) => setRoomsNumber(Number(suggestion))}
            onChange={(event) => {
              const value = Number(event.target.value);
              setRoomsNumber(value !== 0 ? value : 1);
            }}
          />
        </Box>
      </Box>
      <Button
        style={{
          // marginLeft: '4rem',
          justifySelf: 'flex-end',
          borderRadius: "26px",
          background: 'black'
        }}
        size='large'
        icon={<Search color='white' size='30' />}
        onClick={() => handleSearch()}
      />
    </Box>
  );
};
