import { Link } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';

const UnauthNavbar = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <nav className="sm:block space-x-8">
          <Link to="/" className="hover:text-primary font-bold text-lg">
            Home
          </Link>
          <Link to="/events" className="hover:text-primary font-bold text-lg">
            Events
          </Link>
        </nav>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <div className="space-x-2">
            <Link
              to="/auth/signup/mod"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              Be a Moderator
            </Link>
            <Link
              to="/auth/signup/author"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              Be an Author
            </Link>
            <Link
              to="/auth/signin"
              className="w-full cursor-pointer rounded-lg border border-primary bg-white p-4 text-primary transition hover:bg-opacity-90"
            >
              sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UnauthNavbar;
