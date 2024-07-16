import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required").email(),
  mobile: Yup.string()
    .required("Mobile is required")
    .min(10)
    .max(10)
    .matches(/^[0-9]+$/, "Must be Only Digit"),
  password: Yup.string()
    .min(8)
    // .matches(/[0-9]/, "Password must contain at least one character")
    .matches(passwordRegex, "Password must be Alpha Numeric")
    .required("Please provide a  Password"),
  confirmPassword: Yup.string()
    .min(3)
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

export const commentSchema=Yup.object().shape({
  content:Yup.string()
})