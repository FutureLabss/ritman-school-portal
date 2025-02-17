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

interface UserDataTypes {
  fullname: string;
  roles: { id: number; name: string }[];
  token: string;
}

export type {
  RegisterFormDataType,
  CreatePasswordFormDataType,
  ResendEmailDataType,
  LoginFormDataType,
  verificationCodeDataType,
  UserDataTypes,
};
