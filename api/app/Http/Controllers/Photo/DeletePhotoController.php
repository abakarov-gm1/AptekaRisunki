<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeletePhotoController extends Controller
{
//    удаление лайка с фотки :)
    public function index(Photo $photo)
    {
        $user = Auth::user();
        $user->likesPhoto()->detach($photo->id);
        return (["massage" => "Success"]);
    }

    // удаление самой фотки
    public function deletePhoto(Request $request){
        $photo = Photo::query()->where('id', $request->get('id'));
        $photo->delete();
        return $request->json(["massage" => "Success"], 200);
    }
}



