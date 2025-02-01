import React, { useState } from 'react'
import "./auth.css"
import Input from '../input/Input'
import Button from '../button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, auth, provider } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const signupWithEmail = (e) => {
        e.preventDefault()
        setLoading(true)
        //create a new account using email and password
        if (formData.name != ""
            && formData.email != ""
            && formData.password != ""
            && formData.confirmPassword != "") {
            
            if (formData.password === formData.confirmPassword) {
                    
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
            // Signed up 
                const user = userCredential.user;
                toast.success("User Created Successfully")
                setLoading(false)
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
                createDoc(user);
                navigate("/dashboard")
            // ...
           })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoading(false)
            // ..
            });
            } else {
                toast.error("Password did not match!")
                setLoading(false)
          }
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
           // toast.error("Doc already exists")
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
          <h2 className='sign_title'>Sign Up on <span>PocketPlan.</span></h2>
          
          <form>
              <Input
                  label={"Full Name:"}
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={"Full Name"}
              />
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
              <Input
                  label={"Confirm Password:"}
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"} // Toggle input type
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={"Confirm Password"}
                    toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                    isPassword={true} 
              />

              <Button
                  text={loading ? "Loading..." : "Signup Using Email and Password"}
                  withGoogleLogo={false}
                  blue={true}
                  onClick={signupWithEmail}
                  disabled={loading}
              />
              <Button
                  text={loading ? "Loading..." : "Signup Using Google"}
                  withGoogleLogo={true}
                  onClick={googleAuth}
              />
                <p className='form-p'> Already Have an Account? <Link to={"/signin"}>Login</Link></p>
          </form>
    </div>
  )
}

export default Signup
