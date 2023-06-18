import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "../service/apiClient";
import useAlert from "../states/storeAlert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be 3 character long" }).max(55),
  email: z.string().email({ message: "Enter valid email address" }),
  password: z.string().min(8, { message: "Password must be 8 character long" }),
  rePassword: z
    .string()
    .min(8, { message: "Re-Password must be 8 character long" }),
});
type FormData = z.infer<typeof schema>;
interface RegisterResponse {
  status: number;
  message: string;
  token: string;
}

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmiteData = (data: FormData) => {
    setLoading(true);
    if (data.password !== data.rePassword) {
      return showAlert("Password and Repassword does not match", 0);
    }
    const sendData = { ...data, rePassword: undefined };
    apiClient
      .post<RegisterResponse>("user/signup", sendData)
      .then(() => {
        setLoading(false);
        showAlert("SignUp Succesful. Redirecting to Homepage", 1);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        setLoading(false);
        showAlert(err.message, 0);
        console.log(err);
        err.response
          ? showAlert(err.response?.data.message, 0)
          : showAlert(err.message, 0);
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <form className="form" onSubmit={handleSubmit(onSubmiteData)}>
          <div className="mb-3">
            <label htmlFor="name">Name:</label>
            <input {...register("name")} id="name" type="text" />
            {errors.name && (
              <p className="text-danger mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="sign_email">Email:</label>
            <input {...register("email")} id="sign_email" type="email" />
            {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="sign_password">Password:</label>
            <input
              {...register("password")}
              id="sign_password"
              type="password"
              minLength={8}
            />
            {errors.password && (
              <p className="text-danger mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="sign_re_password">Re-Password:</label>
            <input
              {...register("rePassword")}
              id="sign_re_password"
              type="password"
              minLength={8}
            />
            {errors.rePassword && (
              <p className="text-danger mt-1">{errors.rePassword.message}</p>
            )}
          </div>
          <button className="button button_secondary mt-1">
            {loading ? "Signing In" : "SignIn"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
