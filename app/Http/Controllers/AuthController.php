<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register the user.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        $requestData = $request->all();
        $requestData['password'] = bcrypt($requestData['password']);
        $user = User::create($requestData);
        $token = $user->createToken('jc-app')->accessToken;
        return self::success("User registered!", ["user" => $user, "token" => $token], 201);
    }

    /**
     * Login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        //
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return self::failure("No such user exist", [], 202);
        }

        if ($user->is_active != 1) {
            return self::failure("No such user exist", [], 202);
        }

        if (!Hash::check($request->password, $user->password)) {
            return self::failure("Unauthorized!", [], 203);
        }
        $token = $user->createToken('jc-app')->accessToken;
        return self::success("Loggedin Successfully!", ["user" => $user, "token" => $token], 200);
    }

}
