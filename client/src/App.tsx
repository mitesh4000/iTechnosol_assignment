import {
  Check,
  ChevronDown,
  ChevronUp,
  PencilLine,
  Plus,
  Trash,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";

export default function App() {
  interface TaskOps {
    viewIndex: number; // Renamed from indexOfTaskToViewDescription
    deleteIndex: number; // Renamed from indexOfTaskToDelete
  }

  const [taskOps, setTaskOps] = useState<TaskOps | null>({
    viewIndex: -1,
    deleteIndex: -1,
  });

  const fatchAndBindData = async () => {
    try {
      const response = await fetch("http://localhost:3200/task");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fatchAndBindData();
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
              <h2 className="text-xl font-semibold text-[#424242] mb-4">
                Your Tasks
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center flex-col p-2 hover:bg-[#F5F5F5] rounded transition-colors">
                  {taskOps?.deleteIndex !== 1 ? (
                    <div className="flex items-center flex-col justify-between w-full">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[#424242]">
                          Complete project proposal
                        </span>
                        <div className="flex items-center">
                          <button className="text-green-400 hover:text-green-600 transition-colors m-1">
                            <PencilLine size={20} />
                          </button>

                          <button
                            onClick={() => {
                              setTaskOps((prev) => ({
                                ...prev,
                                viewIndex: -1,
                                deleteIndex: 1,
                              }));
                            }}
                            className="text-red-400 hover:text-red-600 transition-colors m-1"
                          >
                            <Trash size={20} />
                          </button>
                          {taskOps?.viewIndex === 1 ? (
                            <button
                              onClick={() =>
                                setTaskOps((prev) => ({
                                  ...prev,
                                  viewIndex: -1,
                                  deleteIndex: -1,
                                }))
                              }
                              className="text-[#229799] hover:text-[#48CFCB] transition-colors m-1"
                            >
                              <ChevronDown size={20} />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                console.log("called");
                                setTaskOps((prev) => ({
                                  ...prev,
                                  viewIndex: 1,
                                  deleteIndex: -1,
                                }));
                              }}
                              className="text-[#229799] hover:text-[#48CFCB] transition-colors m-1"
                            >
                              <ChevronUp size={20} />
                            </button>
                          )}
                        </div>
                      </div>
                      {taskOps?.viewIndex === 1 && (
                        <div className="border-t border-[#E0E0E0] rounded-sm p-2 my-2 transition-all">
                          Ensuring stable uptime and handling traffic spikes in
                          a Node.js application requires understanding user
                          behavior and having robust monitoring in place.
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
              </ul>
              <button className="mt-4 bg-[#48CFCB] text-white py-2 px-4 rounded-full hover:bg-[#229799] transition-colors flex items-center justify-center w-full">
                <Plus size={20} className="mr-2" />
                Add New Task
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
