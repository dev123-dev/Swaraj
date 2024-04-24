import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "../customFetchBase";
import { getUser, isLoggedOut, setTokens } from "../slices/userSlice";
// import { resetCalender } from "../slices/calenderSlice";
// import { assetApi } from "./assetApi";
// import { bookingApi } from "./bookingApi";
// import { categoryApi } from "./categoryApi";
// import { rateApi } from "./rateApi";
// import { reservationApi } from "./reservationApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    //* Login ******************************************************
    login: builder.mutation({
      query: (formData) => ({
        url: "/user/login",
        method: "POST",
        body: formData,
      }),

      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          obj.dispatch(
            setTokens({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
          obj.dispatch(userApi.util.invalidateTags(["me"]));
        } catch (error) {
          if (import.meta.env.DEV) console.error("Error:", error);
        }
      },
    }),

    //* Get me *****************************************************
    getMe: builder.query({
      providesTags: () => [{ type: "me" }],
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),

      async onQueryStarted(args, obj) {
        try {
          const { data } = await obj.queryFulfilled;
          obj.dispatch(getUser(data.data.user));
        } catch (error) {
          if (import.meta.env.DEV) console.error("Error:", error);
        }
      },
    }),

    //* Logout *****************************************************
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "PATCH",
        body: {},
      }),

      async onQueryStarted(args, obj) {
        try {
          await obj.queryFulfilled;
          localStorage.clear();
          obj.dispatch(isLoggedOut());
          // obj.dispatch(resetCalender());
          // obj.dispatch(assetApi.util.resetApiState());
          // obj.dispatch(bookingApi.util.resetApiState());
          // obj.dispatch(categoryApi.util.resetApiState());
          // obj.dispatch(rateApi.util.resetApiState());
          // obj.dispatch(reservationApi.util.resetApiState());
        } catch (error) {
          if (import.meta.env.DEV) console.error("Error:", error);
        }
      },
    }),

    //* Get All Users **********************************************
    getAllUsers: builder.query({
      providesTags: (result) => {
        if (!result) return [];

        const tags = result.data.users.map((el) => ({
          type: "user",
          id: el._id,
        }));
        tags.push({ type: "allUsers" });
        return tags;
      },
      query: (queryData) => ({
        url: "/user",
        method: "GET",
        params: queryData,
      }),
    }),

    //* Create user ************************************************
    createUser: builder.mutation({
      invalidatesTags: () => [{ type: "allUsers" }],
      query: (formData) => ({
        url: "/user",
        method: "POST",
        body: formData,
      }),
    }),

    //* Update user ************************************************
    updateUser: builder.mutation({
      invalidatesTags: (result, error, { userId }) => [
        { type: "user", id: userId },
      ],
      query: ({ userId, formData }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        body: formData,
      }),
    }),

    //* Update user password ***************************************
    updateUserPass: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `/user/${userId}/update-password`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserPassMutation,
} = userApi;
