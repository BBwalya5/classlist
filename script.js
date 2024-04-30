document.getElementById('fetchClassListBtn').addEventListener('click', function() {
          fetchClassList();
        });
        
        document.getElementById('addStudentBtn').addEventListener('click', function() {
          addStudent();
        });
        
        document.getElementById('deleteStudentBtn').addEventListener('click', function() {
          deleteStudent();
        });
        
        function fetchClassList() {
          fetch('http://eml/backend/classlist-backend/api.php')
            .then(response => response.json())
            .then(data => {
              const classListContainer = document.getElementById('classListContainer');
              classListContainer.innerHTML = ''; // Clear previous content
        
              if (data && data.length > 0) {
                const table = document.createElement('table');
                table.border = '1';
                table.innerHTML = '<tr><th>Student Name</th><th>Student ID</th></tr>';
                data.forEach(student => {
                  const row = table.insertRow();
                  row.insertCell().innerText = student.student_name;
                  row.insertCell().innerText = student.student_id;
                });
                classListContainer.appendChild(table);
              } else {
                classListContainer.innerText = 'No students in the class list.';
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
        
        function addStudent() {
          const name = prompt('Enter Student Name:');
          const id = prompt('Enter student ID:' );
          
          if (name && id) {
            const newData = { name: name, id: id };
        
            fetch('http://eml/backend/classlist-backend/api.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newData),
            })
              .then(response => response.json())
              .then(data => {
                alert(data.message);
                fetchClassList(); // Refresh class list after adding
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }
        }
        
        function deleteStudent() {
          const idToDelete = prompt('Enter student ID to delete:');
        
          if (idToDelete) {
            fetch('http://eml/backend/classlist-backend/api.php', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: 'id=' + idToDelete,
            })
              .then(response => response.json())
              .then(data => {
                alert(data.message);
                fetchClassList(); // Refresh class list after deleting
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }
        }
        