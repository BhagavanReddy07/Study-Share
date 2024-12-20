const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());  // For parsing JSON bodies
app.use(express.static('public'));  // Serve static files from 'public' folder
app.use('/uploads', express.static('uploads'));  // Serve files from 'uploads' folder

// MongoDB setup
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'studyshare';
let db;
let filesCollection;
let subjectsCollection;

// Connect to MongoDB
MongoClient.connect(url)
  .then(client => {
    db = client.db(dbName);
    filesCollection = db.collection('files');
    subjectsCollection = db.collection('subjects');
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('MongoDB connection failed:', error);
  });

// Set up Multer for file uploads
const upload = multer({
  dest: 'uploads/', // Files will be saved here
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
});

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Routes

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create a new subject
app.post('/create-subject', (req, res) => {
  const { subjectName } = req.body;

  if (!subjectName) {
    return res.status(400).json({ error: 'Subject name is required' });
  }

  const newSubject = {
    name: subjectName,
  };

  subjectsCollection.insertOne(newSubject)
    .then(result => {
      res.json({ message: 'Subject created successfully!' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error creating subject: ' + err.message });
    });
});

// Upload a file
app.post('/upload', upload.single('file'), (req, res) => {
  const { subject } = req.body;

  if (!subject || !req.file) {
    return res.status(400).json({ error: 'Subject and file are required' });
  }

  const newFile = {
    filename: req.file.originalname,
    subject: subject,
    path: req.file.path,
  };

  filesCollection.insertOne(newFile)
    .then(result => {
      res.json({ message: 'File uploaded successfully!' });
    })
    .catch(err => res.status(500).json({ error: 'Error uploading file: ' + err.message }));
});

// Get all subjects
app.get('/subjects', (req, res) => {
  subjectsCollection.find().toArray()
    .then(subjects => {
      res.json(subjects);
    })
    .catch(err => res.status(500).json({ error: 'Error fetching subjects: ' + err.message }));
});

// Get files by subject
app.get('/files', (req, res) => {
  const { subject } = req.query;

  if (!subject) {
    return res.status(400).json({ error: 'Subject query parameter is required' });
  }

  filesCollection.find({ subject: subject }).toArray()
    .then(files => {
      res.json(files);
    })
    .catch(err => res.status(500).json({ error: 'Error fetching files: ' + err.message }));
});

// Download a file by ID
app.get('/download/:fileId', (req, res) => {
  const { fileId } = req.params;
  
  filesCollection.findOne({ _id: new ObjectId(fileId) })
    .then(file => {
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      res.download(file.path, file.filename, err => {
        if (err) {
          res.status(500).json({ error: 'Error in file download: ' + err.message });
        }
      });
    })
    .catch(err => res.status(500).json({ error: 'Error fetching file for download: ' + err.message }));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
