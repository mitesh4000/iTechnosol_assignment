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
import backgroundImage from "./assets/bg.jpg";
import AddTaskForm from "./components/AddTaskForm";
import CustomDropdown from "./components/customDropdown";
import CustomIconButton from "./components/customIconButton";
import CustomInput from "./components/customInput";
import CustomTextArea from "./components/customTextArea";
import Navbar from "./components/navbar";
import StatusBadge from "./components/status";
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
      status: "",
      _id: "",
    },
    onSubmit: (values) => {
      console.log(values);
      values.deadline = values.deadline.split("T")[0];
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
      const token = localStorage.getItem("token")?.split(" ")[1];

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/task/${values._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchAndBindData();

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  const fetchAndBindData = async () => {
    try {
      const token = localStorage.getItem("token")?.split(" ")[1];
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/task`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
      console.log(response.data); // Axios automatically parses JSON
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const token = localStorage.getItem("token")?.split(" ")[1];
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data); // Axios automatically parses JSON
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAndBindData();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F5F5F5]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col justify-center md:flex-row gap-6">
          {/* Task List */}
          <section className="md:w-3/4">
            <div className="bg-lime-50 rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#424242] ">
                  Your Tasks
                </h2>
                <CustomIconButton
                  onClick={() =>
                    taskOps?.addTaskFormOpen
                      ? setTaskOps({
                          ...taskOps,
                          addTaskFormOpen: false,
                          updateIndex: -1,
                          viewIndex: -1,
                          deleteIndex: -1,
                        })
                      : setTaskOps({
                          ...taskOps,
                          addTaskFormOpen: true,
                          updateIndex: -1,
                          viewIndex: -1,
                          deleteIndex: -1,
                        })
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
                  onClose={() => {
                    fetchAndBindData();
                    setTaskOps({ ...taskOps, addTaskFormOpen: false });
                  }}
                ></AddTaskForm>
              </motion.div>
              <ul className="space-y-2">
                {tasks.length > 0 ? (
                  tasks?.map((task, index) => (
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
                                className="flex-grow flex-col text-gray-800 font-medium"
                              >
                                <span className="mr-2">{index + 1}.</span>
                                <span className="flex-grow text-gray-800 font-medium truncate mr-2">
                                  {task.title}
                                </span>
                                <StatusBadge status={task.status}></StatusBadge>
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
                                          formik.handleSubmit();
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
                                  rotate:
                                    taskOps?.viewIndex === index ? 180 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <CustomIconButton
                                  onClick={() =>
                                    taskOps?.viewIndex === index
                                      ? setTaskOps((prev) => ({
                                          ...prev,
                                          viewIndex: -1,
                                          deleteIndex: -1,
                                          updateIndex: -1,
                                          addTaskFormOpen: false,
                                        }))
                                      : setTaskOps((prev) => ({
                                          ...prev,
                                          viewIndex: index,
                                          updateIndex: -1,
                                          deleteIndex: -1,
                                          addTaskFormOpen: false,
                                        }))
                                  }
                                >
                                  <ChevronDown
                                    className="w-5 h-5 text-blue-400"
                                    size={20}
                                  />
                                </CustomIconButton>
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
                              className="w-full border-t border-gray-300 flex justify-between   py-2 my-2 "
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
                                        value={
                                          formik.values.deadline.split("T")[0]
                                        }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      ></CustomInput>
                                      <div className="flex space-x-4">
                                        <CustomDropdown
                                          id="status"
                                          name="status"
                                          options={statusOptions}
                                          value={formik.values.status}
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
                                    <strong>description :-</strong>{" "}
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
                  ))
                ) : (
                  <div className="text-center text-gray-500 text-lg">
                    No Tasks here add new tasks
                  </div>
                )}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
