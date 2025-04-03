import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../firebase-config";

import { signOut } from "firebase/auth";
export default function NavBar({
  navBarOpen,
  setNavBarOpen,
  openLoginModalHandler,
}) {
  const navigate = useNavigate();

  const handleOrganizerClick = () => {
    setNavBarOpen(false);
    navigate("/organizers");
  };

  const handleOrganizerRegistrationClick = () => {
    setNavBarOpen(false);
    navigate("/organizer-registration");
  };

  const handleEventClick = () => {
    setNavBarOpen(false);
    navigate("/event-form");
  };

  const logOut = async () => {
    try {
      setNavBarOpen(false);
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Dialog
      open={navBarOpen}
      onClose={setNavBarOpen}
      className="relative z-[100] "
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
          <DialogPanel
            transition
            className=" pointer-events-auto transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700"
          >
            <div className="flex  h-full w-[300px] flex-col overflow-y-scroll bg-neutral-800 pl-8 pr-6 py-6 shadow-xl">
              <div className="ml-3 flex h-7  flex justify-end items-center">
                <button
                  type="button"
                  onClick={() => setNavBarOpen(false)}
                  className="bg-neutral-800 relative rounded-md text-neutral-200 hover:text-gray-500 focus:outline-none"
                >
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <button
                onClick={handleOrganizerClick}
                className="text-neutral-200"
              >
                <div className="flex items-center gap-2">
                  <AccountCircleIcon /> Organizers
                </div>
              </button>
              <div className="flex flex-col gap-8 mt-8 items-start">
                {!auth.currentUser && (
                  <>
                    <button
                      className="text-neutral-200"
                      onClick={handleOrganizerRegistrationClick}
                    >
                      <div className="flex items-center gap-2">
                        <PersonAddIcon /> Register Organizer
                      </div>
                    </button>
                    <button
                      className="text-neutral-200"
                      onClick={openLoginModalHandler}
                    >
                      <div className="flex items-center gap-2">
                        <LoginIcon /> Organizer Login
                      </div>
                    </button>
                  </>
                )}
                {auth.currentUser && (
                  <>
                    <button
                      className="text-neutral-200"
                      onClick={handleEventClick}
                    >
                      <div className="flex items-center gap-2">
                        <EditCalendarIcon /> Create Event
                      </div>
                    </button>

                    <button className="text-neutral-200" onClick={logOut}>
                      <div className="flex items-center gap-2">
                        <LogoutIcon /> Logout
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
