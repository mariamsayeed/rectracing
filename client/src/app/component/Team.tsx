'use client';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../utils/interfaces';
import {setSocketAccessKey,generateSocketAccessKey} from "../slice/menuSlice";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}



const Team: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { socketAccessKey } = useSelector((state: RootState) => state.menu);
    const [accessKey, setAccessKey] = React.useState<string>(socketAccessKey);

    const dispatch = useDispatch();
    const handleCreateTeam = ()=>{
        dispatch(generateSocketAccessKey());
    }
    const handleJoinTeam = (e : any )=>{
        if(socketAccessKey.length > 0){
            dispatch(setSocketAccessKey(accessKey));
        }   
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={handleCreateTeam}>Create a Team</button>
                <button onClick={()=>handleJoinTeam}>Join a Team</button>
                <input type="text" value={socketAccessKey} onChange={(e)=>{ setAccessKey(e.target.value)}}/>
            </div>
            <button className="modal-close" onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default Team;
