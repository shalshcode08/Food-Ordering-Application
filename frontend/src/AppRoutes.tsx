import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"

const AppRoutes = ()=>{
    return (
       <Routes>
        <Route path="/" element={<Layout>Home Page</Layout>}/>
        <Route path="/user-profile" element={<span>User profile page</span>} />
        <Route path="*" element={<Navigate to="/" />} />
       </Routes>
    )
}

export default AppRoutes