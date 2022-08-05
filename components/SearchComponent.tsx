import { SearchIcon } from '@heroicons/react/outline'
import React, { SetStateAction, useState } from 'react'
import { Anime } from '../typings'
import { fetchAndRetryIfNecessary } from '../utils/fetchAndRetryIfNecessary'
import FilterSelectComponent from './FilterSelectComponent'
import GenreSelectComponent from './GenreSelectComponent'

interface Props {
    callback: React.Dispatch<SetStateAction<Anime[]>>
}

const SearchComponent = ({ callback }: Props) => {
    const genre_pairs: [string, number][] = [
        ["Action", 1],
        ["Adventure", 2],
        ["Cars", 3],
        ["Comedy", 4],
        ["Avante Garde", 5],
        ["Demons", 6],
        ["Mystery", 7],
        ["Drama", 8],
        ["Ecchi", 9],
        ["Fantasy", 10],
        ["Game", 11],
        ["Hentai", 12],
        ["Historical", 13],
        ["Horror", 14],
        ["Kids", 15],
        ["Martial Arts", 17],
        ["Mecha", 18],
        ["Music", 19],
        ["Parody", 20],
        ["Samurai", 21],
        ["Romance", 22],
        ["School", 23],
        ["Sci Fi", 24],
        ["Shoujo", 25],
        ["Girls Love", 26],
        ["Shounen", 27],
        ["Boys Love", 28],
        ["Space", 29],
        ["Sports", 30],
        ["Super Power", 31],
        ["Vampire", 32],
        ["Harem", 35],
        ["Slice Of Life", 36],
        ["Supernatural", 37],
        ["Military", 38],
        ["Police", 39],
        ["Psychological", 40],

    ]
    const filter_tuples: [string, string, [string, string][]][] = [
        ["type", "Type", [
            ["All", ''],
            ['TV', 'tv'],
            ['OVA', 'ova'],
            ["Movie", 'movie'],
            ['Special', 'special'],
            ['ONA', 'ona'],
            ['Music', 'music']
        ]],
        ['status', "Status", [
            ["All", ''],
            ['Airing', 'airing'],
            ['Completed', 'completed'],
            ['To Be Aired', 'to_be_aired']
        ]],
        ['rating', 'Rated', [
            ["All", ''],
            ['G', 'g'],
            ['PG', 'pg'],
            ['PG-13', 'pg13'],
            ['R', 'r17'],
            ['R+', 'r'],
            ['Rx', 'rx']
        ]],
        ['order_by', 'Sort', [
            ['All', ''],
            ['Name', 'title'],
            ['Score', 'score'],
            ['Recently Updated', 'start_date']
        ]],
        ['min_score', 'Score', [
            ['All', ''],
            ['(1) Appalling', '1'],
            ['(2) Horrible', '2'],
            ['(3) Very Bad', '3'],
            ['(4) Bad', '4'],
            ['(5) Average', '5'],
            ['(6) Fine', '6'],
            ['(7) Good', '7'],
            ['(8) Very Good', '8'],
            ['(9) Masterpiece', '9']
        ]]
    ]

    const genres: Map<string, number> = new Map(genre_pairs.map(element => [element[0], element[1]]))
    const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set<string>())
    const [selectedFilters, setSelectedFilters] = useState<Map<string, string>>(new Map<string, string>())
    const [queryString, setQueryString] = useState("")
    const setGenre = (genre: string) => {
        selectedGenres.add(genre)
        setSelectedGenres(selectedGenres)
    }
    const unsetGenre = (genre: string) => {
        selectedGenres.delete(genre)
        setSelectedGenres(selectedGenres)
    }
    const setFilter = (filter: [string, string]) => {
        if (filter[1] === '')
            selectedFilters.delete(filter[0])
        if (filter[0] === 'min_score' && filter[1] !== '')
            selectedFilters.set('max_score', ((filter[1]) + 1).toString())
        else if (filter[0] === 'min_score')
            selectedFilters.delete('max_score')
        selectedFilters.set(filter[0], filter[1])
        setSelectedFilters(selectedFilters)
    }
    const handleSubmit = async () => {
        let query = encodeURIComponent('q') + '=' + encodeURIComponent(queryString)
        if (selectedGenres.size > 0)
            query += '&' + 'genres=' + (Array.from(selectedGenres).map(genre => genres.get(genre)).join(','))
        if (selectedFilters.size > 0)
            query += '&' + Array.from(selectedFilters).map(([key, value]) => `${key}=${value}`).join('&')
        console.log(query)

        fetchAndRetryIfNecessary(() => fetch('https://api.jikan.moe/v4/anime?' + query))
            .then(res => res.json())
            .then(data => {
                console.log(data)
                callback(data.data)
            }).catch((err) => {
                console.log(err, 'SearchComponent /v4/anime')
            })
    }

    return (
        <div className='grid content-center mx-2 lg:mx-10' onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
            <div className='flex items-center my-3'>
                <SearchIcon className='h-5 w-5 mx-3 text-slate-500' />
                <input
                    className='inline bg-transparent text-slate-300 outline-none border
                border-slate-500 rounded-md px-4 py-2 font-light text-lg'
                    type="text" onChange={(e) => setQueryString(e.target.value)} placeholder="Search..." />
            </div>
            <h2 className='text-lg text-white mx-4 my-2'>Filter</h2>
            <hr />
            <div className='my-3'>
                {filter_tuples.map(tuple =>
                    <FilterSelectComponent key={`${tuple[0]}`} tuple={tuple} setCallback={setFilter} />
                )}
            </div>
            <h2 className='text-lg text-white mx-4 mb-2'>Genre</h2>
            <hr />
            <div className='my-3'>
                {genre_pairs.map(pair =>
                    <GenreSelectComponent key={`${pair[1]}`} pair={pair} setCallback={setGenre} unsetCallback={unsetGenre} />
                )}
            </div>
            <div className='flex justify-center lg:justify-start' onClick={handleSubmit}>
                <span className='cursor-pointer mx-1 my-3 py-2 px-3 rounded-md bg-red-600 shadow-inner text-white font-semibold'>Search</span>
            </div>
        </div>
    )
}

export default SearchComponent