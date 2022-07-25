export type Genre = {
    mal_id: Number,
    type: String,
    name: String,
    url: String
}

export type Studio = {
    mal_id: Number,
    type: String,
    name: String,
    url: String
}

export type Anime = {
    images: {
        jpg: {
            image_url: String,
        }
    },
    type: String,
    title: String,
    mal_id: Number,
    genres: Genre[],
    score: Number,
    studios: Studio[],
    scored_by: Number,
    background: String,
    year: Number,
    rating: String,
    url: String
}

