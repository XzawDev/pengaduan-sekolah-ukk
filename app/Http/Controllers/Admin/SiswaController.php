<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class SiswaController
{
    public function index()
    {
        $siswa = User::where('is_admin', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/siswa/index', [
            'siswa' => $siswa,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/siswa/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'nis' => 'required|string|unique:users,nis',
            'kelas' => 'required|string|max:50',
            'password' => 'required|string|min:8',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'nis' => $validated['nis'],
            'kelas' => $validated['kelas'],
            'password' => Hash::make($validated['password']),
            'is_admin' => false,
        ]);

        return redirect()->route('admin.siswa.index')->with('success', 'Siswa berhasil ditambahkan!');
    }
}
