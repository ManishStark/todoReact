import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().email({ message: "Enter valid Email address" }),
  password: z
    .string({ required_error: "Enter Password" })
    .min(8, { message: "Password must be 8 character long" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmitData = (data: FormData) => {
    console.log(data);
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
