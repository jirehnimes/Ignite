<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;

use App\Filter;

class FilterController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $oFilter = Filter::where('user_id', $id)->get();
        return response()->json($oFilter);
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
        $oInput = $request->all();
        
        if (Filter::where('user_id', $id)->update(['gender' => $oInput['gender']])) {
            return response()->json(true);
        }
        return response()->json(false);
    }
}
