import axios from "axios";
import { useFormik } from "formik";
import { Save, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { FormInput } from "../interface/task.interface";
import CustomInput from "./customInput";
import CustomTextArea from "./customTextArea";

const AddTaskForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean | undefined;
  onClose: () => void;
}) => {
  const handleSubmit = async (values: FormInput) => {
    try {
      const token = localStorage.getItem("token")?.split(" ")[1];

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/task`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onClose();
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

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={isOpen ? "block" : "hidden"}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-white border border-gray-200 rounded"
      >
        <div className="space-y-2 flex flex-row justify-between ">
          <CustomInput
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            label="Title"
            className="w-full mr-3"
          ></CustomInput>

          <CustomInput
            label="Deadline"
            id="deadline"
            name="deadline"
            type="date"
            value={formik.values.deadline}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></CustomInput>
        </div>
        <div className="">
          <CustomTextArea
            label="Description"
            name="description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={2}
          ></CustomTextArea>
        </div>
        <div className="space-y-2"></div>
        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={onClose}
            type="button"
            className="flex items-cente hover:bg-red-100 text-red-500 font-bold py-2 px-2 rounded transition duration-200 ease-in-out "
            aria-label="Cancel"
          >
            <XCircle size={20} className="mr-1 " />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="flex items-cente hover:bg-green-100 text-green-400 font-bold py-2 px-4 rounded transition duration-200 ease-in-out "
            aria-label="Save"
          >
            <Save size={20} className="mr-1" />
            <span>Save</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddTaskForm;
