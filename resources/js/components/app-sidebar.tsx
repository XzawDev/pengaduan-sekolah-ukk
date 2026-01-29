import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ClipboardList, Folder, LayoutGrid, Layers, Users } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<any>().props;
    const isAdmin = auth.user.is_admin;

    const navItems: NavItem[] = [];

    if (isAdmin) {
        navItems.push(
            {
                title: 'Admin Dashboard',
                href: '/admin/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Daftar Pengaduan',
                href: '/admin/pengaduan',
                icon: ClipboardList,
            },
            {
                title: 'Kelola Kategori',
                href: '/admin/kategori',
                icon: Layers,
            },
            {
                title: 'Manajemen Siswa',
                href: '/admin/siswa',
                icon: Users,
            }
        );
    } else {
        navItems.push(
            {
                title: 'Riwayat Pengaduan',
                href: '/siswa/pengaduan',
                icon: ClipboardList,
            },
            {
                title: 'Buat Pengaduan',
                href: '/siswa/pengaduan/create',
                icon: Layers,
            }
        );
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
