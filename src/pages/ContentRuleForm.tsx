
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";

export default function ContentRuleForm() {
  const { id, ruleId } = useParams();
  const isEditing = !!ruleId && ruleId !== "new";
  const navigate = useNavigate();
  
  // Form state
  const [formState, setFormState] = useState({
    elementId: isEditing ? "hero-heading" : "",
    elementName: isEditing ? "Hero Heading" : "",
    originalContent: isEditing ? "Welcome to our website!" : "",
    newContent: isEditing ? "Summer Sale is Here!" : "",
    active: isEditing ? true : true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, active: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    navigate(`/campaigns/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100 rounded-xl">
          <Link to={`/campaigns/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            {isEditing ? "Edit Content Rule" : "Create Content Rule"}
          </h1>
          <p className="text-xl text-gray-500 font-normal">
            {isEditing 
              ? "Update the content replacement rule for this campaign" 
              : "Define dynamic content based on UTM parameters"
            }
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Element Information */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">Element Information</CardTitle>
            <CardDescription className="text-gray-500">Identify the element you want to modify</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="elementId" className="text-gray-700 font-medium">Element ID</Label>
                <Input 
                  id="elementId" 
                  name="elementId" 
                  placeholder="e.g., hero-heading, cta-button"
                  value={formState.elementId}
                  onChange={handleChange}
                  className="border-gray-200 rounded-xl"
                  required
                />
                <p className="text-xs text-gray-500">
                  The HTML ID of the element to modify
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="elementName" className="text-gray-700 font-medium">Display Name</Label>
                <Input 
                  id="elementName" 
                  name="elementName" 
                  placeholder="e.g., Hero Heading, CTA Button"
                  value={formState.elementName}
                  onChange={handleChange}
                  className="border-gray-200 rounded-xl"
                  required
                />
                <p className="text-xs text-gray-500">
                  A friendly name to identify this element
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="originalContent" className="text-gray-700 font-medium">Original Content</Label>
              <Textarea 
                id="originalContent" 
                name="originalContent" 
                placeholder="Enter the original content of the element"
                value={formState.originalContent}
                onChange={handleChange}
                rows={3}
                className="border-gray-200 rounded-xl"
              />
              <p className="text-xs text-gray-500">
                The current content of the element (optional, for reference)
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Replacement Content */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">Replacement Content</CardTitle>
            <CardDescription className="text-gray-500">Define the new content for this UTM campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="newContent" className="text-gray-700 font-medium">New Content</Label>
              <Textarea 
                id="newContent" 
                name="newContent" 
                placeholder="Enter the replacement content"
                value={formState.newContent}
                onChange={handleChange}
                rows={4}
                className="border-gray-200 rounded-xl"
                required
              />
              <p className="text-xs text-gray-500">
                The content that will replace the original when the UTM parameters match
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Switch 
                id="active"
                checked={formState.active}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="active" className="text-gray-700 font-medium">Active</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              type="button"
              className="border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-xl font-medium"
              onClick={() => navigate(`/campaigns/${id}`)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-xl font-medium"
            >
              {isEditing ? "Update Rule" : "Create Rule"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
