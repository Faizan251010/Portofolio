const express = require('express');
const router = express.Router();
const testimoniController = require('../controller/testimoniController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// 1. GET (Publik / User): Semua pengunjung dapat membaca testimoni
router.get('/', testimoniController.getAllTestimoni);
router.get('/:id', testimoniController.getTestimoniById);

// 2. POST (User & Admin): User yang login boleh menambahkan testimoni/ulasan baru
router.post('/', verifyToken, authorizeRoles('admin', 'user'), testimoniController.createTestimoni);

// 3. Pagar Khusus ADMIN: Mengubah atau menghapus testimoni hanya boleh oleh Admin
router.put('/:id', verifyToken, authorizeRoles('admin'), testimoniController.updateTestimoni);
router.delete('/:id', verifyToken, authorizeRoles('admin'), testimoniController.deleteTestimoni);

module.exports = router;