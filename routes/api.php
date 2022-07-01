<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RelationshipController;
use App\Http\Controllers\StoryController;
use App\Models\User;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//-------- 5/24/2022-----------
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::put('/account/deactivate',[User::class,'deactivate_account']);
//------- 5/24/2022 ends -------

Route::post('profile-update/{profile}', [ProfileController::class, 'profile_update']);

// relationship controller
Route::post('index', [RelationshipController::class, 'index_relationship']);
Route::post('relationship', [RelationshipController::class, 'create_relationship']);
Route::post('update/{id}', [RelationshipController::class, 'update_relationship']);
Route::post('delete/{id}', [RelationshipController::class, 'delete_relationship']);

// story controller
Route::resource('story', StoryController::class);
