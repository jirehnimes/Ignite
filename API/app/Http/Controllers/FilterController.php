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
        
        $aData = array(
            'gender' => $oInput['gender'],
            'age_min' => $oInput['age_min'],
            'age_max' => $oInput['age_max']
        );

        if (Filter::where('user_id', $id)->update($aData)) {
            return response()->json(true);
        }
        return response()->json(false);
    }
}
