import React from 'react';
import Head from 'next/head';
import electron from 'electron';
import { useSelector } from 'react-redux';

import MTUControlLanding from './MTUControlLanding';

function Home() {
    var getStoreAppStartData: any = useSelector((state: any) => state.appStart["appName"]);

    return (
        <React.Fragment>
            <Head>
                <title>{getStoreAppStartData}</title>
            </Head>
                <MTUControlLanding/>
        </React.Fragment>
    );
};

export default Home;
