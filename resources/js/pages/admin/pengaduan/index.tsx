import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Eye, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface User {
    name: string;
    kelas: string;
}

interface Kategori {
    nama: string;
}

interface Pengaduan {
    id: number;
    judul: string;
    tanggal: string;
    lokasi: string;
    status: 'Menunggu' | 'Proses' | 'Selesai';
    user: User;
    kategori: Kategori;
}

interface Props {
    pengaduans: Pengaduan[];
}

const breadcrumbs = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Daftar Pengaduan', href: '/admin/pengaduan' },
];

export default function AdminPengaduanIndex({ pengaduans }: Props) {
    const statusInfo = {
        'Menunggu': { label: 'Menunggu', icon: AlertCircle, class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
        'Proses': { label: 'Prosed', icon: Clock, class: 'bg-blue-100 text-blue-700 border-blue-200' },
        'Selesai': { label: 'Selesai', icon: CheckCircle2, class: 'bg-green-100 text-green-700 border-green-200' },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Pengaduan" />
            <div className="p-6 flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold ">Semua Pengaduan Siswa</h1>
                    <p className="text-muted-foreground ">Monitor dan tindak lanjuti laporan sarana prasarana dari siswa.</p>
                </div>

                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className=" font-bold">Pelapor</TableHead>
                                <TableHead className=" font-bold">Judul</TableHead>
                                <TableHead className=" font-bold">Kategori & Lokasi</TableHead>
                                <TableHead className=" font-bold">Tanggal</TableHead>
                                <TableHead className=" font-bold">Status</TableHead>
                                <TableHead className="text-right  font-bold">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pengaduans.map((p) => {
                                const StatusIcon = statusInfo[p.status].icon;
                                return (
                                    <TableRow key={p.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold ">{p.user?.name}</span>
                                                <span className="text-xs text-muted-foreground ">{p.user?.kelas}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold ">
                                            {p.judul}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="">{p.kategori?.nama}</span>
                                                <span className="text-xs text-muted-foreground ">{p.lokasi}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="">
                                            {format(new Date(p.tanggal), 'dd/MM/yyyy', { locale: localeId })}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`px-2 py-0.5 flex items-center gap-1 w-fit font-bold  ${statusInfo[p.status].class}`} variant="outline">
                                                <StatusIcon className="h-3 w-3" />
                                                {statusInfo[p.status].label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/admin/pengaduan/${p.id}`}>
                                                <Button size="sm" variant="outline" className=" font-bold gap-1">
                                                    <Eye className="h-4 w-4" /> Detail
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {pengaduans.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20 text-muted-foreground ">
                                        Belum ada pengaduan masuk.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
