import { TSidebarLinks } from '@/types/general.type';
import { LayoutDashboard, NotebookPen } from 'lucide-react';

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard />,
    path: '/',
  },
  {
    title: 'Notes',
    icon: <NotebookPen />,
    path: '/notes',
  },
];
