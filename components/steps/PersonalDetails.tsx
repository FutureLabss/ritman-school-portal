"use client";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import Dropdown from "../DropDown";
import Input from "../Input";
import { useFormContext } from "@/context/FormContext"; // Import the context
import { UserDataTypes } from "@/utils/types";

const prefix = [
  { value: "", label: "" },
  { value: "Mr", label: "Mr" },
  { value: "Miss", label: "Miss" },
  { value: "Mrs", label: "Mrs" },
];

const marital = [
  { value: "", label: "" },
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorce" },
];

const country = [
  { value: "", label: "" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Ghana", label: "Ghana" },
  { value: "Cameron", label: "Cameron" },
];

export default function PersonalDetails() {
  const { formData, updateFormData } = useFormContext(); // Use the context
  const [storeUser, setStoreuser] = useState<UserDataTypes>(
    {} as UserDataTypes
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update the form data in the context
    updateFormData({
      applicant: {
        ...formData.applicant,
        [name]: value,
      },
    });
  };

  const handleGuardianChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update the guardian data in the context
    updateFormData({
      guardian: {
        ...formData.guardian,
        [name]: value,
      },
    });
  };

  const handleAddressChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedAddress = [...formData.address];
    updatedAddress[index] = {
      ...updatedAddress[index],
      [name]: value,
    };
    updateFormData({
      address: updatedAddress,
    });
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the form data in the context
    updateFormData({
      applicant: {
        ...formData.applicant,
        [name]: value === "true",
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Log the form data from the context
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    if (storedUser) {
      setStoreuser(storedUser);
    }
  }, []);

  console.log(storeUser, "store");

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 py-12">
        {/* Name Section */}
        <div className="">
          <div className="font-semibold text-[1rem] my-1 text-[#555]">
            Name <span className="text-secondary">*</span>
          </div>
          <div className="lg:flex flex-col sm:flex-row sm:items-center gap-4 w-full">
            <div className="flex flex-col-reverse sm:flex-col">
              <Dropdown
                name="title"
                options={prefix}
                value={formData.applicant.title}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Title
              </span>
            </div>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
              <div className="flex flex-col-reverse sm:flex-col">
                <Input
                  type="text"
                  name="first_name"
                  required
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={storeUser?.fullname || ""}
                  // onChange={handleChange}
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  Full Name
                </span>
              </div>
              {/* <div className="flex flex-col-reverse sm:flex-col">
                <Input
                  type="text"
                  name="middle_name"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.applicant.middle_name}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  Middle Name
                </span>
              </div> */}
              {/* <div className="flex flex-col-reverse sm:flex-col">
                <Input
                  type="text"
                  name="last_name"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.applicant.last_name}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  Last Name
                </span>
              </div> */}
            </section>
          </div>
        </div>

        {/* Gender Section */}
        <div className="my-4 flex gap-4">
          <label className="text-[1rem] font-semibold text-[#555]">
            Gender<span className="text-secondary">*</span>
          </label>
          <div className="flex gap-1 items-center text-[#555]">
            <Input
              type="radio"
              name="gender"
              value="Male"
              required
              id="male"
              onChange={handleChange}
              checked={formData.applicant.gender === "Male"}
            />
            <label className="text-sm" htmlFor="male">
              Male
            </label>
          </div>
          <div className="flex items-center gap-1 text-[#555]">
            <Input
              type="radio"
              name="gender"
              value="Female"
              required
              id="female"
              onChange={handleChange}
              checked={formData.applicant.gender === "Female"}
            />
            <label className="text-sm" htmlFor="female">
              Female
            </label>
          </div>
        </div>

        {/* Marital Status and Date of Birth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <section>
            <label className="text-[1rem] font-semibold text-[#555]">
              Marital Status<span className="text-secondary">*</span>
            </label>
            <Dropdown
              options={marital}
              name="marital_status"
              required
              value={formData.applicant.marital_status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </section>
          <section>
            <label className="text-[1rem] font-semibold text-[#555]">
              Date of birth
            </label>
            <div>
              <div className="">
                <Input
                  type="date"
                  name="dob"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.applicant.dob || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Phone Number Section */}
        <div className="grid">
          <label className="text-[1rem] font-semibold text-[#555]">
            Phone Number
          </label>
          <Input
            type="text"
            name="phone_number"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.applicant.phone_number}
            onChange={handleChange}
          />
        </div>

        {/* Current Address Section */}
        <div className="lg:flex gap-4 flex-col sm:flex-row sm:gap-8 max-w-3xl">
          <label className="text-[1rem] font-semibold text-[#555]">
            Current Address <span className="text-secondary">*</span>
          </label>
          <div className="">
            <div className="flex flex-col-reverse sm:flex-col">
              <Input
                type="text"
                name="street_address_line_1"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.address[0]?.street_address_line_1 || ""}
                onChange={(e) => handleAddressChange(0, e)}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Street Address
              </span>
            </div>
            <section className="mt-4 grid lg:grid-cols-3 gap-4">
              <div>
                <label className="text-[1rem] font-semibold text-[#555]">
                  City <span className="text-secondary">*</span>
                </label>
                <Input
                  type="text"
                  name="city"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.address[0]?.city || ""}
                  onChange={(e) => handleAddressChange(0, e)}
                />
              </div>
              <div>
                <label className="text-[1rem] font-semibold text-[#555]">
                  State
                </label>
                <Input
                  type="text"
                  name="state"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.address[0]?.state || ""}
                  onChange={(e) => handleAddressChange(0, e)}
                />
              </div>
              <div>
                <label className="text-[1rem] font-semibold text-[#555]">
                  Country <span className="text-secondary">*</span>
                </label>
                <Dropdown
                  options={country}
                  name="country"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.address[0]?.country || ""}
                  onChange={(e) => handleAddressChange(0, e)}
                />
              </div>
            </section>
          </div>
        </div>

        {/* Permanent Resident Section */}
        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-y-4 gap-x-4 sm:gap-y-12">
          <label className="text-[1rem] font-semibold text-[#555]">
            Are you a permanent Resident{" "}
            <span className="text-secondary">*</span>
          </label>
          <div className="flex items-center max-w-[5.625rem] w-full">
            <div className="flex gap-1 w-full">
              <Input
                type="radio"
                name="permanent_resident"
                required
                value="true"
                onChange={handleRadioChange}
                checked={formData.applicant.permanent_resident === true}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div className="flex items-center gap-1">
              <Input
                type="radio"
                name="permanent_resident"
                required
                value="false"
                onChange={handleRadioChange}
                checked={formData.applicant.permanent_resident === false}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
        </div>

        {/* Guardian Section */}
        <section className="">
          <div className="mt-10">
            <div className="font-semibold text-[1rem] my-1 text-[#555]">
              Parent/ Guardian/ Sponsor Name{" "}
              <span className="text-secondary">*</span>
            </div>
            <div className="lg:flex flex-col sm:flex-row sm:items-center gap-4 w-full">
              <div className="flex flex-col-reverse sm:flex-col">
                <Dropdown
                  name="title"
                  options={prefix}
                  value={formData.guardian.title}
                  onChange={handleGuardianChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  Title
                </span>
              </div>
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
                <div className="flex flex-col-reverse sm:flex-col">
                  <Input
                    type="text"
                    name="first_name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.guardian.first_name}
                    onChange={handleGuardianChange}
                  />
                  <span className="text-sm font-semibold text-[#6f6f6f]">
                    First Name
                  </span>
                </div>
                <div className="flex flex-col-reverse sm:flex-col">
                  <Input
                    type="text"
                    name="middle_name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.guardian.middle_name}
                    onChange={handleGuardianChange}
                  />
                  <span className="text-sm font-semibold text-[#6f6f6f]">
                    Middle Name
                  </span>
                </div>
                <div className="flex flex-col-reverse sm:flex-col">
                  <Input
                    type="text"
                    name="last_name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.guardian.last_name}
                    onChange={handleGuardianChange}
                  />
                  <span className="text-sm font-semibold text-[#6f6f6f]">
                    Last Name
                  </span>
                </div>
              </section>
            </div>
          </div>
          {/* Guardian Phone Number Section */}
          <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex ">
              <label className="text-[1rem] font-semibold text-[#555]">
                Phone Number
              </label>
              <Input
                type="text"
                name="phone_number"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.guardian.phone_number}
                onChange={handleGuardianChange}
              />
            </div>
            {/* <div>
              <label className="text-[1rem] font-semibold text-[#555]">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="james@gmail.com"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.guardian.email || ""}
                onChange={handleGuardianChange}
              />
            </div> */}
          </div>
          <div className="lg:flex mt-10 gap-4 flex-col sm:flex-row sm:gap-8 max-w-3xl">
            <label className="text-[1rem] font-semibold text-[#555]">
              Guardian Address <span className="text-secondary">*</span>
            </label>
            <div className="">
              <div className="flex flex-col-reverse sm:flex-col">
                <Input
                  type="text"
                  name="street_address_line_1"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.address[1]?.street_address_line_1 || ""}
                  onChange={(e) => handleAddressChange(1, e)}
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  Street Address
                </span>
              </div>
              <section className="mt-4 grid lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-[1rem] font-semibold text-[#555]">
                    City <span className="text-secondary">*</span>
                  </label>
                  <Input
                    type="text"
                    name="city"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.address[1]?.city || ""}
                    onChange={(e) => handleAddressChange(1, e)}
                  />
                </div>
                <div>
                  <label className="text-[1rem] font-semibold text-[#555]">
                    State
                  </label>
                  <Input
                    type="text"
                    name="state"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.address[1]?.state || ""}
                    onChange={(e) => handleAddressChange(1, e)}
                  />
                </div>
                <div>
                  <label className="text-[1rem] font-semibold text-[#555]">
                    Country <span className="text-secondary">*</span>
                  </label>
                  <Dropdown
                    options={country}
                    name="country"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.address[1]?.country || ""}
                    onChange={(e) => handleAddressChange(1, e)}
                  />
                </div>
              </section>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
