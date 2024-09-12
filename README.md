

# Deploy de Aplicação com Kubernetes no Minikube

Este repositório contém uma aplicação composta por dois componentes: um backend e um frontend, ambos empacotados como imagens Docker e implantados em um cluster Kubernetes utilizando o Minikube.


## Passos para Rodar a Aplicação

### 1. iniciar o minikube
O primeiro passo é iniciar o minikube
```bash
minikube start
```

### 2. Build das Imagens Docker

O segundo passo é construir as imagens Docker para o backend e frontend, utilizando o Docker local do Minikube. Para isso, execute o script `build-and-export.sh`:

```bash
./build-and-export.sh
```

Esse script faz o seguinte:

- Configura o Docker para usar o ambiente do Minikube.
- Constrói a imagem Docker do backend a partir do diretório `./backend`.
- Constrói a imagem Docker do frontend a partir do diretório `./frontend`.
- Lista as imagens Docker criadas para verificar se o processo foi bem-sucedido.

### 3. Implantação no Cluster Kubernetes

Após a construção das imagens, você pode implantar a aplicação no Kubernetes utilizando o script `deploy-to-minikube.sh`. Esse script aplica os arquivos de configuração YAML e configura o DNS local para acessar a aplicação.

Para rodar o script de implantação, use:

```bash
./deploy-to-minikube.sh
```

Esse script faz o seguinte:

- Aplica os arquivos de configuração Kubernetes para o backend (Deployment e Service).
- Aplica os arquivos de configuração Kubernetes para o frontend (Deployment e Service).
- Aplica a configuração do Ingress para gerenciar o roteamento das requisições externas.
- Adiciona entradas no arquivo `/etc/hosts` do seu sistema (em Linux/macOS), permitindo o acesso às URLs personalizadas:
  - `frontend.k8s.local` para acessar o frontend.
  - `backend.k8s.local` para acessar o backend.

### 3. Acessando a Aplicação

Com a aplicação implantada e as entradas DNS configuradas, você pode acessar os serviços pelo navegador utilizando as seguintes URLs:

- **Frontend:** [http://frontend.k8s.local](http://frontend.k8s.local)
- **Backend:** [http://backend.k8s.local](http://backend.k8s.local)

