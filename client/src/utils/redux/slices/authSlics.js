import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../axios'

export const getUser = createAsyncThunk('authSlice/getUser', async (_, thunkApi) => {
    const { data} = await axiosInstance.get('/me' )
    const user = data.user
    return  {_id : user._id , name : user.name , email : user.email , avatar: user.avatar?.url , role : user.role }
})



const initialState  = {
  isAuthenticated: false,
  user: {
    _id: null,
    name: null,
    email: null,
    avatar : null,
    role : null
  },
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.user = {
        _id: null,
        name : null,
        email: null,
        avatar : null,
         role : null
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        console.log("pending")
        state.loading = true
        state.isAuthenticated = false
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
          console.log('payload available', action.payload)
          state.isAuthenticated = true
          state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log("error occured" , action.error)
        state.loading = false
        state.isAuthenticated = false
        state.error = action.error.message || 'Failed to fetch user'
        state.user = initialState.user
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer