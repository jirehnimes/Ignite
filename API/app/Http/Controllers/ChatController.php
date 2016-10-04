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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
