export type Genre = {
    mal_id: number,
    type: string,
    name: string,
    url: string
}

export type Studio = {
    mal_id: number,
    type: string,
    name: string,
    url: string
}

export type Anime = {
    images: {
        jpg: {
            image_url: string,
        }
    },
    type: string,
    title: string,
    mal_id: number,
    genres: Genre[],
    score: number,
    studios: Studio[],
    scored_by: number,
    year: number,
    rating: string,
    url: string
}

