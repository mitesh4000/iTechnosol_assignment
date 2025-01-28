import axios from "axios";
import { Check, ChevronDown, Pencil, Plus, Trash, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import CustomIconButton from "./components/customIconButton";
import Navbar from "./components/navbar";

export default function App() {
  interface TaskOps {
    viewIndex?: number; // Renamed from indexOfTaskToViewDescription
    deleteIndex?: number; // Renamed from indexOfTaskToDelete
    updateIndex?: number;
    addTaskFormOpen?: boolean;
  }

  interface Task {
    _id: string;
    title: string;
    description: string;
    deadline: string;
  }
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskOps, setTaskOps] = useState<TaskOps | null>({
    viewIndex: -1,
    deleteIndex: -1,
    updateIndex: -1,
    addTaskFormOpen: false,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    isEditing: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.isEditing) {
        const response = await fetch(
          "http://localhost:3200/task/" + taskOps?.updateIndex,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        const data = await response.json();
        console.log(data);
      } else {
        const response = await fetch("http://localhost:3200/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const fetchAndBindData = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTg2ZmI0ZjI5OGUwOTI1NmQwMmVhMyIsImlhdCI6MTczODA0MzM2NiwiZXhwIjoxNzM4MTI5NzY2fQ.12ePRR1osTQTsa4x4nIPq_leXryBw6pTI8_JSahAYCQ"; // Replace with your actual token
      const response = await axios.get("http://localhost:3200/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      console.log(response.data); // Axios automatically parses JSON
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAndBindData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col justify-center md:flex-row gap-6">
          {/* Task List */}
          <section className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#424242] ">
                  Your Tasks
                </h2>
                <CustomIconButton
                  onClick={() =>
                    setTaskOps({ ...taskOps, addTaskFormOpen: true })
                  }
                >
                  <Plus className="text-[#424242]" />
                </CustomIconButton>
              </div>
              <AddTaskForm
                isOpen={taskOps?.addTaskFormOpen}
                onClose={() =>
                  setTaskOps({ ...taskOps, addTaskFormOpen: false })
                }
              ></AddTaskForm>
              <ul className="space-y-2">
                {tasks.map((task, index) => (
                  <li
                    className="flex items-center flex-col p-2 hover:bg-[#F5F5F5] rounded transition-colors"
                    key={index}
                  >
                    {taskOps?.deleteIndex !== index ? (
                      <div className="flex items-center flex-col justify-between w-full">
                        <div className="flex items-center justify-between w-full">
                          {taskOps?.updateIndex === index ? (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="flex-grow"
                            >
                              <input
                                className="w-full text-gray-800 bg-white border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 transition-colors duration-200 py-1"
                                value={form.title}
                                onChange={(e) =>
                                  setForm({ ...form, title: e.target.value })
                                }
                                onBlur={handleSubmit}
                                onKeyPress={(e) =>
                                  e.key === "Enter" && handleSubmit(e)
                                }
                              />
                            </motion.div>
                          ) : (
                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex-grow text-gray-800 font-medium"
                            >
                              {task.title}
                            </motion.span>
                          )}

                          <div className="flex items-center">
                            {taskOps?.updateIndex !== index ? (
                              <motion.div>
                                <CustomIconButton
                                  onClick={() => {
                                    setTaskOps((prev) => ({
                                      ...prev,
                                      updateIndex: index,
                                    }));
                                  }}
                                >
                                  <Pencil className="w-5 h-5 text-blue-400" />
                                </CustomIconButton>
                                <CustomIconButton
                                  onClick={() => {
                                    setTaskOps((prev) => ({
                                      ...prev,
                                      viewIndex: -1,
                                      deleteIndex: index,
                                    }));
                                  }}
                                >
                                  <Trash
                                    size={20}
                                    className="w-5 h-5 text-red-400"
                                  />
                                </CustomIconButton>
                              </motion.div>
                            ) : (
                              <motion.div>
                                <CustomIconButton
                                  onClick={() => {
                                    setTaskOps((prev) => ({
                                      ...prev,
                                      updateIndex: -1,
                                    }));
                                  }}
                                >
                                  <Check className="w-5 h-5 text-blue-400" />
                                </CustomIconButton>
                                <CustomIconButton
                                  onClick={() => {
                                    setTaskOps((prev) => ({
                                      ...prev,
                                      updateIndex: -1,
                                    }));
                                  }}
                                >
                                  <X
                                    size={20}
                                    className="w-5 h-5 text-red-400"
                                  />
                                </CustomIconButton>
                              </motion.div>
                            )}

                            <motion.div
                              animate={{
                                rotate: taskOps?.viewIndex === index ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {taskOps?.viewIndex === index ? (
                                <CustomIconButton
                                  onClick={() =>
                                    setTaskOps((prev) => ({
                                      ...prev,
                                      viewIndex: -1,
                                      deleteIndex: -1,
                                    }))
                                  }
                                >
                                  <ChevronDown
                                    className="w-5 h-5 text-blue-400"
                                    size={20}
                                  />
                                </CustomIconButton>
                              ) : (
                                <CustomIconButton
                                  onClick={() => {
                                    setTaskOps((prev) => ({
                                      ...prev,
                                      viewIndex: index,
                                      deleteIndex: -1,
                                    }));
                                  }}
                                >
                                  <ChevronDown
                                    className="w-5 h-5 text-blue-400"
                                    size={20}
                                  />
                                </CustomIconButton>
                              )}
                            </motion.div>
                          </div>
                        </div>
                        {taskOps?.viewIndex === index && (
                          <div className="border-t border-[#E0E0E0] rounded-sm p-2 my-2 transition-all">
                            {task.description && (
                              <span className="text-[#424242]">
                                {task.description}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full border-2 border-[#d89595] bg-red-200 rounded-sm p-2">
                        <span className="text-[#424242]">
                          are you sure you want to delete this task ?
                        </span>
                        <div className="flex items-center">
                          <button className="text-green-400 hover:text-green-600 transition-colors m-1">
                            <Check size={20} />
                          </button>

                          <button
                            onClick={() =>
                              setTaskOps((prev) => ({
                                ...prev,
                                viewIndex: -1,
                                deleteIndex: -1,
                              }))
                            }
                            className="text-red-400 hover:text-red-600 transition-colors m-1"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
