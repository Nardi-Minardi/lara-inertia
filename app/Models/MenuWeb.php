<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuWeb extends Model
{
    use HasFactory;

    protected $table = 'menu_webs';

    protected $fillable = [
        'title',
        'url',
        'description',
        'parent_id'
    ];

    public $timestamps = false;

    public function parent()
    {
        return $this->belongsTo(MenuWeb::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(MenuWeb::class, 'parent_id');
    }

}
