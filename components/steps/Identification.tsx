import { useState } from "react";
import Input from "../Input";
import Dropdown from "../DropDown";

const typeOfId = [
  { value: "Passport", label: "Passport" },
  { value: "National ID", label: "National ID" },
  { value: "Driver License", label: "Driver License" },
  { value: "Voter Card", label: "Voter Card" },
  { value: "Utility Bill", label: "Utility Bill" },
  { value: "Bank Statement", label: "Bank Statement" },
];

export default function Identification() {
  const [formIdentificationData, setFormIdentificationData] = useState({
    nationality: "",
    documentType: "",
    idNumber: "",
    issueDate: "",
    expiryDate: "",
  });

  const handleCahnge = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormIdentificationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formIdentificationData);
  };

  return (
    <div className="py-20 max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6 sm:space-y-12"
      >
        <div className="flex flex-col sm:flex-row gap-x-12">
          <label htmlFor="" className="mb-2 text-sm font-semibold">
            Nationality <span className="text-secondary">*</span>
          </label>
          <div className="flex flex-col-reverse sm:flex-col">
            <Input
              className="sm:max-w-[10.625rem] border-[#6F6F6F] border w-full rounded-md"
              type="text"
              name="nationality"
              value={formIdentificationData.nationality}
              onChange={handleCahnge}
            />
            <span className="text-xs text-[#6F6F6F] font-medium">Country</span>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <span className="text-sm font-semibold">Type of ID Document</span>
            <Dropdown
              options={typeOfId}
              name="documentType"
              value={formIdentificationData.documentType}
              onChange={handleCahnge}
              className="input py-[4.8px] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-semibold">ID Number</span>
            <Input
              className="input"
              type="text"
              name="idNumber"
              value={formIdentificationData.idNumber}
              onChange={handleCahnge}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="mb-2 text-sm font-semibold">
            Date of Issue
          </label>
          <div className="flex gap-1 items-center">
            <Input
              type="date"
              name="issueDate"
              value={formIdentificationData.issueDate}
              onChange={handleCahnge}
              className="input"
            />
            <span className="inline-block border-2 border-black h-2 w-4 "></span>
          </div>
          <span className="text-xs text-[#6F6F6F] font-medium">Date</span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="mb-2 text-sm font-semibold">
            Date of Expiry
          </label>
          <div className="flex gap-1 items-center">
            <Input
              type="date"
              name="expiryDate"
              value={formIdentificationData.expiryDate}
              onChange={handleCahnge}
              className="input"
            />
            <span className="inline-block border-2 border-black h-2 w-4"></span>
          </div>
          <span className="text-xs text-[#6F6F6F] font-medium">Date</span>
        </div>
      </form>
    </div>
  );
}
