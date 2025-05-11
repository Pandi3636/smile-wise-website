
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAdminProfile, updateAdminCredentials } from "@/services/authService";
import { AdminUser } from "@/types";
import AdminLayout from "@/components/AdminLayout";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const AdminSettingsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const profile = await getAdminProfile();
        if (!profile) {
          navigate("/admin-login");
          return;
        }
        
        setAdminUser(profile);
        form.reset({
          email: profile.email,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        toast({
          title: "Error fetching profile",
          description: "Please try again or re-login",
          variant: "destructive",
        });
        navigate("/admin-login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminProfile();
  }, [navigate, toast, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!adminUser) return;
    
    try {
      setIsLoading(true);
      
      await updateAdminCredentials(adminUser.id, {
        email: values.email,
        password: values.password,
      });
      
      toast({
        title: "Profile updated",
        description: "Your admin credentials have been updated successfully",
      });
      
      // If email changed, need to re-login
      if (values.email !== adminUser.email) {
        toast({
          title: "Email changed",
          description: "Please login again with your new email",
        });
        navigate("/admin-login");
      } else {
        // Refresh admin profile
        const updatedProfile = await getAdminProfile();
        setAdminUser(updatedProfile);
      }
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="pt-10 md:pt-0">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>Update your admin email and password</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Profile"}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
