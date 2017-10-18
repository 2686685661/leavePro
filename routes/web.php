<?php

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

Route::get('/', function () {
    return view('index');
});

Route::any('/leave','leave\leaveController@leave');

Route::post('/groups','leave\leaveController@group_select');

Route::post('/grouphis','History\hisController@group_select');

Route::any('/leave_select','History\hisController@leave_select');

Route::any('/his_select','History\hisController@his_select');

Route::any('/export','Excel\excelController@export');

Route::get('/export2','Excel\excelController@exportAll');
