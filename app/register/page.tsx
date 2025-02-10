"use client";
import Image from "next/image";
import Input from "@/components/Input";
import Dropdown from "@/components/DropDown";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
    program: "",
  });

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    router.push("/create-password");
  };

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
                name="firstName"
                value={formData.firstName}
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
                name="middleName"
                value={formData.middleName}
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
                name="lastName"
                value={formData.lastName}
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
                value={formData.email}
                onChange={handleFieldChange}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of birth (mm/dd/yy)
              </label>
              <Input
                name="dob"
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
                name="program"
                options={[
                  { value: "program1", label: "Program 1" },
                  { value: "program2", label: "Program 2" },
                  { value: "program3", label: "Program 3" },
                ]}
                value={formData.program}
                onChange={handleFieldChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start mt-4">
            <Button
              className="px-8 py-3 bg-primary min-w-[100%] lg:min-w-[30%] text-white rounded-full hover:bg-[#0F1739] transition-all"
              label="Proceed"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
