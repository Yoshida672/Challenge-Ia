# Simulador de Localização com UWB (DWM1001)

Este projeto simula a localização de múltiplas tags UWB em um pátio com base em um sistema como o DWM1001-Dev.

## 👥 Alunos

- Eric Issamu de Lima Yoshida  
- Gustavo Matias Teixeira  
- Gustavo Monção

## 🎯 Objetivo

Simular a movimentação de motos em um pátio com até 100 veículos, utilizando dados de posição `x`, `y`, `z` e `timestamp`, como se fossem provenientes de módulos UWB físicos. Os dados são enviados via MQTT e registrados automaticamente em uma planilha Google Sheets.


## Video de Execução

[YOUTUBE](https://youtube.com/playlist?list=PLsjNwOw0FQHtjzT8JylgARE2fG_KbPi0e&si=yDs1q1l8r8AkGISD)

## ▶️ Como executar

### 1. Instale as dependências Python

```bash
pip install paho-mqtt requests
```

### 2. Rode o script de simulação

```bash
python mqtt_emulador.py
```

> Isso enviará dados para o broker MQTT e também para o Google Sheets.

## 📝 Configuração do Google Sheets

### 1. Crie uma planilha no Google Sheets com uma aba chamada exatamente: `Dados`

### 2. Abra o Editor de Scripts

- Vá em **Extensões > Apps Script**

### 3. Cole o código abaixo:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Dados");
  if (!sheet) {
    return ContentService.createTextOutput("Aba 'Dados' não encontrada.");
  }

  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp,
    data.tagId,
    data.x,
    data.y,
    data.z
  ]);

  return ContentService.createTextOutput("OK");
}
```

### 4. Implemente (Deploy)

- Clique em **Implantar > Nova implantação**
- Clique em **Selecionar tipo > Aplicativo da web**
- Preencha:
  - **Descrição**: Envio de dados UWB
  - **Executar como**: Você mesmo
  - **Quem tem acesso**: Qualquer pessoa (anônima)
- Clique em **Implantar**
- Copie o **URL da Web** gerado

### 5. Atualize o script Python com a URL

No `mqtt_emulador.py`, altere a variável `GAS_URL` para a que você copiou:

```python
GAS_URL = "https://script.google.com/macros/s/SEU_SCRIPT_ID/exec"
```

## 🔧 Tecnologias

- Python 3.11
- JSON
- MQTT (via HiveMQ Broker)
- Google Apps Script
- Google Sheets

## 📊 Exemplo de dados enviados

```json
{
  "tagId": "TAG_SIMULADA",
  "x": 3.67,
  "y": 4.68,
  "z": 0.0,
  "timestamp": "2025-05-26T00:38:23.718875+00:00"
}
```
