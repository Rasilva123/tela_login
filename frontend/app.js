const form = document.getElementById("login-form");
const statusEl = document.getElementById("status");
const checkBtn = document.getElementById("check-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);
    statusEl.textContent = "Login realizado com sucesso! Usuário logado.";
    statusEl.style.color = "green";
  } else {
    statusEl.textContent = "Erro: " + data.erro;
    statusEl.style.color = "red";
    localStorage.removeItem("token");
  }
});

checkBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    statusEl.textContent = "Não está logado.";
    statusEl.style.color = "red";
    return;
  }

  const response = await fetch("http://localhost:3000/status", {
    headers: { Authorization: "Bearer " + token },
  });

  const data = await response.json();

  if (data.authenticated) {
    statusEl.textContent = "Usuário está logado.";
    statusEl.style.color = "green";
  } else {
    statusEl.textContent = "Token inválido ou expirado. Não está logado.";
    statusEl.style.color = "red";
    localStorage.removeItem("token");
  }
});
