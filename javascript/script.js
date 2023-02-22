let jsonDatas = JSON.parse(tasks)
//console.log(jsonDatas);
const taskContainer = document.getElementById('task-container');

function increase(button) {
    const val = jsonDatas.find(item => item.taskName === button.dataset.taskName);
    if (val.importance < 5) {
        val.importance++;
        if (val.importance === 2 || val.importance === 3) {
            button.classList.remove("btn-success");
            button.classList.add("btn-warning");
        } else if (val.importance === 4 || val.importance === 5) {
            button.classList.remove("btn-success", "btn-warning");
            button.classList.add("btn-danger");
        }
        button.innerText = val.importance;
    } else if (val.importance === 5) {
        val.importance = 0;
        button.classList.remove("btn-success", "btn-warning", "btn-danger");
        button.classList.add("btn-success");
        button.innerText = val.importance;
    }
}

function deleteCard(button) {
    const taskName = button.dataset.taskName;
    const index = jsonDatas.findIndex(item => item.taskName === taskName);
    if (index !== -1) {
        jsonDatas.splice(index, 1);
        const card = button.closest('.card');
        card.parentNode.removeChild(card);
    }
    getData();
}

function downUp() {
    jsonDatas = jsonDatas.sort((a, b) => a.importance - b.importance);
    getData();
}

function upDown() {
    jsonDatas = jsonDatas.sort((a, b) => b.importance - a.importance);
    getData();
}

function doneCard(button) {
    const val = jsonDatas.find(item => item.taskName === button.dataset.taskName);
    console.log(val);
    alert(`${val.taskName} task has been done.`);
    deleteCard(button);
}

function getData() {
    taskContainer.innerHTML = "";
    for (let val of jsonDatas) {
        let color;
        if (val.importance < 2) {
            color = "btn-success";
        } else if (val.importance === 2 || val.importance === 3) {
            color = "btn-warning";
        } else if (val.importance === 4 || val.importance === 5) {
            color = "btn-danger";
        }
        taskContainer.innerHTML += `
      <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <div class="card ">
          <img src=${val.image} class="card-img-top " alt="Task Image ">
          <div class="card-body ">
            <h5 class="card-title ">${val.taskName}</h5>
            <p class="card-text ">${val.description}</p>
  
            <hr style="background-color: black; ">
            <p class="card-text ">
              <strong><i class="fas fa-exclamation-triangle text-warning "></i> Priority
                Level:</strong>
              <button data-task-name="${val.taskName}" class="btn ${color} rounded-pill fw-thin border-0 text-white" onClick="increase(this)">${val.importance}</button>
              <br>
              <strong><i class="far fa-clock "></i> Deadline:</strong> <span id="countdown ">${val.deadline}</span>
            </p>
            <hr style="background-color: black; ">
            <div class="d-flex justify-content-between ">
              <button data-task-name="${val.taskName}" type="button " class="btn btn-danger " id="deleteBtn" onClick="deleteCard(this)">Delete</button>
              <button data-task-name="${val.taskName}" type="button " class="btn btn-success " onClick="doneCard(this)">Done</button>
            </div>
          </div>
        </div>
      </div>
      `
    }
}

getData();