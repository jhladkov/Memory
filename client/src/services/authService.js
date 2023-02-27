import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    endpoints: (build) => ({
        registration: build.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data,
                headers: { withCredentials: true }
            })
        }),
        login: build.mutation({
            query: (data) => ({
                url: '/login',
                method: "POST",
                body: data,
            })
        }),
        getUserData: build.query({
            query: (data) => ({
                url: '/getUserData',
                headers: {
                    'authorization': `Bearer ${data.token}`
                }
            })
        })
    })
})
