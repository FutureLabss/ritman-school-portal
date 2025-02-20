// context/FormContext.tsx
import { createContext, useContext, useState } from "react";
import { FormDataType } from "@/utils/types"; // Import the types
import api from "@/utils/api"; // Import the api
import axios from "axios";
import { getErrorMessage } from "@/utils/errorHandler";

// Define the context type
interface FormContextType {
  formData: FormDataType;
  loading: boolean;
  error: string | null;
  updateFormData: (data: Partial<FormDataType>) => void;
  submitStudentApplication: (applicationData: FormDataType) => Promise<void>;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Form Provider component
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize the state with default values
  const [formData, setFormData] = useState<FormDataType>({
    applicant: {
      title: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      marital_status: "",
      phone_number: "",
      gender: "",
      permanent_resident: false,
      dob: "",
      street_address_line_1: "",
    },
    address: [
      {
        type: "applicant",
        street_address_line_1: "",
        street_address_line_2: "",
        city: "",
        state: "",
        country: "",
      },
      {
        type: "guardian",
        street_address_line_1: "",
        street_address_line_2: "",
        city: "",
        state: "",
        country: "",
      },
    ],
    qualification: [
      {
        school_name: "",
        qualification: "",
        start_date: "",
        end_date: "",
      },
      {
        school_name: "",
        qualification: "",
        start_date: "",
        end_date: "",
      },
    ],
    guardian: {
      title: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      phone_number: "",
    },
    jamb: {
      jamb_reg_no: "",
      program_of_choice: "",
      course_of_choice: "",
      academic_session: "",
    },
    identification: {
      country: "",
      document_type: "",
      document_number: "",
      document_expiration_date: "",
      document_issue_date: "",
    },
  });

  // Initialize loading and error state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to update form data
  const updateFormData = (data: Partial<FormDataType>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const submitStudentApplication = async (applicationData: FormDataType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/student/applications", applicationData);
      return response.data;
    } catch (error) {
      if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your network and try again."
        );
      } else if (axios.isAxiosError(error)) {
        setError(
          error.response
            ? getErrorMessage(error.response)
            : "An unknown error occurred."
        );
      } else {
        setError("Application failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        loading,
        error,
        updateFormData,
        submitStudentApplication,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
