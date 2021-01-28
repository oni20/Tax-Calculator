import ErrorBoundary from './ErrorBoundary';
import GlobalContextProvider from '../components/Context/GlobalContext'

/* Import styling */
import '../styles/app.scss';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </ErrorBoundary>
  )
}

export default MyApp
