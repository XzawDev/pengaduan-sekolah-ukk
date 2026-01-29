<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengaduanController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/pengaduan/index', [
            'pengaduans' => Pengaduan::with(['user', 'kategori'])
                ->latest()
                ->get()
        ]);
    }

    public function show(Pengaduan $pengaduan)
    {
        $pengaduan->load(['user', 'kategori', 'feedback']);
        return Inertia::render('admin/pengaduan/show', [
            'pengaduan' => $pengaduan
        ]);
    }

    public function updateStatus(Request $request, Pengaduan $pengaduan)
    {
        $request->validate([
            'status' => 'required|in:Menunggu,Proses,Selesai',
            'feedback' => 'nullable|string'
        ]);

        $pengaduan->update(['status' => $request->status]);

        if ($request->feedback) {
            Feedback::create([
                'pengaduan_id' => $pengaduan->id,
                'tanggal' => now(),
                'isi' => $request->feedback,
            ]);
        }

        return back()->with('success', 'Status pengaduan berhasil diperbarui.');
    }
}
