import * as yup from "yup";

const registerSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  middle_name: yup.string(),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.date().required("Date of birth is required"),
  choosen_program: yup.string().required("Program is required"),
});

export { registerSchema };
