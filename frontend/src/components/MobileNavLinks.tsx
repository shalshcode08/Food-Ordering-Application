import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"

const MobileNavLinks = () => {
    const {logout} = useAuth0();
  return (
    <> 
        <Link to = "/user-profile" className="flex bg-white items-center font-semibold text-gray-700 hover:text-orange-500">
        User Profile
        </Link>
        <Link to = "/manage-restaurant" className="flex bg-white items-center font-semibold text-gray-700 hover:text-orange-500">
        Manage Restaurant
        </Link>
        <Button onClick={()=> logout({
          logoutParams : {
            returnTo : window.location.origin
          }
        })} className="flex items-center px-3 font-bold hover:bg-gray-500 mt-3">
            Log Out
        </Button>
    </>
  )
}

export default MobileNavLinks