import React, { useState } from 'react'
import Input from '../input/Input'
import Button from '../button/Button';
import "./auth.css"
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { db, auth, provider } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 


const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const loginWithEmail = (e) => {
        e.preventDefault();
        setLoading(true)
        if (formData.email != "" && formData.password != "") {

            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    toast.success("User Logged in")
                    setLoading(false)
                    navigate("/dashboard")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage)
                    setLoading(false)
                });
        } else {
            toast.error("Please fill all fields!")
            setLoading(false)
        }            
    }

        const createDoc = async (user) => {
        // Check if Doc exists
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef)

        if (!userData.exists()) {
            const { displayName, email, photoURL } = user;
            const createdAt = new Date()
        try {
            await setDoc(doc(db, "users", user.uid), {
            name: displayName ? displayName : formData.name,
            email: email,
            photoURL: photoURL ? photoURL : "",
            createdAt,
        });

        toast.success("Doc Created.")
        } catch(e) {
            toast.error(e.message)
        }
        } else {
            //toast.error("User already exists")
            setLoading(false)
      }
    }


    const googleAuth = (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
        signInWithPopup(auth, provider)
        .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
      const user = result.user;
            createDoc(user);
            toast.success("User Created.")
            setLoading(false)
            navigate("/dashboard");
  }).catch((error) => {
    const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)
      console.error(errorMessage)
        setLoading(false)
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

    } catch (e) {
        toast.error(e.message)
        setLoading(false)
    }

    }


  return (
    <div className='signup-wrapper'>
          <h2 className='sign_title'>Login on <span>PocketPlan.</span></h2>
          
          <form>
              <Input
                  label={"Email:"}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={"Email"}
              />
              <Input
                  label={"Password:"}
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle input type
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={"Password"}
                  toggleVisibility={() => setShowPassword(!showPassword)} 
                  isPassword={true} 
              />

              <Button
                  text={loading ? "Loading..." : "Login Using Email and Password"}
                  withGoogleLogo={false}
                  blue={true}
                  onClick={loginWithEmail}
                  disabled={loading}
              />
              <Button
                  text={loading ? "Loading..." : "Login Using Google"}
                  withGoogleLogo={true}
                  onClick={googleAuth}
              />
             <p className='form-p'> Don't Have an Account? <Link to={"/signup"}>Sign up</Link></p>
          </form>
    </div>
  )
}

export default Signin
