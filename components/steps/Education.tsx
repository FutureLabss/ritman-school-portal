import { useState } from "react";
import Input from "../Input";
import Dropdown from "../DropDown";

const Qualification = [
  { value: "SSCE", label: "SSCE" },
  { value: "OND", label: "OND" },
  { value: "HND", label: "HND" },
  { value: "BSc", label: "BSc" },
  { value: "MSc", label: "MSc" },
];

export default function Education() {
  const [formDataTwo, setFormDataTwo] = useState({
    jambRegNo: "",
    programmeOfChoice: "",
    courseOfChoice: "",
    academicSession: "",
    institution: "",
    qualification: "",
    fromYear: "",
    toYear: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormDataTwo({ ...formDataTwo, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formDataTwo);
  };

  return (
    <div className="pb-12">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-y-2 sm:gap-y-12 items-center  max-w-sm pt-20 mb-6">
          <label className="text-sm font-semibold text-[#555]">
            JAMB/IJMB Reg No<span className="text-secondary">*</span>:
          </label>
          <Input
            type="text"
            name="jambRegNo"
            onChange={handleChange}
            value={formDataTwo.jambRegNo}
            className="input"
          />
          <label className="text-sm font-semibold text-[#555]">
            Programme of Choice<span className="text-secondary">*</span>
          </label>
          <Input
            type="text"
            name="programmeOfChoice"
            onChange={handleChange}
            value={formDataTwo.programmeOfChoice}
            className="input"
          />
          <label className="text-sm font-semibold text-[#555]">
            Course of Choice <span className="text-secondary">*</span>{" "}
          </label>
          <Input
            type="text"
            name="courseOfChoice"
            onChange={handleChange}
            value={formDataTwo.courseOfChoice}
            className="input"
          />
          <label className="text-sm font-semibold text-[#555]">
            Academic Session <span className="text-secondary">*</span>
          </label>
          <Input
            type="text"
            name="academicSession"
            onChange={handleChange}
            value={formDataTwo.academicSession}
            className="input"
          />
          <label className="text-sm font-semibold text-[#555]">
            Secondary School / Institution / University{" "}
            <span className="text-secondary">*</span>
          </label>
          <Input
            type="text"
            name="institution"
            className="input"
            onChange={handleChange}
            value={formDataTwo.institution}
          />

          <label className="text-sm font-semibold text-[#555]">
            Qualification <span className="text-secondary">*</span>
          </label>
          <Dropdown
            name="qualification"
            options={Qualification}
            value={formDataTwo.qualification}
            onChange={handleChange}
            className="input py-1 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-4 justify-between sm:flex-row max-w-md">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-[#555]">
              From(Year)<span className="text-secondary">*</span>
              <Input
                type="date"
                name="fromYear"
                className="input"
                onChange={handleChange}
                value={formDataTwo.fromYear}
              />
            </label>

            <span className="inline-block border-2 border-black h-2 w-4 mt-6"></span>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-[#555]">
              To(Year)<span className="text-secondary">*</span>
              <Input
                type="date"
                name="toYear"
                className="input"
                onChange={handleChange}
                value={formDataTwo.toYear}
              />
            </label>
            <span className="inline-block border-2 border-black h-2 w-4 mt-6"></span>
          </div>
        </div>
      </form>
    </div>
  );
}
