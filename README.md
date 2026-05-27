# OnSign TV - Web Dev Challenge

[cite_start]Este projeto é uma aplicação web de página única que consome uma API de usuários e processa relações de amizade e interesses para gerar recomendações personalizadas[cite: 3, 5].

## Como Executar

Como o projeto foi desenvolvido utilizando tecnologias web nativas, não é necessário instalar dependências.

1.  Certifique-se de que os três arquivos (`index.html`, `style.css` e `app.js`) estão na mesma pasta.
2.  [cite_start]Abra o arquivo `app.js` e insira seu token de acesso na variável `ACCESS_TOKEN`[cite: 33, 34].
3.  Abra o arquivo `index.html` em qualquer navegador moderno.

## Lógica de Negócio

O desafio principal consistiu em transformar dados normalizados (listas separadas de usuários, amizades e interesses) em um grafo de relações para extrair:

### 1. Sugestão de Amigos

[cite_start]Definido como "amigos de amigos" que ainda não possuem conexão direta com o usuário[cite: 81].

- **Processamento**: O algoritmo percorre a lista de amigos diretos e, para cada um, verifica sua própria lista de amigos.
- [cite_start]**Filtro**: São removidos da sugestão o próprio usuário logado e qualquer pessoa que já conste em sua lista de amigos diretos[cite: 87, 88].

### 2. Sugestão de Interesses

[cite_start]Lista de interesses presentes no círculo de amigos do usuário, mas que o usuário ainda não possui[cite: 89].

- **Processamento**: Coleta todos os interesses de todos os amigos diretos.
- [cite_start]**Filtro**: Remove interesses que o usuário já possui em seu perfil, garantindo que apenas novas descobertas sejam exibidas[cite: 91].

## Requisitos Técnicos Implementados

- [cite_start]**Resiliência (Retry Logic)**: A API possui uma taxa de erro de 10%[cite: 95]. [cite_start]Implementei um mecanismo de tentativa que aguarda 1 segundo entre falhas, realizando até 3 tentativas antes de exibir uma tela de erro ao usuário[cite: 96, 97].
- [cite_start]**Ordenação Dinâmica**: A tabela permite ordenar os usuários por nome (A-Z) e inverter a ordem através de um botão de toggle[cite: 94].
- **Eficiência de Dados**: Utilização da estrutura `Map` para indexação de IDs, permitindo buscas de complexidade $O(1)$ durante o processamento do grafo.
- [cite_start]**Interface**: Layout limpo e responsivo utilizando tabelas conforme sugerido na especificação do desafio[cite: 101, 103].

## Estrutura de Arquivos

- `index.html`: Estrutura semântica da tabela e controles.
- `style.css`: Estilização minimalista.
- `app.js`: Lógica de consumo de API, tratamento de erros e algoritmos de recomendação.
