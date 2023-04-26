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

class EmployeController extends Controller
{
    public function index(): Response
    {
      $dataEmploye = DB::table('employees')
          ->join('users', 'employees.user_id', '=', 'users.id')
          ->join('departements', 'employees.departement_id', '=', 'departements.id')
          ->select('employees.*', 'users.name as name', 'users.email as email', 'users.avatar as avatar', 'departements.name as departement')
          ->orderBy('employees.id', 'desc')
          ->get();
      $dataDepartement = DB::table('departements')->select('name', 'id')->get();
      // dd($dataDepartement);
      return Inertia::render('Back/Admin/Employe', [
          'dataEmploye' => $dataEmploye,
          'dataDepartement' => $dataDepartement,
      ]);
    }

    public function store(Request $request)
    {
        $request->validate([
          'name' => 'required|string|max:255',
          'email' => 'required|string|email|max:255|unique:'.User::class,
          'departement_id' => 'required',
          'position' => 'required',
          'status' => 'required',
        ]);

        try {
          DB::beginTransaction();
          if($request->avatar){
            $request->validate([
              'avatar' => 'mimes:jpeg,png,jpg,JPEG,PNG,JPG|max:5048',
            ]);
            $newImageName = time() . '-' . $request->name . '.' . $request->avatar->extension();
            $request->avatar->move(public_path('images'), $newImageName);
          
          }
          $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('12345678'),
            'role' => 'user',
            'avatar' => $newImageName ?? 'avatar.jpg',
          ]);
          $employee = Employe::create([
            'user_id' => $user->id,
            'departement_id' => $request->departement_id,
            'position' => $request->position,
            'status' => $request->status,
          ]);
          DB::commit();
          return redirect()->route('admin.employe')->with('success_flash', 'Save has been successfully');
        } catch (\Exception $e) {
          DB::rollback();
          return redirect()->route('admin.employe')->with('error_flash', 'Something went wrong');
        }
    }

    public function update(Request $request)
    {
        $request->validate([
          'name' => 'required|string|max:255',
          'email' => 'required|string|email|max:255',
          'departement_id' => 'required',
          'position' => 'required',
          'status' => 'required',
        ]);
        // dd($request->avatar);
        try {
          DB::beginTransaction();
         
          $user = User::find($request->user_id);
          $user->update([
            'name' => $request->name,
            'email' => $request->email,
          ]);
          $employee = Employe::where('user_id', $request->user_id)->first();
          $employee->update([
            'departement_id' => $request->departement_id,
            'position' => $request->position,
            'status' => $request->status,
          ]);
          DB::commit();
          return redirect()->route('admin.employe')->with('success_flash', 'Save has been successfully');
        } catch (\Exception $e) {
          DB::rollback();
          return redirect()->route('admin.employe')->with('error_flash', 'Something went wrong');
        }
    }

    public function destroy(Request $request)
    {
      try {
      $id = request()->get('id');
      // dd($id);
      //check if id is array
      if (is_array($id)) {
        for ($i=0; $i < count($id); $i++) {
          $employe = Employe::where('id', $id[$i])->first();
          $user = User::where('id', $employe->user_id)->first();
          //delete
          $user->delete();
          $employe->delete();
        }
        
      } else {
        $employe = Employe::where('id', $id)->first();
        $user = User::where('id', $employe->user_id)->first();
        //unlink
        if($user->avatar != 'avatar.jpg'){
          unlink(public_path('images/'.$user->avatar));
        }
        //delete
        $user->delete();
        $employe->delete();
      }
      return redirect()->route('admin.employe')->with('success_flash', 'Delete has been successfully');
      } catch (\Exception $e) {
        return redirect()->route('admin.employe')->with('error_flash', 'Something went wrong');
      }
    }
}
