import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter,
    DialogTrigger
} from '@/components/ui/dialog';
import { FolderPlus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Kategori {
    id: number;
    nama: string;
}

interface Props {
    kategoris: Kategori[];
}

const breadcrumbs = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Kelola Kategori', href: '/admin/kategori' },
];

export default function KategoriIndex({ kategoris }: Props) {
    const [editingKategori, setEditingKategori] = useState<Kategori | null>(null);
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        nama: '',
    });

    const submitAdd = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/kategori', {
            onSuccess: () => {
                reset();
                (document.getElementById('close-add-dialog') as HTMLButtonElement)?.click();
            },
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/kategori/${editingKategori?.id}`, {
            onSuccess: () => {
                setEditingKategori(null);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            destroy(`/admin/kategori/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Kategori" />
            <div className="p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold ">Kelola Kategori</h1>
                        <p className="text-muted-foreground ">Tambahkan atau sesuaikan kategori pengaduan fasilitas sekolah.</p>
                    </div>
                    
                    <Dialog onOpenChange={(open) => !open && reset()}>
                        <DialogTrigger asChild>
                            <Button className="font-bold ">
                                <FolderPlus className="mr-2 h-4 w-4" /> Tambah Kategori
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <form onSubmit={submitAdd}>
                                <DialogHeader>
                                    <DialogTitle className="">Tambah Kategori Baru</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    <Label htmlFor="nama" className="">Nama Kategori</Label>
                                    <Input 
                                        id="nama" 
                                        value={data.nama} 
                                        onChange={e => setData('nama', e.target.value)}
                                        className="mt-1"
                                        placeholder="Contoh: Sarana Kelas"
                                    />
                                    {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={processing} className=" font-bold">Simpan Kategori</Button>
                                    <button id="close-add-dialog" className="hidden"></button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[100px]  font-bold">ID</TableHead>
                                <TableHead className=" font-bold">Nama Kategori</TableHead>
                                <TableHead className="text-right  font-bold">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kategoris.map((k) => (
                                <TableRow key={k.id}>
                                    <TableCell className="font-medium">#{k.id}</TableCell>
                                    <TableCell className="">{k.nama}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Dialog open={editingKategori?.id === k.id} onOpenChange={(open) => !open && setEditingKategori(null)}>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon" 
                                                        onClick={() => {
                                                            setEditingKategori(k);
                                                            setData('nama', k.nama);
                                                        }}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <form onSubmit={submitEdit}>
                                                        <DialogHeader>
                                                            <DialogTitle className="">Edit Kategori</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="py-4">
                                                            <Label htmlFor="edit-nama" className="">Nama Kategori</Label>
                                                            <Input 
                                                                id="edit-nama" 
                                                                value={data.nama} 
                                                                onChange={e => setData('nama', e.target.value)}
                                                                className="mt-1"
                                                            />
                                                            {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="submit" disabled={processing} className=" font-bold">Simpan Perubahan</Button>
                                                        </DialogFooter>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>

                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(k.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {kategoris.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-10 text-muted-foreground ">
                                        Belum ada kategori.
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
