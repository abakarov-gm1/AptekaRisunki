<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserLikePhotoController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return $user->likesPhoto;
    }
}
