import { getLocalStorage } from '../../utils'
import { CurrentUser } from '../../interface/user.interface'
import { createSlice } from '@reduxjs/toolkit'

const userLocalStorage = getLocalStorage<CurrentUser>('user')

type UserState = {
  currentUser: CurrentUser | null
}

const initialState: UserState = {
  currentUser: userLocalStorage,
}

const userSlices = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    signOut: (state) => {
      state.currentUser = null
    },
  },
})

export const { setUser, signOut } = userSlices.actions
export default userSlices
