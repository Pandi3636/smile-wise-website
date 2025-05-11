
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";

const AdminNavbar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminLogout();
      toast({
        title: "Logged out successfully",
      });
      navigate("/admin-login");
    } catch (error) {
      toast({
        title: "Logout failed",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Dental Training Admin</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-dental-blue transition-colors">
              Dashboard
            </Link>
            <Link to="/admin/videos" className="text-gray-600 hover:text-dental-blue transition-colors">
              Manage Videos
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/training">Visit Website</Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
