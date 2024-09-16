import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Создаем API Slice
export const photoApi = createApi({
    reducerPath: 'photoApi', // Уникальный путь для хранения данных в сторе
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.abakarov/' }), // Базовый URL для запросов
    endpoints: (builder) => ({
        // Определяем запрос для получения данных (GET-запрос)
        getPhotos: builder.query({
            query: (flag) => ({
                url: 'panel/photo', // Путь к API
                params: { flag }, // Передача query-параметров
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Bearer токен
            }),
        }),
        updatePhotos: builder.mutation({
            query: ({ ids }) => ({
                url: 'panel/photos/update', // Путь к API для обновления нескольких фото
                method: 'POST', // Метод запроса
                body: { ids }, // Данные для обновления
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Bearer токен
            }),
        }),
        deletePhotos: builder.mutation({
            query: ({ id }) => ({
                url: `panel/photos/delete`, // Путь к API для удаления фото по id
                method: 'DELETE', // Метод DELETE
                body: {id},
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Bearer токен
            }),
        }),

    }),
});

// Экспортируем автоматически созданные хуки для использования в компонентах
export const {
    useGetPhotosQuery
    ,useUpdatePhotosMutation
    ,useDeletePhotosMutation
} = photoApi;
