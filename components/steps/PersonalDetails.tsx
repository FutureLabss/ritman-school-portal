"use client";
import { useState, ChangeEvent } from "react";
import Dropdown from "../DropDown";
import Input from "../Input";

const prefix = [
  { value: "Mr", label: "Mr" },
  { value: "Ms", label: "Ms" },
  { value: "Mrs", label: "Mrs" },
];

const country = [
  {
    value: "Nigeria",
    label: "Nigeria",
  },
  {
    value: "Ghana",
    label: "Ghana",
  },
  {
    value: "Cameroon",
    label: "Cameroon",
  },
  {
    value: "UK",
    label: "UK",
  },
];

const marital = [
  { value: "", label: "" },
  {
    value: "Single",
    label: "Single",
  },
  {
    value: "Married",
    label: "Married",
  },
  {
    value: "Divorced",
    label: "Divorce",
  },
];

export default function PersonalDetails() {
  const [formDataOne, setFormDataOne] = useState({
    prefix: "Mr",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "male",
    maritalStatus: "",
    dob: "",
    address: "",
    streetAddress: "",
    country: "Nigeria",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
    guardianTitle: "Mr",
    guardianFirstName: "",
    guardianMiddleName: "",
    guardianLastName: "",
    guardianAddress: "",
    guardianStreetAddress: "",
    guardianCity: "",
    guardianState: "",
    guardianCountry: "Nigeria",
    guardianPhoneNumber: "",
    postalCode: "",
    isPermanentResident: "yes",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFormDataOne({ ...formDataOne, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formDataOne);
  };

  return (
    <div className="max-w-4xl ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 py-12">
        <div className="max-w-2xl">
          <div className="font-semibold text-[1rem] my-1 text-[#555]">
            Name <span className="text-secondary">*</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
            <div className="flex flex-col-reverse sm:flex-col">
              <Dropdown
                name="prefix"
                options={prefix}
                value={formDataOne.prefix}
                onChange={handleChange}
                className="border border-[#ccc] py-[4px] rounded-md w-fit font-semibold text-sm"
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                prefix
              </span>
            </div>
            <div className="flex flex-col-reverse sm:flex-col">
              <Input
                type="text"
                name="firstName"
                // placeholder="First Name"
                className="border border-[#ccc] rounded-md sm:max-w-[10.65rem]"
                value={formDataOne.firstName}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                First Name
              </span>
            </div>

            <div className="flex flex-col-reverse sm:flex-col">
              <Input
                type="text"
                name="middleName"
                // placeholder="Middle Name"
                className="border border-[#ccc] rounded-md sm:max-w-[10.65rem]"
                value={formDataOne.middleName}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Middle Name
              </span>
            </div>

            <div className="flex flex-col-reverse sm:flex-col">
              <Input
                type="text"
                name="lastName"
                // placeholder="Last Name"
                className="border border-[#ccc]  rounded-md sm:max-w-[10.65rem]"
                value={formDataOne.lastName}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Last Name
              </span>
            </div>
          </div>
        </div>
        {/* gender */}
        <div className="my-4 flex justify-between max-w-lg ">
          <label className="text-[1rem] font-semibold text-[#555]">
            Gender<span className="text-secondary">*</span>{" "}
          </label>
          <div className="flex gap-1 items-center text-[#555]">
            <Input
              type="radio"
              name="gender"
              value="male"
              id="male"
              onChange={handleChange}
              checked={formDataOne.gender === "male"}
            />
            <label className="text-sm " htmlFor="male">
              Male
            </label>
          </div>
          <div className="flex items-center gap-1 text-[#555]">
            <Input
              type="radio"
              name="gender"
              value="female"
              id="female"
              onChange={handleChange}
            />
            <label className="text-sm" htmlFor="female">
              Female
            </label>
          </div>
        </div>

        {/*   Marital Status */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-y-4 md:gap-y-12 max-w-md">
          <label className="text-[1rem] font-semibold text-[#555]">
            Marital Status<span className="text-secondary">*</span>
          </label>

          <Dropdown
            options={marital}
            name="maritalStatus"
            value={formDataOne.maritalStatus}
            onChange={handleChange}
            className="border py-1 rounded-md border-[#ccc] focus:outline-none"
          />

          <label className="text-[1rem] font-semibold text-[#555]">
            Date of birth
          </label>
          <div>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                className="border border-[#ccc]  rounded-md"
                value={formDataOne.dob}
                onChange={handleChange}
              />
              <span className="inline-block border-2 border-black h-2 w-4"></span>
            </div>
            <span className="text-sm font-semibold text-[#6f6f6f]">Date</span>
          </div>
        </div>
        {/* Current Address */}

        <div className="flex gap-4 flex-col sm:flex-row sm:gap-8 max-w-3xl ">
          <label className="text-[1rem] font-semibold text-[#555]">
            Current Address <span className="text-secondary">*</span>
          </label>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col-reverse sm:flex-col">
              <Input
                type="text"
                name="address"
                className="border border-[#ccc] rounded-md"
                value={formDataOne.address}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                {" "}
                Street Address
              </span>
            </div>

            <div className="flex flex-col-reverse sm:flex-col">
              <Input
                type="text"
                name="streetAddress"
                className="border  rounded-md border-[#ccc]"
                value={formDataOne.streetAddress}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Street Address Line 2
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full flex flex-col-reverse sm:flex-col">
                <Input
                  type="text"
                  name="city"
                  className="border  rounded-md border-[#ccc] w-full"
                  value={formDataOne.state}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  city
                </span>
              </div>

              <div className="w-full flex flex-col-reverse sm:flex-col">
                <Input
                  type="text"
                  name="state"
                  className="border  rounded-md border-[#ccc]  w-full"
                  value={formDataOne.city}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-[#6f6f6f] ">
                  state
                </span>
              </div>
            </div>
            <div className=" flex flex-col-reverse sm:flex-col pt-6 sm:max-w-[11.625rem]">
              <Dropdown
                name="country"
                options={country}
                value={formDataOne.country}
                onChange={handleChange}
                className="border p-[6px] rounded-md border-[#ccc] marker:mr-5"
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                country
              </span>
            </div>
          </div>
        </div>

        {/* Permanent Resident */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-y-4 gap-x-4  sm:gap-y-12">
          <label className="text-[1rem] font-semibold text-[#555]">
            Are you a permanent Resident
            <span className="text-secondary">*</span>{" "}
          </label>
          <div className="flex items-center max-w-[11.625rem] w-full">
            <div className="flex gap-1 w-full">
              <Input
                type="radio"
                name="isPermanentResident"
                value="yes"
                id="yes"
                onChange={handleChange}
                checked={formDataOne.isPermanentResident === "yes"}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div className="flex items-center gap-1">
              <Input
                type="radio"
                name="isPermanentResident"
                value="no"
                id="no"
                onChange={handleChange}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          {/* </div> */}
          {/* <div className="mt-4 grid grid-cols-[auto_1fr_1fr] max-w-[35.5rem] gap-x-5"> */}
          <label className="text-[1rem] font-semibold text-[#555]">
            Phone Number<span className="text-secondary">*</span>{" "}
          </label>
          <div className="flex gap-4 sm:gap-12 flex-col sm:flex-row">
            <div className="gap-1 flex flex-col-reverse sm:flex-col">
              <Input
                type="text"
                name="code"
                value={"+234"}
                className="border border-[#ccc] rounded-md max-w-16"
                onChange={handleChange}
              />
              <label className="text-sm font-semibold text-[#6f6f6f]">
                Country Code
              </label>
            </div>
            <div className=" gap-1 flex flex-col-reverse sm:flex-col">
              <Input
                type="text"
                name="phoneNumber"
                className="border border-[#ccc] rounded-md"
                value={formDataOne.phoneNumber}
                onChange={handleChange}
              />
              <label className="text-sm font-semibold text-[#6f6f6f]">
                Phone Number
              </label>
            </div>
          </div>
          {/* </div> */}
          {/* <div className="flex items-center gap-8 space-x-12"> */}
          <label className="text-[1rem] font-semibold text-[#555]">
            E-mail<span className="text-secondary">*</span>{" "}
          </label>

          <div className="border max-w-xs">
            <Input
              type="email"
              name="email"
              placeholder="JOHNDOE@GMAIL.COM"
              value={formDataOne.email}
              onChange={handleChange}
              className="border border-[#ccc] rounded-md"
            />
            <span className="text-sm font-semibold text-[#6f6f6f]">
              example@example.com
            </span>
          </div>
          {/* </div> */}
          {/* <div className="flex items-center gap-4 border"> */}
          <label className="text-[1rem] font-semibold text-[#555]">
            Parent/ Guardian/ <br /> Sponsor Name
            <span className="text-secondary">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="" className="flex flex-col">
              <Dropdown
                name="guardianTitle"
                options={prefix}
                value={formDataOne.guardianTitle}
                onChange={handleChange}
                className="border border-[#ccc] p-1 rounded-md w-fit focus:outline-none"
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Title
              </span>
            </label>
            <label htmlFor="">
              <Input
                type="text"
                name="guardianFirstName"
                className="border border-[#ccc] rounded-md"
                value={formDataOne.guardianFirstName}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                First Name
              </span>
            </label>

            <label htmlFor="">
              <Input
                type="text"
                name="guardianMiddleName"
                className="border border-[#ccc] rounded-md"
                value={formDataOne.guardianMiddleName}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Middle Name
              </span>
            </label>

            <label htmlFor="">
              <Input
                type="text"
                name="guardianLastName"
                className="border border-[#ccc] rounded-md"
                value={formDataOne.guardianLastName}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Last Name
              </span>
            </label>
          </div>
          {/* </div> */}
          {/* parent/ guardian/ sponsor address */}
          {/* <div className="flex gap-3 max-w-3xl"> */}
          <label htmlFor="">
            Parent/ Guardian/ <br /> Sponsor Address
            <span className="text-secondary">*</span>
          </label>
          <div className="flex flex-col gap-4 max-w-md w-full">
            <label
              htmlFor="
             "
            >
              <Input
                type="text"
                name="guardianAddress"
                className="border border-[#ccc] rounded-md"
                value={formDataOne.guardianAddress}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                {" "}
                Street Address
              </span>
            </label>

            <label htmlFor="">
              <Input
                type="text"
                name="guardianStreetAddress"
                className="border border-[#ccc] rounded-md"
                value={formDataOne.guardianStreetAddress}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Street Address Line 2
              </span>
            </label>

            <div className="flex gap-2 flex-col sm:flex-row w-full">
              <div className="w-full">
                <Input
                  type="text"
                  name="guardianCity"
                  className="border border-[#ccc] rounded-md"
                  value={formDataOne.guardianCity}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  city
                </span>
              </div>

              <div className="w-full">
                <Input
                  type="text"
                  name="guardianState"
                  className="border border-[#ccc] rounded-md"
                  value={formDataOne.guardianState}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  {" "}
                  state
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex flex-col w-full">
                <Input
                  type="text"
                  name="postalCode"
                  value={formDataOne.postalCode}
                  onChange={handleChange}
                  className="border border-[#ccc]  rounded-md"
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  postal/Zip Code
                </span>
              </div>
              <div className="flex flex-col w-full">
                <Input
                  type="text"
                  name="guardianCountry"
                  value={formDataOne.guardianCountry}
                  onChange={handleChange}
                  className="border border-[#ccc] rounded-md"
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  country
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <button type='submit' className='border'>submit</button> */}
      </form>
    </div>
  );
}
