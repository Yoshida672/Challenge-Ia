import paho.mqtt.client as mqtt
import json
import random
import time

from datetime import datetime, timezone


from paho.mqtt.client import CallbackAPIVersion

broker = "broker.hivemq.com"
topic = "simulador/uwb/localizacao"

client = mqtt.Client(client_id="SimuladorUWB", callback_api_version=CallbackAPIVersion.VERSION2)
client.connect(broker)

def simular_dado():
    return {
        "tagId": "TAG_SIMULADA",
        "x": round(random.uniform(0, 10), 2),
        "y": round(random.uniform(0, 10), 2),
        "z": 0.0,
        "timestamp": datetime.now(timezone.utc).isoformat() 
    }


while True:
    mensagem = json.dumps(simular_dado())
    client.publish(topic, mensagem)
    print(f"Enviado: {mensagem}")
    time.sleep(2)
