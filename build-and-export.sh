#!/bin/bash


eval $(minikube docker-env)

# Build da imagem do backend
docker build -t devops/back ./backend

# Build da imagem do frontend
docker build -t devops/front ./frontend


echo "Imagens construídas:"
docker images | grep devops

echo "Build das imagens concluído!"

