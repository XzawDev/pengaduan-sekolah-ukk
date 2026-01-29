<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Users
        User::create([
            'id' => 1,
            'name' => 'Admin User',
            'email' => 'admin@app.com',
            'password' => '$2y$10$YOeYzedDH5.NAVkTz.MwMe.dCAQ0RYyZBRIN.0mLlCowoDSbfIqI6',
            'is_admin' => 1,
        ]);

        User::create([
            'id' => 2,
            'name' => 'Hendri Winarto',
            'email' => 'siswa@app.com',
            'password' => '$2y$10$a/nJC8COezsrWx2SpQpEi.ioY3jnH9XBvdSgSmaShevYfi.ymPwNW',
            'nis' => '1234567',
            'kelas' => 'XI RPL 3',
            'is_admin' => 0,
        ]);

        User::create([
            'id' => 3,
            'name' => 'Anang Prasetyo',
            'email' => 'siswa2@app.com',
            'password' => '$2y$10$a/nJC8COezsrWx2SpQpEi.ioY3jnH9XBvdSgSmaShevYfi.ymPwNW',
            'nis' => '1234568',
            'kelas' => 'XI RPL 4',
            'is_admin' => 0,
        ]);

        // Kategori
        \Illuminate\Support\Facades\DB::table('kategori')->insert([
            ['id' => 1, 'nama' => 'Sarana & Prasarana'],
            ['id' => 2, 'nama' => 'Kebersihan'],
            ['id' => 3, 'nama' => 'Keamanan'],
        ]);
    }
}
