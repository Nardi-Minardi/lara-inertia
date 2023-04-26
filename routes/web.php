<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get("/", "App\Http\Controllers\Front\HomeController@index")->name("home");

Route::group(["prefix" => "admin", ["middleware" => "auth"]], function () {
  Route::get("/dashboard", "App\Http\Controllers\Back\Admin\DashboardController@index")->name("admin.dashboard");
  Route::get("/setting", "App\Http\Controllers\Back\Admin\SettingController@index")->name("admin.setting");
  Route::get("/employe", "App\Http\Controllers\Back\Admin\EmployeController@index")->name("admin.employe");
  Route::post("/employe", "App\Http\Controllers\Back\Admin\EmployeController@store")->name("admin.employe.store");
  Route::patch("/employe", "App\Http\Controllers\Back\Admin\EmployeController@update")->name("admin.employe.update");
  Route::delete("/employe", "App\Http\Controllers\Back\Admin\EmployeController@destroy")->name("admin.employe.destroy");

  Route::patch("/avatar/{userId}", "App\Http\Controllers\Back\Admin\UserController@avatar")->name("admin.user.avatar");
});


Route::middleware("auth")->group(function () {
    Route::get("/profile", "App\Http\Controllers\Auth\ProfileController@index")->name("profile");
    Route::patch("/profile", "App\Http\Controllers\Auth\ProfileController@update")->name("profile.update");
    Route::delete("/profile", "App\Http\Controllers\Auth\ProfileController@destroy")->name("profile.destroy");
});

require __DIR__ . "/auth.php";
