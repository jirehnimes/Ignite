<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;

class FileController extends Controller
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

    public function uploadProfilePhoto(Request $request, $id) 
    {
        $sFileExt = $request->file->guessExtension();

        $sDestinationPath = 'uploads/images/'.$id.'/';
        $sImageName = 'profile_'.$id.'.'.$sFileExt;

        if($request->file('file')->move($sDestinationPath, $sImageName)){
            $oUser = User::find($id);
            $oUser->photo = $sImageName;
            if ($oUser->save()) {
                return response()->json(true);
            }
            return response()->json(false);
        };
        return response()->json(false);
    }

    public function downloadProfilePhoto($id)
    {
        $oUser = User::find($id);
        $sFile = public_path('/uploads/'.$id.'/'.$oUser->photo);

        if(file_exists($sFile)){

            return response()->json(true);
        }

        return response()->json(false);
        // return response()->download($sFile);        

        // $headers = array(

        //    'Content-Type'=>'image/jpg'
        // );

        // return response()->file($sFile, $headers);

        // return response()->download($sFile);
    }
}
