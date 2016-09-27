<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        User::create(array(

            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'email' => 'admin@ignite.com',
            'password' => Hash::make('password'),
            'birthdate' => '2016-01-01',
            'gender' => 'Male'
        ));

        User::create(array(

            'first_name' => 'Minho',
            'last_name' => 'Lee',
            'email' => 'mlee@ignite.com',
            'password' => Hash::make('password'),
            'birthdate' => '2016-03-21',
            'gender' => 'Male'
        ));

        User::create(array(

            'first_name' => 'Tiffany',
            'last_name' => 'Hwang',
            'email' => 'thwang@ignite.com',
            'password' => Hash::make('password'),
            'birthdate' => '2016-09-10',
            'gender' => 'Female'
        ));

        User::create(array(

            'first_name' => 'Dingdong',
            'last_name' => 'Dantes',
            'email' => 'ddantes@ignite.com',
            'password' => Hash::make('password'),
            'birthdate' => '2016-05-19',
            'gender' => 'Male'
        ));

        User::create(array(

            'first_name' => 'Marian',
            'last_name' => 'Rivera',
            'email' => 'mrivera@ignite.com',
            'password' => Hash::make('password'),
            'birthdate' => '2016-04-15',
            'gender' => 'Female'
        ));
    }
}
