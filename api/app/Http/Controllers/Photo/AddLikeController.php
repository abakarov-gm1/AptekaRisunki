<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Likes;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddLikeController extends Controller
{

    public function index(Photo $photo)
    {
        $img = Photo::query()->where('id', $photo->id)->first();
        $count = count($img->users);
        return $img;
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        Likes::query()->create([
            "user_id" => $user->id,
            "photo_id" => $request->get('photo_id')
        ]);

        return $request->json(["message" => "Success"], 200);
    }

}
