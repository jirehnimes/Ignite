<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/feed', 'FeedController@index');
Route::get('/feed/{id}', 'FeedController@show');
Route::post('/feed', 'FeedController@store');

Route::group(['prefix' => 'api'], function () {
    Route::post('login', 'UserController@login');
    Route::post('register', 'UserController@store');

    Route::get('find', 'UserController@find');
    Route::post('find', 'RelationshipController@store');
});

Route::auth();
