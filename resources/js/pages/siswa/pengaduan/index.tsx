import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { ClipboardList, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface Kategori {
    nama: string;
}

interface Pengaduan {
    id: number;
    judul: string;
    tanggal: string;
    lokasi: string;
    status: 'Menunggu' | 'Proses' | 'Selesai';
    kategori: Kategori;
    foto: string;
}

interface Props {
    pengaduans: Pengaduan[];
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Riwayat Pengaduan', href: '/siswa/pengaduan' },
];

export default function PengaduanIndex({ pengaduans }: Props) {
    const statusColor = {
        'Menunggu': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'Proses': 'bg-blue-100 text-blue-700 border-blue-200',
        'Selesai': 'bg-green-100 text-green-700 border-green-200',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Pengaduan" />
            <div className="p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold italic">Riwayat Pengaduan</h1>
                        <p className="text-muted-foreground italic">Pantau status laporan fasilitas yang telah Anda buat.</p>
                    </div>
                    <Link href="/siswa/pengaduan/create">
                        <Button className="font-bold italic">
                            <Plus className="mr-2 h-4 w-4" /> Buat Laporan Baru
                        </Button>
                    </Link>
                </div>

                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[150px] italic font-bold">Tanggal</TableHead>
                                <TableHead className="italic font-bold">Judul</TableHead>
                                <TableHead className="italic font-bold">Kategori</TableHead>
                                <TableHead className="italic font-bold">Lokasi</TableHead>
                                <TableHead className="italic font-bold">Status</TableHead>
                                <TableHead className="text-right italic font-bold">Foto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pengaduans.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium italic">
                                        {format(new Date(p.tanggal), 'dd MMMM yyyy', { locale: localeId })}
                                    </TableCell>
                                    <TableCell className="italic font-bold">{p.judul}</TableCell>
                                    <TableCell className="italic">{p.kategori?.nama}</TableCell>
                                    <TableCell className="italic">{p.lokasi}</TableCell>
                                    <TableCell>
                                        <Badge className={`px-3 py-1 font-bold italic ${statusColor[p.status]}`} variant="outline">
                                            {p.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end">
                                            <div className="h-12 w-16 rounded border overflow-hidden bg-muted">
                                                <img src={`/storage/${p.foto}`} alt="Bukti" className="h-full w-full object-cover" />
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {pengaduans.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20">
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <ClipboardList className="h-10 w-10 opacity-20" />
                                            <p className="italic">Anda belum pernah membuat laporan.</p>
                                        </div>
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
