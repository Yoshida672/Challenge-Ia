import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Animated,
  Image,
  Platform,
} from 'react-native';

/**
 * PatioPlanta - componente em JS que:
 * - busca tags via API,
 * - posiciona no mapa com clamp (não sai do pátio),
 * - usa Animated para movimentação suave e responsiva,
 * - mostra ícone de moto (se existir assets/moto.png) ou emoji,
 * - calcula status (Inativo / Fora do Pátio / Em Movimento / Parado).
 *
 * Ajuste MAX_X / MAX_Y conforme seu sistema.
 */

const FETCH_URL = 'http://ping-mottu.azurewebsites.net/api/tags'; // ajuste se precisar
const MAX_X = 11.5;  // antes era 10
const MAX_Y = 11.5;   // antes era 10

const POLLING_MS = 1000; // 1s (pode reduzir se precisar)
const MARKER_SIZE = 32;

const PatioPlanta = () => {
  const [tags, setTags] = useState([]); // dados vindos da API
  const [imageLayout, setImageLayout] = useState(null); // { width, height }
  const animsRef = useRef({}); // { [tagId]: { x: Animated.Value, y: Animated.Value } }
  const lastPosRef = useRef({}); // { [tagId]: { x, y, t } } para calcular velocidade

  // tenta carregar ícone de moto (opcional)
  let motoIcon = null;
  try {
    motoIcon = require('./assets/moto.png');
  } catch (e) {
    motoIcon = null;
  }

  // Busca tags
  const fetchTags = async () => {
    try {
      const res = await fetch(FETCH_URL);
      const json = await res.json();
      // sua API parece retornar em json.content
      const data = json.content || json || [];
      // atualiza estado (array de tags)
      setTags(data);
    } catch (err) {
      console.warn('Erro fetchTags', err);
    }
  };

  useEffect(() => {
    fetchTags();
    const id = setInterval(fetchTags, POLLING_MS);
    return () => clearInterval(id);
  }, []);

  // cria Animated.Value para cada tag nova
  useEffect(() => {
    tags.forEach(t => {
      if (!animsRef.current[t.id]) {
        animsRef.current[t.id] = {
          x: new Animated.Value(-100), // inicia fora da tela
          y: new Animated.Value(-100),
        };
      }
    });
  }, [tags]);

  // map coords (0..MAX_X / 0..MAX_Y) -> pixel left/top na ImageBackground (medido em onLayout)
  // aplica clamp para evitar sair dos limites
  const coordsToPixel = (x, y) => {
    if (!imageLayout) return { left: -50, top: -50 };

    const w = imageLayout.width;
    const h = imageLayout.height;

    // Normal mapping: (0..MAX_X) -> (0..w)
const left = ((x / MAX_X) * w) - 5; // desloca 5px à esquerda
const top = ((y / MAX_Y) * h) - 8;  // desloca 8px para cima


    // clamp (mantendo marcador dentro da imagem)
    const clampedLeft = Math.max(0, Math.min(w - MARKER_SIZE, left));
    const clampedTop = Math.max(0, Math.min(h - MARKER_SIZE, top));

    return { left: clampedLeft, top: clampedTop };
  };

  // calcula status com base em histórico simples: velocidade e se dentro do pátio
  // retorna { statusText, color }
  const evaluateStatus = (tag, newPx) => {
    // sem posição
    if (!tag.localizacao) return { statusText: 'Inativo', color: '#e74c3c' };

    const w = imageLayout ? imageLayout.width : null;
    const h = imageLayout ? imageLayout.height : null;

    // detecta fora do pátio se coordenadas mapeadas estiverem fora dos limites reais
    if (w && h) {
      if (newPx.left <= 0 || newPx.top <= 0 || newPx.left >= (w - MARKER_SIZE) || newPx.top >= (h - MARKER_SIZE)) {
        // porém se coincidir exatamente com borda, vamos tratar como "na borda" — aqui considera Fora
        // marque como FORA
        return { statusText: 'Fora do Pátio', color: '#f39c12' };
      }
    }

    // velocidade: usa lastPosRef
    const id = tag.id;
    const prev = lastPosRef.current[id];
    const now = Date.now();

    const x = tag.localizacao.xCoord;
    const y = tag.localizacao.yCoord;

    if (prev && prev.t) {
      const dt = (now - prev.t) / 1000; // s
      if (dt <= 0) {
        return { statusText: 'Desconhecido', color: '#95a5a6' };
      }
      const dx = x - prev.x;
      const dy = y - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy); // nas mesmas unidades que coords
      const speed = dist / dt; // unidades/s

      // thresholds (ajustáveis)
      if (speed > 0.4) { // >0.4 u/s = movimento
        return { statusText: 'Em Movimento', color: '#2ecc71' };
      } else {
        return { statusText: 'Parado', color: '#3498db' };
      }
    } else {
      // sem histórico: considera Parado (mas ativo)
      return { statusText: 'Ativo', color: '#3498db' };
    }
  };

  // atualiza animações sempre que tags ou layout mudam
  useEffect(() => {
    if (!imageLayout) return;

    tags.forEach(tag => {
      const anim = animsRef.current[tag.id];
      if (!anim) return;

      if (!tag.localizacao) {
        // sem posição: manda para fora (legenda)
        Animated.timing(anim.x, {
          toValue: -50,
          duration: 150,
          useNativeDriver: false,
        }).start();
        Animated.timing(anim.y, {
          toValue: -50,
          duration: 150,
          useNativeDriver: false,
        }).start();

        // atualiza histórico para null
        lastPosRef.current[tag.id] = undefined;
        return;
      }

      // mapeia coords para pixel
      const { left, top } = coordsToPixel(tag.localizacao.xCoord, tag.localizacao.yCoord);

      // calcula status e salva histórico
      const prev = lastPosRef.current[tag.id];
      const now = Date.now();
      // atualiza histórico antes de animar para próxima iteração usar esses dados
      lastPosRef.current[tag.id] = {
        x: tag.localizacao.xCoord,
        y: tag.localizacao.yCoord,
        t: now,
      };

      // Para evitar "lag" quando os dados chegam mais rápido que a animação:
      // primeiro setamos o valor atual do Animated (caso esteja muito atrasado), depois executamos uma animação curta.
      // Animated.Value oferece setValue().
      anim.x.stopAnimation(); // para animações atuais
      anim.y.stopAnimation();

      // se a diferença for grande, faz setValue imediato (teletransporte suave)
      // caso contrário, anima suavemente
      let doImmediate = false;
      try {
        anim.x.setValue(anim.x.__getValue()); // leitura defensiva (nem sempre documentado)
        anim.y.setValue(anim.y.__getValue());
      } catch (e) {
        // algumas impls não expõem __getValue; ignorar
      }

      // agora anima para o novo ponto
      Animated.parallel([
        Animated.timing(anim.x, {
          toValue: left,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(anim.y, {
          toValue: top,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    });
  }, [tags, imageLayout]);

  // separa com/sem posição
  const withPos = tags.filter(t => t.localizacao);
  const withoutPos = tags.filter(t => !t.localizacao);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={require('./assets/mapa-patio.png')}
          style={styles.planta}
          resizeMode="contain"
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            // Guardar tamanho real do espaço onde os markers serão posicionados
            setImageLayout({ width, height });
          }}
        >
          {/* Render animated markers */}
          {tags.map(tag => {
            const anim = animsRef.current[tag.id];
            if (!anim) return null;

            // Se a tag não tiver posição, ela ficará fora (legenda)
            let markerColor = '#e74c3c'; // vermelho padrão para inativo
            let statusText = 'Inativo';

            if (tag.localizacao) {
              const pixel = coordsToPixel(tag.localizacao.xCoord, tag.localizacao.yCoord);
              const evalRes = evaluateStatus(tag, pixel);
              markerColor = evalRes.color;
              statusText = evalRes.statusText;
            }

            // estilo do marker animado: left/top são Animated.Values
            const markerStyle = {
              position: 'absolute',
              left: Animated.add(anim.x, 0), // Animated.Value
              top: Animated.add(anim.y, 0),
              width: MARKER_SIZE,
              height: MARKER_SIZE,
              alignItems: 'center',
              justifyContent: 'center',
            };

            return (
              <Animated.View key={tag.id} style={markerStyle}>
                {/* se tiver ícone de moto, exibe; se não, usa um círculo colorido com emoji/código */}
                {motoIcon ? (
                  <Image
                    source={motoIcon}
                    style={{
                      width: MARKER_SIZE,
                      height: MARKER_SIZE,
                      tintColor: markerColor === '#e74c3c' ? undefined : undefined, // se quiser colorir ícone, mexa aqui
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={[styles.markerCircle, { backgroundColor: markerColor }]}>
                    <Text style={styles.markerEmoji}>🏍️</Text>
                  </View>
                )}

                {/* label pequena abaixo do marker mostrando código / status */}
                <View style={styles.markerLabel}>
                  <Text style={styles.markerLabelText}>{tag.codigo}</Text>
                  <Text style={styles.markerStatusText}>{statusText}</Text>
                </View>
              </Animated.View>
            );
          })}
        </ImageBackground>
      </View>

      {/* legenda / lista de tags sem posição */}
      {withoutPos.length > 0 && (
        <View style={styles.legendaContainer}>
          <Text style={styles.legendaTitulo}>Tags inativas (sem posição):</Text>
          <ScrollView style={styles.scrollInativas}>
            {withoutPos.map(t => (
              <View key={t.id} style={styles.itemInativo}>
                <View style={styles.bolinhaInativa} />
                <Text style={styles.nomeTag}>{t.codigo}</Text>
                <Text style={styles.smallStatus}>Inativo</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default PatioPlanta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 8,
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: 420,
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  planta: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  markerCircle: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: MARKER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerEmoji: {
    fontSize: 16,
  },
  markerLabel: {
    position: 'absolute',
    top: MARKER_SIZE + 2,
    alignItems: 'center',
  },
  markerLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#222',
  },
  markerStatusText: {
    fontSize: 9,
    color: '#666',
  },
  legendaContainer: {
    marginTop: 12,
    backgroundColor: '#fff',
    width: '95%',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  legendaTitulo: {
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  scrollInativas: {
    maxHeight: 140,
  },
  itemInativo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  bolinhaInativa: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
    marginRight: 10,
  },
  nomeTag: {
    color: '#333',
    fontSize: 14,
    flex: 1,
  },
  smallStatus: {
    fontSize: 12,
    color: '#666',
  },
});
