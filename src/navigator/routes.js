
import BookCreation from "../features/book/BookCreation";
import BookEditor from "../features/book/BookEdit";
import RedirectUrl from "../components/RedirectUrl";

import { Navigate} from 'react-router-dom';

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
    element:  isLoggedIn ? <Navigate  to="/app/bookedit" /> : <RedirectUrl url={process.env.REACT_APP_lOGIN_URL } />
  },
  {
    path: '/mystories-matter',
    element: <RedirectUrl url="https://mystoriesmatter.com" />
  },
  {
    path: '/',
    element:  <BookCreation />
  },
  {
    path: '*',
    element: isLoggedIn ? <Navigate  to="/app/bookcreation" /> : <Navigate  to="/app/bookedit" />,
  }

];

export default routes;
