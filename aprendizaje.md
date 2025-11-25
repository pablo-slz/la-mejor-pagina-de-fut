# Documento de Aprendizaje - Hooks de React

Este papel explica la base de los Hooks de React que usamos en la Dashboard de Jugadores.

## a) Que es useState y cuando usarlo?

### La teoria (pa no perdernos)

useState es un Hook de React que te deja meterle estado a los componentes que son solo funciones. Antes de esto, solo los componentes de clase podian "acordarse" de algo.

**Como se ve:**
```javascript
const [elValor, laFuncionParaCambiarlo] = useState(valorConElQueArranca);
```

- `elValor`: Lo que tienes ahora mismo.
- `laFuncionParaCambiarlo`: La forma correcta de actualizar el valor.
- `valorConElQueArranca`: Con que numero/texto/cosa empieza.

### Cuando lo usas?

- Cuando necesitas que un componente se acuerde de info entre una carga y otra.
- Para guardar datos que cambian cuando el usuario hace algo (un click, escribir).
- Para prender o apagar cosas visuales (modales, formularios, etc.).

### Ejemplo 1: El control del modal
```javascript
// En App.jsx - lineas 19-20
const [selectedPlayer, setSelectedPlayer] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

// Funcion para abrir el modal
const handleOpenModal = (player) => {
  setSelectedPlayer(player);  // Guardamos que jugador le dio click
  setIsModalOpen(true);       // Abrimos esa ventana emergente
};
```

**Por que useState aqui?**
- Necesitamos saber a que jugador le dieron click.
- El modal necesita saber si esta abierto o cerrado.
- Estos valores cambian todo el tiempo con el usuario.

