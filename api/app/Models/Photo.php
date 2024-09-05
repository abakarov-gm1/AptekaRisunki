<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'link',
        'description',
        'likes',
        'user_id',
    ];
    protected $keyType = 'string';
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function Users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'likes', 'photo_id', 'user_id');
    }
}
