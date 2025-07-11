import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-[#222831] text-white [box-shadow:0_0_25px_7px_#76737340]">
      <Container>
        <nav className="flex items-center justify-evenly w-full">
          {/* LOGO */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          {/* Center nav items */}
          <ul className="flex mx-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
          {/* Right side user info and logout */}
          {authStatus && (
            <div className="flex items-center space-x-4">
              <ProfileDropdown />
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
