<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class RegisterController extends Controller
{
    public function index(Request $request)
    {
        $uuid = Uuid::uuid4()->toString();

        User::query()->create([
            "id" => $uuid,
            "name" => $request->get('name'),
            "email" => $request->get('email'),
            "password" => $request->get('password'),
            "surname" => $request->get('surname'),
            "phone" => $request->get('phone'),
            "category_id" => $request->get('category_id')
        ]);

        return $request->json(['message' => 'Success'], 200);
    }
}
