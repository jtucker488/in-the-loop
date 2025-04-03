import Link from "next/link";
import { Button } from "../catalyst/button";
import { signOut } from "firebase/auth"; // Import signOut function from Firebase
import { useRouter } from "next/navigation"; // Import useRouter
import { auth } from "../../lib/firebase"; // Import your Firebase auth instance

export default function SettingsButtons({ setPage }) {
  const router = useRouter(); // Initialize router instance

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out of Firebase Authentication
      router.push("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error during logout:", error.message); // Log any errors during the logout process
    }
  };

  return (
    <>
      <div className="flex flex-col bg-neutral-800 gap-4 p-2 rounded w-[260px]">
        <Button
          color="blue"
          onClick={() => setPage("changePasswordPage")}
        >
          <div className="flex gap-12 items-center">
            <p className="text-base">Change Password</p>
          </div>
        </Button>

        <Button
          type="button"
          color="rose"
          onClick={handleLogout} // Call handleLogout on click
        >
          <div className="flex gap-12 items-center">
            <p className="text-base">Logout</p>
          </div>
        </Button>
      </div>
    </>
  );
}