<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;

use App\Chat;

use DB;

class ChatController extends Controller
{
    /**
     * Stores new feed post
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $oInput = $request->all();

        $oChat = new Chat;

        $oChat->user_1 = $oInput['user1'];
        $oChat->user_2 = $oInput['user2'];
        $oChat->text = $oInput['text'];

        if ($oChat->save()) {
            // return response()->json(true);
            return Chat::where('id', $oChat->id)->first();
        }
        return response()->json(false);
    }

    // Called by initial load of feed
    public function load(Request $request)
    {
        $oInput = $request->all();

        $aCondition1 = array(
            array(
                'user_1',
                $oInput['user1']
            ),
            array(
                'user_2',
                $oInput['user2']
            ),
        );

        $aCondition2 = array(
            array(
                'user_1',
                $oInput['user2']
            ),
            array(
                'user_2',
                $oInput['user1']
            ),
        );

        $aChat = Chat::where($aCondition1)
            ->orWhere($aCondition2)
            ->get();

        return response()->json($aChat);
    }

    // Called by the real-time event
    public function get(Request $request)
    {
        $oInput = $request->all();

        $aCondition1 = array(
            array(
                'user_1',
                $oInput['user1']
            ),
            array(
                'user_2',
                $oInput['user2']
            ),
        );

        $aCondition2 = array(
            array(
                'user_1',
                $oInput['user2']
            ),
            array(
                'user_2',
                $oInput['user1']
            ),
        );

        // Getting the latest feed according to query conditions
        $aChat = Chat::where($aCondition1)
            ->orWhere($aCondition2)
            ->orderBy('created_at', 'desc')
            ->first();

        if (count($aChat) === 0) {
            return response()->json(false);
        }

        return response()->json($aChat);
    }
}
