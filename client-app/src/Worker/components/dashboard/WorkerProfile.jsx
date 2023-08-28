import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';



const WorkerProfile = () => {
  const [worker, setWorker] = useState({});
  const [editing, setEditing] = useState(false);
  const currentUser = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [updatedWorker, setUpdatedWorker] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    gender: '',
    status: '',
    localityId: '',
  });

  const fetchWorker = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/worker/getWorker/${currentUser.value.id}`);
      setWorker(response.data);
    } catch (error) {
      console.error('Error fetching worker:', error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setUpdatedWorker(worker);
  };

  const handleDelete = () => {
    navigate("/delete-worker")
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedWorker({ ...updatedWorker, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/worker/${updatedWorker.id}`, updatedWorker);
      setWorker(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating worker:', error);
    }
  };

  useEffect(() => {
    fetchWorker();
  }, []);

  return (
    <div className="p-4 mx-auto my-auto max-w-md bg-gray-100 rounded-lg shadow-lg">
      {editing ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Edit Worker Information</h2>
          <div className="space-y-4">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={updatedWorker.firstName}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            /><input
            type="text"
            name="lastName"
            value={updatedWorker.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            value={updatedWorker.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contact"
            value={updatedWorker.contact}
            onChange={handleInputChange}
          />
          <select
            name="gender"
            value={updatedWorker.gender}
            onChange={handleInputChange}
          >
            <option value="MALE" >Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>        
          {/* <button className='bg-white' onClick={handleSave}>Save</button> */}
        </div>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2  text-white "
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Worker Profile</h2>
          <p>ID: {worker.id}</p>
          <p>First Name: {worker.firstName}</p>
          <p>Last Name: {worker.lastName}</p>
          <p>Email: {worker.email}</p>
          <p>Contact: {worker.contact}</p>
          <p>Gender: {worker.gender}</p>
          <p>Status: {worker.status}</p>
          <div className="mt-4 flex justify-between items-center">
          <button
              className="px-4 py-2 text-white "
              onClick={handleDelete}
            >
              Delete
            </button>

            <button
              className="px-4 py-2 text-white "
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerProfile;
