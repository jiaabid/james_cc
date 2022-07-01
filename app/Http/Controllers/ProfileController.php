<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    //TODO: 
    //deactivate account
    //activate account
    //add user profile
    //get user profile
    //update 
    //delete

    /**
     * Deactivate account.
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function deactivate_account(Request $request)
    {
        //TODO:: test it 

        DB::beginTransaction();
        try {
            //update the user active status and revoke the token
            $updateUser = User::where('id', auth()->user()->id)->update(['is_active' => false]);
            auth()->user()->token()->revoke();
        } catch (Exception $e) {
            DB::rollBack();
            return self::failure($e->getMessage(), $e, 202);
        }
        DB::commit();
        return self::success("Account deactivated!", [], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $this->validate($request, []);
        $newProfile = new Profile();
        $newProfile = $request->all();
        $newProfile["user_id"] = auth()->user()->id;
        $newProfile["is_online"] = true;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
