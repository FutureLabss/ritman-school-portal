interface RegisterFormDataType {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  dob: string;
  choosen_program: string;
}

interface CreatePasswordFormDataType {
  first_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface ResendEmailDataType {
  email: string;
}

interface verificationCodeDataType {
  code: string;
}

interface LoginFormDataType {
  email: string;
  password: string;
}

// UserDataTypes interface (unchanged)
interface UserDataTypes {
  fullname: string;
  roles: { id: number; name: string }[];
  token: string;
}

// Address type
interface Address {
  type: "applicant" | "guardian";
  street_address_line_1: string; // Added this field
  street_address_line_2: string;
  city: string;
  state: string;
  country: string;
}

// Qualification type
interface Qualification {
  school_name: string;
  qualification: string;
  start_date: string;
  end_date: string;
}

// Guardian type
interface Guardian {
  title: string;
  first_name: string; // Added this field
  middle_name: string; // Added this field
  last_name: string; // Added this field
  phone_number: string;
}

// JAMB type
interface Jamb {
  jamb_reg_no: string;
  faculty: string;
  course_of_choice: string;
  academic_session: string;
}

// Identification type
interface Identification {
  country: string;
  document_type: string;
  document_number: string;
  document_expiration_date: string;
  document_issue_date: string;
}

// Applicant type
interface Applicant {
  title: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  marital_status: string;
  phone_number: string;
  gender: string;
  permanent_resident: boolean;
  dob?: string; // Added this field
  street_address_line_1?: string; // Added this field
}

// Main Form Data type
export interface FormDataType {
  applicant: Applicant;
  address: Address[];
  qualification: Qualification[];
  guardian: Guardian;
  jamb: Jamb;
  identification: Identification;
}

export type {
  RegisterFormDataType,
  CreatePasswordFormDataType,
  ResendEmailDataType,
  LoginFormDataType,
  verificationCodeDataType,
  UserDataTypes,
};
