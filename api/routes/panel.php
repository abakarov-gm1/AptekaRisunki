<?php

use Illuminate\Support\Facades\Route;

Route::post("/login", [\App\Http\Controllers\User\LoginController::class, 'index']);



Route::middleware("auth:sanctum")->group(function (){


    Route::get('/photo', [App\Http\Controllers\Photo\PhotoController::class, "index"]);

    Route::prefix('/photos')->group(function (){
        Route::post('/update', [App\Http\Controllers\Photo\UpdatePhotoController::class, "index"]);
        Route::delete('/delete', [\App\Http\Controllers\Photo\DeletePhotoController::class, "deletePhoto"]);
    });

    Route::prefix('/settings')->group(function (){
        Route::post("published", []);
        Route::delete("", []);
    });
});
