<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PengaduanController extends Controller
{
    public function index()
    {
        return Inertia::render('siswa/pengaduan/index', [
            'pengaduans' => Pengaduan::where('user_id', auth()->id())
                ->with(['kategori', 'feedback'])
                ->latest()
                ->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('siswa/pengaduan/create', [
            'kategoris' => Kategori::orderBy('nama')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kategori_id' => 'required|exists:kategori,id',
            'judul' => 'required|string|max:100',
            'lokasi' => 'required|string|max:45',
            'keterangan' => 'required|string',
            'foto' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $path = $request->file('foto')->store('pengaduan', 'public');

        Pengaduan::create([
            'user_id' => auth()->id(),
            'kategori_id' => $request->kategori_id,
            'judul' => $request->judul,
            'tanggal' => now(),
            'lokasi' => $request->lokasi,
            'keterangan' => $request->keterangan,
            'foto' => $path,
            'status' => 'Menunggu',
        ]);

        return redirect()->route('siswa.pengaduan.index')->with('success', 'Pengaduan berhasil dikirim.');
    }
}
