
import BookCreation from "../features/book/BookCreation";
import BookEditor from "../features/book/BookEdit";
import RedirectUrl from "../components/RedirectUrl";

import { Navigate, Outlet} from 'react-router-dom';

const routes = (isLoggedIn) => [
  {
    path: '/app',
    element: isLoggedIn ? <BookCreation /> : <Navigate to="/" />,
  },
  {
    path: '/app/bookcreation',
    element: isLoggedIn ? <BookCreation /> : <Navigate to="/" />,
  },
  {
    path: '/app/bookedit',
    element: isLoggedIn ? <BookEditor /> : <Navigate to="/" />,
  },
  {
    path: '/login-redirect',
    element:  isLoggedIn ? <Navigate  to="/app/bookedit" /> : <RedirectUrl url="http://login.local-mystories.com" />
  },
  {
    path: '/',
    element:  <BookCreation />
  },
  {
    path: '*',
    element: <BookCreation />
  }

];

export default routes;
