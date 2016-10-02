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
        
        $oRelationship->user_id = $oInput['user_id'];
        $oRelationship->for_user_id = $oInput['for_user_id'];
        $oRelationship->status = $oInput['status'];

        if($oRelationship->save()) {
            return response()->json($oInput['status']);
        }
        return response()->json(false);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

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

    public function showFriends($id)
    {
        $aCondition = array(
            array(
                'user_id',
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

        $oRelationship = Relationship::where($aCondition)->get();

        foreach ($oRelationship as $key => $value) {
            $oRelationship[$key]['user'] = User::find($value['for_user_id']);
        }

        return response()->json($oRelationship);
    }

    public function showPendings($id)
    {
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
                0
            )
        );

        $oRelationship = Relationship::where($aCondition)->get();

        foreach ($oRelationship as $key => $value) {
            $oRelationship[$key]['user'] = User::find($value['user_id']);
        }

        return response()->json($oRelationship);
    }
}
