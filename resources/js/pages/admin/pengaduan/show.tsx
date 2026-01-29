import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Send, User, MapPin, Calendar, Clipboard } from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface Feedback {
    id: number;
    tanggal: string;
    isi: string;
}

interface Pengaduan {
    id: number;
    judul: string;
    tanggal: string;
    lokasi: string;
    keterangan: string;
    foto: string;
    status: 'Menunggu' | 'Proses' | 'Selesai';
    user: { name: string; kelas: string; nis: string };
    kategori: { nama: string };
    feedback: Feedback[];
}

interface Props {
    pengaduan: Pengaduan;
}

const breadcrumbs = (id: number) => [
    { title: 'Daftar Pengaduan', href: '/admin/pengaduan' },
    { title: `Detail #${id}`, href: `/admin/pengaduan/${id}` },
];

export default function AdminPengaduanShow({ pengaduan }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        status: pengaduan.status,
        feedback: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/pengaduan/${pengaduan.id}/status`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(pengaduan.id)}>
            <Head title={`Detail Pengaduan #${pengaduan.id}`} />
            <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
                <Link href="/admin/pengaduan" className="flex items-center text-muted-foreground hover:text-foreground transition-colors ">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="shadow-sm border-2 overflow-hidden">
                            <img src={`/storage/${pengaduan.foto}`} alt="Bukti" className="w-full aspect-video object-cover" />
                            <CardContent className="pt-6">
                                <div className="flex justify-between items-start mb-4">
                                    <Badge className="px-3 py-1 font-bold " variant="secondary">{pengaduan.kategori?.nama}</Badge>
                                    <Badge className="px-3 py-1 font-bold ">{pengaduan.status}</Badge>
                                </div>
                                <h1 className="text-3xl font-extrabold  mb-2">{pengaduan.judul}</h1>
                                <h2 className="text-xl font-bold  mb-4 text-muted-foreground">Keterangan Laporan:</h2>
                                <p className=" text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                    {pengaduan.keterangan}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border-2">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold ">Riwayat Tanggapan / Feedback</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {pengaduan.feedback.map((f) => (
                                    <div key={f.id} className="p-4 rounded-lg bg-muted/40 border  space-y-2">
                                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                                            <span className="font-bold">Admin</span>
                                            <span>{format(new Date(f.tanggal), 'dd MMMM yyyy HH:mm', { locale: localeId })}</span>
                                        </div>
                                        <p>{f.isi}</p>
                                    </div>
                                ))}
                                {pengaduan.feedback.length === 0 && (
                                    <p className="text-center py-6 text-muted-foreground ">Belum ada tanggapan.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="shadow-sm border-2">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold ">Informasi Pelapor</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 ">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full"><User className="h-4 w-4 text-primary" /></div>
                                    <div>
                                        <p className="text-sm font-bold">{pengaduan.user?.name}</p>
                                        <p className="text-xs text-muted-foreground">NIS: {pengaduan.user?.nis}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full"><Clipboard className="h-4 w-4 text-primary" /></div>
                                    <p className="text-sm font-medium">{pengaduan.user?.kelas}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full"><MapPin className="h-4 w-4 text-primary" /></div>
                                    <p className="text-sm font-medium">{pengaduan.lokasi}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full"><Calendar className="h-4 w-4 text-primary" /></div>
                                    <p className="text-sm font-medium">{format(new Date(pengaduan.tanggal), 'dd MMMM yyyy', { locale: localeId })}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border-2 border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold ">Update Status & Tanggapi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="">Status</Label>
                                        <Select value={data.status} onValueChange={v => setData('status', v as any)}>
                                            <SelectTrigger className="bg-white text-gray-800 font-bold">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Menunggu">Menunggu</SelectItem>
                                                <SelectItem value="Proses">Proses</SelectItem>
                                                <SelectItem value="Selesai">Selesai</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="">Tambah Tanggapan</Label>
                                        <Textarea 
                                            placeholder="Tulis tanggapan untuk siswa..."
                                            value={data.feedback}
                                            onChange={e => setData('feedback', e.target.value)}
                                            className="bg-white min-h-[100px] "
                                        />
                                    </div>
                                    <Button type="submit" className="w-full font-bold " disabled={processing}>
                                        <Send className="mr-2 h-4 w-4" /> Perbarui Laporan
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
