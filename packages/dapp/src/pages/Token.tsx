import { Box, Button, Spinner, Text, TextInput } from "grommet";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MessageBox } from "../components/MessageBox";
import { useGetToken } from "../hooks/useMyTokens";
import { useAppState } from "../store";
import { TokenCard } from "../components/tokens/TokenCard";
import { PageWrapper } from "./PageWrapper";

export const TokenSearch = ({ tokenId }: { tokenId?: string }) => {
  const navigate = useNavigate();
  const [id, setTokenId] = useState<string>(tokenId || '');

  return (
    <Box
      // width={{
      //   max: '200px'
      // }}
      direction="row"
      align="end"
    >
      <Box
        background='white'
        margin={{ bottom: 'small' }}
      >
        <Text size="large" weight='bold'>
          Token Id:
        </Text>
        <TextInput
          size="xlarge"
          value={id}
          type='number'
          min={1}
          step={1}
          onChange={({ target }) => {
            let id: string =
              target.value !== '0' && target.value !== ''
                ? target.value
                : '1';
            setTokenId(id);
          }}
        />
      </Box>
      <Box pad='small'>
        <Button
          primary
          size="large"
          color='black'
          alignSelf="end"
          label='Search'
          onClick={() => {
            if (tokenId === '') {
              return;
            }
            navigate(
              `/token?tokenId=${id}`,
              { replace: true }
            );
          }}
        />
      </Box>
    </Box>
  );
};

export const Token = () => {
  const { rpcProvider, ipfsNode, lodgingFacilities } = useAppState();
  const [searchParams] = useSearchParams();
  const tokenId = useMemo(
    () => searchParams.get('tokenId') || undefined,
    [searchParams]
  );
  const [token,, tokenLoading, tokenError, refreshToken] = useGetToken(
    rpcProvider,
    ipfsNode,
    tokenId,
    false
  );

  const facility = useMemo(
    () => {
      const facilityId = token?.data.attributes?.find((attr) => attr.trait_type === 'facilityId')?.value;
      return lodgingFacilities.find((facility) => facility.id === facilityId?.toLowerCase());
    },
    [token, lodgingFacilities]
  );

  return (
    <PageWrapper
      breadcrumbs={[
        {
          path: "/",
          label: "Home",
        },
      ]}
    >
      <Box align="center" margin={{ bottom: 'large' }}>
        <TokenSearch tokenId={tokenId} />
      </Box>

      <MessageBox type='info' show={tokenLoading}>
        <Box direction='row'>
          <Box margin={{ right: 'small' }}>
            Token data is loading. Please wait..
          </Box>
          <Spinner color='black' />
        </Box>
      </MessageBox>

      <MessageBox type='error' show={!!tokenError}>
        <Box>
          {tokenError}
        </Box>
      </MessageBox>

      {!!token &&
        <Box
          margin={{ top: 'large' }}
        >
          <TokenCard
            facility={facility}
            onClick={() => { }}
            // status={token?.status}
            tokenId={token?.tokenId}
            // facilityOwner={facilityOwner}
            // owner={token?.owner}
            {...token.data}
          />
        </Box>
      }

      {!!token &&
        <Box margin={{ top: 'large' }} width='200px' align="center">
          <Button
            primary
            color='black'
            size="large"
            label='Refresh token'
            onClick={() => refreshToken()}
          />
        </Box>
      }

    </PageWrapper>
  );
};
