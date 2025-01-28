import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";
import CustomIconButton from "./customIconButton";
import CustomInput from "./customInput";
import CustomTextArea from "./customTextArea";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    deadline: string;
  }) => void;
}

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [deadline, setDeadline] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, deadline });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                Add New Task
              </h2>

              <CustomIconButton onClick={onClose}>
                <X className="h-6 w-6 text-gray-500" />
              </CustomIconButton>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <CustomInput
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  label="Title"
                ></CustomInput>
              </div>
              <div className="space-y-2">
                <CustomTextArea
                  label="Description"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                ></CustomTextArea>
              </div>
              <div className="space-y-2">
                <CustomInput
                  label="Deadline"
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                ></CustomInput>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button onClick={onClose}>Cancel</button>
                <button type="submit">Add Task</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
