import requests
import time
import random
from datetime import datetime

ID = 3
URL = f"http://localhost:8080/tags/posicao/{ID}"

def gerar_dados():
    return {
        "xCoord": round(random.uniform(0, 10), 2),
        "yCoord": round(random.uniform(0, 10), 2),
        "timestamp": datetime.now().isoformat()
    }

falhas_consecutivas = 0

while True:
    dados = gerar_dados()
    try:
        resposta = requests.post(URL, json=dados, timeout=5)

        if resposta.status_code == 200:
            print(f"✅ Enviado: {dados} | Resposta: {resposta.text}")
            falhas_consecutivas = 0  # Zera contador de falhas
        else:
            print(f"⚠️ Erro HTTP {resposta.status_code}: {resposta.text}")
            falhas_consecutivas += 1

    except requests.exceptions.Timeout:
        print("⏱️ Timeout: O servidor demorou demais para responder.")
        falhas_consecutivas += 1
    except requests.exceptions.ConnectionError:
        print("🔌 Erro de conexão: Não foi possível se conectar à API.")
        falhas_consecutivas += 1
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        falhas_consecutivas += 1

    # Se ocorrerem muitas falhas, aguarde mais tempo antes de tentar novamente
    if falhas_consecutivas >= 3:
        print("⚠️ Muitas falhas consecutivas. Aguardando 30 segundos...")
        time.sleep(30)
    else:
        time.sleep(5)
