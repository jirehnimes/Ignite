<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Hash;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

use App\Http\Requests;

use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $oInput = $request->all();
        $oUser = new User;
        $oUser->first_name = $oInput['first_name'];
        $oUser->last_name = $oInput['last_name'];
        $oUser->email = $oInput['email'];
        $oUser->password = Hash::make($oInput['password']);
        $oUser->birthdate = $oInput['birthdate'];
        $oUser->gender = $oInput['gender'];
        if($oUser->save()){
            return response()->json('Success');
        }
        return response()->json('Failed');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function login(Request $request)
    {
        $users = DB::table('users')
                ->where('email', '=', $request->input('email'))
                ->get();

        if (count($users) === 0) {
            return json_encode('failed');
        }

        if(Hash::check($request->input('password'), $users[0]->password)){
            return json_encode('success');
        }else{
            return json_encode('failed');
        }
    }

    /**
     * To find other user possible for connection.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function find(Request $request) 
    {
        return response()->json(User::all());
    }
}
