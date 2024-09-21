import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './BaseUrl';

// Создаем API Slice
export const photoApi = createApi({
    reducerPath: 'photoApi', // Уникальный путь для хранения данных в сторе
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/` }), // Базовый URL для запросов
    tagTypes: ['Photos'], // Определяем типы тегов
    endpoints: (builder) => ({
        // Определяем запрос для получения данных (GET-запрос)
        getPhotos: builder.query({
            query: (flag) => ({
                url: 'panel/photo', // Путь к API
                params: { flag }, // Передача query-параметров
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Bearer токен
            }),
            providesTags: ['Photos'], // Обновляем при изменении данных связанных с Photos
        }),
        updatePhotos: builder.mutation({
            query: ({ ids }) => ({
                url: 'panel/photos/update', // Путь к API для обновления нескольких фото
                method: 'POST', // Метод запроса
                body: { ids }, // Данные для обновления
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Bearer токен
            }),
            invalidatesTags: ['Photos'], // Инвалидируем тег 'Photos' после обновления
        }),
        deletePhotos: builder.mutation({
            query: ({ id }) => ({
                url: `panel/photos/delete`, // Путь к API для удаления фото по id
                method: 'DELETE', // Метод DELETE
                body: { id }, // Данные для удаления (если API поддерживает передачу в body)
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Bearer токен
            }),
            invalidatesTags: ['Photos'], // Инвалидируем тег 'Photos' после удаления
        }),
    }),
});

// Экспортируем автоматически созданные хуки для использования в компонентах
export const {
    useGetPhotosQuery,
    useUpdatePhotosMutation,
    useDeletePhotosMutation,
} = photoApi;
