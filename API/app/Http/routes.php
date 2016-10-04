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

Route::get('/feed/initial/{id}', 'FeedController@index');
Route::get('/feed/{id}', 'FeedController@show');

Route::post('/feed', 'FeedController@store');

Route::group(['prefix' => 'api'], function () {
    Route::post('login', 'UserController@login');
    Route::post('register', 'UserController@store');

    Route::get('filter/{id}', 'FilterController@show');
    Route::post('filter/{id}', 'FilterController@update');

    Route::get('find/users/{id}', 'UserController@find');
    Route::post('find', 'RelationshipController@store');
    Route::get('find/{id}', 'RelationshipController@showFriends');

    Route::post('file/profilephoto/{id}', 'FileController@uploadProfilePhoto');

    Route::post('chat', 'ChatController@load');
    Route::post('chat/submit', 'ChatController@store');
    Route::post('chat/get', 'ChatController@get');
});
