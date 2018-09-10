let todoList = {
  todos: [],
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

let handlers = {
  addTodo: function () {
    let addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    userView.displayTodos();
  },
  changeTodo: function () {
    let changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    let changeTodoTextInput = document.getElementById("changeTodoTextInput")
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    userView.displayTodos();
    },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    userView.displayTodos();
  },
  toggleCompleted: function () {
    let toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    userView.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    userView.displayTodos();
  }
};

let userView = {
  displayTodos: function () {
    let todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";
    todoList.todos.forEach(function(todo, position) {
      let todoLi = document.createElement("li");
      let todoTextWithCompletetion = "";
      if (todo.completed === true) {
        todoTextWithCompletetion = "(X) " + todo.todoText;
      } else {
        todoTextWithCompletetion = "( ) " + todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletetion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi)
    }, this);
  },
  createDeleteButton: function () {
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function () {
    let todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function (event) {
      let elementClicked = event.target;
      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};
userView.setUpEventListeners();