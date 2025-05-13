
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { uploadWatermarkedImage, getAllWatermarkedImages, deleteWatermarkedImage } from "@/services/mediaService";
import { trash as Trash, upload as Upload, eye as Eye } from "lucide-react";

type WatermarkSettings = {
  text: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  opacity: number;
  size: number;
  color: string;
};

type WatermarkedImage = {
  id: string;
  title: string;
  url: string;
  watermarkSettings: WatermarkSettings;
  createdAt: string;
};

const defaultWatermarkSettings: WatermarkSettings = {
  text: "© Dental Clinic",
  position: "bottom-right",
  opacity: 0.5,
  size: 24,
  color: "#ffffff"
};

const WatermarkImageSection = () => {
  const [images, setImages] = useState<WatermarkedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>(defaultWatermarkSettings);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const fetchedImages = await getAllWatermarkedImages();
      setImages(fetchedImages);
    } catch (error: any) {
      toast({
        title: "Error fetching images",
        description: error.message || "Failed to fetch watermarked images",
        variant: "destructive",
      });
    }
  };
  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        
        // Generate preview
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        
        // Auto-generate title from filename if title is not set
        if (!title) {
          setTitle(file.name.split('.')[0]);
        }
      } else {
        toast({
          title: "Invalid file",
          description: "Please select an image file",
          variant: "destructive",
        });
      }
    }
  };
  
  useEffect(() => {
    if (imagePreview && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          // Set canvas dimensions to match image
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw image
          ctx.drawImage(img, 0, 0);
          
          // Apply watermark
          ctx.globalAlpha = watermarkSettings.opacity;
          ctx.fillStyle = watermarkSettings.color;
          ctx.font = `${watermarkSettings.size}px Arial`;
          ctx.textBaseline = 'middle';
          
          const text = watermarkSettings.text;
          const textWidth = ctx.measureText(text).width;
          
          // Calculate position
          let x = 0;
          let y = 0;
          
          switch (watermarkSettings.position) {
            case "top-left":
              x = 20;
              y = 20 + watermarkSettings.size / 2;
              break;
            case "top-right":
              x = canvas.width - textWidth - 20;
              y = 20 + watermarkSettings.size / 2;
              break;
            case "bottom-left":
              x = 20;
              y = canvas.height - 20 - watermarkSettings.size / 2;
              break;
            case "bottom-right":
              x = canvas.width - textWidth - 20;
              y = canvas.height - 20 - watermarkSettings.size / 2;
              break;
            case "center":
              x = (canvas.width - textWidth) / 2;
              y = canvas.height / 2;
              break;
          }
          
          // Draw watermark text
          ctx.fillText(text, x, y);
          
          // Reset global alpha
          ctx.globalAlpha = 1.0;
        };
        img.src = imagePreview;
      }
    }
  }, [imagePreview, watermarkSettings]);
  
  const handleUpload = async () => {
    if (!selectedImage || !canvasRef.current) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Get watermarked image data from canvas
      const canvas = canvasRef.current;
      const watermarkedImageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      
      // Convert data URL to Blob
      const res = await fetch(watermarkedImageDataUrl);
      const blob = await res.blob();
      
      // Create a File object from the Blob
      const watermarkedFile = new File([blob], selectedImage.name, { type: "image/jpeg" });
      
      const result = await uploadWatermarkedImage({
        file: watermarkedFile,
        title: title || selectedImage.name,
        watermarkSettings
      });
      
      // Add the new image to the list
      const newImage: WatermarkedImage = {
        id: result.id,
        title: result.title,
        url: result.url,
        watermarkSettings: result.watermarkSettings,
        createdAt: new Date().toISOString()
      };
      
      setImages([newImage, ...images]);
      
      // Reset form
      setSelectedImage(null);
      setImagePreview(null);
      setTitle("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      toast({
        title: "Success",
        description: "Image uploaded with watermark successfully",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDeleteImage = async (id: string) => {
    try {
      await deleteWatermarkedImage(id);
      setImages(images.filter(image => image.id !== id));
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete image",
        variant: "destructive",
      });
    }
  };
  
  const updateWatermarkSetting = (key: keyof WatermarkSettings, value: any) => {
    setWatermarkSettings({
      ...watermarkSettings,
      [key]: value
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-title">Image Title</Label>
            <Input 
              id="image-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image-upload">Select Image</Label>
            <Input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              disabled={isUploading}
            />
            <p className="text-xs text-gray-500">
              Max file size: 10MB. Supported formats: JPG, PNG, GIF
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Watermark Settings</h4>
            
            <div className="space-y-2">
              <Label htmlFor="watermark-text">Watermark Text</Label>
              <Input 
                id="watermark-text"
                value={watermarkSettings.text}
                onChange={(e) => updateWatermarkSetting('text', e.target.value)}
                placeholder="© Your Company"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="watermark-position">Position</Label>
              <select 
                id="watermark-position"
                value={watermarkSettings.position}
                onChange={(e) => updateWatermarkSetting('position', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="center">Center</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="watermark-opacity">Opacity: {watermarkSettings.opacity}</Label>
              <input 
                id="watermark-opacity"
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={watermarkSettings.opacity}
                onChange={(e) => updateWatermarkSetting('opacity', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="watermark-size">Size: {watermarkSettings.size}px</Label>
              <input 
                id="watermark-size"
                type="range"
                min="12"
                max="72"
                step="2"
                value={watermarkSettings.size}
                onChange={(e) => updateWatermarkSetting('size', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="watermark-color">Color</Label>
              <div className="flex gap-2">
                <input 
                  id="watermark-color"
                  type="color"
                  value={watermarkSettings.color}
                  onChange={(e) => updateWatermarkSetting('color', e.target.value)}
                  className="h-10 w-10"
                />
                <Input 
                  value={watermarkSettings.color}
                  onChange={(e) => updateWatermarkSetting('color', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleUpload}
            disabled={!selectedImage || isUploading}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload with Watermark"}
          </Button>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Preview</h4>
          
          {imagePreview ? (
            <div className="border rounded-md overflow-hidden bg-gray-100 p-4">
              <canvas 
                ref={canvasRef}
                className="max-w-full max-h-[400px] mx-auto object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 text-sm text-gray-500 rounded-lg">
              Upload an image to preview watermark
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Watermarked Images</h3>
        
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <Card key={image.id}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                    <img 
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium truncate">{image.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <a href={image.url} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 bg-gray-100 text-sm text-gray-500 rounded-lg">
            No watermarked images yet
          </div>
        )}
      </div>
    </div>
  );
};

export default WatermarkImageSection;
