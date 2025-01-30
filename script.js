const doTolist = [];
const validated = [];

const inputBox = document.getElementById("input-box");
const contentList = document.querySelector(".list-container");
const btnAdd = document.querySelector(".btn-add");
const list = document.getElementById("list");
const deleteListBtn = document.querySelector(".delete");
let id = 0;

inputBox.addEventListener("input", function (e) {
  let unputValue = e.target.value;
  if (unputValue === "") {
    btnAdd.classList.add("disabled");
  } else btnAdd.classList.remove("disabled");
});

function addList() {
  if (inputBox.value === "") {
    btnAdd.classList.add("disabled");
  } else {
    let item = document.createElement("li");
    item.className = "list-task";
    item.innerHTML = `<input type="checkbox" class="list-checkbox" id=${(id += 1)}>${
      inputBox.value
    }
                        <span class="delete-item"  id="${id}"></span>`;
    list.appendChild(item);
    doTolist.push({ name: inputBox.value, id: id });
    console.log(doTolist);
  }

  checkTask();

  deleteTask();

  inputBox.value = "";
  btnAdd.classList.add("disabled");
}

function checkTask() {
  const taskChekbox = document.querySelectorAll(".list-checkbox");
  for (let i = 0; i < taskChekbox.length; i++) {
    taskChekbox[i].addEventListener("click", function () {
      if (this.checked == true) {
        validated.push({ id: this.id });
        deleteListBtn.classList.remove("disabled");
        clearList(taskChekbox[i])
      } else {
        const index = validated.findIndex((a) => a.id === this.id);
        if (index !== -1) {
          validated.splice(index, 1);
        }
      }
      disabledBtn();
    });
  }
}

function deleteTask() {
  const deleteTask = document.querySelectorAll(".delete-item");
  deleteTask.forEach((button) => {
    button.addEventListener("click", function () {
      doTolist.forEach((item, i) => {
        if (item.id == this.id) {
          doTolist.splice(i, 1);
        }
      });
      const index = validated.findIndex((a) => a.id === this.id);
      if (index !== -1) {
        validated.splice(index, 1);
      }
      let div = this.parentElement;
      div.remove();
      disabledBtn();
    });
  });
}

function clearList(...checkedTasks) {
  deleteListBtn.addEventListener("click", function () {
    const validIds = new Set(validated.map((item) => Number(item.id)));
    doTolist.forEach((item, i) => {
      if (validIds.has(item.id)) {
        doTolist.splice(i, 1);
      }
    });
    checkedTasks.forEach(item => {
      const index = validated.findIndex((a) => a.id == item.id);
      if (index !== -1) {
        validated.splice(index, 1);
      }   
      item.parentElement.remove();
      disabledBtn();
    })
  });
}

function disabledBtn() {
  if (validated.length == 0) {
    deleteListBtn.classList.add("disabled");
  }
}
