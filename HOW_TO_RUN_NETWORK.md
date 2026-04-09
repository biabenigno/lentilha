# Como Rodar o Projeto na Rede Local (Acesso via iPad/Celular)

Este guia explica como configurar o projeto Lentilha para ser acessado por outros dispositivos (como um iPad) conectados à mesma rede Wi-Fi.

## 1. Descobrir o IP do seu Computador (Windows)

1. Abra o **Terminal** ou **PowerShell**.
2. Digite o comando:
   ```powershell
   ipconfig
   ```
3. Procure por `Endereço IPv4` na seção "Adaptador de Rede sem Fio Wi-Fi" ou "Adaptador Wi-Fi".
   * Exemplo: `10.232.241.176` (Anote este número).

---

## 2. Iniciar o Banco de Dados

Certifique-se de que o banco de dados (Docker) esteja rodando:

```powershell
docker-compose up -d db
```

---

## 3. Iniciar o Backend (Python)

Vá para a pasta `backend` e rode o servidor permitindo conexões externas (`0.0.0.0`):

```powershell
cd backend
.\venv\Scripts\python.exe main.py
```

*O servidor estará escutando na porta **9000**.*

---

## 4. Iniciar o Frontend (Next.js)

Abra um **novo terminal**, vá para a pasta `frontend` e rode o projeto com o parâmetro `-H 0.0.0.0` para que ele aceite conexões de outros IPs:
```powershell
cd frontend
npm run dev -- -H 0.0.0.0
```
*O servidor estará escutando na porta **3000**.*

---

## 5. Acessar no iPad / Outro Dispositivo

1. Certifique-se de que o iPad está no **mesmo Wi-Fi** que o computador.
2. Abra o navegador (Safari/Chrome) no iPad.
3. Digite o endereço usando o IP que você anotou no passo 1:

   ```text
   http://SEU_IP_AQUI:3000
   ```

   *Exemplo: `http://10.232.241.176:3000`*

---

## 💡 Dicas Importantes

* **Firewall:** Se o iPad não carregar a página, verifique se o Firewall do Windows não está bloqueando as portas 3000 e 9000.
* **Modo de Teste:** O toggle de "Teste A/B" na barra lateral funciona de forma independente em cada dispositivo (fica salvo no navegador do iPad).
* **Usuários:**
  * Teste A usa o **Usuário 1 (Fernanda)**.
  * Teste B usa o **Usuário 2 (Ricardo)**.
