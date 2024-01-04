
type SpotifySearchParams = {
    searchStr: string,
    token: string
}




const getSearchResults = async (searchParams: SpotifySearchParams): Promise<SpotifyApi.SearchResponse> => {
    const { searchStr, token } = searchParams
    const res = await fetch(`https://api.spotify.com/v1/search?q=${searchStr}&type=track`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    if (res.ok) {
        const data: Promise<SpotifyApi.SearchResponse> = await res.json();
        if (data) {
            return data;
        } else {
            return Promise.reject(new Error(`No search results with search string ${searchStr}, types track and artist`))
        }
    } else {
        // const errorMessage = new Error(error ? error.message : 'unknown');
        const error: SpotifyApi.ErrorObject = await res.json();
        const errorMessage = new Error(error ? `Code: ${error.status}, ${error.message}` : 'unknown');
        return Promise.reject(errorMessage)
    }



}



export default getSearchResults 