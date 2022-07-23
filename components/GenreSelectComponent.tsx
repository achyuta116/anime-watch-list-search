import React, { useState } from 'react'

interface Props {
    pair: [String, Number],
    setCallback: (genre: String) => void,
    unsetCallback: (genre: String) => void,
}


const GenreSelectComponent = ({ pair, setCallback, unsetCallback }: Props) => {
    const [set, setSet] = useState(false)
    return (
        <span className={'inline-block m-1 py-1 px-2 rounded-md text-white\
         hover:text-red-500 cursor-pointer transition ease-in select-none border text-sm ' + (set? 
        'border-red-600 bg-red-600 bg-opacity-10 text-red-500' : 'text-slate-300 border-slate-500')}
        onClick={!set?
        () => { setCallback(pair[0]); setSet(!set); }:
        () => { unsetCallback(pair[0]); setSet(!set); }}>
            { pair[0] }
        </span>
    )
}

export default GenreSelectComponent