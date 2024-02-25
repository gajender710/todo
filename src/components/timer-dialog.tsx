import { useAppContext } from "@/context/app-context";
import React, { useEffect, useRef, useState } from "react";

const TimerDialog = ({
  openDialog,
  handleDialogClose,
  handleCompletion,
}: Props) => {
  const { breakCount, setBreakCount } = useAppContext();
  const [timer, setTimer] = useState(10);
  const intervalRef = useRef<any>(null);
  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(intervalRef.current);
          alert(`Take a ${breakCount <= 1 ? 5 : 10} second break`);
          setBreakCount(2 % breakCount);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!openDialog) {
      return;
    }
    setTimer(10);
    handleStart();
    return () => clearInterval(intervalRef.current);
  }, [openDialog]);

  const handlePause = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleReset = () => {
    setTimer(10);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <>
      {openDialog && (
        <div className="fixed flex w-full h-full bg-black bg-opacity-30">
          <dialog
            className="fixed flex flex-col items-center  bg-white p-4 rounded-lg w-[90%] sm:w-1/2 space-y-10 shadow-xl top-0 bottom-0 animated-dialog"
            open={openDialog}
            onClose={handleDialogClose}
          >
            <div className="flex justify-between items-center  w-full">
              <p className="font-medium ">Productivity Timer</p>
              <button
                onClick={handleDialogClose}
                className="px-2 py-1 rounded-lg bg-black bg-transparent text-white font-medium text-sm"
              >
                Close
              </button>
            </div>

            <div className="flex items-center justify-center h-48 w-48 rounded-full border-black border-2">
              <p className=" px-2 rounded-lg text-black font-medium text-[4.5rem]">
                {timer}
              </p>
            </div>
            <div className="flex  space-x-2">
              <button
                onClick={handleStart}
                className="bg-green-600 py-1 px-4 text-white rounded-lg font-medium"
              >
                Start
              </button>
              <button
                onClick={handlePause}
                className="bg-orange-600 py-1 px-4 text-white rounded-lg  font-medium"
              >
                Pause
              </button>
              <button
                onClick={handleReset}
                className="bg-yellow-600 py-1 px-4 text-white rounded-lg  font-medium"
              >
                Reset
              </button>
              <button
                onClick={handleCompletion}
                className="bg-blue-500 py-1 px-4 text-white rounded-lg  font-medium"
              >
                Mark Done
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

interface Props {
  openDialog: boolean;
  handleDialogClose: () => void;
  handleCompletion: () => void;
}

export default TimerDialog;
