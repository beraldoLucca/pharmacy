import '../styles/globals.scss';
import Header from '../components/Header';
import Login from '.';
import App from 'next/app';
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />,
      <AuthProvider>
        <Component {...pageProps} />)
      </AuthProvider>
    </div>
  )
}

export default MyApp