### Ejemplo 2: La busqueda
```javascript
// En App.jsx - lineas 13-14
const [searchTerm, setSearchTerm] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

// En SearchBar.jsx
<input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

**Por que dos estados para la busqueda?**
- `searchTerm`: Lo que el usuario escribe ahi mismo, en tiempo real.
- `debouncedSearch`: La busqueda que se activa con un retraso de 300ms, para que no se ahogue el filtro con cada letra.

Cada tecla que pulsa el usuario actualiza searchTerm al tiro.

### Ejemplo 3: El ordenamiento
```javascript
// En App.jsx - lineas 24-27
const [sortConfig, setSortConfig] = useState({
  key: null,
  direction: 'none'
});
```

**Por que un objeto como estado?**
- Agrupas cosas que van juntas (la columna y si es ascendente o descendente).
- Es mas facil el ciclo: no ordenado -> ascendente -> descendente.
- Con un solo setState cambias las dos propiedades.

## b) Que es useEffect y sus casos de uso?

### La teoria (pa la vida)

useEffect te deja correr codigo despues de que el componente ya se pinto. Es para cosas "de lado" o que tienen que ver con el mundo exterior:

- Llamar a APIs (traer datos).
- Escuchar eventos (como el mouse o el teclado).
- Tocar el DOM (el arbol de elementos de la pagina).
- Sincronizar con cosas de afuera (el localStorage, timers).

**Como se ve:**
```javascript
useEffect(() => {
  // El codigo del efecto
  
  return () => {
    // La limpieza (el "cleanup")
  };
}, [dependencias]);
```

### El Array de Dependencias - Tres maneras:

**1. Sin array [] - Corre cada vez que se repinta el componente**
```javascript
useEffect(() => {
  console.log('Me prendo en cada render');
});
```

Ojo: Esto puede volverse un loop infinito si no sabes lo que haces.

**2. Array vacio [] - Corre una sola vez al principio**
```javascript
useEffect(() => {
  console.log('Solo me prendo cuando carga la pagina');
}, []);
```

Perfecto para: Cargar los datos iniciales o conectarse a un servicio.

**3. Con dependencias [dep] - Corre cuando algo cambia**
```javascript
useEffect(() => {
  console.log('Me prendo cuando searchTerm cambia');
}, [searchTerm]);
```

Perfecto para: Reaccionar a cambios especificos en tus estados o props.

### Ejemplo 1: Cargar cosas del localStorage (una sola vez)
```javascript
// En App.jsx - lineas 39-47
useEffect(() => {
  const savedDarkMode = localStorage.getItem('darkMode');
  // ... mas cosas guardadas
  
  if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  // ... mas setStates
}, []); // Array vacio = solo al montar, ya esta!
```

**Por que useEffect aqui?**
- Queremos traer los datos guardados justo cuando la app arranca.
- Solo hay que hacerlo una vez.
- No depende de nada, por eso el [] vacio.

### Ejemplo 2: Guardar en localStorage (cuando cambia algo)
```javascript
// En App.jsx - lineas 50-53
useEffect(() => {
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
  document.body.className = darkMode ? 'dark-mode' : '';
}, [darkMode]); // Corre cada vez que darkMode cambia
```

**Por que useEffect aqui?**
- Queremos que el localStorage este sincronizado con nuestro estado.
- Solo guardamos si darkMode se prende o se apaga.
- Aprovechamos para cambiar la clase del body (tema oscuro).

### Ejemplo 3: El Cleanup Function (el famoso Debounce)
```javascript
// En App.jsx - lineas 31-36
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);

  return () => clearTimeout(timer); // CLEANUP: Cancela el anterior
}, [searchTerm]);
```

**Que hace el cleanup?**
- Escribes "M" -> Se prende un timer de 300ms.
- Escribes "Me" antes de 300ms -> Se mata/cancela el timer anterior y se prende uno nuevo.
- Escribes "Mes" -> Se mata/cancela el anterior y se prende uno nuevo.
- Dejas de escribir -> Ahora si, despues de 300ms, se actualiza debouncedSearch.

El resultado: Solo buscamos cuando el usuario hace una pausa, no con cada letra que escribe.

## c) Que es useMemo y cuando usarlo?

### La teoria (pa optimizar)

useMemo lo que hace es guardar en memoria (cachear) el resultado de un calculo que cuesta mucho, y solo lo vuelve a hacer si algo de lo que depende cambia.

**Como se ve:**
```javascript
const valorGuardado = useMemo(() => {
  return laCuentaQueEsLarga();
}, [dependencias]);
```

### Cuando lo usas?

- Si tienes calculos super complejos que se demoran.
- Para filtrar u ordenar arrays gigantes.
- Para evitar que los componentes hijos se repinten sin necesidad.

### Diferencia con useCallback

| useMemo | useCallback |
|---------|-------------|
| Guarda el resultado (un valor) | Guarda la funcion en si |
| useMemo(() => unValor, [deps]) | useCallback(() => {hacerAlgo}, [deps]) |
| Te da el valor calculado | Te da la funcion para llamarla |

### Ejemplo 1: El Filtro y Ordenamiento Optimizado
```javascript
// En App.jsx - lineas 93-124
const filteredAndSortedPlayers = useMemo(() => {
  let filtered = [...playersData];
  // ... logica de filtrar por busqueda
  // ... logica de filtrar por favoritos
  // ... logica de ordenar
  return filtered;
}, [debouncedSearch, showOnlyFavorites, favorites, sortConfig]);
```

**Por que useMemo aqui?**
- Tenemos que filtrar y ordenar los datos. Esto es un proceso largo.
- Si no usamos useMemo, esta operacion se haria cada vez que el componente se repinta (por ejemplo, si mueves el mouse).
- Con useMemo, solo se vuelve a calcular si cambia la busqueda, los favoritos o el orden. Se ahorra mucha pega.

### Ejemplo 2: Calculo de Estadisticas
```javascript
// En App.jsx - lineas 127-154
const stats = useMemo(() => {
  const players = filteredAndSortedPlayers;
  
  const avgGoals = //... calculo de promedio de goles
  const avgAge = //... calculo de edad promedio
  const topScorer = //... calculo del goleador
  //... mas calculos
  
  return { /* todas las estadisticas */ };
}, [filteredAndSortedPlayers, favorites]);
```

**Por que useMemo aqui?**
- Calculamos siete estadisticas distintas.
- Esto incluye usar reduce() varias veces, lo que toma tiempo.
- Solo necesitamos recalcular si cambia la lista de jugadores (el filteredAndSortedPlayers) o los favoritos.

## d) Como funciona el cleanup en useEffect?

### La explicacion con el Debounce

El cleanup es una funcion que se corre para "limpiar la casa". Se ejecuta:
- Antes de correr el efecto la proxima vez.
- Cuando el componente se va de la pantalla (se desmonta).
```javascript
// En App.jsx - lineas 30-36
useEffect(() => {
  // 1. EFECTO: Programamos el timer
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);

  // 2. CLEANUP: Cancelamos el timer anterior
  return () => clearTimeout(timer);
}, [searchTerm]);
```

### Que pasaria SIN cleanup?
```javascript
// ESTO ESTA MAL
useEffect(() => {
  setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);
  // No hay return con clearTimeout!
}, [searchTerm]);
```

**El desastre:**
- Escribes "Messi" (5 letras).
- Se prenden 5 timers al mismo tiempo.
- Despues de 300ms, se ejecutan las 5 busquedas.
- Perdida de recursos y la app se porta mal.

### Otros ejemplos de cleanup:

**1. Suscripcion a eventos (dejas de escuchar)**
```javascript
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []); // Cuando te vas, apagas el listener
```

**2. Conexiones WebSocket (cierras el socket)**
```javascript
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080');
  
  return () => ws.close(); // Cuando te vas, cierras la conexion
}, []);
```

## e) Como funciona localStorage con React?

### La explicacion

localStorage es como una memoria del navegador que te deja guardar datos como si fueran solo strings y se quedan ahi aunque cierres el navegador.

**Las ordenes basicas:**
```javascript
// Guardar
localStorage.setItem('clave', 'valor');

