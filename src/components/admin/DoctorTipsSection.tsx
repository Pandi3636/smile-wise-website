
import { useState, useEffect, useRef } from "react";
import { 
  getAllDoctorTips, 
  createDoctorTip, 
  updateDoctorTip, 
  deleteDoctorTip, 
  uploadDoctorTipImage, 
  DoctorTip
} from "@/services/doctorTipsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Pencil, Trash2, PlusCircle, Image as ImageIcon } from "lucide-react";

const DoctorTipsSection = () => {
  const [doctorTips, setDoctorTips] = useState<DoctorTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTip, setSelectedTip] = useState<DoctorTip | null>(null);
  
  // New fields
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("Dr. Prabha");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctorTips();
  }, []);

  const fetchDoctorTips = async () => {
    try {
      setLoading(true);
      const tips = await getAllDoctorTips();
      setDoctorTips(tips);
    } catch (error) {
      console.error("Error fetching doctor tips:", error);
      toast({
        title: "Error",
        description: "Could not load doctor tips",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName("");
    setTitle("");
    setDescription("");
    setAuthor("Dr. Prabha");
    setImageFile(null);
    setImagePreview(null);
    setSelectedTip(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddTip = async () => {
    try {
      setSubmitting(true);
      
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadDoctorTipImage(imageFile);
      }
      
      await createDoctorTip({
        name,
        title,
        description,
        author,
        image_url: imageUrl,
      });
      
      toast({
        title: "Success",
        description: "Doctor tip created successfully",
      });
      
      setIsAddDialogOpen(false);
      resetForm();
      fetchDoctorTips();
    } catch (error) {
      console.error("Error creating doctor tip:", error);
      toast({
        title: "Error",
        description: "Failed to create doctor tip",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (tip: DoctorTip) => {
    setSelectedTip(tip);
    setName(tip.name || "");
    setTitle(tip.title);
    setDescription(tip.description);
    setAuthor(tip.author);
    setImagePreview(tip.image_url);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTip = async () => {
    if (!selectedTip) return;
    
    try {
      setSubmitting(true);
      
      let imageUrl = selectedTip.image_url;
      if (imageFile) {
        imageUrl = await uploadDoctorTipImage(imageFile);
      }
      
      await updateDoctorTip(selectedTip.id, {
        name,
        title,
        description,
        author,
        image_url: imageUrl,
      });
      
      toast({
        title: "Success",
        description: "Doctor tip updated successfully",
      });
      
      setIsEditDialogOpen(false);
      resetForm();
      fetchDoctorTips();
    } catch (error) {
      console.error("Error updating doctor tip:", error);
      toast({
        title: "Error",
        description: "Failed to update doctor tip",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (tip: DoctorTip) => {
    setSelectedTip(tip);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTip = async () => {
    if (!selectedTip) return;
    
    try {
      setSubmitting(true);
      await deleteDoctorTip(selectedTip.id);
      
      toast({
        title: "Success",
        description: "Doctor tip deleted successfully",
      });
      
      setIsDeleteDialogOpen(false);
      fetchDoctorTips();
    } catch (error) {
      console.error("Error deleting doctor tip:", error);
      toast({
        title: "Error",
        description: "Failed to delete doctor tip",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Doctor Tips Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={resetForm}>
              <PlusCircle size={16} />
              Add New Tip
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Doctor Tip</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Short name of the tip"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Catchy, user-facing title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed tip content"
                  rows={6}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author" 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <ImageIcon size={16} className="mr-2" />
                    {imageFile ? "Change Image" : "Upload Image"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                {imagePreview && (
                  <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTip} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-dental-blue" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctorTips.length > 0 ? (
                  doctorTips.map((tip) => (
                    <TableRow key={tip.id}>
                      <TableCell>
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          {tip.image_url ? (
                            <img 
                              src={tip.image_url} 
                              alt={tip.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gray-200">
                              <ImageIcon className="text-gray-400" size={24} />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{tip.name || "-"}</TableCell>
                      <TableCell className="font-medium">{tip.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{tip.description}</TableCell>
                      <TableCell>{tip.author}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(tip)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(tip)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No doctor tips found. Add your first tip!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between py-4">
            <p className="text-sm text-gray-500">
              Total items: {doctorTips.length}
            </p>
            <Button variant="outline" onClick={fetchDoctorTips}>
              Refresh List
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Doctor Tip</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input 
                id="edit-name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input 
                id="edit-title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-author">Author</Label>
              <Input 
                id="edit-author" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image</Label>
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <ImageIcon size={16} className="mr-2" />
                  Change Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="edit-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              {imagePreview && (
                <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTip} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this doctor tip? This action cannot be undone.</p>
            {selectedTip && (
              <p className="font-medium mt-2">{selectedTip.title}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteTip}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorTipsSection;
