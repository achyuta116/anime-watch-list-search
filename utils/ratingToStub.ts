export const ratingToStub = (rating: string) => {
    switch(rating){
        case 'R - 17+ (violence & profanity)': return 'R'
        case 'PG-13 - Teens 13 or older': return 'PG-13'
        case 'R+ - Mild Nudity': return 'R+'
        case 'Rx - Hentai': return 'Rx'
        case 'PG - Children': return 'PG'
        case 'G - All Ages': return 'G'
        default: return ''
    }
}