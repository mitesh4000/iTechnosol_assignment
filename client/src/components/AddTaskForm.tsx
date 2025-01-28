import axios from "axios";
import { useFormik } from "formik";
import CustomInput from "./customInput";
import CustomTextArea from "./customTextArea";

const AddTaskForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean | undefined;
  onClose: () => void;
}) => {
  interface FormInput {
    title: string;
    description: string;
    deadline: string;
  }

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
    <div className={isOpen ? "block" : "hidden"}>
      <form onSubmit={formik.handleSubmit} className="p-6">
        <div className="space-y-2 flex flex-row justify-between">
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
          <button onClick={onClose} type="button">
            canecll
          </button>
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
