import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

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
      <p className="continue-p">-- Or continue with --</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={googleLogin}
      >
        <img
          src={import("../google.png")}
          alt="Google Login"
          width={"60%"}
        />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
