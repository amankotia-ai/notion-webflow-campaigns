
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    
    // In a real app, you'd save the data here
    navigate(`/campaigns/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/campaigns/${id}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-medium">
          {isEditing ? "Edit Content Rule" : "Create Content Rule"}
        </h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-lg">Element Information</CardTitle>
            <CardDescription>Identify the element you want to modify</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="elementId">Element ID</Label>
                <Input 
                  id="elementId" 
                  name="elementId" 
                  placeholder="e.g., hero-heading, cta-button"
                  value={formState.elementId}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  The HTML ID of the element to modify
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="elementName">Display Name</Label>
                <Input 
                  id="elementName" 
                  name="elementName" 
                  placeholder="e.g., Hero Heading, CTA Button"
                  value={formState.elementName}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  A friendly name to identify this element
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="originalContent">Original Content</Label>
              <Textarea 
                id="originalContent" 
                name="originalContent" 
                placeholder="Enter the original content of the element"
                value={formState.originalContent}
                onChange={handleChange}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                The current content of the element (optional, for reference)
              </p>
            </div>
          </CardContent>
          
          <CardHeader>
            <CardTitle className="text-lg">Replacement Content</CardTitle>
            <CardDescription>Define the new content for this UTM campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newContent">New Content</Label>
              <Textarea 
                id="newContent" 
                name="newContent" 
                placeholder="Enter the replacement content"
                value={formState.newContent}
                onChange={handleChange}
                rows={4}
                required
              />
              <p className="text-xs text-muted-foreground">
                The content that will replace the original when the UTM parameters match
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="active"
                checked={formState.active}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              type="button"
              onClick={() => navigate(`/campaigns/${id}`)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Rule" : "Create Rule"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
