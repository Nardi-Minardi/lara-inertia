<?php

namespace App\Http\Controllers\Back\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Employe;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use DB;

class UserController extends Controller
{
    public function avatar(Request $request, $userId)
    {
        $request->validate([
          'avatar' => 'required|image|mimes:jpeg,png,jpg,JPEG,PNG,JPG|max:5048',
        ]);
        
        // dd($request->all());
          if($request->avatar){
            $newImageName = time() . '-' . '.'  . $request->avatar->extension();
            $request->avatar->move(public_path('images'), $newImageName);
            $user = User::where('id', $userId)->first();

            // unlink 
            if($user->avatar != 'avatar.jpg'){
              unlink(public_path('images/' . $user->avatar));
            }
           
            $user->update([
              'avatar' => $newImageName
            ]);
          }
    }
}
