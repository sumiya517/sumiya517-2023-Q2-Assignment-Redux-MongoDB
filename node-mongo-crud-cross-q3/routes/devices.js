const express = require('express');
const router = express.Router();
const { createDevice, getDevices, getDeviceById, updateDevice, deleteDevice } = require('../controllers/devices');
const fileUpload = require('../middleware/file-upload');

router.post('/', fileUpload.single('imageUrl'), createDevice);
router.get('/', getDevices);
router.get('/:deviceId', getDeviceById);
router.put('/:deviceId', fileUpload.single('imageUrl') ,updateDevice);
router.delete('/:deviceId', deleteDevice);

module.exports = router;