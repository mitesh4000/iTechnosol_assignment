// import { Check, ChevronDown, Pencil, Trash, X } from "lucide-react";
// import { motion } from "motion/react";
// import CustomIconButton from "./customIconButton";

// const TaskListItem = ({ task, index, taskOps }) => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     isEditing: false,
//   });
//   return (
//     <li
//       className="flex items-center flex-col p-2 hover:bg-[#F5F5F5] rounded transition-colors"
//       key={index}
//     >
//       {taskOps?.deleteIndex !== index ? (
//         <div className="flex items-center flex-col justify-between w-full">
//           <div className="flex items-center justify-between w-full">
//             {taskOps?.updateIndex === index ? (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 className="flex-grow"
//               >
//                 <input
//                   className="w-full text-gray-800 bg-white border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 transition-colors duration-200 py-1"
//                   value={form.title}
//                 />
//               </motion.div>
//             ) : (
//               <motion.span
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="flex-grow text-gray-800 font-medium"
//               >
//                 {task.title}
//               </motion.span>
//             )}

//             <div className="flex items-center">
//               {taskOps?.updateIndex !== index ? (
//                 <motion.div>
//                   <CustomIconButton
//                     onClick={() => {
//                       setTaskOps((prev) => ({
//                         ...prev,
//                         updateIndex: index,
//                       }));
//                     }}
//                   >
//                     <Pencil className="w-5 h-5 text-blue-400" />
//                   </CustomIconButton>
//                   <CustomIconButton
//                     onClick={() => {
//                       setTaskOps((prev) => ({
//                         ...prev,
//                         viewIndex: -1,
//                         deleteIndex: index,
//                       }));
//                     }}
//                   >
//                     <Trash size={20} className="w-5 h-5 text-red-400" />
//                   </CustomIconButton>
//                 </motion.div>
//               ) : (
//                 <motion.div>
//                   <CustomIconButton
//                     onClick={() => {
//                       setTaskOps((prev) => ({
//                         ...prev,
//                         updateIndex: -1,
//                       }));
//                     }}
//                   >
//                     <Check className="w-5 h-5 text-blue-400" />
//                   </CustomIconButton>
//                   <CustomIconButton
//                     onClick={() => {
//                       setTaskOps((prev) => ({
//                         ...prev,
//                         updateIndex: -1,
//                       }));
//                     }}
//                   >
//                     <X size={20} className="w-5 h-5 text-red-400" />
//                   </CustomIconButton>
//                 </motion.div>
//               )}

//               <motion.div
//                 animate={{
//                   rotate: taskOps?.viewIndex === index ? 180 : 0,
//                 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {taskOps?.viewIndex === index ? (
//                   <CustomIconButton
//                     onClick={() =>
//                       setTaskOps((prev) => ({
//                         ...prev,
//                         viewIndex: -1,
//                         deleteIndex: -1,
//                       }))
//                     }
//                   >
//                     <ChevronDown className="w-5 h-5 text-blue-400" size={20} />
//                   </CustomIconButton>
//                 ) : (
//                   <CustomIconButton
//                     onClick={() => {
//                       setTaskOps((prev) => ({
//                         ...prev,
//                         viewIndex: index,
//                         deleteIndex: -1,
//                       }));
//                     }}
//                   >
//                     <ChevronDown className="w-5 h-5 text-blue-400" size={20} />
//                   </CustomIconButton>
//                 )}
//               </motion.div>
//             </div>
//           </div>
//           {taskOps?.viewIndex === index && (
//             <div className="border-t border-[#E0E0E0] rounded-sm p-2 my-2 transition-all">
//               {task.description && (
//                 <span className="text-[#424242]">{task.description}</span>
//               )}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex items-center justify-between w-full border-2 border-[#d89595] bg-red-200 rounded-sm p-2">
//           <span className="text-[#424242]">
//             are you sure you want to delete this task ?
//           </span>
//           <div className="flex items-center">
//             <button className="text-green-400 hover:text-green-600 transition-colors m-1">
//               <Check size={20} />
//             </button>

//             <button
//               onClick={() =>
//                 setTaskOps((prev) => ({
//                   ...prev,
//                   viewIndex: -1,
//                   deleteIndex: -1,
//                 }))
//               }
//               className="text-red-400 hover:text-red-600 transition-colors m-1"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </li>
//   );
// };
