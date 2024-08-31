<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\Request;

class AddPhotoController extends Controller
{
    public function AddPhoto(Request $request):object
    {
        $file = $request->file('image');
        $path = $file->store('images', 'public');
        $url = asset('storage/' . $path);

        Photo::query()->create([
            'link' => $url,
            'description' => $request->get('name'),
            'likes' => 1,
            'user_id' => 1
        ]);
        return response()->json(['message' => 'Success'], 200);
    }
}
