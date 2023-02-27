import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isAuth: false,
    data: [],
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthStatus: (state,action) => {
            state.isAuth = action.payload
            state.token = localStorage.getItem('token')
        },
        setData: (state,action) => {
            state.data = action.payload
        }
    }
})


export default userSlice.reducer

