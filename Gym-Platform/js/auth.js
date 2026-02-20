// ================= IMPORT FIREBASE =================
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ================= LOGIN FUNCTION =================
window.loginUser = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-message");

  errorMsg.textContent = ""; // Clear previous errors

  if (!email || !password) {
    errorMsg.textContent = "Please enter both email and password.";
    return;
  }

  // Firebase login
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login successful → redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Handle errors
      console.error("Login error:", error);
      switch (error.code) {
        case "auth/user-not-found":
          errorMsg.textContent = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMsg.textContent = "Incorrect password. Try again.";
          break;
        case "auth/invalid-email":
          errorMsg.textContent = "Invalid email address.";
          break;
        default:
          errorMsg.textContent = "Login failed. Please try again.";
      }
    });
};

// ================= OPTIONAL: LOGOUT FUNCTION =================
window.logoutUser = function () {
  auth.signOut()
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("Error logging out. Please try again.");
    });
};
