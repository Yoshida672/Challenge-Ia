import paho.mqtt.client as mqtt
import json
import random
import time
import requests
from datetime import datetime, timezone
from paho.mqtt.client import CallbackAPIVersion

broker = "broker.hivemq.com"
topic = "simulador/uwb/localizacao"

client = mqtt.Client(client_id="SimuladorUWB", callback_api_version=CallbackAPIVersion.VERSION2)
client.connect(broker)

GAS_URL = "https://script.google.com/macros/s/AKfycbyro7RNZVn09eTBeoJaUQaSuPi3wUaEXbPlvMkeWPhICFlqcnH2RAs0AbMo-LRXIlKk/exec"

# Lista de ESPs/tags
tags = ["UWB-001", "UWB-002","UWB-003"]  # Adicione quantos quiser

# Estado atual das tags (para atualizar)
estado_tags = {tag: None for tag in tags}

def simular_dado(tag_id):
    return {
        "acao": "update_or_create",  # identifica ação de update no Apps Script
        "tagId": tag_id,
        "x": round(random.uniform(0, 10), 2),
        "y": round(random.uniform(0, 10), 2),
        "z": 0.0,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

while True:
    for tag in tags:
        dado = simular_dado(tag)
        estado_tags[tag] = dado  # atualiza estado interno
        mensagem = json.dumps(dado)

        # Envia via MQTT
        try:
            client.publish(topic, mensagem)
            print(f"MQTT: {mensagem}")
        except Exception as e:
            print(f"Erro MQTT: {e}")

        # Envia para Google Sheets
        try:
            response = requests.post(GAS_URL, json=dado)
            if response.status_code == 200:
                print(f"Google Sheets: {response.text}")
            else:
                print(f"Sheets: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Erro Sheets: {e}")

    time.sleep(2)
