"use client";
import { ChangeEvent, useState, useEffect } from "react";
import Input from "../Input";
import Dropdown from "../DropDown";
import { useFormContext } from "../../context/FormContext";
// import { useUser } from "@/context/UserContext";
import { RegisterFormDataType, IUser } from "@/utils/types";

const Qualification = [
  { value: "", label: "" },
  { value: "SSCE", label: "SSCE" },
  { value: "FSLC", label: "FSLC" },
  { value: "OND", label: "OND" },
  { value: "HND", label: "HND" },
  { value: "BSc", label: "BSc" },
  { value: "MSc", label: "MSc" },
];

export default function Education() {
  const { formData, updateFormData } = useFormContext();
  const [faculty, setFaculty] = useState<IUser>();
  const [storeData, setStoreData] = useState<RegisterFormDataType>();
  // const { user } = useUser();
  // const [department] = useState(localStorage.getItem("program"));

  const handleChange = (
    index: number, // Add index parameter
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update the form data in the context
    updateFormData({
      ...formData,
      qualification: formData.qualification.map((qual, i) =>
        i === index ? { ...qual, [name]: value } : qual
      ), // Update the qualification entry at the specified index
    });
  };

  useEffect(() => {
    if (faculty?.school_metadata.department) {
      updateFormData({
        ...formData,
        jamb: {
          ...formData.jamb,
          program_of_choice: faculty.school_metadata.faculty,
          course_of_choice: storeData?.choosen_program || "",
        },
      });
    }
  }, [faculty]); // Run this effect when the `user` object changes

  useEffect(() => {
    const fa = localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile") as string)
      : null;
    if (fa) {
      setFaculty(fa);
    }
  }, []);

  const handleJambChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // console.log(value);

    // Update the JAMB data in the context
    updateFormData({
      ...formData,
      jamb: {
        ...formData.jamb,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Log the form data from the context
  };

  useEffect(() => {
    const userData = localStorage.getItem("userReg")
      ? JSON.parse(localStorage.getItem("userReg") as string)
      : null;
    if (userData) {
      setStoreData(userData);
    }
  }, []);

  console.log(faculty, "me-w");

  return (
    <div className="pb-12">
      <form onSubmit={handleSubmit} className="">
        <div className="gap-4 items-center pt-20 mb-6">
          {/* JAMB Registration Number */}
          <div className="grid grid-cols-2 gap-4">
            <section className="">
              <div className="w-full">
                <label className="text-sm font-semibold text-[#555]">
                  JAMB/IJMB Reg No<span className="text-secondary">*</span>:
                </label>
                <Input
                  type="text"
                  name="jamb_reg_no"
                  required
                  onChange={handleJambChange}
                  value={formData.jamb.jamb_reg_no}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {/* Programme of Choice */}
                <label className="text-sm font-semibold text-[#555]">
                  Course of Choice<span className="text-secondary">*</span>
                </label>
                <Input
                  type="text"
                  name="course_of_choice"
                  required
                  onChange={handleJambChange}
                  // value={formData.jamb.course_of_choice}
                  defaultValue={storeData?.choosen_program || ""}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </section>

            <section>
              <div>
                <label className="text-sm font-semibold text-[#555]">
                  Faculty <span className="text-secondary">*</span>{" "}
                </label>
                <Input
                  type="text"
                  required
                  name="program_of_choice"
                  onChange={handleJambChange}
                  defaultValue={faculty?.school_metadata.faculty}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#555]">
                  Academic Session <span className="text-secondary">*</span>
                </label>
                <Input
                  type="text"
                  name="academic_session"
                  required
                  onChange={handleJambChange}
                  value={formData.jamb.academic_session}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </section>
          </div>

          {/* Second qualification */}
          <div>
            <section className="mt-20">
              <div className="grid grid-cols-2 w-full gap-4">
                <div>
                  <label className="text-sm font-semibold text-[#555]">
                    Primary School / Institution / University{" "}
                    <span className="text-secondary">*</span>
                  </label>
                  <Input
                    type="text"
                    name="school_name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => handleChange(0, e)} // Update the first qualification
                    value={formData.qualification[0]?.school_name || ""}
                  />
                </div>
                {/* Qualification */}
                <div>
                  <label className="text-sm font-semibold text-[#555]">
                    Qualification <span className="text-secondary">*</span>
                  </label>
                  <Dropdown
                    name="qualification"
                    options={Qualification}
                    required
                    value={formData.qualification[0]?.qualification || ""}
                    onChange={(e) => handleChange(0, e)} // Update the first qualification
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="">
                  <label className="text-sm font-semibold text-[#555]">
                    From (Year)<span className="text-secondary">*</span>
                  </label>
                  <Input
                    type="date"
                    name="start_date"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => handleChange(0, e)} // Update the first qualification
                    value={formData.qualification[0]?.start_date || ""}
                  />
                </div>
                <div className="">
                  <label className="text-sm font-semibold text-[#555]">
                    To (Year)<span className="text-secondary">*</span>
                  </label>
                  <Input
                    type="date"
                    name="end_date"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => handleChange(0, e)} // Update the first qualification
                    value={formData.qualification[0]?.end_date || ""}
                  />
                </div>
              </div>
            </section>
            <section className="mt-12">
              <div className="grid grid-cols-2 w-full">
                <div>
                  <label className="text-sm font-semibold text-[#555]">
                    Secondary School / Institution / University{" "}
                    <span className="text-secondary">*</span>
                  </label>
                  <Input
                    type="text"
                    name="school_name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => handleChange(1, e)} // Update the second qualification
                    value={formData.qualification[1]?.school_name || ""}
                  />
                </div>
                {/* Qualification */}
                <div>
                  <label className="text-sm font-semibold text-[#555]">
                    Qualification <span className="text-secondary">*</span>
                  </label>
                  <Dropdown
                    name="qualification"
                    options={Qualification}
                    required
                    value={formData.qualification[1]?.qualification || ""}
                    onChange={(e) => handleChange(1, e)} // Update the second qualification
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="">
                  <label className="text-sm font-semibold text-[#555]">
                    From (Year)<span className="text-secondary">*</span>
                  </label>
                  <Input
                    type="date"
                    name="start_date"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => handleChange(1, e)} // Update the second qualification
                    value={formData.qualification[1]?.start_date || ""}
                  />
                </div>
                <div className="">
                  <label className="text-sm font-semibold text-[#555]">
                    To (Year)<span className="text-secondary">*</span>
                  </label>
                  <Input
                    type="date"
                    name="end_date"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => handleChange(1, e)} // Update the second qualification
                    value={formData.qualification[1]?.end_date || ""}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* </div> */}
      </form>
    </div>
  );
}
