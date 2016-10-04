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
     * For register
     * @param  Request $request data from mobile
     * @return boolean
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
        
        // Save user
        if($oUser->save()){
            $oFilter = new Filter;
            $oFilter->user_id = $oUser->id;
            // Stores opposite gender
            if ($oInput['gender'] === 'Male') {
                $oFilter->gender = 'Female';
            }
            
            // Save filter for user            
            if ($oFilter->save()) {
                return response()->json(true);
            }    
            return response()->json(false);
        }
        return response()->json(false);
    }

    /**
     * For login
     * @param  Request $request data from mobile
     * @return boolean
     */
    public function login(Request $request)
    {
        // To check if email exist
        $users = DB::table('users')
                ->where('email', '=', $request->input('email'))
                ->get();

        if (count($users) === 0) {
            return response()->json(false);
        }

        // Password verification from encrypted password
        if(Hash::check($request->input('password'), $users[0]->password)){
            return response()->json($users[0]);
        }else{
            return response()->json(false);
        }
    }

    /**
     * To display list of user in cards
     * @param  integer $id [description]
     * @return array list of users
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

        // Condition to be used for query
        $aCondition = array(
            array(
                'for_user_id',
                $id
            ),
            array(
                'status',
                1
            ),
            array(
                'reply',
                1
            )
        );

        // Query for getting data in relationship table
        $oRelationship = Relationship::select('user_id')
            ->where($aCondition)
            ->get();

        // Stores the user id results in the collector
        foreach ($oRelationship as $iKey => $oValue) {
            if (!in_array($oValue['user_id'], $aUsersNotIncluded)) {
                array_push($aUsersNotIncluded, $oValue['user_id']);
            }
        }

        // Get the filter data by user id
        $oFilter = Filter::where('user_id', $id)->get();

        // Get filtered users with gender filter
        $oUsersIncluded = User::where('gender', $oFilter[0]['gender'])->whereNotIn('id', $aUsersNotIncluded)->get();
        
        // Return JSON data
        return response()->json($oUsersIncluded);
    }
}
