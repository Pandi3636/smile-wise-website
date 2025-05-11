
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { adminLogout, getAdminProfile } from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Video, LogOut, Settings, Eye } from "lucide-react";
import { AdminUser } from "@/types";

const AdminSidebar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const profile = await getAdminProfile();
        setAdminUser(profile);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    fetchAdminProfile();
  }, []);

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

  const isActive = (path: string) => {
    return location.pathname === path ? 
      "bg-dental-blue text-white" : 
      "text-gray-600 hover:bg-gray-100";
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 fixed top-0 left-0 z-40">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Dental Admin</h1>
          {adminUser && (
            <p className="text-sm text-gray-600 mt-1 truncate">{adminUser.email}</p>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin/dashboard" 
                className={`flex items-center gap-3 p-3 rounded-md ${isActive('/admin/dashboard')}`}
              >
                <Video size={20} />
                <span>Training Videos</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/settings" 
                className={`flex items-center gap-3 p-3 rounded-md ${isActive('/admin/settings')}`}
              >
                <Settings size={20} />
                <span>Admin Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="border-t p-4 space-y-4">
          <Button variant="outline" className="w-full flex items-center gap-2" asChild>
            <Link to="/training">
              <Eye size={18} />
              Visit Website
            </Link>
          </Button>
          
          <Button variant="destructive" className="w-full flex items-center gap-2" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Dental Admin</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="mt-2 pb-3">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/admin/dashboard" 
                  className={`flex items-center gap-3 p-2 rounded-md ${isActive('/admin/dashboard')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Video size={18} />
                  <span>Training Videos</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/settings" 
                  className={`flex items-center gap-3 p-2 rounded-md ${isActive('/admin/settings')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings size={18} />
                  <span>Admin Settings</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/training" 
                  className="flex items-center gap-3 p-2 rounded-md text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Eye size={18} />
                  <span>Visit Website</span>
                </Link>
              </li>
              <li>
                <button 
                  className="flex items-center w-full gap-3 p-2 rounded-md text-red-600 hover:bg-red-50"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default AdminSidebar;
