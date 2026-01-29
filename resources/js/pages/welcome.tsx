import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/particle-background';
import { 
    Sparkles, 
    Shield, 
    Zap, 
    ArrowRight,
    Star,
    MessageSquare,
    CheckCircle2,
    Clock,
    Users
} from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 font-sans text-white">
            <Head title="Pengaduan Sekolah - Suaramu Untuk Masa Depan" />
            
            {/* Particle Background */}
            <ParticleBackground />

            {/* Gradient Overlays */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px]"></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                        {/* <div className="relative">
                            <div className="absolute inset-0 animate-pulse rounded-xl bg-blue-500/50 blur-md"></div>
                            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                                <Star className="h-6 w-6 text-white" fill="white" />
                            </div>
                        </div> */}
                        <div className="flex flex-col">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-black tracking-tight text-transparent">
                                PENGADUAN SEKOLAH
                            </span>
                            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                                Digital Platform
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button className="rounded-full border text-white border-white/20 bg-white/10 px-6 font-bold backdrop-blur-sm transition-all hover:bg-white/20">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href={login()} className="text-sm font-bold text-slate-300 transition-colors hover:text-white">
                                Masuk
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                                </span>
                                Platform Pengaduan Digital Terdepan
                            </div>
                            
                            <h1 className="text-5xl font-black leading-[1.1] tracking-tight lg:text-7xl">
                                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                    Suaramu
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Untuk Masa Depan
                                </span>
                                <br />
                                <span className="text-slate-400">Sekolah Kita.</span>
                            </h1>
                            
                            <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                                Laporkan kendala fasilitas sekolah dengan cepat dan transparan. Bersama kita wujudkan lingkungan belajar yang nyaman dan berkualitas.
                            </p>
                            
                            <div className="flex flex-col items-start gap-4 sm:flex-row">
                                <Link href={auth.user ? dashboard() : login()}>
                                    <Button size="lg" className="group h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-lg font-bold shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-blue-500/60">
                                        {auth.user ? 'Ke Dashboard' : 'Mulai Lapor Sekarang'}
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                {/* <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-700 ring-2 ring-blue-500/20">
                                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" className="h-full w-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white">1,000+ Siswa</p>
                                        <p className="text-slate-400">Sudah Bergabung</p>
                                    </div>
                                </div> */}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-8">
                                {[
                                    { label: 'Laporan', value: '500+', icon: MessageSquare },
                                    { label: 'Response Time', value: '<24h', icon: Clock },
                                    { label: 'Selesai', value: '95%', icon: CheckCircle2 },
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-2">
                                        <stat.icon className="h-5 w-5 text-blue-400" />
                                        <p className="text-2xl font-black text-white">{stat.value}</p>
                                        <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="relative">
                            <div className="relative z-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-1 shadow-2xl backdrop-blur-sm">
                                <div className="rounded-[1.3rem] bg-slate-900/90 p-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="h-8 w-32 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-4 w-full rounded-md bg-white/5"></div>
                                            <div className="h-4 w-[80%] rounded-md bg-white/5"></div>
                                        </div>
                                        <div className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 backdrop-blur-sm flex items-center justify-center">
                                            <Sparkles className="h-16 w-16 text-blue-400 animate-pulse" />
                                        </div>
                                        <div className="flex justify-end gap-3 pt-4">
                                            <div className="h-10 w-24 rounded-full bg-white/5"></div>
                                            <div className="h-10 w-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Floating Elements */}
                            <div className="absolute -top-8 -right-8 h-32 w-32 animate-pulse rounded-full bg-blue-500/20 blur-2xl"></div>
                            <div className="absolute -bottom-8 -left-8 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features */}
            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-20 text-center">
                        <h2 className="mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-black tracking-tight text-transparent lg:text-5xl">
                            Kenapa Memilih Kami?
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-slate-400">
                            Platform yang dirancang dengan teknologi terkini untuk kemudahan dan transparansi maksimal.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: Zap,
                                title: 'Super Cepat',
                                desc: 'Laporan langsung masuk ke sistem admin secara real-time untuk segera ditindaklanjuti.',
                                gradient: 'from-yellow-500 to-orange-500',
                            },
                            {
                                icon: Shield,
                                title: 'Aman & Terpercaya',
                                desc: 'Data Anda dilindungi dengan enkripsi tingkat tinggi dan privasi terjaga sepenuhnya.',
                                gradient: 'from-green-500 to-emerald-500',
                            },
                            {
                                icon: Users,
                                title: 'Transparan',
                                desc: 'Pantau status laporan dari Menunggu hingga Selesai dengan update real-time.',
                                gradient: 'from-blue-500 to-purple-500',
                            },
                        ].map((feature, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-2xl">
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-10`}></div>
                                <div className="relative">
                                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                                        <feature.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-1 backdrop-blur-sm">
                        <div className="rounded-[2.8rem] bg-gradient-to-br from-slate-900 to-slate-800 px-12 py-20 text-center">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
                            
                            <div className="relative z-10 space-y-8">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/50">
                                    <Sparkles className="h-10 w-10 text-white" />
                                </div>
                                
                                <h2 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-black text-transparent lg:text-5xl">
                                    Siap Membuat Perubahan?
                                </h2>
                                
                                <p className="mx-auto max-w-2xl text-lg text-slate-300">
                                    Bergabunglah dengan ribuan siswa yang telah berkontribusi dalam perbaikan fasilitas sekolah.
                                </p>
                                
                                <Link href={auth.user ? dashboard() : login()}>
                                    <Button size="lg" className="h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 text-lg font-bold shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-blue-500/60">
                                        {auth.user ? 'Ke Dashboard' : 'Mulai Sekarang'}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative border-t border-white/10 py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                                <Star className="h-5 w-5 text-white" fill="white" />
                            </div>
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-lg font-black tracking-tight text-transparent">
                                PENGADUAN SEKOLAH
                            </span>
                        </div>
                        
                        <p className="text-sm text-slate-500">
                            © 2026 Pengaduan Sekolah. UKK P3 JWD. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
