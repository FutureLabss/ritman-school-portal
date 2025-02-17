"use client";
import { useState } from "react";
import PersonalDetails from "./steps/PersonalDetails";
import Education from "./steps/Education";
import Identification from "./steps/Identification";
import Declaration from "./steps/Declaration";
import Button from "./Button";
import Image from "next/image";

const steps = [
  "Personal Details",
  "Education",
  "Identification",
  "Declaration",
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex">
      {/* Sidebar Tabs */}
      <div className="flex flex-col w-1/4 items-center">
        <Image
          src="/ritmanLogo.jpg"
          alt="Logo"
          width={124}
          height={80}
          className="py-6"
        />
        <div className=" bg-white flex items-center justify-center py-20">
          <ul className="">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`p-4 cursor-pointer ${
                  currentStep === index
                    ? "text-blue-500 font-bold"
                    : "text-gray-400"
                }`}
                onClick={() => setCurrentStep(index)}
              >
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-3/4 bg-white flex flex-col max-w-4xl py-8 px-6">
        <div className="flex justify-between gap-8 ">
          <div className="max-w-[36.4375rem] space-y-6">
            <h2 className="text-3xl font-medium text-primary">
              Students Admission Form
            </h2>
            <p className="text-[.9375rem] text-[#555] leading-6">
              Carefully complete the form below. Ensure you fill the mandatory
              fields with asterisk (*). Ensure you check through before clicking
              the Submit Button. Feel free to contact us where you have
              difficulty.
            </p>
          </div>
          <div>
            <div className=" w-10 h-10 border border-orange-500 text-primary flex items-center justify-center rounded-full">
              {currentStep + 1}
            </div>
          </div>
        </div>

        <div className="flex-grow ">
          {currentStep === 0 && <PersonalDetails />}
          {currentStep === 1 && <Education />}
          {currentStep === 2 && <Identification />}
          {currentStep === 3 && <Declaration />}
        </div>

        <div
          className={`flex text-[1.375rem] ${
            currentStep > 0 ? "justify-between" : "justify-end"
          } mt-6`}
        >
          {currentStep > 0 && (
            <Button
              className="max-w-[9.375rem] py-2 md:max-w-[16rem] w-full md:py-4 border border-primary text-primary rounded-full"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              label="Previous"
            />
          )}

          <Button
            className={`max-w-[9.375rem] py-2  text-center md:max-w-[16rem] w-full md:py-4 bg-primary text-white rounded-full `}
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            label="Next"
          />
        </div>
      </div>
    </div>
  );
}
