
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface WebpageFormProps {
  isEdit?: boolean;
}

export default function WebpageForm({ isEdit = false }: WebpageFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock data for edit mode
  const existingData = isEdit ? {
    name: "Landing Page",
    url: "https://example.com/landing",
    description: "Main landing page for our product",
    tags: "Landing, Product, Marketing"
  } : {
    name: "",
    url: "",
    description: "",
    tags: ""
  };

  const [formData, setFormData] = useState(existingData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an API
    toast.success(`Webpage ${isEdit ? "updated" : "created"} successfully`);
    
    // Redirect to the webpage detail or list
    if (isEdit) {
      navigate(`/webpages/${id}`);
    } else {
      navigate("/webpages");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to={isEdit ? `/webpages/${id}` : "/webpages"}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-medium">{isEdit ? "Edit Webpage" : "New Webpage"}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{isEdit ? "Update Webpage Details" : "Webpage Details"}</CardTitle>
          <CardDescription>
            {isEdit 
              ? "Update the information for this webpage" 
              : "Enter the details for the new webpage you want to track"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Webpage Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g., Product Landing Page"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input 
                id="url" 
                name="url" 
                value={formData.url} 
                onChange={handleChange} 
                placeholder="https://example.com/page"
                type="url"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Brief description of this webpage"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input 
                id="tags" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange} 
                placeholder="e.g., landing, product, marketing (comma-separated)"
              />
              <p className="text-sm text-muted-foreground">Separate tags with commas</p>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate(isEdit ? `/webpages/${id}` : "/webpages")}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEdit ? "Save Changes" : "Create Webpage"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
