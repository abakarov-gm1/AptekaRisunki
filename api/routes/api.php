<?php

use App\Http\Controllers\Photo\AddPhotoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\RegisterController;
use App\Http\Controllers\User\LogoutController;
use App\Http\Controllers\User\LoginController;
use App\Http\Controllers\Photo\AddLikeController;
use App\Http\Controllers\User\UserLikePhotoController;

Route::prefix('v1')->group(function (){

    Route::post('/register', [RegisterController::class, 'index']);
    Route::post('/login', [LoginController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function (){

        Route::post('/logout', [LogoutController::class, 'index']);
        Route::post('/uploads/image', [AddPhotoController::class, 'AddPhoto']);
        Route::get('/user/like/photo', [UserLikePhotoController::class, 'index']);
        Route::post('/like', [AddLikeController::class, 'index']);


    });

});

