<?php

namespace App\Http\Controllers\Api;
use App\Models\Pizza;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PizzaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Pizza::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $pizza = Pizza::create($request->all());
        return $pizza;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Pizza::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
