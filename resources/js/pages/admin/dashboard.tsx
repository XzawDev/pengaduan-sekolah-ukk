import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { 
    ClipboardList, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Users, 
    MessageSquare 
} from 'lucide-react';

interface Stats {
    total_pengaduan: number;
    pengaduan_menunggu: number;
    pengaduan_proses: number;
    pengaduan_selesai: number;
    total_users: number;
    total_feedback: number;
}

interface RecentActivity {
    id: number;
    judul: string;
    tanggal: string;
    status: 'Menunggu' | 'Proses' | 'Selesai';
    user_name: string;
    user_kelas: string;
    kategori_nama: string;
    updated_at: string;
}

interface Props {
    stats: Stats;
    recent_activities: RecentActivity[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

export default function AdminDashboard({ stats, recent_activities }: Props) {
    const statCards = [
        {
            title: 'Total Pengaduan',
            value: stats.total_pengaduan,
            icon: ClipboardList,
            color: 'text-blue-600',
            bg: 'bg-blue-100 dark:bg-blue-900/20',
        },
        {
            title: 'Menunggu',
            value: stats.pengaduan_menunggu,
            icon: AlertCircle,
            color: 'text-yellow-600',
            bg: 'bg-yellow-100 dark:bg-yellow-900/20',
        },
        {
            title: 'Proses',
            value: stats.pengaduan_proses,
            icon: Clock,
            color: 'text-orange-600',
            bg: 'bg-orange-100 dark:bg-orange-900/20',
        },
        {
            title: 'Selesai',
            value: stats.pengaduan_selesai,
            icon: CheckCircle2,
            color: 'text-green-600',
            bg: 'bg-green-100 dark:bg-green-900/20',
        },
        {
            title: 'Total Siswa',
            value: stats.total_users,
            icon: Users,
            color: 'text-purple-600',
            bg: 'bg-purple-100 dark:bg-purple-900/20',
        },
        {
            title: 'Feedback',
            value: stats.total_feedback,
            icon: MessageSquare,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100 dark:bg-indigo-900/20',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                        Selamat datang kembali! Berikut adalah ringkasan sistem pengaduan hari ini.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {statCards.map((stat) => (
                        <div
                            key={stat.title}
                            className="flex items-center gap-4 rounded-xl border-2 border-primary/5 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                        >
                            <div className={`rounded-lg ${stat.bg} p-3`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground ">{stat.title}</p>
                                <h3 className="text-2xl font-bold ">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border-2 border-primary/5 bg-card p-6 shadow-sm overflow-hidden">
                    <h2 className="text-xl font-bold mb-6  flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Aktivitas Terkini
                    </h2>
                    
                    <div className="space-y-4">
                        {recent_activities.length === 0 ? (
                            <div className="flex items-center justify-center p-12 text-muted-foreground ">
                                <p>Belum ada aktivitas terbaru untuk ditampilkan.</p>
                            </div>
                        ) : (
                            recent_activities.map((activity, idx) => (
                                <div 
                                    key={activity.id} 
                                    className={`flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-muted/50 ${idx !== recent_activities.length - 1 ? 'border-b border-muted/50 rounded-b-none' : ''}`}
                                >
                                    <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${
                                        activity.status === 'Selesai' ? 'bg-green-500' : 
                                        activity.status === 'Proses' ? 'bg-orange-500' : 'bg-yellow-500'
                                    }`} />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-bold ">{activity.user_name} ({activity.user_kelas})</p>
                                            <span className="text-xs text-muted-foreground ">
                                                {format(new Date(activity.updated_at), 'HH:mm - dd MMM', { locale: localeId })}
                                            </span>
                                        </div>
                                        <p className="text-sm  text-foreground/90 font-medium">
                                            {activity.judul}
                                        </p>
                                        <div className="flex items-center gap-2 pt-1">
                                            <Badge variant="outline" className="text-[10px] px-2 py-0 font-bold  bg-muted/30 uppercase tracking-wider">
                                                {activity.kategori_nama || 'Umum'}
                                            </Badge>
                                            <span className={`text-[10px] font-bold  uppercase tracking-wider ${
                                                activity.status === 'Selesai' ? 'text-green-600' : 
                                                activity.status === 'Proses' ? 'text-orange-600' : 'text-yellow-600'
                                            }`}>
                                                • {activity.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
