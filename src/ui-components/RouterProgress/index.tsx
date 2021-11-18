import { Router } from 'next/router';
import TopBarProgress from 'react-topbar-progress-indicator';
import { FC, useEffect, useMemo, useState } from 'react';
import { IRouterProgress } from './RouterProgress';

export const RouteProgress: FC<IRouterProgress.IProps> = ({ color }) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        Router.events.on('routeChangeStart', () => setIsLoading(true));
        Router.events.on('routeChangeComplete', () => setIsLoading(false));
        Router.events.on('routeChangeError', () => setIsLoading(false));
    }, [Router.events, setIsLoading]);
    useMemo(() => {
        TopBarProgress.config({
            barColors: {
                '0': color || 'black',
            },
        });
    }, []);
    return <>{isLoading ? <TopBarProgress /> : null}</>;
};
