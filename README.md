# Lambda de Controle de Tempo
Lambda para inserir o checkin/checkout do projeto de controle de ponto, feito com Node.js e TypeScript.

## Uso

Para usar, siga estas etapas:

1. Clone o repositório:

    ```bash
    git clone https://github.com/colantuomo/time-tracking-lambda.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd time-tracking-lambda
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

## Deploy
O deploy está sendo feito automatica toda vez que existe um merge na branch `main`

## Testing
Para testar via algum client HTTP podemos usar o cURL abaixo:

```curl
curl --location 'https://gulzjc3bvw25q25p5glllloguu0bfpit.lambda-url.sa-east-1.on.aws/' \
--header 'Authorization: {token}' \
--header 'Content-Type: application/json' \
--data '{}'
```
