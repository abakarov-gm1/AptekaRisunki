<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;

class UpdatePhotoController extends Controller
{
    public function index(Request $request){
        $ids = $request->input('ids');
        $photos = Photo::query()->whereIn("id", $ids)->get();
        foreach ($photos as $photo) {
            $photo->published = true;
            $photo->save();
        }
        return $request->json(["message", "Success"], 200);
    }
}
