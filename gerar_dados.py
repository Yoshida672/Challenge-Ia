import requests
import time
import random
from datetime import datetime

# ID da moto (UWB)
TAG_ID = 2

# Controle de falhas consecutivas
falhas_consecutivas = 0

# Estado inicial (posição aleatória dentro do mapa)
estado = {"x": random.uniform(0, 10), "y": random.uniform(0, 10)}

def mover_tag():
    """Simula um movimento suave da moto"""
    movimento = random.choice(["cima", "baixo", "esquerda", "direita"])
    passo = round(random.uniform(0.05, 0.3), 2)  # movimento pequeno e realista

    if movimento == "cima":
        estado["y"] += passo
    elif movimento == "baixo":
        estado["y"] -= passo
    elif movimento == "direita":
        estado["x"] += passo
    else:
        estado["x"] -= passo

    # Mantém dentro dos limites do mapa
    estado["x"] = max(0, min(10, estado["x"]))
    estado["y"] = max(0, min(10, estado["y"]))

    return {
        "xCoord": round(estado["x"], 2),
        "yCoord": round(estado["y"], 2),
        "timestamp": datetime.now().isoformat()
    }

# Loop principal
while True:
    URL = f"http://ping-mottu.azurewebsites.net/api/tags/posicao/{TAG_ID}"
    dados = mover_tag()

    try:
        resposta = requests.post(URL, json=dados, headers={"Content-Type": "application/json"}, timeout=5)

        if resposta.status_code == 200:
            print(f"✅ Tag {TAG_ID} enviada com sucesso: {dados}")
            falhas_consecutivas = 0
        else:
            print(f"⚠️ Tag {TAG_ID} erro HTTP {resposta.status_code}: {resposta.text}")
            falhas_consecutivas += 1

    except requests.exceptions.Timeout:
        print(f"⏱️ Tag {TAG_ID} timeout")
        falhas_consecutivas += 1
    except requests.exceptions.ConnectionError:
        print(f"🌐 Tag {TAG_ID} erro de conexão (servidor offline?)")
        falhas_consecutivas += 1
    except Exception as e:
        print(f"❌ Tag {TAG_ID} erro inesperado: {e}")
        falhas_consecutivas += 1

    # Se houver muitas falhas, espera mais tempo antes de tentar novamente
    if falhas_consecutivas >= 3:
        print(f"🚫 Tag {TAG_ID} com muitas falhas consecutivas. Aguardando 30s...\n")
        time.sleep(30)
    else:
        time.sleep(1.5)  # intervalo entre cada envio
