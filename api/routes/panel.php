<?php

use Illuminate\Support\Facades\Route;

Route::post("/login", [\App\Http\Controllers\User\LoginController::class, 'index']);



Route::middleware("auth:sanctum")->group(function (){


    Route::get('/photo', [App\Http\Controllers\Photo\PhotoController::class, "index"]);

    Route::post('/photos/update', [App\Http\Controllers\Photo\UpdatePhotoController::class, "index"]);

    Route::prefix('/settings')->group(function (){
        Route::post("published", []);
        Route::delete("", []);
    });
});
