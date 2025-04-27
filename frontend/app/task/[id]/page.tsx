'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from '@auth0/nextjs-auth0';
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
}

export default function UpdateTaskPage({ taskId }: { taskId: string }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"Pending" | "Completed">("Pending");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchTask = async () => {
      try {
        // const response = await axios.get(`/api/tasks/${taskId}`);
        const response = {
          data: {
            _id: '1',
            title: 'Task1',
            description: 'this is task1',
            status: "Pending" as 'Pending',
          }
        };
        setTask(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId, user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '' || description.trim() === '') {
      setErrorMessage("Title and Description are required!");
      return;
    }

    try {
      const updatedTask = {
        title,
        description,
        status,
      };
      await axios.put(`/api/tasks/${taskId}`, updatedTask);
      router.push("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      alert("Task deleted successfully");
      router.push('/');
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  if (isLoading || (!isLoading && !user) || !task) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex-1 text-center font-semibold text-xl">Update Task</div>
      </nav>

      <div className="p-6">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Task Title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Task Description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "Pending" | "Completed")}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Update Task
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
