"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/interfaces";
import {
  setSocketAccessKey,
  generateSocketAccessKey,
} from "../slice/menuSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Team: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { socketAccessKey } = useSelector((state: RootState) => state.menu);
  const [accessKey, setAccessKey] = React.useState<string>(socketAccessKey);

  const dispatch = useDispatch();
  const handleCreateTeam = () => {
    dispatch(generateSocketAccessKey());
  };
  const handleJoinTeam = (e: any) => {
    if (socketAccessKey.length > 0) {
      dispatch(setSocketAccessKey(accessKey));
    }
  };

  return (
    // <div className="modal ">
    //     <div className="modal-content">
    //         <button onClick={handleCreateTeam}>Create a Team</button>
    //         <button onClick={()=>handleJoinTeam}>Join a Team</button>
    //         <input type="text" value={socketAccessKey} onChange={(e)=>{ setAccessKey(e.target.value)}}/>
    //     </div>
    //     <button className="modal-close" onClick={onClose}>
    //         Close
    //     </button>
    // </div>
    <div
      className="fixed z-50 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Team Options
                </h3>
                <div className="mt-2">
                  <button className="btn-blue" onClick={handleCreateTeam}>
                    Create a Team
                  </button>
                  <button className="ml-4 btn-green" onClick={handleJoinTeam}>
                    Join a Team
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="btn-close" onClick={onClose}>
              Close
            </button>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <label
                htmlFor="socketAccessKey"
                className="block text-sm font-medium text-gray-700"
              >
                Access Key
              </label>
              <input
                type="text"
                id="socketAccessKey"
                value={socketAccessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
