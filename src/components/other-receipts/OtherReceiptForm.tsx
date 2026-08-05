// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { createOtherReceipt, updateOtherReceipt } from "@/services/other_receipt.service";
// import { OtherReceipt } from "@/types/other_receipt";

// export function OtherReceiptForm({ initialData, onSuccess }: { initialData?: OtherReceipt, onSuccess: () => void }) {
//   const form = useForm<any>({
//     defaultValues: initialData || {
//       student_name: "",
//       father_name: "",
//       class: "",
//       phone: "",
//       address: "",
//       fees: 0,
//       fees_details: "",
//       due_date: "",
//     },
//   });

//   useEffect(() => {
//     if (initialData) {
//       form.reset({
//         ...initialData,
//         due_date: initialData.due_date ? new Date(initialData.due_date).toISOString().split('T')[0] : "",
//       });
//     }
//   }, [initialData, form]);

//   const fees = form.watch("fees") || 0;
//   const totalAmount = Number(fees);

//   const onSubmit = async (values: any) => {
//     try {
//       const payload = {
//         student_name: values.student_name,
//         father_name: values.father_name,
//         class: values.class,
//         phone: values.phone,
//         address: values.address,
//         fees: Number(values.fees),
//         fees_details: values.fees_details,
//         due_date: values.due_date,
//         payment_status: initialData?.payment_status || "Unpaid",
//         paid_date: initialData?.paid_date || null,
//       };

//       if (initialData) {
//         await updateOtherReceipt(initialData.id, payload);
//         toast.success("Receipt updated successfully");
//       } else {
//         await createOtherReceipt(payload);
//         toast.success("Receipt created successfully");
//       }
//       form.reset();
//       onSuccess();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to save receipt");
//     }
//   };

//   return (
//     <Card className="mb-6">
//       <CardHeader><CardTitle>{initialData ? "Edit" : "Register"} Other Receipt</CardTitle></CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
//             <FormField control={form.control} name="student_name" render={({ field }) => (<FormItem><FormLabel>Student Name</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
//             <FormField control={form.control} name="father_name" render={({ field }) => (<FormItem><FormLabel>Father Name</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
//             <FormField control={form.control} name="class" render={({ field }) => (<FormItem><FormLabel>Class</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
//             <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
//             <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
//             <FormField control={form.control} name="fees" render={({ field }) => (<FormItem><FormLabel>Fees</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} required /></FormControl><FormMessage /></FormItem>)} />
//             <FormField control={form.control} name="fees_details" render={({ field }) => (<FormItem><FormLabel>Fees Details</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
//             <FormField control={form.control} name="due_date" render={({ field }) => (<FormItem><FormLabel>Due Date</FormLabel><FormControl><Input type="date" {...field} required /></FormControl><FormMessage /></FormItem>)} />
            
//             <div className="col-span-3 flex justify-end gap-2">
//               <Button type="button" variant="outline" onClick={() => form.reset()}>Cancel</Button>
//               <Button type="submit">{initialData ? "Update" : "Submit"}</Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }
















"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createOtherReceipt, updateOtherReceipt } from "@/services/other_receipt.service";
import { OtherReceipt } from "@/types/other_receipt";

export function OtherReceiptForm({ initialData, onSuccess }: { initialData?: OtherReceipt, onSuccess: () => void }) {
  const form = useForm<any>({
    defaultValues: initialData || {
      student_name: "",
      father_name: "",
      class: "",
      phone: "",
      address: "",
      fees: 0,
      fees_details: "",
      due_date: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        due_date: initialData.due_date ? new Date(initialData.due_date).toISOString().split('T')[0] : "",
      });
    }
  }, [initialData, form]);

  const fees = form.watch("fees") || 0;
  const totalAmount = Number(fees);

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        student_name: values.student_name,
        father_name: values.father_name,
        class: values.class,
        phone: values.phone,
        address: values.address,
        fees: Number(values.fees),
        fees_details: values.fees_details,
        due_date: values.due_date,
        payment_status: initialData?.payment_status || "Unpaid",
        paid_date: initialData?.paid_date || null,
      };

      if (initialData) {
        await updateOtherReceipt(initialData.id, payload);
        toast.success("Receipt updated successfully");
      } else {
        await createOtherReceipt(payload);
        toast.success("Receipt created successfully");
      }
      form.reset();
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save receipt");
    }
  };

  return (
    <div className="bg-[#EFEFEF] p-4 rounded-lg">
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg p-4 border-l-4 border-[#FFD700] mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0FB3B7] tracking-wide">
            Other receipts
          </h1>
        </div>
      </div>
      

      <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
        <CardHeader className="border-b border-[#FFD700]/20">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#FFD700] rounded-full"></div>
            <CardTitle className="text-[#0FB3B7] text-lg font-bold">
              {initialData ? "Edit" : "Register"} Other Receipt
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField 
                  control={form.control} 
                  name="student_name" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0FB3B7] font-medium">Student Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          required 
                          className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )} 
                />
                <FormField 
                  control={form.control} 
                  name="father_name" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0FB3B7] font-medium">Father Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          required 
                          className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )} 
                />
                <FormField 
                  control={form.control} 
                  name="class" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0FB3B7] font-medium">Class</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          required 
                          className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )} 
                />
                <FormField 
                  control={form.control} 
                  name="phone" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0FB3B7] font-medium">Phone</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )} 
                />
                <FormField 
                  control={form.control} 
                  name="address" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0FB3B7] font-medium">Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )} 
                />
                <FormField 
                  control={form.control} 
                  name="fees" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0FB3B7] font-medium">Fees</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(Number(e.target.value))} 
                          required 
                          className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )} 
                />
                <FormField 
                  control={form.control} 
                  name="fees_details" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0FB3B7] font-medium">Fees Details</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )} 
                />
                <FormField 
                  control={form.control} 
                  name="due_date" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0FB3B7] font-medium">Due Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          required 
                          className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )} 
                />
              </div>
              
              {/* Total Amount Display */}
              <div className="bg-[#0FB3B7]/5 border border-[#0FB3B7]/20 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#0FB3B7]">Total Amount</span>
                  <span className="text-xl font-bold text-[#0FB3B7]">PKR {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#FFD700]/20">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => form.reset()}
                  className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-[#0FB3B7] hover:bg-[#0E9EA2] text-white transition-all duration-200 hover:shadow-lg"
                >
                  {initialData ? "Update" : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}