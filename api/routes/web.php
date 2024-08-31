<?php

use App\Http\Controllers\Photo\PhotoController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PhotoController::class, 'index']);
Route::get('/popular', [PhotoController::class, 'popular']);


