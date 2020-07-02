<h1 align="center">Case Truckpad</h1>

<h4 align="center"> 
	:heavy_check_mark: Finalizado
</h4>
<p align="center">	
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/vhugoc/truckpad">
	
  <a href="https://www.linkedin.com/in/vhugoc/">
    <img alt="Made by Victor Hugo" src="https://img.shields.io/badge/made%20by-Victor Hugo-%2304D361">
  </a>
  
  <a href="https://github.com/vhugoc/truckpad/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/vhugoc/truckpad">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

## :information_source: O Desafio

Construir uma API para gerenciar motoristas que chegam em determinado terminal. Possibilitando identificar o tipo de veículo que está dirigindo, tipo de CNH, origem, destino, se está carregado ou não, etc. Além disso, será registrado a entrada e saída dos motoristas neste terminal, para gerar relatórios diários, semanais e mensais.

## Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)


## Como Utilizar

Na linha de comando:

```bash
# Clonar o repositório
$ git clone https://github.com/vhugoc/truckpad

# Entrar no repositório
$ cd truckpad/api

# Instalar as dependências
$ npm install

# Iniciar o servidor
$ npm start

# running on port 3333
```

### Endpoints

Todas as requisições retornam os códigos HTTP padronizados e os resultados em formato `JSON`.

#### `GET /truckers`
Busca todos os motoristas registrados. Onde é possível filtrar por motoristas que não possuem carga e motoristas que tem seu próprio veículo.

**Parâmetros**
Chave                      | Tipo    | Valor
---------                  | ------  | ------
is_loaded `query string`   | Boolean | Possui carga ou não
have_vehicle `query string`| Boolean | Possui veículo

#### `GET /truckers/:id`
Busca um determinado motorista. De acordo com o ID passado no parâmetro.

#### `GET /truckers/group/truck_type`
Busca o destino e origem dos motoristas agrupados pelo tipo de veículo.

#### `POST /truckers`
Adiciona um motorista.

**Parâmetros**
Chave        | Tipo    | Valor
---------    | ------  | ------
name         | String  | Nome
age          | Integer | Idade
gender       | Sring   | Gênero
have_vehicle | Boolean | Possui veículo próprio
cnh_type     | String  | Tipo da CNH
is_loaded    | Boolean | Veículo está carregado
vehicle_type | String  | Tipo de veículo que está dirigindo
origin       | Array   | lat e lng da origem
destiny      | Array   | lat e lng do destino

#### `PUT /truckers/:id`
Edita um motorista.

**Parâmetros**
Chave        | Tipo    | Valor
---------    | ------  | ------
name         | String  | Nome
age          | Integer | Idade
gender       | Sring   | Gênero
have_vehicle | Boolean | Possui veículo próprio
cnh_type     | String  | Tipo da CNH
is_loaded    | Boolean | Veículo está carregado
vehicle_type | String  | Tipo de veículo que está dirigindo
origin       | Array   | lat e lng da origem
destiny      | Array   | lat e lng do destino

#### `DELETE /truckers/:id`
Apaga um motorista.

#### `GET /checkins`
Retorna todos os checkins

**Parâmetros**
Chave                 | Tipo    | Valor
---------             | ------  | ------
filter `query string` | String  | `daily`, `weekly` ou `monthly`

#### `POST /truckers/:trucker_id/checkin`
Adiciona um checkin para determinado motorista. A validação é feita comparando o último checkin do mesmo. Não há a possibilidade de repetir o tipo de checkin (`in` ou `out`), e se for o primeiro checkin, é possível ser apenas do tipo `in`.

**Parâmetros**
Chave       | Tipo    | Valor
---------   | ------  | ------
type        | String  | `in` ou `out`