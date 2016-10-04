<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;

use App\Feed;
use App\Relationship;

use DB;

class FeedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $aUsersIncluded = array();

        array_push($aUsersIncluded, $id);

        $aCondition = array(
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

        $oRelationship = Relationship::select('for_user_id')
            ->where($aCondition)
            ->get();

        foreach ($oRelationship as $iKey => $oValue) {
            if (!in_array($oValue['for_user_id'], $aUsersIncluded)) {
                array_push($aUsersIncluded, $oValue['for_user_id']);
            }
        }

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

        $oRelationship = Relationship::select('user_id')
            ->where($aCondition)
            ->get();

        foreach ($oRelationship as $iKey => $oValue) {
            if (!in_array($oValue['user_id'], $aUsersIncluded)) {
                array_push($aUsersIncluded, $oValue['user_id']);
            }
        }

        $feeds = Feed::with('user')
            ->whereIn('user_id', $aUsersIncluded)
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return response()->json($feeds);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $oFeed = new Feed;

        $oFeed->user_id = $input['user_id'];
        $oFeed->text = $input['text'];
        if($oFeed->save()) {
            return Feed::with('user')->where('id', $oFeed->id)->first();
        }

        return false;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $aUsersIncluded = array();

        array_push($aUsersIncluded, $id);

        $aCondition = array(
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

        $oRelationship = Relationship::select('for_user_id')
            ->where($aCondition)
            ->get();

        foreach ($oRelationship as $iKey => $oValue) {
            if (!in_array($oValue['for_user_id'], $aUsersIncluded)) {
                array_push($aUsersIncluded, $oValue['for_user_id']);
            }
        }

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

        $oRelationship = Relationship::select('user_id')
            ->where($aCondition)
            ->get();

        foreach ($oRelationship as $iKey => $oValue) {
            if (!in_array($oValue['user_id'], $aUsersIncluded)) {
                array_push($aUsersIncluded, $oValue['user_id']);
            }
        }

        $oFeed = Feed::with('user')
            ->whereIn('user_id', $aUsersIncluded)
            ->orderBy('created_at', 'desc')
            ->first();

        $aFeed = (array) $oFeed;

        if (count($aFeed) === 0) {
            return response()->json(false);
        }

        return response()->json($oFeed);
    }
}
