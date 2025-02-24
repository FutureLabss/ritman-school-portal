import { ChangeEvent } from "react";
import Input from "../Input";
import Dropdown from "../DropDown";
import { useFormContext } from "../../context/FormContext"; // Import the context
import { countryList, typeOfId } from "@/core/data";

export default function Identification() {
  const { formData, updateFormData } = useFormContext(); // Use the context

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update the form data in the context
    updateFormData({
      ...formData,
      identification: {
        ...formData.identification,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Log the form data from the context
  };

  return (
    <div className="py-20">
      <form onSubmit={handleSubmit} className="gap-6 sm:grid-cols-2">
        <div className="lg:flex space-x-8">
          <label htmlFor="" className="mb-2 w-25 text-sm font-semibold">
            Nationality <span className="text-secondary">*</span>
          </label>
          <div className="flex lg:w-full flex-col-reverse sm:flex-col">
            {/* <Input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="country"
              required
              value={formData.identification.country}
              onChange={handleChange}
            /> */}
            <Dropdown
              name="country"
              required
              options={countryList}
              value={formData.identification.country}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="text-xs text-[#6F6F6F] font-medium">Country</span>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-4 lg:grid-col-2 gap-4 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <span className="text-sm font-semibold">Type of ID Document</span>
            <Dropdown
              options={typeOfId}
              name="document_type"
              required
              value={formData.identification.document_type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-semibold">ID Number</span>
            <Input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              required
              name="document_number"
              value={formData.identification.document_number}
              onChange={handleChange}
            />
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="gap-4">
            <label htmlFor="" className="mb-2 text-sm font-semibold">
              Date of Issue
            </label>
            <div className="flex gap-1 items-center">
              <Input
                type="date"
                name="document_issue_date"
                required
                value={formData.identification.document_issue_date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* <span className="inline-block border-2 border-black h-2 w-4 "></span> */}
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
                required
                name="document_expiration_date"
                value={formData.identification.document_expiration_date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* <span className="inline-block border-2 border-black h-2 w-4"></span> */}
            </div>
            <span className="text-xs text-[#6F6F6F] font-medium">Date</span>
          </div>
        </section>
      </form>
    </div>
  );
}
