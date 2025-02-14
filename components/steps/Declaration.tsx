import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Image from "next/image";

export default function Declaration() {
  const [declaration, setDeclaration] = useState({
    declaration: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeclaration({ ...declaration, [name]: value });
  };
  return (
    <div className="py-12 flex flex-col gap-11 max-w-xl">
      <h2 className="text-2xl font-semibold">Application Declaration</h2>

      <p className="text-sm leading-6">
        I declare that the information provided by me in connection with the
        application is true and correct. I undertake to inform Ritman University
        immediately of any changes in address, phone numbers and any other
        information by me in this application. I understand that Ritman
        University reserves the right to vary or reverse any decision regarding
        admission or enrollment made on the basis of incorrect or incomplete
        information.
      </p>
      <form action="" className="flex flex-col gap-12">
        <div className="flex gap-12">
          <label className="text-[#555] text-sm font-semibold">
            {" "}
            Declaration <span className="text-secondary">*</span>{" "}
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              value={declaration.declaration}
              onChange={handleChange}
              name="declaration"
              id="declaration"
            />
            <label
              className="text-sm font-medium text-[#555]"
              htmlFor="declaration"
            >
              I Agree
            </label>
          </div>
        </div>
        <div className="flex gap-4 pt-6 text-[#666666] flex-col sm:flex-row sm:self-center">
          <Button
            label="Submit Form"
            className="border-[#ccc] py-2 px-4 text-sm text-center border rounded-md"
          />
          <Button
            label="Clear Form"
            className="border-[#ccc] py-2 px-4 text-sm text-center border rounded-md"
          />
          <div className="flex items-center justify-center border rounded-md py-2 px-4 ">
            <Image src="/print-light.svg" alt="Logo" width={30} height={30} />
            <Button
              label="Print Form"
              className="border-[#ccc] text-sm text-center"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
