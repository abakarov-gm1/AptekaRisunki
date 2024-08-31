<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function index(Request $request)
    {
        User::query()->create([
            "name" => $request->get('name'),
            "email" => $request->get('email'),
            "password" => $request->get('password'),
            "surname" => $request->get('surname'),
            "phone" => $request->get('phone'),
        ]);
        return $request->json(['message' => 'Success'], 200);
    }
}
