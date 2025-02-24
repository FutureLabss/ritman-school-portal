"use client";
import { useState, useRef, useEffect } from "react";
import PersonalDetails from "./steps/PersonalDetails";
import Education from "./steps/Education";
import Identification from "./steps/Identification";
import Declaration from "./steps/Declaration";
import Button from "./Button";
import Image from "next/image";
import Modal from "./Modal"; // Import Modal
import { useMutation } from "react-query";
import { FormDataType } from "@/utils/types";
import { useFormContext } from "../context/FormContext";

const steps = [
  { label: "Personal Details", component: PersonalDetails },
  { label: "Education", component: Education },
  { label: "Identification", component: Identification },
  { label: "Declaration", component: Declaration },
];

export default function MultiStepForm() {
  const formContext = useFormContext();
  const studentAplication = formContext?.submitStudentApplication;

  const [currentStep, setCurrentStep] = useState(0);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { formData } = useFormContext();

  const validateStep = () => {
    const currentComponent = stepRefs.current[currentStep];
    if (currentComponent) {
      const inputs = currentComponent.querySelectorAll(
        "input[required], select[required]"
      );
      const errors: string[] = [];
      inputs.forEach((input) => {
        if ((input as HTMLInputElement).type === "radio") {
          const radioGroup = currentComponent.querySelectorAll(
            `input[name="${(input as HTMLInputElement).name}"]`
          );
          const isChecked = Array.from(radioGroup).some(
            (radio) => (radio as HTMLInputElement).checked
          );
          if (!isChecked) {
            errors.push(`${(input as HTMLInputElement).name} is required`);
          }
        } else if (!(input as HTMLInputElement).value) {
          errors.push(`${(input as HTMLInputElement).name} is required`);
        }
      });
      setFormErrors(errors);
      return errors.length === 0;
    }
    return true;
  };

  useEffect(() => {
    if (formErrors.length > 0) {
      const timer = setTimeout(() => {
        setFormErrors([]);
      }, 10000); // Clear errors after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [formErrors]);

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setIsModalOpen(true); // Open the confirmation modal
    }
  };

  const mutation = useMutation((data: FormDataType) => {
    if (studentAplication) {
      return studentAplication(data);
    }
    throw new Error("student application function is not available");
  });

  const confirmSubmission = () => {
    const applicantData = {
      title: formData.applicant.title,
      marital_status: formData.applicant.marital_status,
      phone_number: formData.applicant.phone_number,
      gender: formData.applicant.gender,
      permanent_resident: formData.applicant.permanent_resident,
    };
    const formattedData = { ...formData, applicant: applicantData };

    mutation.mutate(formattedData);
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="flex">
      {/* Sidebar Tabs */}
      <div className="flex flex-col lg:w-1/4 items-center">
        <Image
          src="/ritmanLogo.jpg"
          alt="Logo"
          width={124}
          height={80}
          className="py-6 hidden lg:block"
        />
        <div className="bg-white hidden lg:block flex items-center justify-center py-20">
          <ul>
            {steps.map((step, index) => (
              <li
                key={index}
                className={`p-4 cursor-pointer ${
                  currentStep === index
                    ? "text-blue-500 font-bold"
                    : "text-gray-400"
                } ${
                  formErrors.length > 0 && currentStep !== index
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => setCurrentStep(index)}
              >
                {step.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="lg:w-3/4 bg-white flex flex-col max-w-4xl py-8 px-6">
        <div className="flex justify-between gap-8">
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
            <div className="w-10 h-10 border border-orange-500 text-primary flex items-center justify-center rounded-full">
              {currentStep + 1}
            </div>
          </div>
        </div>

        <div
          className="flex-grow"
          ref={(el) => {
            stepRefs.current[currentStep] = el;
          }}
        >
          <CurrentComponent />
        </div>

        {formErrors.length > 0 && (
          <div className="text-red-500 text-sm mt-2">
            {formErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div
          className={`flex text-[1.375rem] ${
            currentStep > 0 ? "justify-between" : "justify-end"
          } mt-6`}
        >
          {currentStep > 0 && (
            <Button
              className="max-w-[9.375rem] py-2 text-sm px-8 border border-primary text-primary rounded-full"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              label="Previous"
            />
          )}

          <Button
            className="max-w-[9.375rem] py-2 text-sm text-center px-8 bg-primary text-white rounded-full"
            onClick={
              currentStep === steps.length - 1 ? handleSubmit : handleNext
            }
            label={currentStep === steps.length - 1 ? "Submit" : "Next"}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmSubmission}
      />
    </div>
  );
}
