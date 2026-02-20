// ================= IMPORT FIREBASE =================
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= DASHBOARD LOGIC =================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // User not logged in → redirect to login
    window.location.href = "login.html";
    return;
  }

  try {
    const docRef = doc(db, "members", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Display member details
      document.getElementById("member-name").textContent = `Welcome, ${data.name}`;
      document.getElementById("member-plan").textContent = data.plan || "N/A";
      document.getElementById("member-expiry").textContent = data.expiry || "N/A";

      // Calculate status based on expiry date
      let status = "Active";
      if (data.expiry) {
        const today = new Date();
        const expiryDate = new Date(data.expiry);
        if (expiryDate < today) status = "Expired";
      }
      document.getElementById("member-status").textContent = status;

    } else {
      // No member data found
      alert("No member data found. Please contact support.");
      window.location.href = "login.html";
    }

  } catch (error) {
    console.error("Error fetching member data:", error);
    alert("Error loading dashboard. Please try again.");
  }
});

// ================= LOGOUT FUNCTION =================
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
