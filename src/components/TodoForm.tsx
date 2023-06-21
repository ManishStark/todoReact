import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import todoService from "../service/TodoService";
import useAlert from "../states/storeAlert";

const schema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should be minimum 5 characters long.." })
    .max(55, { message: "Title should be maximum 55 characters long.." }),
});

type FormData = z.infer<typeof schema>;
const TodoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const showAlert = useAlert((s) => s.showAlert);

  const onMutate = todoService.useAddTodo();
  const onSubmitData = (data: FormData) => {
    onMutate.mutate(data);
    reset();
  };
  if (onMutate.error) {
    // alert(onMutate.error.request.status);
    if (onMutate.error.request.status == 400) {
      console.log("same todo...");
      showAlert("Same todo already added", 0);
    }
  }
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <form className="form" onSubmit={handleSubmit(onSubmitData)}>
          <div className="mb-3 ">
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
      <hr />
    </div>
  );
};

export default TodoForm;
