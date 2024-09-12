document.addEventListener('DOMContentLoaded', () => {
const apiUrl = 'http://backend.k8s.local';

  const authOptions = document.getElementById('authOptions');
  const authOptionsRegister = document.getElementById('showRegisterForm');
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const addTaskForm = document.getElementById('addTaskForm');
  const tasksContainer = document.getElementById('tasksContainer');
  const tasksList = document.getElementById('tasksList');

  document.getElementById('showRegisterForm').addEventListener('click', () => {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
  });

  document.getElementById('showLoginForm').addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const registerData = {
      name: formData.get('registerName'),
      password: formData.get('registerPassword')
    };

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors', 
        body: JSON.stringify(registerData)
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  });

  authOptionsRegister.addEventListener('click', () => {
    addTaskForm.style.display = 'none';
    tasksContainer.style.display = 'none';
  });

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const loginData = {
      name: formData.get('loginName'),
      password: formData.get('loginPassword')
    };

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors', 
        body: JSON.stringify(loginData)
      });
      const data = await response.json();

      if (data.error) {
        alert(data.error);
        addTaskForm.style.display = 'none';
        tasksContainer.style.display = 'none';
      } else {
        addTaskForm.style.display = 'block';
        tasksContainer.style.display = 'block';
        await listTasks(loginData.name);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  });

  addTaskForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const formData = new FormData(addTaskForm);
    const taskData = {
      name: loginForm.loginName.value, 
      task: formData.get('taskDescription')
    };

    try {
      await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors', 
        body: JSON.stringify(taskData)
      });
      await listTasks(taskData.name);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  });

  // Função para listar tarefas
  async function listTasks(username) {
    try {
      const response = await fetch(`${apiUrl}/tasks/${username}`, {
        mode: 'cors' 
      });
      const tasks = await response.json();

      tasksList.innerHTML = '';

      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.textContent = task;

        // Botão de exclusão
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', async () => {
          try {
            const deleteResponse = await fetch(`${apiUrl}/tasks/${username}/${task}`, {
              method: 'DELETE',
              mode: 'cors' 
            });
            const deleteData = await deleteResponse.json();
            if (deleteData.error) {
              alert(deleteData.error);
            } else {
              await listTasks(username); // Atualiza a lista após a exclusão
            }
          } catch (error) {
            console.error('Error deleting task:', error);
          }
        });

        taskItem.appendChild(deleteButton);
        tasksList.appendChild(taskItem);
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Error fetching tasks. Please try again.');
    }
  }
});
