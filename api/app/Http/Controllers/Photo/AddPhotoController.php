<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;

class AddPhotoController extends Controller
{
    public function AddPhoto(Request $request):object
    {
        $uuid = Uuid::uuid4()->toString();

        $user = Auth::user();


        $file = $request->file('image');
        $path = $file->store('images', 'public');

        $url = secure_asset('storage/' . $path);

//        $url = asset('storage/' . $path); для локалки

        Photo::query()->create([
            'id' => $uuid,
            'link' => $url,
            'description' => $request->get('name'),
            'likes' => 0,
            'user_id' => $user->id
        ]);
        return response()->json(['message' => 'Success'], 200);
    }
}
