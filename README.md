# Car-Whisperer-Sprint4

### LINK DO REPOSITÓRIO DO PROJETO
**https://github.com/Caepena/Car-Whisperer-Sprint4**


## Verificação de Dependências

Antes de criar ou excluir um objeto em qualquer uma das entidades, o sistema realiza uma verificação para assegurar que não existam dependências que impeçam a operação.

- **Exclusão de Clientes**: O sistema verifica se o cliente não possui pagamentos ou sinistros associados. Caso existam dependências, a exclusão é bloqueada.
- **Exclusão de Sinistros**: Confirma que o sinistro não está vinculado a um veículo em uso. Se houver vínculo, a exclusão é impedida.
- **Exclusão de Pagamentos**: Certifica que o pagamento não está associado a um cliente ativo. Pagamentos ligados a clientes ativos não podem ser excluídos.

## APIs Disponíveis

### LINK DO REPOSITÓRIO DA API EM JAVA FEITA NO INTELLIJ
**https://github.com/Caepena/API-CarWhisperer**

### Clientes
- **POST** `/clientes`: Cria um novo cliente.
- **GET** `/clientes/:id`: Obtém os detalhes de um cliente específico.
- **PUT** `/clientes/:id`: Atualiza as informações de um cliente existente.
- **DELETE** `/clientes/:id`: Exclui um cliente, verificando dependências como pagamentos ou sinistros associados.

### Sinistros
- **POST** `/sinistros`: Cria um novo sinistro.
- **GET** `/sinistros/:id`: Obtém os detalhes de um sinistro específico.
- **PUT** `/sinistros/:id`: Atualiza as informações de um sinistro existente.
- **DELETE** `/sinistros/:id`: Exclui um sinistro, verificando dependências com veículos em uso.

### Pagamentos
- **POST** `/pagamentos`: Registra um novo pagamento.
- **GET** `/pagamentos/:id`: Obtém os detalhes de um pagamento específico.
- **PUT** `/pagamentos/:id`: Atualiza as informações de um pagamento existente.
- **DELETE** `/pagamentos/:id`: Exclui um pagamento, verificando dependências com clientes ativos.

### Vercel
Não foi possível realizar o deploy da vercel por conta da versão do Next, que agora precisa usar Promise e estava dando erro (usamos a versão errada do Next invés da 14.2.13).
