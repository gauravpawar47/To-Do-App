import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
// import "../AuthStyle.css";
import googleImage from "../google.png";

function SignInwithGoogle() {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(result);

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });

        toast.success("User logged in Successfully", {
          position: "top-center",
        });

        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("Error during Google login:", error.message);
      toast.error("Login failed. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <p
        className="auth-form-group"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        -- Or continue with --
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={googleLogin}
      >
        <img src={googleImage} alt="Google Login" width={"60%"} />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
