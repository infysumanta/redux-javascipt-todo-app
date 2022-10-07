let store = Redux.createStore(reducer);
let { data } = store.getState();

let input = document.querySelector("#inputTodo");
let listItem = document.querySelector(".list-item");

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    store.dispatch({ type: "addTodo", title: event.target.value });
  }
});

function reducer(state, action) {
  switch (action.type) {
    //case to add todo
    case "addTodo":
      let singleTodo = {
        isCompleted: false,
        title: action.title,
      };
      state.data.push(singleTodo);
      return { data: state.data };
    case "isChecked":
      state.data[action.indexOfTodo].isCompleted = action.value;
      return { data: state.data };
    case "removeTodo":
      state.data.splice(action.indexOfTodo, 1);
      return { data: state.data };
    default:
      return { data: [] };
  }
}

store.subscribe(() => {
  let { data } = store.getState();
  createListUi(data);
});

let createListUi = (data) => {
  listItem.innerHTML = "";
  input.value = "";

  data.forEach((item, i) => {
    let todo = document.createElement("li");
    let divTodo = document.createElement("div");
    let divDelete = document.createElement("div");
    divDelete.classList.add("delete");
    divDelete.innerText = "❌";

    divDelete.addEventListener("click", () => {
      store.dispatch({
        type: "removeTodo",
        indexOfTodo: i,
      });
    });

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.isComplete;
    let span = document.createElement("span");
    span.innerText = item.title;
    divTodo.append(checkbox, span);
    todo.append(divTodo, divDelete);
    listItem.append(todo);
  });
};
createListUi(data);
