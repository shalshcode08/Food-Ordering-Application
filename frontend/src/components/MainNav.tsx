import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
        <Link to="/order-status" className="font-semibold hover:text-orange-500">Order Status</Link>
        <UsernameMenu />
        </>
        
      ) : (
        <Button
          variant="outline"
          className="font-bold hover:text-white hover:bg-orange-500"
          onClick={async () => await loginWithRedirect()}
        >
          Login
        </Button>
      )}
    </span>
  );
};

export default MainNav;
