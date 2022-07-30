// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/user'
import connectMongo from '../../utils/connectMongo'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'DELETE') {
		const data: { email: string, list: string, anime: number } = req.body
		console.log(data)
		try {
			await connectMongo()
			let user = await User.findOne({ email: data.email })
			let lists: { list: string, anime: number[] }[] = user.lists
			let index: number = lists.findIndex((element) => element.list === data.list)
			let anime: Set<number> = new Set<number>(lists[index].anime)
			anime.delete(data.anime)
			lists[index].anime = Array.from(anime)
			user.lists = lists
			const updated = await user.save()
			res.json({ updated })
		} catch (err) {
			res.json({ err })
		}
	} else if (req.method === 'POST') {
		const data: { email: string, list: string, anime: number } = req.body
		try {
			await connectMongo()
			let user = await User.findOne({ email: data.email })
			console.log(user)
			let lists: { list: string, anime: number[] }[] = user.lists
			let index: number = lists.findIndex((element) => element.list === data.list)
			if (index === -1) {
				index = lists.length
				lists.push({ list: data.list, anime: [] })
			}
			let anime: Set<number> = new Set<number>(lists[index].anime)
			anime.add(data.anime)
			lists[index].anime = Array.from(anime)
			user.lists = lists
			const updated = await user.save()
			res.json({ updated })
		} catch (err) {
			res.json({ err })
		}
	}

}
