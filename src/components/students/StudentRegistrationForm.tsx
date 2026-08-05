
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createStudent, updateStudent } from "@/services/student.service";
import { useState, useEffect } from "react";
import { Student } from "@/types/student";

// ✅ FIX: Use z.number() instead of z.coerce.number()
const formSchema = z.object({
  student_id: z.string().min(1, "Required"),
  student_name: z.string().min(1, "Required"),
  father_name: z.string().min(1, "Required"),
  class: z.string().min(1, "Required"),
  student_group: z.string().min(1, "Required"),
  shift: z.string().min(1, "Required"),
  monthly_fee: z.number().min(0, "Must be a positive number"),
  registered_for_months: z.number().min(1, "Must be at least 1"),
  admission_date: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  status: z.string().default("Active"),
});

// ✅ FIX: Create a type for the form values
type FormValues = {
  student_id: string;
  student_name: string;
  father_name: string;
  class: string;
  student_group: string;
  shift: string;
  monthly_fee: number;
  registered_for_months: number;
  admission_date?: string;
  phone?: string;
  address?: string;
  status: string;
};

export function StudentRegistrationForm({
  onSuccess,
  editingStudent,
  onCancel
}: {
  onSuccess?: () => void,
  editingStudent?: Student | null,
  onCancel?: () => void
}) {
  const [isLoading, setIsLoading] = useState(false);

  // ✅ FIX: Explicitly type the useForm hook
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      student_id: "",
      student_name: "",
      father_name: "",
      class: "",
      student_group: "",
      shift: "",
      monthly_fee: 0,
      registered_for_months: 12, // ✅ Add this - was missing
      admission_date: "",
      phone: "",
      address: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (editingStudent) {
      form.reset({
        student_id: editingStudent.student_id,
        student_name: editingStudent.student_name,
        father_name: editingStudent.father_name,
        class: editingStudent.class,
        student_group: editingStudent.student_group,
        shift: editingStudent.shift ?? "",
        monthly_fee: editingStudent.monthly_fee,
        registered_for_months: editingStudent.registered_for_months || 12,
        admission_date: editingStudent.admission_date ?? "",
        phone: editingStudent.phone ?? "",
        address: editingStudent.address ?? "",
        status: editingStudent.status,
      });
    } else {
      form.reset({
        student_id: "",
        student_name: "",
        father_name: "",
        class: "",
        student_group: "",
        shift: "", // ✅ Add this - was missing
        monthly_fee: 0,
        registered_for_months: 12,
        admission_date: "",
        phone: "",
        address: "",
        status: "Active",
      });
    }
  }, [editingStudent, form]);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const payload = {
        ...values,
        admission_date: values.admission_date || null,
      };
      if (editingStudent) {
        await updateStudent(editingStudent.id, payload as any);
        toast.success("Student updated successfully");
      } else {
        await createStudent(payload as any);
        toast.success("Student registered successfully");
      }
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      toast.error(`Failed to ${editingStudent ? "update" : "register"} student`);
      console.error("Supabase error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg p-4 border-l-4 border-[#FFD700] mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0FB3B7] tracking-wide">
            Student Registration
          </h1>
        </div>
      </div>

      <Card className="w-full max-w-2xl mx-auto bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
        <CardHeader className="border-b border-[#FFD700]/20">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
            <CardTitle className="text-[#0FB3B7] text-xl font-bold">
              {editingStudent ? "Edit Student" : "Register New Student"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0FB3B7] font-medium">Student ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SID001"
                        {...field}
                        className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="student_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0FB3B7] font-medium">Student Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        value={field.value ?? ""}
                        className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="father_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0FB3B7] font-medium">Father Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jane Doe"
                        {...field}
                        value={field.value ?? ""}
                        className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
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
                        placeholder="10th"
                        {...field}
                        value={field.value ?? ""}
                        className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="student_group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0FB3B7] font-medium">Group</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20">
                          <SelectValue placeholder="Select Group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="JSI PRE-SCHOOLING">JSI PRE-SCHOOLING</SelectItem>
                        <SelectItem value="JSI TUITION CENTRE">JSI TUITION CENTRE</SelectItem>
                        <SelectItem value="JSI BASIC CLASSES">JSI BASIC CLASSES</SelectItem>
                        <SelectItem value="JSI COACHING CENTRE">JSI COACHING CENTRE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shift"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0FB3B7] font-medium">Shift</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Morning"
                        {...field}
                        value={field.value ?? ""}
                        className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="admission_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0FB3B7] font-medium">Admission Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value ?? ""}
                        className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthly_fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0FB3B7] font-medium">Monthly Fee</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="registered_for_months"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0FB3B7] font-medium">Registered Months</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? 12}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
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
                        placeholder="+123456789"
                        {...field}
                        value={field.value ?? ""}
                        className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0FB3B7] font-medium">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St"
                      {...field}
                      value={field.value ?? ""}
                      className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                className="flex-1 bg-[#0FB3B7] hover:bg-[#0E9EA2] text-white transition-all duration-200 hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingStudent ? "Update Student" : "Register Student"}
              </Button>
              {editingStudent && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200"
                >
                  Cancel Edit
                </Button>
              )}
            </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}