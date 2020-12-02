# Lista de Países

## Demonstação
- Disponível temporariamente em:
- [http://paises-demo.ddns.net/](http://paises-demo.ddns.net/)

## Instruções para instalação

### Instale as dependências
- Você pode usar o gerênciador de pacotes que preferir (yarn, npm..)
- Dentro da pasta do projeto execute os comandos a seguir

```
yarn install
```
ou
```
npm install
```

### Compilar e iniciar o hot reload para desenvolvimento
```
yarn serve
```
ou
```
npm run serve
```

### Compilar e minificar uma versão para produção
- Será gerado um diretório "dist" dentro de src.
```
yarn build
```
ou
```
npm run build
```

## Sobre

### Funcionalidades
- Paginação da lista de países com animações
- Busca por nome do país
- Filtro por blocos regionais (Com campo de busca)
- Página com informações detalhadas sobre cada país
- Ao selecionar um idioma nos detalhes do país a aplicação lista outros países que possuem o idioma em comum
- Opção de busca na lista de países por idioma
- Erros tratados caso a api esteja indisponível
- Design responsivo

### Libs, ferramentas e tecnologias
- Axios
- Bootstrap
- Vue.JS
- Vue-router
- Vue-select
- Font-awesome icons