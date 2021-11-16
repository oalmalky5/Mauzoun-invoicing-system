<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'id' => 1,
            'name' => 'Admin',
            'key' => 'admin'
        ]);

        Role::create([
            'id' => 2,
            'name' => 'Staff',
            'key' => 'staff'
        ]);
    }
}
