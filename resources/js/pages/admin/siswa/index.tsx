import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { UserPlus, Users } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    nis: string;
    kelas: string;
    created_at: string;
}

interface Props {
    siswa: User[];
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Manajemen Siswa', href: '/admin/siswa' },
];

export default function SiswaIndex({ siswa }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Siswa" />
            <div className="p-6 lg:p-12">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black  text-foreground">Manajemen Siswa</h1>
                            <p className="text-sm text-muted-foreground ">Kelola akun siswa yang terdaftar</p>
                        </div>
                    </div>
                    <Link href="/admin/siswa/create">
                        <Button className="gap-2 font-bold  shadow-lg">
                            <UserPlus className="h-4 w-4" />
                            Tambah Siswa Baru
                        </Button>
                    </Link>
                </div>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="">Daftar Siswa Terdaftar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="font-bold ">NIS</TableHead>
                                    <TableHead className="font-bold ">Nama Lengkap</TableHead>
                                    <TableHead className="font-bold ">Email</TableHead>
                                    <TableHead className="font-bold ">Kelas</TableHead>
                                    <TableHead className="font-bold ">Terdaftar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {siswa.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center  text-muted-foreground">
                                            Belum ada siswa terdaftar.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    siswa.map((s) => (
                                        <TableRow key={s.id} className="hover:bg-muted/50">
                                            <TableCell className="font-bold ">{s.nis}</TableCell>
                                            <TableCell className="font-medium ">{s.name}</TableCell>
                                            <TableCell className=" text-muted-foreground">{s.email}</TableCell>
                                            <TableCell className="">{s.kelas}</TableCell>
                                            <TableCell className=" text-sm text-muted-foreground">
                                                {new Date(s.created_at).toLocaleDateString('id-ID')}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
