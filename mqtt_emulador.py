import paho.mqtt.client as mqtt
import json
import random
import time
import requests
from datetime import datetime, timezone
from paho.mqtt.client import CallbackAPIVersion

# Configurações do broker MQTT e tópico
broker = "broker.hivemq.com"
topic = "simulador/uwb/localizacao"

# Inicializa o cliente MQTT com ID e versão de callback
client = mqtt.Client(client_id="SimuladorUWB", callback_api_version=CallbackAPIVersion.VERSION2)

try:
    client.connect(broker)
    print(f"Conectado ao broker MQTT: {broker}")
except Exception as e:
    print(f"Erro ao conectar no MQTT: {e}")
    exit(1)

# URL do Webhook do Google Apps Script (deve estar publicado como Web App)
GAS_URL = "https://script.google.com/macros/s/AKfycbwcP64Y3c8OsNU5E0AuaQRKceuIM1Da2yThTRKb28xRfAKzdbUspQeSmBewDfI2tVqf/exec"

# Função para simular dados de posição
def simular_dado():
    return {
        "tagId": "TAG_SIMULADA",
        "x": round(random.uniform(0, 10), 2),
        "y": round(random.uniform(0, 10), 2),
        "z": 0.0,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# Loop principal de envio
while True:
    dado = simular_dado()
    mensagem = json.dumps(dado)

    # Envia via MQTT
    try:
        client.publish(topic, mensagem)
        print(f"✅ Enviado via MQTT: {mensagem}")
    except Exception as e:
        print(f"❌ Erro ao enviar via MQTT: {e}")

    # Envia para o Google Sheets via POST
    try:
        response = requests.post(GAS_URL, json=dado)
        if response.status_code == 200:
            print(f"✅ Enviado para Google Sheets: {response.text}")
        else:
            print(f"⚠️ Resposta do Google Sheets: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Erro ao enviar para Sheets: {e}")

    # Aguarda 2 segundos antes de enviar o próximo
    time.sleep(2)
