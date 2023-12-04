import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { user } = useUserContext();
  const handleLogOut = () => {}
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="" className="flex gap-3 items-center">
          Logo
        </Link>
        <div className="flex gap-4">
          <p className="flex-center gap-3">{user.username}</p>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img src={'/assets/icons/avatar.svg'} alt="avatar" className="w-8 h-8 rounded-full" />
          </Link>
          <Button onClick={handleLogOut} variant="ghost" className="shad-button_ghost">
            <img src='/assets/icons/logout.svg' alt="role" className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
