# OnSign TV - Web Dev Challenge

Este projeto é uma aplicação web de página única que consome uma API de usuários e processa relações de amizade e interesses para gerar recomendações personalizadas.

## Como Executar

Como o projeto foi desenvolvido utilizando tecnologias web nativas, não é necessário instalar dependências.

1.  Certifique-se de que os três arquivos (`index.html`, `style.css` e `app.js`) estão na mesma pasta.
2.  Abra o arquivo `app.js` e insira seu token de acesso na variável `ACCESS_TOKEN`.
3.  Abra o arquivo `index.html` em qualquer navegador moderno.

## Lógica de Negócio

O desafio principal consistiu em transformar dados normalizados (listas separadas de usuários, amizades e interesses) em um grafo de relações para extrair:

### 1. Sugestão de Amigos

Definido como "amigos de amigos" que ainda não possuem conexão direta com o usuário.

- **Processamento**: O algoritmo percorre a lista de amigos diretos e, para cada um, verifica sua própria lista de amigos.
- **Filtro**: São removidos da sugestão o próprio usuário logado e qualquer pessoa que já conste em sua lista de amigos diretos.

### 2. Sugestão de Interesses

Lista de interesses presentes no círculo de amigos do usuário, mas que o usuário ainda não possui.

- **Processamento**: Coleta todos os interesses de todos os amigos diretos.
- **Filtro**: Remove interesses que o usuário já possui em seu perfil, garantindo que apenas novas descobertas sejam exibidas.

## Requisitos Técnicos Implementados

- **Resiliência (Retry Logic)**: A API possui uma taxa de erro de 10%. Implementei um mecanismo de tentativa que aguarda 1 segundo entre falhas, realizando até 3 tentativas antes de exibir uma tela de erro ao usuário.
- **Ordenação Dinâmica**: A tabela permite ordenar os usuários por nome (A-Z) e inverter a ordem através de um botão de toggle.
- **Eficiência de Dados**: Utilização da estrutura `Map` para indexação de IDs, permitindo buscas de complexidade $O(1)$ durante o processamento do grafo.
- **Interface**: Layout limpo e responsivo utilizando tabelas conforme sugerido na especificação do desafio.

## Estrutura de Arquivos

- `index.html`: Estrutura semântica da tabela e controles.
- `style.css`: Estilização minimalista.
- `app.js`: Lógica de consumo de API, tratamento de erros e algoritmos de recomendação.
