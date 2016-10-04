<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;

class FileController extends Controller
{
    /**
     * For uploading user profile photo
     * @param  Request $request [description]
     * @param  [type]  $id      [description]
     * @return [type]           [description]
     */
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
}
