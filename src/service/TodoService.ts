import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import apiClient from "./apiClient";

interface Todo {
  id: string;
  title: string;
  email: string;
  completed: false;
  __v: 0;
}

interface TodoResponse {
  status: number;
  message: string;
  data: Todo[];
}
class TodoService {
  useAllTodo = () =>
    useQuery<Todo[], AxiosError>({
      queryKey: ["todos"],
      queryFn: () =>
        apiClient.get<TodoResponse>("todo/all").then((res) => res.data.data),
    });

  useAddTodo = () =>
    useMutation({
      mutationFn: (title: string) =>
        apiClient.post("todo/add", { title }).then((res) => res.data),
    });
}

export default new TodoService();
