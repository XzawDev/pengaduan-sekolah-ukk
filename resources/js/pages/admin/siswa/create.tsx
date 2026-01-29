import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, ArrowLeft } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Manajemen Siswa', href: '/admin/siswa' },
    { title: 'Tambah Siswa', href: '/admin/siswa/create' },
];

export default function SiswaCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        nis: '',
        kelas: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/siswa');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Siswa Baru" />
            <div className="p-6 lg:p-12">
                <Link href="/admin/siswa" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors italic">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Siswa
                </Link>

                <Card className="shadow-lg border-2 border-primary/10">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold italic flex items-center gap-3">
                            <UserPlus className="h-6 w-6" />
                            Tambah Siswa Baru
                        </CardTitle>
                        <CardDescription className="italic">Buat akun siswa baru untuk sistem pengaduan.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="italic font-semibold">Nama Lengkap</Label>
                                    <Input 
                                        id="name" 
                                        placeholder="Contoh: Ahmad Fauzi"
                                        className="border-2 focus:ring-primary shadow-sm"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm italic">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="italic font-semibold">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email"
                                        placeholder="contoh@email.com"
                                        className="border-2 focus:ring-primary shadow-sm"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm italic">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nis" className="italic font-semibold">NIS (Nomor Induk Siswa)</Label>
                                    <Input 
                                        id="nis" 
                                        placeholder="Contoh: 12345678"
                                        className="border-2 focus:ring-primary shadow-sm"
                                        value={data.nis}
                                        onChange={e => setData('nis', e.target.value)}
                                    />
                                    {errors.nis && <p className="text-red-500 text-sm italic">{errors.nis}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="kelas" className="italic font-semibold">Kelas</Label>
                                    <Input 
                                        id="kelas" 
                                        placeholder="Contoh: XII RPL 1"
                                        className="border-2 focus:ring-primary shadow-sm"
                                        value={data.kelas}
                                        onChange={e => setData('kelas', e.target.value)}
                                    />
                                    {errors.kelas && <p className="text-red-500 text-sm italic">{errors.kelas}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="password" className="italic font-semibold">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password"
                                        placeholder="Minimal 8 karakter"
                                        className="border-2 focus:ring-primary shadow-sm"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm italic">{errors.password}</p>}
                                    <p className="text-xs text-muted-foreground italic">Password akan di-hash untuk keamanan.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="flex-1 py-6 text-lg font-bold italic shadow-lg hover:shadow-xl transition-all" disabled={processing}>
                                    <UserPlus className="mr-2 h-5 w-5" />
                                    Buat Akun Siswa
                                </Button>
                                <Link href="/admin/siswa" className="flex-1">
                                    <Button type="button" variant="outline" className="w-full py-6 text-lg font-bold italic">
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
