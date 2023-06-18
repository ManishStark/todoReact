import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "../service/apiClient";
import useAlert from "../states/storeAlert";
import { useNavigate } from "react-router-dom";
import todoService from "../service/todoService";

const schema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should be minimum 5 characters long.." })
    .max(55, { message: "Title should be maximum 55 characters long.." }),
});

type FormData = z.infer<typeof schema>;
const TodoForm = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onMuate = todoService.useAddTodo();
  const onSubmitData = (data: FormData) => {
    console.log("clicked");
    console.log(data.title);
    onMuate.mutate(data.title);
    // apiClient
    //   .post("todo/add", data)
    //   .then(() => {
    //     showAlert("Todo Added", 1);
    //     reset();
    //   })
    //   .catch((err) => {
    //     err.response
    //       ? showAlert(err.response?.data.message, 0)
    //       : showAlert(err.message, 0);
    //     if (err.response?.data.status == 401) navigate("/login");
    //   });
  };

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
