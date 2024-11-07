import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-4 py-2 rounded-lg font-semibold text-gray-800 hover:text-orange-500 hover:bg-gray-100 gap-2 transition-all duration-200">
        <CircleUserRound className="text-orange-500" />
        {user?.given_name || "User"}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 animate-fadeIn transition-all duration-200">
      <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-100 transition-all duration-150">
          <Link to="/manage-restaurant" className="font-semibold text-gray-700 hover:text-orange-500 block">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-100 transition-all duration-150">
          <Link to="/user-profile" className="font-semibold text-gray-700 hover:text-orange-500 block">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-100 transition-all duration-150">
          <Button
            onClick={() => logout(
              {
                logoutParams : {
                  returnTo : window.location.origin
                }
              }
            )}
            className="w-full font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-all duration-150"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
