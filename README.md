# ❓ Questions 

<p align='center'>
  <img alt="Tela de início" src="https://github.com/user-attachments/assets/3f58d201-4052-4833-ae87-dc34759482bc" />
</p>

<p align='center'>
  <img alt="Filtros das questões" src="https://github.com/user-attachments/assets/9d455002-61c9-412c-9a7f-751d48b37ceb" />
</p>

<p>
  <img alt="Imagem de um formulário com erros" src="https://github.com/user-attachments/assets/03e18921-dabb-47f2-93d9-9ff99937b91c" />
</p>


<p align='center'>
  <img alt="Tela com o CRUD de questões em uma tela de tablet" src="https://github.com/user-attachments/assets/3d2fe57e-7d75-43aa-81aa-a1f868418ec3" />
</p>

<p align='center'>
  <img alt="Estatísticas do usuário em uma tela de celular" src="https://github.com/user-attachments/assets/7be4f379-2673-434c-892e-15afe3f4b8a5" />
</p>

Este projeto é uma aplicação de questões de vestibulares, concursos ou qualquer tipo de questionário que queira implementar. Me baseei principalmente no site [qconcursos](https://www.qconcursos.com/).

## 🔨 Funcionalidades

- `Sistema de autenticação`: É possível criar uma conta e utilizar ela para responder as questões e ver estatísticas. Os acessos são definidos por meio de tokens criados no server. Determinadas páginas só podem ser acessadas com o token de administrador. O redux-persist salva o token no localstorage do navegador. O token tem expiração definida no arquivo .env;
- `Questões`: As questões podem ser respondidas pelos usuários que estiverem logados;
- `Estatísticas de usuário`: Três estatísticas são exibidas para um usuário: número total de questões respondidas, relação de acertos/erros e questões respondidas de acordo com o dia da semana atual;
- `Alteração de dados do usuário`: O usuário logado consegue redefinir a própria senha e alterar seus dados (email e nome completo);
- `"Esqueci minha senha"`: Caso o usuário não lembre a senha, é possível alterar a senha por meio do envio de um código para o email do usuário. O código chegará no email e caso o usuário insira o código correto, será possível alterar a senha;
- `Administrador`: Conforme o tutorial, o primeiro usuário admin é informado no arquivo .env e é criado assim que o up do container for realizado. O user admin pode realizar as operações de CRUD para usuários e questões do app;
- `Temas`: O app possui os temas dark e light e são definidos de acordo com o padrão do dispositivo automaticamente. Porém, é possível mudar com o botão correspondente, ficando salva a alteração no navegador por meio do localstorage;
- `Filtros das questões`: As questões podem ser filtradas na página inicial. É possível definir diversos filtros ao mesmo tempo, além da quantidade de resultados a serem exibidos por página. Ao adicionar um filtro, ele ficará visível abaixo dos seletores, sendo possível a remoção dele;
- `Paginação`: Todos os dados da aplicação são paginados. O sistema de paginação foi amplamente trabalhado para funcionar de forma ideal tanto no server quanto no lado do cliente, por meio da interface;
- `CRUD do administrador`: As telas de alteração dos dados do app tem as funcionalidades padrão de um CRUD: Criar valores, ler valoes, atualizar valores e remover valores. Só que nesse CRUD também é possível: pesquisar valores de acordo com a coluna, determinar a quantidade total que será exibida por página e também possui uma interface fácil de usar e totalmente responsiva;
- `Formulários`: Os formulários da aplicação são validados tanto no lado do cliente quanto no lado do servidor. Os erros são exibidos embaixo dos seus respectivos inputs. O servidor também pode emitir erros caso eles chegem nele. As mensagens do servidor são exibidas por meio do toastify;
- `Modais`: Algumas funcionalidades do app são exibidas por meio de modais, que são caixas flutuantes que aparecem ao centro da tela, bastando um clique fora delas para fechar.

## ⬇️ Download do projeto

Para realizar o download do projeto, recomendo utilizar o seguinte comando dentro da pasta em que deseja inserir:

```
  git clone
```

# 🚧
