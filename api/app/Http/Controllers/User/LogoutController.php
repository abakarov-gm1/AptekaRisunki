<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function index(Request $request):string
    {
        $request->user()->tokens()->delete();
        return 'logout';
    }
}
