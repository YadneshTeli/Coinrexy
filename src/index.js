import {React,StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider , theme} from '@chakra-ui/react';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App/>
    </ChakraProvider>
  </StrictMode>
);

export const server =  "https://api.coingecko.com/api/v3"

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=l00&page=l&sparkline=false