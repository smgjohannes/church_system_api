// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const db = require('../db');
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dir = './uploads/';
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Reusable function for handling database errors
// const handleDatabaseError = (err, res) => {
//   console.error(err);
//   res.status(500).json({ message: 'Internal Server Error' });
// };

// // Reusable function for deleting files
// const deleteFile = (filePath, callback) => {
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error('Error deleting file:', err);
//     }
//     callback();
//   });
// };

// // Reusable function for updating table data
// const updateTableData = (table, data, id, res, successMessage) => {
//   db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err) => {
//     if (err) {
//       handleDatabaseError(err, res);
//     }
//     res.json({ message: successMessage });
//   });
// };

// Reusable function for deleting from a table
const deleteFromTable = (table, id, res, successMessage) => {
  db.query(`SELECT * FROM ${table} WHERE id = ?`, id, (err, result) => {
    if (err) {
      handleDatabaseError(err, res);
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: `${table.slice(0, -1)} not found` });
    }
    const filename = result[0].img.split('/').pop();
    const filePath = `./uploads/${filename}`;
    deleteFile(filePath, () => {
      db.query(`DELETE FROM ${table} WHERE id = ?`, id, (err) => {
        if (err) {
          handleDatabaseError(err, res);
        }
        res.json({ message: successMessage });
      });
    });
  });
};

// // Generic route for handling CRUD operations
// router
//   .route('/:table')
//   // Get all items from a table
//   .get((req, res) => {
//     const table = req.params.table;
//     db.query(
//       `SELECT *, DATE(created_at) AS date, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS fullDate FROM ${table}`,
//       (err, results) => {
//         if (err) {
//           handleDatabaseError(err, res);
//         }
//         res.json(results);
//       }
//     );
//   })
//   // Add a new item to a table
//   .post(upload.single('img'), (req, res) => {
//     const table = req.params.table;
//     const fields = req.body;
//     if (req.file) {
//       fields.img = `${req.protocol}://${req.get('host')}/uploads/${
//         req.file.filename
//       }`;
//     }
//     db.query(`INSERT INTO ${table} SET ?`, fields, (err, result) => {
//       if (err) {
//         handleDatabaseError(err, res);
//       }
//       res.json({
//         message: `${table.slice(0, -1)} added successfully`,
//         id: result.insertId,
//       });
//     });
//   });

// // Generic route for handling individual items in a table
// router
//   .route('/:table/:id')
//   // Update an item in a table
//   .put((req, res) => {
//     const table = req.params.table;
//     const id = req.params.id;
//     const fields = req.body;
//     updateTableData(
//       table,
//       fields,
//       id,
//       res,
//       `${table.slice(0, -1)} updated successfully`
//     );
//   })
//   // Delete an item from a table
//   .delete((req, res) => {
//     const table = req.params.table;
//     const id = req.params.id;
//     deleteFromTable(
//       table,
//       id,
//       res,
//       `${table.slice(0, -1)} deleted successfully`
//     );
//   });

// module.exports = router;
