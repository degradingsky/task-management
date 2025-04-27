'use client';

import { useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from "next/navigation";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
}

export default function HomePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  useEffect(() => {
    const dummyTasks: Task[] = [
      { _id: '1', title: 'Task 1', description: 'This is the first task', status: 'Pending' },
      { _id: '2', title: 'Task 2', description: 'This is the second task', status: 'Completed' },
      { _id: '3', title: 'Task 3', description: 'This is the third task', status: 'Pending' },
    ];

    setTasks(dummyTasks);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
  
      setIsRedirecting(true);
      router.push('/auth/login'); 
    }
    console.log(user)
  }, [user, isLoading, router]);

  if (isLoading || isRedirecting) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const handleLogout = () => {
    router.push("/auth/logout");
  };

  const handleTaskClick = (id: string) => {
    router.push(`/task/${id}`);
  };

  

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex-1 text-center font-semibold text-xl">
          {user ? `Welcome, ${user.name}` : "Welcome"}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </nav>


      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

        <div className="grid gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} onClick={() => handleTaskClick(task._id)} className="p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="mt-2 text-sm">
                  Status:{" "}
                  <span className={task.status === "Completed" ? "text-green-600" : "text-yellow-600"}>
                    {task.status}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <div>No tasks found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
