import axios from "axios";
import { useFormik } from "formik";
import {
  CheckCircle,
  ChevronDown,
  Pencil,
  Plus,
  Trash,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import CustomDropdown from "./components/customDropdown";
import CustomIconButton from "./components/customIconButton";
import CustomInput from "./components/customInput";
import CustomTextArea from "./components/customTextArea";
import Navbar from "./components/navbar";
import { FormInput, Task } from "./interface/task.interface";

export default function TaskListing() {
  interface TaskOps {
    viewIndex?: number; // Renamed from indexOfTaskToViewDescription
    deleteIndex?: number; // Renamed from indexOfTaskToDelete
    updateIndex?: number;
    addTaskFormOpen?: boolean;
  }

  const statusOptions = ["pending", "in progress", "completed"];
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: "",
      status: "pending",
      _id: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskOps, setTaskOps] = useState<TaskOps | null>({
    viewIndex: -1,
    deleteIndex: -1,
    updateIndex: -1,
    addTaskFormOpen: false,
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteRecord(id);
      setTaskOps((prev) => ({
        ...prev,
        viewIndex: -1,
        deleteIndex: -1,
      }));
      await fetchAndBindData();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleSubmit = async (values: FormInput) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTg2ZmI0ZjI5OGUwOTI1NmQwMmVhMyIsImlhdCI6MTczODA0MzM2NiwiZXhwIjoxNzM4MTI5NzY2fQ.12ePRR1osTQTsa4x4nIPq_leXryBw6pTI8_JSahAYCQ"; // Keep token secure, consider using environment variables

      const response = await axios.put(
        "http://localhost:3200/task/" + values._id,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Use response.data instead of response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific axios error
        console.error("Axios Error:", error.response?.data || error.message);
      } else {
        // Handle generic error
        console.error("Unexpected Error:", error);
      }
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

  const deleteRecord = async (id: string) => {
    try {
      console.log("object");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTg2ZmI0ZjI5OGUwOTI1NmQwMmVhMyIsImlhdCI6MTczODA0MzM2NiwiZXhwIjoxNzM4MTI5NzY2fQ.12ePRR1osTQTsa4x4nIPq_leXryBw6pTI8_JSahAYCQ";

      const response = await axios.delete("http://localhost:3200/task/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
                    taskOps?.addTaskFormOpen
                      ? setTaskOps({ ...taskOps, addTaskFormOpen: false })
                      : setTaskOps({ ...taskOps, addTaskFormOpen: true })
                  }
                >
                  <motion.div
                    animate={{
                      rotate: taskOps?.addTaskFormOpen ? 45 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus className="text-[#424242]" />
                  </motion.div>
                </CustomIconButton>
              </div>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <AddTaskForm
                  isOpen={taskOps?.addTaskFormOpen}
                  onClose={() =>
                    setTaskOps({ ...taskOps, addTaskFormOpen: false })
                  }
                ></AddTaskForm>
              </motion.div>
              <ul className="space-y-2">
                {tasks.map((task, index) => (
                  <li
                    className="flex items-center flex-col p-2 hover:bg-lime-50 rounded transition-colors"
                    key={index}
                  >
                    {taskOps?.deleteIndex !== index ? (
                      <form
                        onSubmit={formik.handleSubmit}
                        className="flex items-center flex-col justify-between w-full"
                      >
                        <div className="flex items-center justify-between w-full">
                          {taskOps?.updateIndex === index ? (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="flex-grow"
                            >
                              <CustomInput
                                id="title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                className="w-full mr-3"
                              ></CustomInput>
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
                            {
                              taskOps?.viewIndex === index ? (
                                taskOps?.updateIndex !== index ? (
                                  <motion.div>
                                    <CustomIconButton
                                      onClick={() => {
                                        setTaskOps((prev) => ({
                                          ...prev,
                                          updateIndex: index,
                                          viewIndex: index,
                                        }));
                                        formik.setValues({
                                          title: task.title,
                                          description: task.description,
                                          deadline: task.deadline,
                                          status: task.status,
                                          _id: task._id,
                                        });
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
                                      <CheckCircle className="w-5 h-5 text-blue-400" />
                                    </CustomIconButton>
                                    <CustomIconButton
                                      onClick={() => {
                                        setTaskOps((prev) => ({
                                          ...prev,
                                          updateIndex: -1,
                                          viewIndex: -1,
                                        }));
                                      }}
                                    >
                                      <XCircle
                                        className="w-5 h-5 text-red-400"
                                        size={20}
                                      />
                                    </CustomIconButton>
                                  </motion.div>
                                )
                              ) : null // Return null if viewIndex does not match
                            }

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
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                              delay: 0.1,
                            }}
                            className="w-full border-t flex justify-between border-gray-200 rounded-md  py-2 my-2 "
                          >
                            {taskOps?.updateIndex === index ? (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex-grow"
                              >
                                <div className="flex flex-row">
                                  <CustomTextArea
                                    name="description"
                                    id="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full mr-2"
                                    rows={3}
                                  ></CustomTextArea>
                                  <div className="flex flex-col">
                                    <CustomInput
                                      id="deadline"
                                      name="deadline"
                                      type="date"
                                      value={formik.values.deadline}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    ></CustomInput>
                                    <div className="flex space-x-4">
                                      <CustomDropdown
                                        id="status"
                                        name="status"
                                        options={statusOptions}
                                        value={task.status}
                                        onChange={formik.handleChange}
                                      ></CustomDropdown>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex-grow text-gray-800 font-medium flex justify-between"
                              >
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {task.description}
                                </p>
                                <p className="text-gray-700 text-sm leading-relaxed bg-gray-200 rounded-md p-1">
                                  {task.deadline.split("T")[0]}
                                </p>
                              </motion.span>
                            )}
                          </motion.div>
                        )}
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center justify-between w-full border-2 border-red-300 bg-red-50 rounded-sm p-2"
                      >
                        <span className="text-[#424242]">
                          are you sure you want to delete this task ?
                        </span>
                        <div className="flex items-center">
                          <CustomIconButton
                            onClick={() => {
                              handleDelete(task._id);
                            }}
                          >
                            <CheckCircle
                              size={20}
                              className="text-green-400 hover:text-green-600 transition-colors m-1"
                            />
                          </CustomIconButton>

                          <CustomIconButton
                            onClick={() => {
                              setTaskOps((prev) => ({
                                ...prev,
                                viewIndex: -1,
                                deleteIndex: -1,
                              }));
                            }}
                          >
                            <XCircle
                              size={20}
                              className="text-red-400 hover:text-red-600 transition-colors m-1"
                            />
                          </CustomIconButton>
                        </div>
                      </motion.div>
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
