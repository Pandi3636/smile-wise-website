
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";
import InstagramReelSection from "@/components/admin/InstagramReelSection";
import VideoCompressionSection from "@/components/admin/VideoCompressionSection";
import WatermarkImageSection from "@/components/admin/WatermarkImageSection";

const AdminMediaPage = () => {
  const navigate = useNavigate();

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
          <CardTitle>Media Tools</CardTitle>
          <CardDescription>
            Manage social media content, compress videos, and add watermarks to images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="instagram" className="space-y-4">
            <TabsList className="grid grid-cols-3 gap-4">
              <TabsTrigger value="instagram">Instagram Reels</TabsTrigger>
              <TabsTrigger value="videos">Video Compression</TabsTrigger>
              <TabsTrigger value="images">Watermark Images</TabsTrigger>
            </TabsList>

            <TabsContent value="instagram">
              <InstagramReelSection />
            </TabsContent>

            <TabsContent value="videos">
              <VideoCompressionSection />
            </TabsContent>

            <TabsContent value="images">
              <WatermarkImageSection />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminMediaPage;
