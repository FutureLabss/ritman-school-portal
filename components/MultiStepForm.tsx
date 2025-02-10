"use client";
import { useState } from "react";
import PersonalDetails from "./steps/PersonalDetails";
import Education from "./steps/Education";
import Identification from "./steps/Identification";
import Declaration from "./steps/Declaration";
import Button from "./Button";

const steps = [
  "Personal details",
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
      <div className="w-1/4 bg-white flex items-center justify-center py-40">
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

      <div className="w-3/4 bg-white  flex flex-col">
        <div className="flex justify-end">
          <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full">
            {currentStep + 1}
          </div>
        </div>

        <div className="flex-grow">
          {currentStep === 0 && <PersonalDetails />}
          {currentStep === 1 && <Education />}
          {currentStep === 2 && <Identification />}
          {currentStep === 3 && <Declaration />}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            className="px-6 py-2 bg-gray-300"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            label="Previous"
          />

          <Button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            label="Next"
          />
        </div>
      </div>
    </div>
  );
}
