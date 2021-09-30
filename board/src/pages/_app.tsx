import { AppProps } from 'next/app'
import { Header } from '../Components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'


import '../styles/global.scss';

const initialOptions = {
  'client-id':'AZ_BPCcd2lVN8kaKPwgpuBbljXOZjaiWYjeJAeKKnh3ihTQ8KDP5B-bqKkXsinZ7b5OnnU4hIw8fJ5PB',
  currency:'BRL',
  intent:'capture'
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  )
}

export default MyApp
