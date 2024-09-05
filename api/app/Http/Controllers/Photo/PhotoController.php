<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class PhotoController extends Controller
{
    public function index():object
    {
        $photo = Photo::all();
        return $photo;
    }

    public function popular(Request $request):object
    {
//        изменить
        $photo = Photo::query()->orderBy('likes', 'desc')->take(10)->get();
        return $photo;
    }

}






