import requests
import time
import random
from datetime import datetime

TAGS = [1, 2, 3]  # IDs dos ESPs/tags
falhas_consecutivas = {tag: 0 for tag in TAGS}  # contador por tag
estado_tags = {tag: None for tag in TAGS}  # último estado por tag

def gerar_dados():
    return {
        "xCoord": round(random.uniform(0, 10), 2),
        "yCoord": round(random.uniform(0, 10), 2),
        "timestamp": datetime.now().isoformat()
    }

while True:
    for ID in TAGS:
        URL = f"http://localhost:8080/tags/posicao/{ID}"
        dados = gerar_dados()
        estado_tags[ID] = dados

        try:
            resposta = requests.post(URL, json=dados, timeout=5)

            if resposta.status_code == 200:
                print(f"Tag {ID} enviada com sucesso: {dados} | Resposta: {resposta.text}")

                falhas_consecutivas[ID] = 0
            else:
                print(f"Tag {ID} erro inesperado: {e}")
                falhas_consecutivas[ID] += 1

        except requests.exceptions.Timeout:
            print(f"Tag {ID} timeout")
            falhas_consecutivas[ID] += 1
        except requests.exceptions.ConnectionError:
            print(f"Tag {ID} erro de conexão")
            falhas_consecutivas[ID] += 1
        except Exception as e:
            print(f"Tag {ID} erro inesperado: {e}")
            falhas_consecutivas[ID] += 1

        # Se muitas falhas consecutivas, espera mais
        if falhas_consecutivas[ID] >= 3:
            print(f"Tag {ID} muitas falhas consecutivas. Aguardando 30s...")
            time.sleep(30)
        else:
            time.sleep(1)  # intervalo entre envios por tag
