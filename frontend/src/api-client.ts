import { RegisterFormData } from './mytypes/types'
import { SignInFormData } from './pages/SignIn'
import {
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  UserType,
} from '../../backend/src/shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Error fetching user')
  }
  return response.json()
}

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
  })
  if (!response) {
    throw new Error('Token invalid')
  }

  return response.json()
}

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Error during sign out')
  }
}

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData,
  })

  if (!response.ok) {
    throw new Error('Failed to add hotel')
  }

  return response.json()
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error fetching hotels')
  }

  return response.json()
}

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Error fetching Hotels')
  }

  return response.json()
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
    {
      method: 'PUT',
      body: hotelFormData,
      credentials: 'include',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to update hotel')
  }

  return response.json()
}

export type SearchParams = {
  destination?: string
  checkIn?: string
  checkOut?: string
  adultCount?: string
  childCount?: string
  page?: string
  facilities?: string[]
  types?: string[]
  stars?: string[]
  maxPrice?: string
  sortOption?: string
}

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParamas = new URLSearchParams()
  queryParamas.append('destination', searchParams.destination || '')
  queryParamas.append('checkIn', searchParams.checkIn || '')
  queryParamas.append('checkOut', searchParams.checkOut || '')
  queryParamas.append('adultCount', searchParams.adultCount || '')
  queryParamas.append('childCount', searchParams.childCount || '')
  queryParamas.append('page', searchParams.page || '')

  queryParams.append('maxPrice', searchParams.maxPrice || '')
  queryParams.append('sortOption', searchParams.sortOption || '')

  searchParams.facilities?.forEach((facility) =>
    searchParams.append('facilities', facility)
  )

  searchParams.types?.forEach((type) => searchParams.append('types', type))
  searchParams.stars?.forEach((star) => queryParamas.append('stars', star))

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParamas}`
  )

  if (!response.ok) {
    throw new Error('Error fetching hotels')
  }

  return response.json()
}

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)
  if (!response.ok) {
    throw new Error('Error fetching Hotels')
  }

  return response.json()
}

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ numberOfNights }),
      headers: {
        'Content-type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error('Error fetching payment intent')
  }

  return response.json()
}
