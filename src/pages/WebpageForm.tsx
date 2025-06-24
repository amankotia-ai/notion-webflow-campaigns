
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
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100 rounded-xl">
          <Link to={isEdit ? `/webpages/${id}` : "/webpages"}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            {isEdit ? "Edit Webpage" : "New Webpage"}
          </h1>
          <p className="text-xl text-gray-500 font-normal">
            {isEdit 
              ? "Update the details for this webpage" 
              : "Add a new webpage to start tracking campaigns"
            }
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="border-0 shadow-sm bg-white rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Webpage Details
          </CardTitle>
          <CardDescription className="text-gray-500">
            {isEdit 
              ? "Update the information for this webpage" 
              : "Enter the details for the new webpage you want to track"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">Webpage Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g., Product Landing Page"
                className="border-gray-200 rounded-xl"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url" className="text-gray-700 font-medium">URL</Label>
              <Input 
                id="url" 
                name="url" 
                value={formData.url} 
                onChange={handleChange} 
                placeholder="https://example.com/page"
                type="url"
                className="border-gray-200 rounded-xl"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Brief description of this webpage"
                rows={3}
                className="border-gray-200 rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-gray-700 font-medium">Tags</Label>
              <Input 
                id="tags" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange} 
                placeholder="e.g., landing, product, marketing (comma-separated)"
                className="border-gray-200 rounded-xl"
              />
              <p className="text-sm text-gray-500">Separate tags with commas</p>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-xl font-medium"
                onClick={() => navigate(isEdit ? `/webpages/${id}` : "/webpages")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-xl font-medium"
              >
                {isEdit ? "Save Changes" : "Create Webpage"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
