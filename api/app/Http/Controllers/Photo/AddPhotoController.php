<?php

namespace App\Http\Controllers\Photo;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddPhotoController extends Controller
{
    public function AddPhoto(Request $request):object
    {
        $user = Auth::user();

        $file = $request->file('image');
        $path = $file->store('images', 'public');

        $url = asset('storage/' . $path);

        Photo::query()->create([
            'link' => $url,
            'description' => $request->get('name'),
            'likes' => 0,
            'user_id' => $user->id
        ]);
        return response()->json(['message' => 'Success'], 200);
    }
}
