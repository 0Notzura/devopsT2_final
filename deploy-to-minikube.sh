#!/bin/bash


kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml


kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml


kubectl apply -f ingress.yaml

echo "Aplicação implantada no Kubernetes (Minikube)!"

# Configuração adicional para /etc/hosts (Linux/macOS)
HOSTS_FILE="/etc/hosts"
ENTRY_FRONTEND="192.168.49.2 frontend.k8s.local"
ENTRY_BACKEND="192.168.49.2 backend.k8s.local"

# Verifica se a entrada já existe
if ! grep -q "$ENTRY_FRONTEND" "$HOSTS_FILE"; then
  echo "$ENTRY_FRONTEND" | sudo tee -a "$HOSTS_FILE"
fi

if ! grep -q "$ENTRY_BACKEND" "$HOSTS_FILE"; then
  echo "$ENTRY_BACKEND" | sudo tee -a "$HOSTS_FILE"
fi

echo "Entradas no /etc/hosts configuradas."
