
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus, Trash2, Image } from "lucide-react";
import {
  DoctorTip,
  NewDoctorTip,
  getAllDoctorTips,
  createDoctorTip,
  updateDoctorTip,
  deleteDoctorTip,
  uploadDoctorTipImage
} from "@/services/doctorTipsService";

const DoctorTipsSection = () => {
  const [tips, setTips] = useState<DoctorTip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTip, setSelectedTip] = useState<DoctorTip | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [newTip, setNewTip] = useState<NewDoctorTip>({
    title: "",
    description: "",
    author: "Dr. Prabha"
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctorTips();
  }, []);

  const fetchDoctorTips = async () => {
    setLoading(true);
    try {
      const data = await getAllDoctorTips();
      setTips(data);
    } catch (error) {
      console.error("Failed to fetch doctor tips:", error);
      toast({
        title: "Error",
        description: "Failed to load doctor tips",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddTip = async () => {
    try {
      setIsUploading(true);
      
      // First upload the image if available
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadDoctorTipImage(imageFile);
      }
      
      // Create the tip with the image URL
      const tipData: NewDoctorTip = {
        ...newTip,
        image_url: imageUrl
      };
      
      await createDoctorTip(tipData);
      await fetchDoctorTips();
      
      setIsAddDialogOpen(false);
      setNewTip({
        title: "",
        description: "",
        author: "Dr. Prabha"
      });
      setImageFile(null);
      setImagePreview(null);
      
      toast({
        title: "Success",
        description: "Doctor tip added successfully",
      });
    } catch (error) {
      console.error("Failed to add doctor tip:", error);
      toast({
        title: "Error",
        description: "Failed to add doctor tip",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateTip = async () => {
    if (!selectedTip) return;
    
    try {
      setIsUploading(true);
      
      // Upload new image if changed
      let imageUrl = selectedTip.image_url;
      if (imageFile) {
        imageUrl = await uploadDoctorTipImage(imageFile);
      }
      
      // Update the tip with potential new image
      const updates: Partial<NewDoctorTip> = {
        title: newTip.title,
        description: newTip.description,
        author: newTip.author,
        image_url: imageUrl
      };
      
      await updateDoctorTip(selectedTip.id, updates);
      await fetchDoctorTips();
      
      setIsEditDialogOpen(false);
      setSelectedTip(null);
      setImageFile(null);
      setImagePreview(null);
      
      toast({
        title: "Success",
        description: "Doctor tip updated successfully",
      });
    } catch (error) {
      console.error("Failed to update doctor tip:", error);
      toast({
        title: "Error",
        description: "Failed to update doctor tip",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteTip = async () => {
    if (!selectedTip) return;
    
    try {
      await deleteDoctorTip(selectedTip.id);
      await fetchDoctorTips();
      
      setIsDeleteDialogOpen(false);
      setSelectedTip(null);
      
      toast({
        title: "Success",
        description: "Doctor tip deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete doctor tip:", error);
      toast({
        title: "Error",
        description: "Failed to delete doctor tip",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (tip: DoctorTip) => {
    setSelectedTip(tip);
    setNewTip({
      title: tip.title,
      description: tip.description,
      author: tip.author
    });
    setImagePreview(tip.image_url || null);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (tip: DoctorTip) => {
    setSelectedTip(tip);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Doctor Tips Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add New Tip
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Doctor Tip</DialogTitle>
              <DialogDescription>
                Create a new doctor tip to share with your patients
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input 
                  id="title"
                  value={newTip.title}
                  onChange={(e) => setNewTip({...newTip, title: e.target.value})}
                  placeholder="Enter tip title"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Textarea 
                  id="description"
                  value={newTip.description}
                  onChange={(e) => setNewTip({...newTip, description: e.target.value})}
                  placeholder="Enter tip description"
                  rows={5}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="author">Author</label>
                <Input 
                  id="author"
                  value={newTip.author}
                  onChange={(e) => setNewTip({...newTip, author: e.target.value})}
                  placeholder="Enter author name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="image">Image</label>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                </div>
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full max-h-[200px] object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddTip} disabled={isUploading || !newTip.title || !newTip.description}>
                {isUploading ? "Uploading..." : "Add Tip"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading doctor tips...</div>
      ) : tips.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No doctor tips found</p>
            <Button onClick={() => setIsAddDialogOpen(true)} variant="outline" className="flex items-center gap-2">
              <Plus size={16} />
              Add your first tip
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="w-[180px]">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tips.map((tip) => (
                <TableRow key={tip.id}>
                  <TableCell>
                    {tip.image_url ? (
                      <div className="w-12 h-12 relative">
                        <img 
                          src={tip.image_url} 
                          alt={tip.title}
                          className="w-full h-full object-cover rounded-md" 
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-md">
                        <Image size={18} className="text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{tip.title}</TableCell>
                  <TableCell>{tip.author}</TableCell>
                  <TableCell>{new Date(tip.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => openEditDialog(tip)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => openDeleteDialog(tip)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Doctor Tip</DialogTitle>
            <DialogDescription>
              Update the doctor tip details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-title">Title</label>
              <Input 
                id="edit-title"
                value={newTip.title}
                onChange={(e) => setNewTip({...newTip, title: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-description">Description</label>
              <Textarea 
                id="edit-description"
                value={newTip.description}
                onChange={(e) => setNewTip({...newTip, description: e.target.value})}
                rows={5}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-author">Author</label>
              <Input 
                id="edit-author"
                value={newTip.author}
                onChange={(e) => setNewTip({...newTip, author: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-image">Image</label>
              <div className="flex items-center gap-2">
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1"
                />
              </div>
              {imagePreview && (
                <div className="mt-2 relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full max-h-[200px] object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateTip} disabled={isUploading || !newTip.title || !newTip.description}>
              {isUploading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this doctor tip? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteTip}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorTipsSection;
