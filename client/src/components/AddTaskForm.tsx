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
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTg2ZmI0ZjI5OGUwOTI1NmQwMmVhMyIsImlhdCI6MTczODA0MzM2NiwiZXhwIjoxNzM4MTI5NzY2fQ.12ePRR1osTQTsa4x4nIPq_leXryBw6pTI8_JSahAYCQ"; // Keep token secure, consider using environment variables

      const response = await axios.post("http://localhost:3200/task", values, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
        className="p-6 bg-lime-50 rounded-b-md"
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
            rows={3}
          ></CustomTextArea>
        </div>
        <div className="space-y-2"></div>
        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={onClose}
            type="button"
            className="flex items-cente hover:bg-red-100 text-red-500 font-bold py-2 px-4 rounded transition duration-200 ease-in-out "
            aria-label="Cancel"
          >
            <XCircle size={20} className="mr-1 " />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="flex items-cente hover:bg-green-100 text-green-500 font-bold py-2 px-4 rounded transition duration-200 ease-in-out "
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
