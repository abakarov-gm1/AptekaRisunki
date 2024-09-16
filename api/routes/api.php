<?php

use App\Http\Controllers\Photo\AddPhotoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\RegisterController;
use App\Http\Controllers\User\LogoutController;
use App\Http\Controllers\User\LoginController;
use App\Http\Controllers\Photo\AddLikeController;
use App\Http\Controllers\User\UserLikePhotoController;
use \App\Http\Controllers\Photo\DeletePhotoController;

Route::prefix('v1')->group(function (){

    Route::post('/register', [RegisterController::class, 'index']);
    Route::post('/login', [LoginController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function (){
        Route::post('/logout', [LogoutController::class, 'index']);

        Route::prefix('image')->group(function (){
            Route::post('/uploads', [AddPhotoController::class, 'AddPhoto']);
            Route::post('/publish', );
        });

        Route::prefix('/likes')->group(function (){
            Route::post('/add', [AddLikeController::class, 'store']);
            Route::get('/show/{photo}', [AddLikeController::class, 'index']);
            Route::get('/user/photo', [UserLikePhotoController::class, 'index']);
            Route::delete('/delete/{photo}', [DeletePhotoController::class, 'index']);
        });


    });

});

//для возраста делаю выпадающий список на фронте для возраста, выбираю
// нужную категорию и а сюда отправляю id этой категории)


