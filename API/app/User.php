<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

use Carbon\Carbon;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'birthdate', 'gender'
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


    public function getAge() {
        return Carbon::parse($this->attributes['birthdate'])->age;
    }
}
