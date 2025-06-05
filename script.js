const supabase = window.supabase.createClient(
  "https://roybpousoozsbnndvgvx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJveWJwb3Vzb296c2JubmR2Z3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MzU2MzEsImV4cCI6MjA2MzQxMTYzMX0.U4Iy-RLVQuLppLm-_a6lYTuxs_3MDDwc9xwJgfkPaNs"
);

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

    if (error) {
      alert("Login inválido.");
    } else {
      window.location.href = "index2.html";
    }
  });
}

// FORMULÁRIO DE CHAMADOS
const formChamados = document.getElementById("equipamentoForm");
if (formChamados) {
  formChamados.addEventListener("submit", async function (e) {
    e.preventDefault();

    const dados = {
      cnpj: document.getElementById("cnpj").value.trim(),
      inicio: document.getElementById("inicio").value,
      termino: document.getElementById("termino").value,
      defeito: document.getElementById("defeito").value.trim(),
      equipamento: document.getElementById("equipamento").value.trim(),
      filial: document.getElementById("filial").value.trim(),
      numero_de_serie: document.getElementById("equipamento").value.trim(),
      responsavel: document.getElementById("tecnico").value.trim(),
      tecnico: document.getElementById("tecnico").value.trim()
    };

    if (!validarCampos(dados)) return;

    const { error } = await supabase.from("chamados").insert([dados]);

    if (error) {
      console.error("Erro ao inserir:", error);
      alert("Erro ao registrar chamado.");
    } else {
      alert("Chamado registrado com sucesso!");
      window.location.href = "index3.html";
    }
  });
}

// VALIDAÇÃO DE CAMPOS
function validarCampos(dados) {
  for (let key in dados) {
    if (!dados[key]) {
      alert(`Campo "${key}" é obrigatório.`);
      return false;
    }
  }
  return true;
}

// CARREGAMENTO DE REGISTROS
async function carregarRegistros() {
  const lista = document.getElementById("registroLista");
  if (!lista) return;

  const { data, error } = await supabase
    .from("chamados")
    .select("*")
    .order("id", { ascending: false });

  lista.innerHTML = "";

  if (error) {
    console.error("Erro ao carregar:", error);
    lista.innerHTML = "<p>Erro ao carregar chamados.</p>";
    return;
  }

  if (data.length === 0) {
    lista.innerHTML = "<p>Nenhum chamado registrado.</p>";
    return;
  }

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <strong>Equipamento:</strong> ${item.equipamento}<br>
      <strong>Defeito:</strong> ${item.defeito}<br>
      <strong>Filial:</strong> ${item.filial}<br>
      <strong>Responsável:</strong> ${item.responsavel}<br>
      <strong>Data:</strong> ${item.inicio} até ${item.termino}<hr>
    `;
    lista.appendChild(div);
  });
}

window.addEventListener("load", carregarRegistros);