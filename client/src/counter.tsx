import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByAmount } from "./slices/task.slice";

export function Counter() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="border-amber-300 bg-amber-100 w-10 h-10 p-20 rounded-sm flex items-center justify-center">
      <button
        onClick={() => dispatch(increment())}
        className="m-1 p-6 bg-amber-500 text-amber-100  rounded-sm"
      >
        {count}
      </button>

      <button
        onClick={() => dispatch(incrementByAmount(5))}
        className="m-1 p-6 bg-amber-500 text-amber-100  rounded-sm"
      >
        +5
      </button>
    </div>
  );
}
