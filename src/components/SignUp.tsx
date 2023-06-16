import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be 3 character long" }).max(55),
  email: z.string().email({ message: "Enter valid email address" }),
  password: z.string().min(8, { message: "Password must be 8 character long" }),
  rePassword: z
    .string()
    .min(8, { message: "Re-Password must be 8 character long" }),
});
type FormData = z.infer<typeof schema>;
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmiteData = (data: FormData) => {
    console.log(data);
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
          <button className="button button_secondary mt-1">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
