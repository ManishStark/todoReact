import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "./apiClient";

export interface Todo {
  _id: string;
  title: string;
  email: string;
  completed: false;
  date: string;
  __v: 0;
}

export interface TodoResponse {
  status: number;
  message: string;
  data: Todo[];
}

interface Data {
  title: string;
}

class TodoService {
  useAllTodo = () =>
    useQuery<Todo[], AxiosError>({
      queryKey: ["todos"],
      queryFn: () =>
        apiClient.get<TodoResponse>("todo/all").then((res) => res.data.data),
    });

  useAddTodo = () => {
    const query = useQueryClient();
    return useMutation<TodoResponse, AxiosError, Data>({
      mutationFn: (data: Data) =>
        apiClient.post<TodoResponse>("todo/add", data).then((res) => res.data),
      onSuccess: () => {
        query.invalidateQueries(["todos"]);
      },
    });
  };

  useDeleteTodo = () => {
    const query = useQueryClient();
    return useMutation<TodoResponse, AxiosError, String>({
      mutationFn: (data: String) =>
        apiClient
          .delete<TodoResponse>(`todo/delete/${data}`)
          .then((res) => res.data),
      onSuccess: () => {
        query.invalidateQueries(["todos"]);
      },
    });
  };

  useCompleteTodo = () => {
    const query = useQueryClient();
    return useMutation<TodoResponse, AxiosError, String>({
      mutationFn: (id: String) =>
        apiClient
          .put<TodoResponse>(`todo/completeTodo/${id}`)
          .then((res) => res.data),
      onSuccess: () => {
        query.invalidateQueries(["todos"]);
      },
    });
  };
}

export default new TodoService();
