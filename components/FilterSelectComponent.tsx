import React from 'react'

interface Props {
    tuple: [String, String, [String, String][]],
    setCallback: (filter: [String, String]) => void
}

const FilterSelectComponent = ({ tuple, setCallback }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCallback([tuple[0], e.target.value])
    }
    return (
        <span className='inline-block mx-1 my-1 px-3 py-2 rounded-md border border-slate-500'>
            <span className='text-slate-300'>
                {tuple[1]}
            </span>
            <select onChange={handleChange} defaultValue='' className="bg-transparent p-1 text-red-500 border-transparent outline-none cursor-pointer">
                {tuple[2].map(([option, value]) =>
                    <option key={`${value}`} value={`${value}`}>{option}</option>
                )}
            </select>
        </span>
    )
}

export default FilterSelectComponent