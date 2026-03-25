let tarefas = []

function adicionarTarefa(){

let nome = document.getElementById("nome").value
let categoria = document.getElementById("categoria").value
let prioridade = document.getElementById("prioridade").value
let data = document.getElementById("data").value

if(nome === "" || categoria === "" || prioridade === "" || data === ""){
alert("Preencha todos os campos")
return
}

let tarefa = {
nome,
categoria,
prioridade,
data,
concluida:false
}

tarefas.push(tarefa)

mostrarTarefas()

}

function mostrarTarefas(lista = tarefas){

let container = document.getElementById("listaTarefas")
container.innerHTML=""

lista.forEach((tarefa,index)=>{

let card = document.createElement("div")
card.classList.add("card")

if(tarefa.concluida){
card.classList.add("concluida")
}

let classePrioridade=""

if(tarefa.prioridade==="Alta") classePrioridade="alta"
if(tarefa.prioridade==="Média") classePrioridade="media"
if(tarefa.prioridade==="Baixa") classePrioridade="baixa"

card.innerHTML = `
<h3>${tarefa.nome}</h3>
<p>Categoria: ${tarefa.categoria}</p>
<p class="${classePrioridade}">Prioridade: ${tarefa.prioridade}</p>
<p>Data: ${formatarDataBR(tarefa.data)}</p>

<button onclick="concluir(${index})">Concluir</button>
<button onclick="excluir(${index})">Excluir</button>
`

container.appendChild(card)

})

}

function concluir(index){
tarefas[index].concluida = !tarefas[index].concluida
mostrarTarefas()
}

function excluir(index){
tarefas.splice(index,1)
mostrarTarefas()
}
function formatarDataBR(dataISO){

let partes = dataISO.split("-") 

let ano = partes[0]
let mes = partes[1]
let dia = partes[2]

return `${dia}/${mes}/${ano}`

}
function darkMode() {
 

document.body.classList.toggle("dark")

if(document.body.classList.contains("dark")){
localStorage.setItem("tema","dark")
}else{
localStorage.setItem("tema","light")
}

}

function filtrarTarefas(){

let categoria = document.getElementById("filtroCategoria").value

if(categoria === "Todas"){
mostrarTarefas()
return
}

let filtradas = tarefas.filter(t => t.categoria === categoria)

mostrarTarefas(filtradas)

}