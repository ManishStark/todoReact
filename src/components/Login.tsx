import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAlert from "../storeAlert";
import { useNavigate } from "react-router-dom";
import apiClient from "../service/apiClient";

const schema = z.object({
  email: z.string().email({ message: "Enter valid Email address" }),
  password: z
    .string({ required_error: "Enter Password" })
    .min(8, { message: "Password must be 8 character long" }),
});

type FormData = z.infer<typeof schema>;

interface LoginResponse {
  status: number;
  message: string;
  token: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmitData = (data: FormData) => {
    apiClient
      .post<LoginResponse>("user/login", data)
      .then(() => {
        showAlert("Login Succesful. Redirecting to Homepage", 1);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
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
        <form className="form" onSubmit={handleSubmit(onSubmitData)}>
          <div className="mb-4">
            <label htmlFor="login_email" className="">
              Email:
            </label>
            <input {...register("email")} id="login_email" type="email" />
            {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="login_password" className="">
              Password:
            </label>
            <input
              {...register("password")}
              id="login_password"
              type="password"
            />
            {errors.password && (
              <p className="text-danger mt-1">{errors.password.message}</p>
            )}
          </div>
          <button className="button button_primary mt-1">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
