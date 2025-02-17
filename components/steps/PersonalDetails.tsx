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
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 py-12">
        <div className="max-w-3xl w-full ">
          <div className="font-semibold text-[1rem] my-1 text-[#555]">
            Name <span className="text-secondary">*</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
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
            <div className="flex flex-col-reverse sm:flex-col w-full">
              <Input
                type="text"
                name="firstName"
                // placeholder="First Name"
                className="border border-[#ccc] rounded-md "
                value={formDataOne.firstName}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                First Name
              </span>
            </div>

            <div className="flex flex-col-reverse sm:flex-col w-full">
              <Input
                type="text"
                name="middleName"
                // placeholder="Middle Name"
                className="border border-[#ccc] rounded-md "
                value={formDataOne.middleName}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                Middle Name
              </span>
            </div>

            <div className="flex flex-col-reverse sm:flex-col w-full">
              <Input
                type="text"
                name="lastName"
                // placeholder="Last Name"
                className="border border-[#ccc]  rounded-md"
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
        <div className="my-4 flex flex-col md:flex-row max-w-3xl justify-between  gap-8 md:gap-4 ">
          <div className="flex items-center gap-8 w-full">
            <label className="text-[1rem] font-semibold text-[#555]">
              Gender<span className="text-secondary">*</span>{" "}
            </label>
            {/* <div> */}
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
          <div className=" w-full flex items-center  gap-10">
            <label className="text-[1rem] font-semibold text-[#555]">
              Marital Status<span className="text-secondary">*</span>
            </label>

            <Dropdown
              options={marital}
              name="maritalStatus"
              value={formDataOne.maritalStatus}
              onChange={handleChange}
              className="border py-1 rounded-md border-[#ccc] focus:outline-none flex-1"
            />
          </div>

          {/* </div> */}
        </div>
        {/*   Marital Status */}
        <div className=" flex items-center gap-8">
          <label className="text-[1rem] font-semibold text-[#555]">
            Date of birth
          </label>
          <Input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            className="border border-[#ccc] rounded-md max-w-[12.5rem] w-full"
            value={formDataOne.dob}
            onChange={handleChange}
          />
        </div>

        {/* Current Address */}

        <div className="flex gap-4 flex-col md:flex-row  max-w-3xl  w-full">
          <label className="text-[1rem] font-semibold text-[#555] w-40">
            Current Address <span className="text-secondary">*</span>
          </label>
          <div className="flex flex-col gap-6  w-full">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="flex flex-1 flex-col-reverse md:flex-col w-full">
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

              <div className="flex flex-col-reverse md:flex-col flex-1 w-full">
                <Input
                  type="text"
                  name="streetAddress"
                  className="border  rounded-md border-[#ccc] "
                  value={formDataOne.streetAddress}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-[#6f6f6f]">
                  Street Address Line 2
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col-reverse md:flex-col">
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

              <div className="w-full flex flex-col-reverse md:flex-col">
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
            <div className=" flex flex-col-reverse sm:flex-col md:w-1/2">
              <Dropdown
                name="country"
                options={country}
                value={formDataOne.country}
                onChange={handleChange}
                className="border p-[6px] rounded-md border-[#ccc] focus:outline-none"
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                country
              </span>
            </div>
          </div>
        </div>

        {/* Permanent Resident */}
        {/* <div className="mt-4 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-y-4 gap-x-4  sm:gap-y-12"> */}
        <div className="flex gap-8  w-1/2">
          <label className="text-[1rem] font-semibold text-[#555] w-full">
            Are you a permanent Resident
            <span className="text-secondary">*</span>{" "}
          </label>
          <div className="flex items-center w-full">
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
        </div>

        <div className="flex items-center w-full gap-y-4 gap-x-8 flex-col md:flex-row max-w-3xl">
          <div className="flex gap-3 md:gap- w-full flex-col md:flex-row flex-1">
            <label className="text-[1rem] font-semibold text-[#555]">
              Phone Number<span className="text-secondary">*</span>{" "}
            </label>
            <div className="flex flex-col gap-4 md:flex-row w-full ">
              <div className="gap-1 flex flex-col-reverse sm:flex-col">
                <Input
                  type="text"
                  name="code"
                  value={"+234"}
                  className="border border-[#ccc] rounded-md w-full max-w-[5.25rem] "
                  onChange={handleChange}
                />
                <label className="text-sm font-semibold text-[#6f6f6f]">
                  Country Code
                </label>
              </div>
              <div className=" gap-1 flex flex-col-reverse md:flex-col w-full m-0">
                <Input
                  type="text"
                  name="phoneNumber"
                  className="border border-[#ccc] rounded-md w-full "
                  value={formDataOne.phoneNumber}
                  onChange={handleChange}
                />
                <label className="text-sm  font-semibold text-[#6f6f6f]">
                  Phone Number
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row  md:gap-4 flex-1">
            <label className="text-[1rem] font-semibold text-[#555]">
              E-mail<span className="text-secondary">*</span>{" "}
            </label>

            <div className="flex-1">
              <Input
                type="email"
                name="email"
                placeholder="JOHNDOE@GMAIL.COM"
                value={formDataOne.email}
                onChange={handleChange}
                className="border border-[#ccc] rounded-md "
              />
              <span className="text-sm font-semibold text-[#6f6f6f]">
                example@example.com
              </span>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="flex lg:items-center gap-4  w-full max-w-3xl flex-col lg:flex-row">
          <label className="text-[1rem] font-semibold text-[#555] max-w-[9.375rem] w-full">
            Parent/ Guardian/ Sponsor Name
            <span className="text-secondary">*</span>
          </label>
          <div className="flex flex-col md:flex-row gap-4">
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
        </div>
        {/* parent/ guardian/ sponsor address */}
        <div className="flex gap-3 max-w-3xl my-4  flex-col md:flex-row">
          <label className="max-w-[9.375rem] w-full">
            Parent/ Guardian/ <br /> Sponsor Address
            <span className="text-secondary">*</span>
          </label>
          <div className="flex flex-col gap-4 max-w-3xl w-full">
            <div className="flex w-full gap-4 flex-col sm:flex-row">
              <div className="w-full">
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
              </div>

              <div className="w-full">
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
              </div>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row w-full">
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
            <div className="flex flex-col sm:flex-row gap-4">
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
