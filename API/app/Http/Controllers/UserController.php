<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Hash;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

use App\Http\Requests;

use App\User;
use App\Relationship;
use App\Filter;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return Feed::with('user')->get();
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
            $oFilter = new Filter;
            $oFilter->user_id = $oUser->id;
            $oFilter->save();
            
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
        // To check if email exist
        $users = DB::table('users')
                ->where('email', '=', $request->input('email'))
                ->get();

        if (count($users) === 0) {
            return response()->json('failed');
        }

        if(Hash::check($request->input('password'), $users[0]->password)){
            return response()->json($users[0]);
        }else{
            return response()->json('failed');
        }
    }

    /**
     * To find other user possible for connection.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function find($id)
    {
        // Initialize variable with blank array
        $aUsersNotIncluded = array();

        // Push to $aUsersNotIncluded the user id
        array_push($aUsersNotIncluded, (int) $id);

        // Select all users with pending or established relationship by user id
        $oRelationship = Relationship::select('for_user_id')
            ->where('user_id', '=', $id)
            ->get();

        // Push to $aUsersNotIncluded each other user id
        foreach ($oRelationship as $iKey => $oValue) {
            array_push($aUsersNotIncluded, $oValue['for_user_id']);
        }

        $aCondition = array(
            array(
                'for_user_id',
                '=',
                $id
            ),
            array(
                'status',
                '=',
                1
            ),
            array(
                'reply',
                '=',
                1
            )
        );

        $oRelationship = Relationship::select('user_id')
            ->where($aCondition)
            ->get();

        foreach ($oRelationship as $iKey => $oValue) {
            if (!in_array($oValue['user_id'], $aUsersNotIncluded)) {
                array_push($aUsersNotIncluded, $oValue['user_id']);
            }
        }

        $oFilter = Filter::where('user_id', $id)->get();

        $oUsersIncluded = User::where('gender', $oFilter[0]['gender'])->whereNotIn('id', $aUsersNotIncluded)->get();
        
        return response()->json($oUsersIncluded);
    }
}