// Leer
const valor = localStorage.getItem('clave');

// Eliminar
localStorage.removeItem('clave');
```

### Ejemplo del Proyecto: Guardar Favoritos
```javascript
// 1. CARGAR favoritos al arrancar
useEffect(() => {
  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
    setFavorites(JSON.parse(savedFavorites)); // Convertir String -> Array
  }
}, []); // Solo al prender

// 2. GUARDAR favoritos cada vez que cambian
useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites)); // Convertir Array -> String
}, [favorites]); // Cada vez que cambian los favoritos

// 3. La funcion de agregar/quitar
const handleToggleFavorite = (playerId) => {
  setFavorites(prev =>
    prev.includes(playerId)
      ? prev.filter(id => id !== playerId) // Quitar si ya esta
      : [...prev, playerId]               // Agregar si no esta
  );
};
```

### Por que JSON.stringify y JSON.parse?

localStorage solo acepta strings, pero nosotros trabajamos con arrays u objetos. Hay que convertirlos.
```javascript
// MAL
const favorites = [1, 2, 3];
localStorage.setItem('favorites', favorites); // Se guarda como "1,2,3" (texto feo)

// BIEN
const favorites = [1, 2, 3];
localStorage.setItem('favorites', JSON.stringify(favorites)); // Se guarda como "[1,2,3]" (texto JSON)

const recovered = JSON.parse(localStorage.getItem('favorites'));
// recovered es [1, 2, 3] (el array original)
```

### Patron de Inicializacion Inteligente

Para que no se vea un "parpadeo" cuando carga la app, puedes inicializar el estado leyendo del localStorage directamente:
```javascript
const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem('darkMode');
  return saved ? JSON.parse(saved) : false; // Si no hay nada, empieza en false
});

// Y luego sincronizas con un useEffect normal:
useEffect(() => {
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
}, [darkMode]);
```

**Ventaja:** El estado arranca con el valor correcto desde el inicio.

## El Resumen

### useState
- Para cosas que cambian por la interaccion del usuario.
- Para prender/apagar modales o menus.
- Para arrays/objetos, siempre usa ... (el spread operator) para copiarlos antes de cambiar algo.

### useEffect
- Para efectos secundarios (APIs, timers, localStorage).
- Super importante: pon las dependencias correctas en el array.
- Usa el return (el cleanup) para matar timers o desconectar suscripciones.

### useMemo
- Para calculos que son muy largos o con arrays grandes.
- Para optimizar filtros y ordenamientos.
- No abuses: usalo solo si notas que el performance esta lento.

### localStorage
- Solo guarda strings: tienes que usar JSON.stringify/parse.
- Usalo con useEffect para mantener todo sincronizado.
- Es perfecto para guardar preferencias o datos pequenos.

## 🤖 Herramienta de IA Utilizada

**Claude 3.7 Sonnet** (Anthropic) - Asistencia en la explicación de conceptos, ejemplos de código y mejores prácticas de React Hooks.

