
import { useState } from 'react';
import { Plus, Minus, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Explicitly define the link type for the array
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().min(10, { message: "Please enter a valid contact number" }),
  links: z.array(
    z.string().url({ message: "Please enter a valid URL" }).or(z.string().length(0))
  ),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const OrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact: "",
      links: [""],
      message: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Form data:", data);
      
      // Filter out empty links
      const filteredLinks = data.links.filter(link => link.trim() !== "");
      
      // Here you would typically send this data to your backend
      // For now, we'll just show a success message
      
      toast({
        title: "Order Submitted",
        description: "Thank you for your order! We'll contact you shortly.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 z-10">
      <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <span className="text-brown/80 font-display font-medium tracking-wider text-sm uppercase mb-2 block">Nature's Nectar</span>
          <h1 className="text-brown font-display font-bold text-4xl md:text-5xl leading-tight mb-6">
            PLACE YOUR ORDER
          </h1>
          <div className="w-24 h-1 bg-nectar mb-6 mx-auto"></div>
          <p className="text-brown/80 mb-8">
            Fill out the form below to place your order for our delicious fruit fusion juices. We'll get back to you shortly!
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brown font-medium">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      className="border-brown/30 focus-visible:ring-nectar" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brown font-medium">Contact Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your phone number" 
                      className="border-brown/30 focus-visible:ring-nectar" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <FormLabel className="text-brown font-medium">Links</FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder="https://example.com"
                    className="border-brown/30 focus-visible:ring-nectar flex-1"
                    {...form.register(`links.${index}`)}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    className="border-brown/30 text-brown hover:bg-nectar hover:text-white hover:border-nectar"
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-brown/30 text-brown hover:bg-nectar hover:text-white hover:border-nectar"
                onClick={() => append("")}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Link
              </Button>
            </div>
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brown font-medium">Additional Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us more about your order requirements..." 
                      className="border-brown/30 focus-visible:ring-nectar resize-none" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full button-hover bg-nectar text-white font-medium rounded-full transition-all py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : (
                <>
                  <Send className="h-5 w-5 mr-2" /> Submit Order
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OrderForm;
