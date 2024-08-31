<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\Request;

class AddLikeController extends Controller
{
    public function index(Request $request)
    {
        $photo = Photo::query()->where('id', $request->get('id'))->first();

        if($request->get("FlagLike")) {
            $photo->likes = $photo->likes + 1;
        }else{
            $photo->likes = $photo->likes - 1;
        }

    }
}
