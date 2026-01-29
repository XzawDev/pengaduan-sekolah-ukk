<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_pengaduan' => DB::table('pengaduan')->count(),
            'pengaduan_menunggu' => DB::table('pengaduan')->where('status', 'Menunggu')->count(),
            'pengaduan_proses' => DB::table('pengaduan')->where('status', 'Proses')->count(),
            'pengaduan_selesai' => DB::table('pengaduan')->where('status', 'Selesai')->count(),
            'total_users' => DB::table('users')->count(),
            'total_feedback' => DB::table('feedback')->count(),
        ];

        $recent_pengaduan = \App\Models\User::where('is_admin', false)
            ->join('pengaduan', 'users.id', '=', 'pengaduan.user_id')
            ->leftJoin('kategori', 'pengaduan.kategori_id', '=', 'kategori.id')
            ->select('pengaduan.*', 'users.name as user_name', 'users.kelas as user_kelas', 'kategori.nama as kategori_nama')
            ->orderBy('pengaduan.created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent_activities' => $recent_pengaduan
        ]);
    }
}
