// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/user'
import connectMongo from '../../utils/connectMongo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const data: { email: string, list: string } = req.body
    try {
        await connectMongo()
        const user = await User.findOne({ email: data.email })
        let index: number = user.lists.findIndex((element: { list: string }) => element.list === data.list)
        res.json({ anime: user.lists[index]})
    } catch (err) {
        res.json({ err })
    }
}
