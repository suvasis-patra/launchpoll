import { useNavigate } from "react-router";
import { useLogout } from "../../auth/hooks/useLogout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogout({
    onSuccess: () => {
      navigate("/login");
    },
  });
  const handleLogout = async () => {
    mutate();
  };
  return (
    <div>
      This is Dashboard
      <button
        className="btn-primary"
        onClick={handleLogout}
        disabled={isPending}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
