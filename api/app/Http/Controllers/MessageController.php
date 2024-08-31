<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class MessageController extends Controller
{
    public function index(Response $response):object
    {
        $s = Message::all();
        return $s;
    }
}
