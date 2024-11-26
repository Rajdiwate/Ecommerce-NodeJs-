import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/admin/Navbar'

const Admin = () => {
  return (
    <div>
        <AdminNavbar/>
        <Outlet/>
    </div>
  )
}

export default Admin
