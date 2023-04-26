<?php

namespace App\Http\Controllers\Back\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuWeb;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        $menus = MenuWeb::where('parent_id', null)->with('children')->get();
       
        return Inertia::render('Back/Admin/Setting', [
            'menus' => $menus
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(MenuWeb $menuWeb)
    {
        //
    }

    public function edit(MenuWeb $menuWeb)
    {
        //
    }

    public function update(Request $request, MenuWeb $menuWeb)
    {
        //
    }

    public function destroy(MenuWeb $menuWeb)
    {
        //
    }
}
