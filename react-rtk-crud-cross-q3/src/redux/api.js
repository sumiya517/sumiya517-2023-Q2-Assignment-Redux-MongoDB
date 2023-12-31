import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const devicesApi = createApi({
    reducerPath: 'devicesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7001/api' }),
    tagTypes: ["devices"], // when we will invalidate the data
    endpoints: (builder) => ({
        getDevices: builder.query({
            query: () => `/devices`,
            providesTags: ["devices"]
        }),
        getSingleDevice: builder.query({
            query: (id) => `/devices/${id}`,
            providesTags: ["devices"]
        }),
        addDevice: builder.mutation({
            query: (device) => ({
                url: "/devices",
                method: "POST",
                body: device
            }),
            invalidatesTags: ["devices"]
        }),
        updateDevice: builder.mutation({
            query: ({device, id}) => ({
                url: `/devices/${id}`,
                method: "PUT",
                body: device
            }),
            invalidatesTags: ["devices"]
        }),
        deleteDevice: builder.mutation({
            query: (id) => ({
                url: `/devices/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["devices"]
        }),
  }),
})

export const {useGetDevicesQuery, useGetSingleDeviceQuery, useAddDeviceMutation, useUpdateDeviceMutation, useDeleteDeviceMutation} = devicesApi
