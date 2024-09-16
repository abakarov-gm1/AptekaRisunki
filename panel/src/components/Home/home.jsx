import React, { useState } from 'react';
import { logout } from "../../services/Auth/Auth";
import logo from "../../logo.svg";
import exit from "../../Exit.svg";
import menu from "../../List Bullet.svg";
import deleteIcon from "../../trash_full.png";
import {useDeletePhotosMutation, useGetPhotosQuery, useUpdatePhotosMutation} from '../../services/PhotoService';
import Loading from "./loading";

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState([]); // Хранит выделенные фото
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [selectedPhotoForModal, setSelectedPhotoForModal] = useState(null); // Хранит выбранную для модалки фотографию
    const [photoToDelete, setPhotoToDelete] = useState(null); // Хранит фото, которое нужно удалить
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Состояние модалки удаления
    const [selectedMenuItem, setSelectedMenuItem] = useState('unpublished'); // По умолчанию выбираем "Не опубликованные"
    const [updatePhotos] = useUpdatePhotosMutation(); // Хук для обновления фото
    const [deletePhoto] = useDeletePhotosMutation()

    const menuItems = [
        { label: 'Опубликованные', value: 'published' },
        { label: 'Не опубликованные', value: 'unpublished' }
    ];

    // Передаем в useGetPhotosQuery текущее значение выбранного меню
    const { data, refetch , error, isLoading   } = useGetPhotosQuery(selectedMenuItem === 'published' ? true : false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (value) => {
        setSelectedMenuItem(value); // Меняем текущее состояние фильтра при выборе пункта меню
        setIsSelectAll(false); // Сбрасываем выбор при смене фильтра
        setSelectedPhotos([]); // Очищаем выбранные фотографии
    };

    const handleSelectAll = () => {
        if (isSelectAll) {
            setSelectedPhotos([]); // Убираем выделение всех
        } else {
            setSelectedPhotos(data.map(photo => photo.id)); // Выбираем все фото (только ID)
        }
        setIsSelectAll(!isSelectAll); // Переключаем состояние
    };

    const handlePhotoSelect = (photoId) => {
        if (selectedPhotos.includes(photoId)) {
            setSelectedPhotos(selectedPhotos.filter((id) => id !== photoId));
        } else {
            setSelectedPhotos([...selectedPhotos, photoId]);
        }
    };

    const handleApplySelection = async () => {
        if (selectedPhotos.length === 0) {
            alert('Пожалуйста, выберите хотя бы одну фотографию.');
            return;
        }

        try {
            const response = await updatePhotos({ ids: selectedPhotos }).unwrap();
            console.log('Фотографии обновлены:', response);
            setSelectedPhotos([]); // Очищаем выбор после обновления
            setIsSelectAll(false); // Сбрасываем выбор всех
            refetch()
            // window.location.reload();
        } catch (err) {
            console.error('Ошибка при обновлении фотографий:', err);
        }
    };


    // Открытие модального окна с фотографией
    const openModal = (photo) => {
        setSelectedPhotoForModal(photo);
    };

    // Закрытие модального окна
    const closeModal = () => {
        setSelectedPhotoForModal(null);
    };

    // Открытие модалки подтверждения удаления
    const openDeleteModal = (photo) => {
        setPhotoToDelete(photo)
        setIsDeleteModalOpen(true)
    };

    // Закрытие модалки подтверждения удаления
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setPhotoToDelete(null);
    };


    // Подтверждение удаления фотографии
    const handleConfirmDelete = async () => {

        // console.log(photoToDelete)
        try {
            const response = await deletePhoto({ id: photoToDelete.id }).unwrap();
            refetch()
        }catch (err){
            console.log(err)
        }
        closeDeleteModal(); // Закрыть модалку
    };


    if (isLoading) return <Loading />;
    if (error) return <div>Error loading photos</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Верхняя панель с меню и кнопкой Logout */}
            <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <button
                    className="p-2 rounded-md bg-gray-200 text-gray-600"
                    onClick={toggleMenu}
                >
                    <img src={menu} alt="menu" width={25} height={25} />
                </button>
                <div className="text-lg font-bold text-gray-800">
                    {selectedMenuItem === 'published' ? 'Опубликованные фотографии' : 'Не опубликованные фотографии'}
                </div>
                <button
                    className="flex items-center p-2 rounded-md bg-gray-200 text-gray-600"
                    onClick={logout}
                >
                    <p className="text-black">Выход</p>
                    <img src={exit} alt="logout" width={20} height={20} />
                </button>
            </div>

            {/* Выдвижное меню */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
            >
                <button className="p-4 text-lg text-white  w-full" onClick={toggleMenu}>
                    <img src={logo} alt={'logo'} />
                </button>
                <ul className="mt-4">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer ${selectedMenuItem === item.value ? 'bg-gray-100' : ''}`}
                            onClick={() => handleMenuItemClick(item.value)} // Обработчик выбора меню
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Контент страницы */}
            <div className={`ml-0 ${isMenuOpen ? 'md:ml-64' : ''} p-4 transition-all duration-300`}>
                {/* Кнопки "Выбрать все" и "Применить" */}
                {selectedMenuItem !== "published" && (
                    <div className="flex items-center mb-4 space-x-4">
                        <button
                            className="flex items-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
                            onClick={handleSelectAll}
                        >
                            {isSelectAll ? 'Отменить' : 'Выбрать все'}
                        </button>

                        <button
                            className="flex items-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
                            onClick={handleApplySelection}
                        >
                            Опубликовать
                        </button>
                    </div>
                )}

                {/* Сетка фотографий */}
                {data && data.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">Нет фотографий</div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" style={{ maxWidth: '100%' }}>
                        {data?.map((photo) => (
                            <div key={photo.id} className="bg-white p-4 rounded-lg shadow-md">
                                <img
                                    src={photo.link}
                                    alt={`Photo ${photo.title}`}
                                    className="w-full h-48 object-cover rounded-md cursor-pointer"
                                    onClick={() => openModal(photo)} // Открытие модалки при клике
                                />
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center">
                                        {selectedMenuItem !== "published" && (
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={`checkbox-${photo.id}`}
                                                    className="mr-2"
                                                    checked={selectedPhotos.includes(photo.id)}
                                                    onChange={() => handlePhotoSelect(photo.id)}
                                                />
                                                <label htmlFor={`checkbox-${photo.id}`}>Выбрать {photo.title}</label>
                                            </>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => openDeleteModal(photo)} // Открытие модалки удаления
                                        className="ml-2"
                                    >
                                        <img src={deleteIcon} alt="delete" width={20} height={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Модальное окно для просмотра фото */}
            {selectedPhotoForModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={closeModal} // Закрытие модалки при клике на фон
                >
                    <div
                        className="relative bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-4"
                        onClick={(e) => e.stopPropagation()} // Остановка закрытия при клике на само модальное окно
                    >
                        <button
                            className="absolute top-0 right-0 m-4 text-black text-xl font-bold"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <img
                            src={selectedPhotoForModal.link}
                            alt={`Photo ${selectedPhotoForModal.title}`}
                            className="object-contain"
                            style={{ maxHeight: '90vh', maxWidth: '90vw' }} // Оригинальный размер изображения
                        />
                    </div>
                </div>
            )}

            {/* Модальное окно для подтверждения удаления */}
            {isDeleteModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={closeDeleteModal} // Закрытие модалки при клике на фон
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
                        onClick={(e) => e.stopPropagation()} // Остановка закрытия при клике на само модальное окно
                    >
                        <h2 className="text-xl font-bold mb-4">Вы уверены, что хотите удалить это фото?</h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                                onClick={closeDeleteModal}
                            >
                                Отмена
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                onClick={handleConfirmDelete}
                            >
                                Подтвердить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
