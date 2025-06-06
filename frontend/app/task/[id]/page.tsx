'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import api from "../../../lib/axios";
import { useAuth } from "../../../context/authContext";
import axios from "../../../lib/axios";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
}

export default function UpdateTaskPage() {
  const { user } = useAuth()!;
  const params = useParams<{id: string}>()
  const taskId = params.id;
  const router = useRouter();
  const [task, setTask] = useState<Task | null>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"Pending" | "Completed">("Pending");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!user) return;

    const fetchTask = async () => {
        try {
          const res = await api.get(`/tasks/${taskId}`);
          setTask(res.data)
          setTitle(res.data.title);
          setDescription(res.data.description);
          setStatus(res.data.status);
        } catch (error) {
          console.error('Error fetching forums:', error);
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
      await axios.put(`/tasks/${taskId}`, updatedTask);
      router.push("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      alert("Task deleted successfully");
      router.push('/');
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  if (!user || !task) {
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
