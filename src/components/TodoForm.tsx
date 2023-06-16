import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  title: z.string().min(5).max(55),
});

type FormData = z.infer<typeof schema>;

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <form className="form">
          <div className="mb-4">
            <label htmlFor="login_password" className="">
              Title:
            </label>
            <input {...register("title")} id="title" type="text" />
            {errors.title && (
              <p className="text-danger mt-1">{errors.title.message}</p>
            )}
          </div>
          <button className="button button_accent">Add Todo</button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
