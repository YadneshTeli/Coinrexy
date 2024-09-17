import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

const CoinDetails = () => {

  const [coin, setCoins] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const params = useParams();
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);
  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'max'];

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  // Check if market_data and current_price exist before accessing them
  const highValue = coin?.market_data?.high_24h?.[currency] ? parseFloat(coin.market_data.high_24h[currency]) : 0;
  const lowValue = coin?.market_data?.low_24h?.[currency] ? parseFloat(coin.market_data.low_24h[currency]) : 0;
  const currentPrice = coin?.market_data?.current_price?.[currency] ? parseFloat(coin.market_data.current_price[currency]) : 0;

  let progressValue;
  if (highValue === lowValue) {
    progressValue = 50;
  } else {
    progressValue = ((currentPrice - lowValue) / (highValue - lowValue)) * 100;
  }

  const CustomBar = ({ high = '0', low = '0' }) => (
    <VStack w={"full"}>
      <Progress value={progressValue} colorScheme={'teal'} w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme={'red'} />
        <Text fontSize={'sm'}>24H Range</Text>
        <Badge children={high} colorScheme={'green'} />
      </HStack>
    </VStack>
  );

  const switchChartStats = (key) => {
    setDays(key);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoins(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorComponent message={'Error while fetching CoinDetails'} />

  return (
    <Container maxW={'container.xl'}>
      {
        loading ? (<Loader />) : (<>
          <Box borderWidth={'1'} w={'full'}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={'4'} borderWidth={'1'} overflowX={'auto'}>
            {
              btns.map((i) => (
                <Button
                  disabled={days === i}
                  key={i}
                  onClick={() => switchChartStats(i)}
                >
                  {i}
                </Button>
              ))
            }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={"inr"}>₹ INR </Radio>
              <Radio value={"eur"}>€ EUR </Radio>
              <Radio value={"usd"}>$ USD </Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={'4'} alignItems={'flex-start'} p={'16'}>
            <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
              Last Updated on {' '}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            {coin?.image?.large && (
              <Image
                src={coin.image.large}
                w={'16'}
                h={'16'}
                objectFit={'contain'}
              />
            )}

            {coin && (
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin?.market_data?.current_price?.[currency] || 'N/A'}
                </StatNumber>

                <StatHelpText>
                  <StatArrow
                    type={coin?.market_data?.price_change_percentage_24h > 0 ? "increase" : 'decrease'}
                  />
                  {coin?.market_data?.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
            )}

            <Badge
              fontSize={"2xl"}
              bgColor={'blackAlpha.800'}
              color={'white'}>
              {coin?.market_cap_rank ? `#${coin.market_cap_rank}` : 'N/A'}
            </Badge>

            <CustomBar
              high={`${currencySymbol}${coin?.market_data?.high_24h?.[currency] || 'N/A'}`}
              low={`${currencySymbol}${coin?.market_data?.low_24h?.[currency] || 'N/A'}`}
            />

            <Box w={'full'} p={'4'}>
              <Item title={'Max Supply'} value={coin?.market_data?.max_supply || 'N/A'} />
              <Item title={'Circulating Supply'} value={coin?.market_data?.circulating_supply || 'N/A'} />
              <Item title={'Market Cap'} value={`${currencySymbol}${coin?.market_data?.market_cap?.[currency] || 'N/A'}`} />
              <Item title={'All time low'} value={`${currencySymbol}${coin?.market_data?.atl?.[currency] || 'N/A'}`} />
              <Item title={'All time high'} value={`${currencySymbol}${coin?.market_data?.ath?.[currency] || 'N/A'}`} />
            </Box>
          </VStack>
        </>)
      }
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

export default CoinDetails;
