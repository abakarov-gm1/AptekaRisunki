<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class PhotoController extends Controller
{
    public function index(Request $request):object{
        return Photo::query()->where('published', $request->get("flag"))->get();
    }

    public function popular(Request $request):object
    {
//        изменить
        return Photo::query()->orderBy('likes', 'desc')->take(10)->get();
    }

}






