<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * [feeds description]
     * 
     * @return [type] [description]
     */
    public function feeds() {
        return $this->hasMany('App\Feed', 'user_id', 'id');        
    }

    public function setFullNameAttribute() {
        return $this->first_name . ' ' . $this->last_name;
    }
}
