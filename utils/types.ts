interface RegisterFormDataType {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  dob: string;
  choosen_program: string;
}

interface CreatePasswordFormDataType {
  email: string;
  password: string;
  confirm_password: string;
}

interface ResendEmailDataType {
  email: string;
}

interface LoginFormDataType {
  email: string;
  password: string;
}

export type {
  RegisterFormDataType,
  CreatePasswordFormDataType,
  ResendEmailDataType,
  LoginFormDataType,
};
