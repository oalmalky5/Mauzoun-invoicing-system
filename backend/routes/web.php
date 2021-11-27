<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/invoice_view', 'App\Http\Controllers\InvoiceController@invoice_view');
Route::get('/invoice_pdf', 'App\Http\Controllers\InvoiceController@invoice_pdf');
