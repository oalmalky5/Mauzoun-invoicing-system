<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('/users')->group(function () {
        Route::post('/store', 'App\Http\Controllers\UserController@store');
        Route::post('/{id}/delete', 'App\Http\Controllers\UserController@destroy');
        Route::get('/{id}/show', 'App\Http\Controllers\UserController@show');
        Route::post('/update', 'App\Http\Controllers\UserController@update');
        Route::get('/all', 'App\Http\Controllers\UserController@all');
        Route::get('/staff', 'App\Http\Controllers\UserController@staff');
    });

    Route::prefix('/customers')->group(function () {
        Route::post('/store', 'App\Http\Controllers\CustomerController@store');
        Route::post('/{id}/delete', 'App\Http\Controllers\CustomerController@destroy');
        Route::get('/{id}/show', 'App\Http\Controllers\CustomerController@show');
        Route::post('/update', 'App\Http\Controllers\CustomerController@update');
        Route::get('/all', 'App\Http\Controllers\CustomerController@all');
    });

    Route::prefix('/account')->group(function () {
        Route::post('/change-password', 'App\Http\Controllers\UserController@changePassword');
        Route::get('/me', 'App\Http\Controllers\UserController@me');
        Route::post('/update', 'App\Http\Controllers\UserController@updateAccount');
    });
});


Route::prefix('/auth')->group(function () {
    Route::post('/login', '\App\Http\Controllers\AuthController@login');
});
