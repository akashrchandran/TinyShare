import { Link } from "react-router-dom";
import SignInButton from "./SignInButton";
import { ThemeToggler } from "./ThemeToggle";


const NavBar = () => {

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-2 ">
      <div className="flex items-center justify-between h-full px-3 lg:px-10 mx-auto">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-2">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Tiny Share
          </p>
        </Link>

        {/* <ThemeToggler /> */}

        <div className="flex items-center gap-3">
          <ThemeToggler/>

          <SignInButton text={"Sign In"} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
