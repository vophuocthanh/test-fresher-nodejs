import LayoutMain from '@/layout/LayoutMain';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import CreateNote from '@/pages/notes/create/CreateNote';
import DetailNote from '@/pages/notes/detail/DetailNote';
import EditNote from '@/pages/notes/edit/EditNote';
import NotePage from '@/pages/notes/NotePage';
import { useRoutes } from 'react-router-dom';
export default function useRoutesElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <LayoutMain>
          <DashboardPage />
        </LayoutMain>
      ),
    },
    {
      path: '/notes',
      element: (
        <LayoutMain>
          <NotePage />
        </LayoutMain>
      ),
    },
    {
      path: '/notes/create',
      element: (
        <LayoutMain>
          <CreateNote />
        </LayoutMain>
      ),
    },
    {
      path: '/notes/:id',
      element: (
        <LayoutMain>
          <DetailNote />
        </LayoutMain>
      ),
    },
    {
      path: '/notes/edit/:id',
      element: (
        <LayoutMain>
          <EditNote />
        </LayoutMain>
      ),
    },
    { path: '*', element: <h1>404</h1> },
  ]);
  return routeElements;
}
