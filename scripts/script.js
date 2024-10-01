let tarefas = [];

function adicionarTarefa() {
    const input = document.getElementById("tarefa-text");
    const tarefaTexto = input.value.trim();

    if (tarefaTexto === "") {
        alert("Você tentou adicionar uma tarefa sem texto");
        return;
    }

    const novaTarefa = {
        id: Math.floor(Math.random() * 1000000),
        text: tarefaTexto,
        completed: false, 
    };

    tarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    render();
    input.value = "";
    input.focus();
}

function render() {
    const listaTarefa = document.getElementById("lista-tarefa");
    listaTarefa.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {
        const li = document.createElement("li");

        if (tarefas[i].completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = tarefas[i].text;
 
        const concluir = document.createElement("button");
        concluir.classList.add("btn-concluir");
        concluir.innerHTML = `<span class="material-icons">${tarefas[i].completed ? 'check_box' : 'check_box_outline_blank'}</span>`;
        concluir.addEventListener("click", () => TrocaConcluir(tarefas[i].id));

        const edit = document.createElement("button");
        edit.classList.add("btn-editar");
        edit.innerHTML = `<span class="material-icons">edit</span>`;
        edit.addEventListener("click", () => editarTarefa(tarefas[i].id));

        const deletar = document.createElement("button");
        deletar.classList.add("btn-excluir");
        deletar.innerHTML = `<span class="material-icons">delete</span>`;
        deletar.addEventListener("click", () => deletarTarefa(tarefas[i].id));

        const div = document.createElement("div");
        div.appendChild(concluir);
        div.appendChild(edit);
        div.appendChild(deletar);

        li.appendChild(span);
        li.appendChild(div);

        listaTarefa.appendChild(li);
    }
}

function TrocaConcluir(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    if (index !== -1) {
        tarefas[index].completed = !tarefas[index].completed;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        render();
    }
}

function editarTarefa(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    const novoTextoTarefa = prompt("Edite a tarefa", tarefas[index].text);

    if (novoTextoTarefa !== null && novoTextoTarefa.trim() !== "") {
        tarefas[index].text = novoTextoTarefa;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        render();
    }
}

function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    render();
}

function addPeloEnter(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
}

function carregarTarefas() {
    const tarefasLocalStorage = localStorage.getItem("tarefas");
    if (tarefasLocalStorage) {
        tarefas = JSON.parse(tarefasLocalStorage);
        render();
    }
}
