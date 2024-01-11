import { AuthorizationCodeWithPKCEStrategy, SdkOptions, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useEffect, useRef, useState } from 'react'
import { addWebSDK } from '../store/webSDKStore';

export function useSpotify(clientId: string, redirectUrl: string, scopes: string[], config?: SdkOptions) {

    const [sdk, setSdk] = useState<SpotifyApi>();
    const [toLogin, setToLogin] = useState<boolean>(false);
    const { current: activeScopes } = useRef(scopes);

    useEffect(() => {
        if (toLogin) {

            (async () => {
                const auth = new AuthorizationCodeWithPKCEStrategy(clientId, redirectUrl, activeScopes);
                const internalSdk = new SpotifyApi(auth, config);
                try {
                    const { authenticated } = await internalSdk.authenticate();

                    if (authenticated) {
                        setSdk(() => internalSdk);
                        addWebSDK("spotify", { spotify: sdk });
                    }

                } catch (e: Error | unknown) {

                    const error = e as Error;
                    if (error && error.message && error.message.includes("No verifier found in cache")) {
                        console.error("If you are seeing this error in a React Development Environment it's because React calls useEffect twice. Using the Spotify SDK performs a token exchange that is only valid once, so React re-rendering this component will result in a second, failed authentication. This will not impact your production applications (or anything running outside of Strict Mode - which is designed for debugging components).", error);
                    } else {
                        console.error(e);
                        setToLogin(false);
                    }
                }

            })();
        }
    }, [clientId, redirectUrl, config, activeScopes, toLogin]);

    return { sdk, login: setToLogin };
}