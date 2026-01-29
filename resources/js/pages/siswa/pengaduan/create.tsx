import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, Send, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Kategori {
    id: number;
    nama: string;
}

interface Props {
    kategoris: Kategori[];
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Buat Pengaduan', href: '/siswa/pengaduan/create' },
];

export default function PengaduanCreate({ kategoris }: Props) {
    const [preview, setPreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors } = useForm({
        kategori_id: '',
        judul: '',
        lokasi: '',
        keterangan: '',
        foto: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('foto', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/siswa/pengaduan');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Pengaduan" />
            <div className="p-6 lg:p-12">
                <Link href="/siswa/pengaduan" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors italic">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Riwayat
                </Link>

                <Card className="shadow-lg border-2 border-primary/10">
                    <CardHeader className="">
                        <CardTitle className="text-2xl font-bold italic">Form Pengaduan Fasilitas</CardTitle>
                        <CardDescription className="italic">Sampaikan keluhan Anda terkait fasilitas sekolah dengan detail.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="kategori" className="italic font-semibold">Kategori Fasilitas</Label>
                                <Select onValueChange={(value) => setData('kategori_id', value)}>
                                    <SelectTrigger className="border-2 focus:ring-primary shadow-sm">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kategoris.map((k) => (
                                            <SelectItem key={k.id} value={k.id.toString()}>{k.nama}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.kategori_id && <p className="text-red-500 text-sm italic">{errors.kategori_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="judul" className="italic font-semibold">Judul Pengaduan</Label>
                                <Input 
                                    id="judul" 
                                    placeholder="Contoh: Kursi Patah, Lampu Mati"
                                    className="border-2 focus:ring-primary shadow-sm"
                                    value={data.judul}
                                    onChange={e => setData('judul', e.target.value)}
                                />
                                {errors.judul && <p className="text-red-500 text-sm italic">{errors.judul}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lokasi" className="italic font-semibold">Lokasi Kejadian/Fasilitas</Label>
                                <Input 
                                    id="lokasi" 
                                    placeholder="Contoh: Lab Komputer 2, Kamar Mandi Lt 1"
                                    className="border-2 focus:ring-primary shadow-sm"
                                    value={data.lokasi}
                                    onChange={e => setData('lokasi', e.target.value)}
                                />
                                {errors.lokasi && <p className="text-red-500 text-sm italic">{errors.lokasi}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="keterangan" className="italic font-semibold">Keterangan / Detail Keluhan</Label>
                                <Textarea 
                                    id="keterangan" 
                                    placeholder="Jelaskan kondisi fasilitas secara rinci..."
                                    className="min-h-[120px] border-2 focus:ring-primary shadow-sm"
                                    value={data.keterangan}
                                    onChange={e => setData('keterangan', e.target.value)}
                                />
                                {errors.keterangan && <p className="text-red-500 text-sm italic">{errors.keterangan}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="italic font-semibold">Bukti Foto</Label>
                                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer relative">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                        onChange={handleFileChange}
                                    />
                                    {preview ? (
                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <Camera className="text-white h-10 w-10" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center space-y-2">
                                            <div className="bg-primary/10 p-4 rounded-full inline-block">
                                                <Camera className="h-8 w-8 text-primary" />
                                            </div>
                                            <p className="text-sm font-medium italic">Klik atau tarik foto ke sini</p>
                                            <p className="text-xs text-muted-foreground italic">JPG, PNG up to 2MB</p>
                                        </div>
                                    )}
                                </div>
                                {errors.foto && <p className="text-red-500 text-sm italic">{errors.foto}</p>}
                            </div>

                            <Button type="submit" className="w-full py-6 text-lg font-bold italic shadow-lg hover:shadow-xl transition-all" disabled={processing}>
                                <Send className="mr-2 h-5 w-5" /> Kirim Pengaduan
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
