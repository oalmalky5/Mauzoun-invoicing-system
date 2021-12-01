<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'Admin',
            'email' => 'admin@web.com',
            'password' => Hash::make('HxSwB?GvA+DH@4-b'),
            'role_id' => 1
        ]);
    }
}
