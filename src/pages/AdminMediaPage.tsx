
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";
import InstagramReelSection from "@/components/admin/InstagramReelSection";
import VideoCompressionSection from "@/components/admin/VideoCompressionSection";
import WatermarkImageSection from "@/components/admin/WatermarkImageSection";
import MediaLibrarySection from "@/components/admin/MediaLibrarySection";
import TrainingVideosSection from "@/components/admin/TrainingVideosSection";
import DoctorTipsSection from "@/components/admin/DoctorTipsSection";

const AdminMediaPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("library");

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Media Management</h1>
        <Button onClick={() => navigate("/admin/dashboard")}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Management</CardTitle>
          <CardDescription>
            Upload, organize, and manage media files including images and videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-6 gap-2">
              <TabsTrigger value="library">Media Library</TabsTrigger>
              <TabsTrigger value="training">Training Videos</TabsTrigger>
              <TabsTrigger value="watermark">Image Watermarking</TabsTrigger>
              <TabsTrigger value="compression">Video Compression</TabsTrigger>
              <TabsTrigger value="instagram">Instagram Reels</TabsTrigger>
              <TabsTrigger value="doctortips">Doctor Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="library">
              <MediaLibrarySection />
            </TabsContent>
            
            <TabsContent value="training">
              <TrainingVideosSection />
            </TabsContent>

            <TabsContent value="watermark">
              <WatermarkImageSection />
            </TabsContent>

            <TabsContent value="compression">
              <VideoCompressionSection />
            </TabsContent>

            <TabsContent value="instagram">
              <InstagramReelSection />
            </TabsContent>
            
            <TabsContent value="doctortips">
              <DoctorTipsSection />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminMediaPage;
