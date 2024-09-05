<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Likes;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddLikeController extends Controller
{

    public function index()
    {
        $photo = Photo::query()->where('id', 'ccd46e2f-1780-4af9-a76b-08f8b29b584e')->first();
        $count = count($photo->users);
        return $photo->users;
    }

    // сделать удаление лайка

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
