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
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-4  sm:gap-y-8 items-center  max-w-3xl pt-20 mb-6">
          <div>
            <label className="text-sm font-semibold text-[#555]">
              JAMB/IJMB Reg No<span className="text-secondary">*</span>:
            </label>
            <Input
              type="text"
              name="jambRegNo"
              onChange={handleChange}
              value={formDataTwo.jambRegNo}
              className="input mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#555]">
              Programme of Choice<span className="text-secondary">*</span>
            </label>
            <Input
              type="text"
              name="programmeOfChoice"
              onChange={handleChange}
              value={formDataTwo.programmeOfChoice}
              className="input mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#555]">
              Course of Choice <span className="text-secondary">*</span>{" "}
            </label>
            <Input
              type="text"
              name="courseOfChoice"
              onChange={handleChange}
              value={formDataTwo.courseOfChoice}
              className="input mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#555]">
              Academic Session <span className="text-secondary">*</span>
            </label>
            <Input
              type="text"
              name="academicSession"
              onChange={handleChange}
              value={formDataTwo.academicSession}
              className="input mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#555]">
              Secondary School / Institution / University{" "}
              <span className="text-secondary">*</span>
            </label>
            <Input
              type="text"
              name="institution"
              className="input mt-2"
              onChange={handleChange}
              value={formDataTwo.institution}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#555]">
              Qualification <span className="text-secondary">*</span>
            </label>
            <Dropdown
              name="qualification"
              options={Qualification}
              value={formDataTwo.qualification}
              onChange={handleChange}
              className="input py-1 mt-2 focus:outline-none"
            />
          </div>
          {/* <div className="flex flex-col gap-y-4 justify-between sm:flex-row max-w-md"> */}
          <div className="flex flex-col  gap-2">
            <label className="text-sm font-semibold text-[#555]">
              From(Year)<span className="text-secondary">*</span>
            </label>
            <Input
              type="date"
              name="fromYear"
              className="input"
              onChange={handleChange}
              value={formDataTwo.fromYear}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#555]">
              To(Year)<span className="text-secondary">*</span>
            </label>
            <Input
              type="date"
              name="toYear"
              className="input"
              onChange={handleChange}
              value={formDataTwo.toYear}
            />
          </div>
        </div>
        {/* </div> */}
      </form>
    </div>
  );
}
