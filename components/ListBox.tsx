import { useSession } from 'next-auth/react'
import React, { useContext, useEffect, useState } from 'react'
import { SfwContext } from '../contexts/sfwContext'
import { Anime } from '../typings'
import { fetchAndRetryIfNecessary } from '../utils/fetchAndRetryIfNecessary'
import { ratingToStub } from '../utils/ratingToStub'
import CardContainer from './CardContainer'
import ListsComponent from './ListsComponent'

const ListBox = () => {
    const [anime, setAnime] = useState<Anime[]>([])
    const [list, setList] = useState<String>('')
	const { sfw } = useContext(SfwContext)
    const { data: session } = useSession()
    useEffect(() => {}, [anime])
    const handleDelete = (id: Number) => {
        fetch('/api/anime', {
            method: 'DELETE',
            body: JSON.stringify({
                email: session?.user?.email ? session.user.email : '',
                list,
                anime: id
            }),
            headers: new Headers({
                'content-type': 'application/json'
            })
        }).then(res => res.json())
        .then((data) => {
            console.log(data)
            window.location.reload()
        })
        .catch((err) => {
            console.log(err, 'ListBox /api/anime')
        })
    }
    const handleListClick = (list: String) => {
        setList(list)
        fetch('/api/list', {
            method: 'POST',
            body: JSON.stringify({
                email: session?.user?.email ? session.user.email : '',
                list
            }),
            headers: new Headers ({
                'content-type' : 'application/json'
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            Promise.all(data.anime.anime.map((id: Number) => {
                return fetchAndRetryIfNecessary(() => fetch(`https://api.jikan.moe/v4/anime/${id}`)).then(res => res.json())
                .then(data => {
                    anime.push(data.data)
                    setAnime(anime)
                    return data.data
                })  
            }))
            .then(setAnime)
            .catch(err => console.log(err, 'ListBox /api/list'))
        })
    }
    return (
        <div className='grid md:grid-cols-2 content-center pt-24 min-h-screen h-full'>
            <ListsComponent callback={handleListClick}/>
            <CardContainer anime={anime.filter(anime => {
                    if(!anime) return false
					return sfw ? true
						: ['G', 'PG', 'PG-13', 'R', ''].includes(ratingToStub(anime.rating?.toString()))
				})} callback={handleDelete} character='-' />
        </div>
    )
}

export default ListBox