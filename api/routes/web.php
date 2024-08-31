<?php

use App\Http\Controllers\Photo\PhotoController;
use App\Http\Controllers\Photo\AddPhotoController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PhotoController::class, 'index']);

Route::post('/image', [AddPhotoController::class, 'AddPhoto']);









