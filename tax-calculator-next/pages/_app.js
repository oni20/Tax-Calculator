import ErrorBoundary from '../components/ErrorBoundary';
import GlobalContextProvider from '../components/Context/GlobalContext'

/* Import styling */
import '../styles/app.scss';
import '../styles/globals.scss'

const window = global.window;

function GoTax({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </ErrorBoundary>
  )
}

export default GoTax
