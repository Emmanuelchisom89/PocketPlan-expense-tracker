import { useEffect } from "react"
import "./header.css"
import { Link } from 'react-router-dom'
import AnchorTemporaryDrawer from './drawer.jsx'
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


const Header = () => {

  const [user, loading, error] = useAuthState(auth);
  
  useEffect(() => {
    if (loading) {
      console.log("Authentication loading...");
    } else if (user) {
      console.log("User authenticated: ");
    } else {
      console.log("No user logged in.");
    }
  }, [user, loading]);
  
  return (
    <header className='home_header'>
        <div className="bank_logo">
            <Link href="./"><img src="/PocketPlan-expense-tracker/chisomweb.png" alt=""/>
                <h5>PocketPlan</h5>
            </Link>
        </div>

        <div className="home_nav_menu">
          <nav className="nav_list">
          <ul>
          <Link to="/">
            <li className="link">Home</li>
          </Link>
          <Link to="/">
            <li className="link">Contact Us</li>
          </Link>
          {!loading && (
            <Link to={loading ? "#" : user ? "/dashboard" : "/signup"}>
                <li className="link">Dashboard</li>
            </Link>
          )}
          </ul>
          </nav>
        </div>
          
        <div className="drawer">
            <AnchorTemporaryDrawer user={user} loading={loading} />
        </div>

     </header>
  )
}

export default Header
