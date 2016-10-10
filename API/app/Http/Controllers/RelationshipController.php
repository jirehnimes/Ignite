<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

use App\Http\Requests;

use App\User;
use App\Relationship;

class RelationshipController extends Controller
{
    /**
     * For saving relationship data
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $oInput = $request->all();
        $oRelationship = new Relationship;

        $aCondition = array(
            array(
                'user_id',
                '=',
                $oInput['user_id']
            ),
            array(
                'for_user_id',
                '=',
                $oInput['for_user_id']
            )
        );

        $aExist = Relationship::where($aCondition)->get();
        if (count($aExist) === 1) {
            return response()->json(false);
        }
        
        $aCondition = array(
            array(
                'user_id',
                '=',
                $oInput['for_user_id']
            ),
            array(
                'for_user_id',
                '=',
                $oInput['user_id']
            ),
            array(
                'status',
                '=',
                1
            )
        );

        $aRes = Relationship::where($aCondition)->get();
        if (count($aRes) === 1) {
            if(Relationship::where($aCondition)->update(['reply' => 1])) {
                return response()->json(3);
            }
            return response()->json(false);
        }

        $oRelationship->user_id = $oInput['user_id'];
        $oRelationship->for_user_id = $oInput['for_user_id'];
        $oRelationship->status = $oInput['status'];

        if($oRelationship->save()) {
            return response()->json($oInput['status']);
        }
        return response()->json(false);
    }

    /**
     * Getting the data of user friends
     * @param  integer $id current user id
     * @return
     */
    public function showFriends($id)
    {
        // Condition 1 for query
        $aCondition1 = array(
            array(
                'user_id',
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

        // Condition 2 for query
        $aCondition2 = array(
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

        $oRelationship = Relationship::where($aCondition1)
            ->orWhere($aCondition2)
            ->get();

        $aFriends = array();

        foreach ($oRelationship as $key => $value) {
            if ($value['user_id'] == $id) {
                array_push($aFriends, User::find($value['for_user_id']));
            } else if ($value['for_user_id'] == $id) {
                array_push($aFriends, User::find($value['user_id']));
            }
        }

        return response()->json($aFriends);
    }
}
