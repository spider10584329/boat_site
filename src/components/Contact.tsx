import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    message: "",
    verification: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.verification !== "black") {
      toast.error("Please answer the verification question correctly");
      return;
    }
    toast.success("Thank you! Your enquiry has been submitted.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      reason: "",
      message: "",
      verification: "",
    });
  };

  return (
    <>
      <div className="relative" style={{ background: 'linear-gradient(to bottom, #5bbaf1 0%, #06376e 100%)' }}>       

        <section id="contact" className="py-12 sm:py-16 md:py-20 pt-2">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="p-4 sm:p-6 md:p-8 shadow-medium">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-6 sm:mb-8">Contact</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background border-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background border-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background border-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reason" className="text-foreground">
                      Reason for Enquiry
                    </Label>
                    <Select required value={formData.reason} onValueChange={(value) => setFormData({ ...formData, reason: value })}>
                      <SelectTrigger className="bg-background border-input">
                        <SelectValue placeholder="- Select -" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preorder">Pre-Order an Aqua-Campa</SelectItem>
                        <SelectItem value="collaboration">Business Collaboration</SelectItem>
                        <SelectItem value="general">General Enquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background border-input min-h-32"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground mb-3 block">
                      Human Verification - A Panda is white and ..... ?
                    </Label>
                    <RadioGroup
                      required
                      value={formData.verification}
                      onValueChange={(value) => setFormData({ ...formData, verification: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="green" id="green" />
                        <Label htmlFor="green" className="text-foreground cursor-pointer">
                          Green
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="black" id="black" />
                        <Label htmlFor="black" className="text-foreground cursor-pointer">
                          Black
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yellow" id="yellow" />
                        <Label htmlFor="yellow" className="text-foreground cursor-pointer">
                          Yellow
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground mt-2">Answer this question correctly to enable the Submit button.</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                    disabled={formData.verification !== "black"}
                  >
                    Submit
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
