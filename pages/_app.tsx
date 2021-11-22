import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@store';
import { RouteProgress } from '@ui-components';
import "@styles/globals.scss"


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <RouteProgress color="DodgerBlue"/>
              <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
