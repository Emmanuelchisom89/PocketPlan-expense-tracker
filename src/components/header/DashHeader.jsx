import React, { useEffect, useState } from 'react';
import "./dashhead.css";
import { getAuth, signOut } from "firebase/auth";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';


const DashHeader = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [showConfirmLogout, setShowConfirmLogout] = useState(false); // State for confirmation modal

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, loading]);

    const logout = () => {
      try {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
          // Sign-out successful.
          navigate("/signin");
          })
          .catch((error) => {
            console.error("Sign out error", error);
          });
        } catch (e) {
            console.error("Sign out error", e.error);
        }
    };

    return (
        <div className='dashheader'>
            <div className="bank_logo dash-logo">
                <Link to="/">
                    <img src="/PocketPlan-expense-tracker/chisomweb.png" alt="" />
                    <h5 className='dash_h5'>PocketPlan</h5>
                </Link>
            </div>

            {user && (
                <div className="logout" onClick={() => setShowConfirmLogout(true)}>
                    {user.photoURL ? (
                        <img className='dp' src={user.photoURL} alt="PhotoUrl" />
                    ) : (
                        <PersonOutlineIcon />
                    )}
                    Logout
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmLogout && (
                <div className="modal-backdrop" onClick={() => setShowConfirmLogout(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <p>Are you sure you want to log out?</p>
                        <div className="modal-buttons">
                            <button onClick={logout}>Yes</button>
                            <button onClick={() => setShowConfirmLogout(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashHeader;
