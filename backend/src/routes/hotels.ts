import express, { Request, Response } from 'express'
import Hotel from '../models/hotel'
import { HotelSearchResponse } from '../shared/types'

const router = express.Router()

// works on /api/hotels/search?
router.get('/search', async (req: Request, res: Response) => {
  try {
    const pageSize = 5 // In case many people are accessing the page at the same time
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : '1'
    )
    const skip = (pageNumber - 1) * pageSize
    const hotels = await Hotel.find().skip(skip).limit(pageSize)

    const total = await Hotel.countDocuments()

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    }

    res.json(response)
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
