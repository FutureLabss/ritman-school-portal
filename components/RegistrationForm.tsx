"use client";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState, useEffect, useCallback } from "react";
import { useMutation } from "react-query";
import { useAuth } from "@/context/AuthContext";
import { RegisterFormDataType } from "@/utils/types";
import Dropdown from "./DropDown";

let programs = [
  { value: "Biochemistry", label: "Biochemistry" },
  { value: "Biology", label: "Biology" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Cyber Security", label: "Cyber Security" },
  { value: "Industrial Chemistry", label: "Industrial Chemistry" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Microbiology", label: "Microbiology" },
  { value: "Physics", label: "Physics" },
  { value: "Software Engineering", label: "Software Engineering" },
  {
    value: "History and International Studies",
    label: "History and International Studies",
  },
  {
    value: "Language and Literary Studies",
    label: "Language and Literary Studies",
  },
  { value: "Accounting", label: "Accounting" },
  { value: "Banking and Finance", label: "Banking and Finance" },
  { value: "Economics", label: "Economics" },
  {
    value: "Industrial Relations and Personnel Management",
    label: "Industrial Relations and Personnel Management",
  },
  { value: "Mass Communication", label: "Mass Communication" },
  {
    value: "Political Science and Public Administration ",
    label: "Political Science and Public Administration ",
  },
  { value: "Sociology", label: "Sociology" },
  { value: "Management ", label: "Management " },
  // Add more programs as needed
];

const RegistrationForm = ({ course }: { course?: string }) => {
  const formattedCourse = course ? decodeURIComponent(course) : "";

  const uniquePrograms = new Map();
  [{ value: formattedCourse, label: formattedCourse }, ...programs].forEach(
    (p) => uniquePrograms.set(p.value, p)
  );
  programs = Array.from(uniquePrograms.values());

  const authContext = useAuth();
  const register = authContext?.register;
  const error = authContext?.error;
  const [formData, setFormData] = useState<RegisterFormDataType>({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    dob: "",
    choosen_program: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      console.log(name, value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const mutation = useMutation((data: RegisterFormDataType) => {
    if (register) {
      // Format the date of birth to "YYYY-MM-DD"
      const formattedData = {
        ...data,
        dob: new Date(data.dob).toISOString().split("T")[0],
      };
      return register(formattedData);
    }
    throw new Error("Register function is not available");
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // Validate form data
    if (
      !formData.first_name ||
      !formData.middle_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.dob ||
      !formData.choosen_program
    ) {
      setFormError("Please fill in all fields.");
      return;
    }
    setFormError(null);
    mutation.mutate(formData, {
      onSuccess: (): void => {
        // router.push("/auth/verify");
      },
      onError: (): void => {},
    });
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      choosen_program: formattedCourse || formData.choosen_program,
    }));
  }, [formattedCourse, handleFieldChange]);

//   console.log(formData, "hh");

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="w-full max-w-4xl p-8 rounded-lg mt-5 lg:mt-20">
        <div className="flex justify-start mb-10">
          <Image src="/ritmanLogo.jpg" alt="Logo" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-6">Registration</h2>
        <form className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <Input
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleFieldChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Middle name
              </label>
              <Input
                name="middle_name"
                required
                value={formData.middle_name || ""}
                onChange={handleFieldChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <Input
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleFieldChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                name="email"
                required
                value={formData.email}
                onChange={handleFieldChange}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of birth
              </label>
              <Input
                name="dob"
                required
                value={formData.dob}
                onChange={handleFieldChange}
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chosen Program
              </label>
              <Dropdown
                name="choosen_program"
                options={programs}
                value={formData.choosen_program}
                onChange={handleFieldChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* <select
                name="choosen_program"
                required
                value={formData.choosen_program}
                onChange={handleFieldChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a program</option>
                {programs.map((program) => (
                  <option key={program.value} value={program.value}>
                    {program.label}
                  </option>
                ))}
              </select> */}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start mt-4">
            <Button
              className="px-8 py-3 bg-primary min-w-[100%] lg:min-w-[30%] text-white rounded-full hover:bg-[#0F1739] transition-all"
              label={mutation.isLoading ? "Registering..." : "Proceed"}
              onClick={handleSubmit}
              type="submit"
              disabled={mutation.isLoading}
            />
          </div>
          {formError && (
            <p className="text-red-500 text-sm mt-2">{formError}</p>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
