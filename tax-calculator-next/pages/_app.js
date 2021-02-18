import ErrorBoundary from '../components/ErrorBoundary';

/* Import styling */
import '../styles/app.scss';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default MyApp
