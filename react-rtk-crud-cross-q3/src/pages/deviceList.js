import React, { useEffect, useState } from "react";
import "../styles/devicelist.css";
import { useAddDeviceMutation,useDeleteDeviceMutation,useGetDevicesQuery,useUpdateDeviceMutation} from "../redux/api.js";

function DeviceList() {
  const { data } = useGetDevicesQuery();
  const [addDevice] = useAddDeviceMutation();
  const [deleteDevice] = useDeleteDeviceMutation();
  const [updateDevice] = useUpdateDeviceMutation();

  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    ram: "",
    color: "",
    price: "",
    imageUrl: null,
  });
  const [updateFormData, setUpdateFormData] = useState({
    _id: "",
    title: "",
    ram: "",
    color: "",
    price: "",
    imageUrl: null,
  });
  const [totalDevices, setTotalDevices] = useState(data?.results);

  const handleUpdate = (id) => {
    const deviceToUpdate = totalDevices.find((device) => device._id === id);
    setUpdateFormData(deviceToUpdate);
    setIsUpdateModalOpen(true);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: e.target.type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleAddDevice = async () => {
    console.log("api", formData);
    const form = new FormData();
    for (const key in formData) {
      console.log(key, formData[key]);
      form.append(key, formData[key]);
    }
    await addDevice(form);
    setIsAddDeviceModalOpen(false);
    setFormData({
      title: "",
      ram: "",
      color: "",
      price: "",
      imageUrl: null,
    });
  };

  const handleUpdateDevice = async () => {
    // Assuming you have an updateDevice mutation
    console.log(updateFormData);
    const form = new FormData();
    for (const key in updateFormData) {
      console.log(key, updateFormData[key]);
      form.append(key, updateFormData[key]);
    }
    await updateDevice({ device: form, id: updateFormData._id });
    setIsUpdateModalOpen(false);
  };

  const handleDeleteDevice = async (id) => {
    await deleteDevice(id);
  };

  useEffect(() => {
    if (data) {
      setTotalDevices(data.results);
    }
  }, [data]);

  return (
    <div className="device-list">
      <div className="device-header">
        <h1>Devices List</h1>
        <button
          className="button-add"
          onClick={() => setIsAddDeviceModalOpen(true)}
        >
          + Add Device
        </button>
      </div>

      {totalDevices && totalDevices.length > 0 ? (
        <table className="device-table">
          <thead>
            <tr>
              <th>Device</th>
              <th>RAM</th>
              <th>Color</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {totalDevices.map((device) => (
              <tr key={device._id}>
                <td>
                  <img src={device.imageUrl} />
                  <div>{device.title}</div>
                </td>
                <td>{device.ram}</td>
                <td>{device.color}</td>
                <td>{device.price}</td>
                <td>
                  <button
                    className="action-button up"
                    onClick={() => handleUpdate(device._id)}
                  >
                    Update
                  </button>
                  <button
                    className="action-button del"
                    onClick={() => handleDeleteDevice(device._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No devices available.</p>
      )}

      {(isAddDeviceModalOpen || isUpdateModalOpen) && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isUpdateModalOpen ? 'Update Device' : 'Add Device'}</h2>
            <form>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={
                    isUpdateModalOpen ? updateFormData.title : formData.title
                  }
                  onChange={
                    isUpdateModalOpen
                      ? handleUpdateInputChange
                      : handleAddInputChange
                  }
                />
              </label>
              <br />
              <label>
                RAM:
                <input
                  type="text"
                  name="ram"
                  value={isUpdateModalOpen ? updateFormData.ram : formData.ram}
                  onChange={
                    isUpdateModalOpen
                      ? handleUpdateInputChange
                      : handleAddInputChange
                  }
                />
              </label>
              <br />
              <label>
                Color:
                <input
                  type="text"
                  name="color"
                  value={
                    isUpdateModalOpen ? updateFormData.color : formData.color
                  }
                  onChange={
                    isUpdateModalOpen
                      ? handleUpdateInputChange
                      : handleAddInputChange
                  }
                />
              </label>
              <br />
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={
                    isUpdateModalOpen ? updateFormData.price : formData.price
                  }
                  onChange={
                    isUpdateModalOpen
                      ? handleUpdateInputChange
                      : handleAddInputChange
                  }
                />
              </label>
              <br />
              <label>
                Image:
                <input
                  type="file"
                  name="imageUrl"
                  accept=".jpg,.png,.jpeg"
                  onChange={
                    isUpdateModalOpen
                      ? handleUpdateInputChange
                      : handleAddInputChange
                  }
                />
              </label>
              <br />
              <button
                className="button-add"
                type="button"
                onClick={
                  isUpdateModalOpen ? handleUpdateDevice : handleAddDevice
                }
              >
                {isUpdateModalOpen ? "Update Device" : "Add Device"}
              </button>
              <button
                className="button-close"
                type="button"
                onClick={() => {
                  isUpdateModalOpen
                    ? setIsUpdateModalOpen(false)
                    : setIsAddDeviceModalOpen(false);
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeviceList;
