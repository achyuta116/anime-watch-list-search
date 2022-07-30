// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/user'
import connectMongo from '../../utils/connectMongo'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email } = req.query

    try {
        await connectMongo()
        if (!email) throw Error('invalid_request')
        let user = await User.findOne({ email })
        if (!user) {
            user = await new User({
                email: email,
                lists: []
            })
            let result = await user.save()
            console.log('user_not_found, user_created')
            res.json({ lists: result.lists })
        } else {
            console.log('user_found')
            res.json({ lists: user.lists })
        }
    } catch (err) {
        console.log(err)
        res.json({ err })
    }
    
}
