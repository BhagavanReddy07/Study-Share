document.addEventListener('DOMContentLoaded', () => {
  const uploadButton = document.getElementById('uploadButton');
  const createSubjectButton = document.getElementById('createSubjectButton');
  const subjectInput = document.getElementById('subject');
  const fileInput = document.getElementById('file');
  const createSubjectModal = document.getElementById('createSubjectModal');
  const newSubjectNameInput = document.getElementById('newSubjectName');
  const filesList = document.getElementById('files-list');
  const subjectsList = document.getElementById('subjectsList');
  const closeCreateSubjectModalButton = document.getElementById('closeCreateSubjectModal');
  const createSubjectSubmitButton = document.getElementById('createSubjectSubmit');

  // Fetch subjects and display them
  function fetchSubjects() {
    fetch('/subjects')
      .then(response => response.json())
      .then(subjects => {
        subjectsList.innerHTML = ''; // Clear existing buttons
        subjects.forEach(subject => {
          const button = document.createElement('button');
          button.textContent = subject.name;
          button.classList.add('subject-btn');
          button.addEventListener('click', () => loadSubjectFiles(subject.name)); // Load files for the clicked subject
          subjectsList.appendChild(button);
        });
      })
      .catch(error => console.error('Error fetching subjects:', error));
  }

  // Load files for a specific subject
  function loadSubjectFiles(subject) {
    fetch(`/files?subject=${subject}`)
      .then(response => response.json())
      .then(files => {
        filesList.innerHTML = ''; // Clear existing file list
        if (files.length === 0) {
          filesList.innerHTML = '<p>No files uploaded for this subject yet.</p>';
        } else {
          files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('file-item');
            fileItem.innerHTML = `<span>${file.filename}</span> <a href="/download/${file._id}">Download</a>`;
            filesList.appendChild(fileItem);
          });
        }
      })
      .catch(error => console.error('Error loading files:', error));
  }

  // Show Create Subject Modal
  function showCreateSubject() {
    createSubjectModal.style.display = 'block';
  }

  // Close Create Subject Modal
  function closeCreateSubjectModal() {
    createSubjectModal.style.display = 'none';
  }

  // Create new subject
  function createNewSubject() {
    const subjectName = newSubjectNameInput.value.trim();
    if (!subjectName) {
      alert('Please enter a subject name');
      return;
    }

    fetch('/create-subject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectName })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        fetchSubjects(); // Re-fetch subjects to display the new one
        closeCreateSubjectModal(); // Close the modal after successful creation
      })
      .catch(error => console.error('Error creating subject:', error));
  }

  // Upload file function
  function uploadFile() {
    const file = fileInput.files[0];
    const subject = subjectInput.value.trim();

    if (!file || !subject) {
      alert('Please select a file and enter a subject name');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('subject', subject);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        fetchSubjects(); // Re-fetch subjects to show the new subject button and update files
        loadSubjectFiles(subject); // Reload files for the current subject
      })
      .catch(error => console.error('Error uploading file:', error));
  }

  // Event listeners for the buttons
  uploadButton.addEventListener('click', uploadFile);
  createSubjectButton.addEventListener('click', showCreateSubject);
  closeCreateSubjectModalButton.addEventListener('click', closeCreateSubjectModal);
  createSubjectSubmitButton.addEventListener('click', createNewSubject);

  // Initial fetch to load subjects and their files
  fetchSubjects();
});
