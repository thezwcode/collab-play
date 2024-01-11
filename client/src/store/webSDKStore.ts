import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { createSelectorHook, createStore } from "./Store";


export type WebSDK = "spotify" | "soundcloud"

export type WebSDKState = {
    spotify?: SpotifyApi;
}

export const webSDKStore = createStore<WebSDKState>({})


export const useWebSDKSelector = createSelectorHook(webSDKStore);

export function addWebSDK(name: string, sdk: WebSDKState) {
    webSDKStore.setState(state => {
        return name === "spotify" ? {
            ...state,
            spotify: sdk.spotify
        } :
            {
                ...state
            }

    })
}