# ⚽ Dashboard de Jugadores - Top Club Soccer

Dashboard interactivo para gestionar jugadores de fútbol, analizar estadísticas en tiempo real y descubrir talentos.

![Dashboard Preview](https://via.placeholder.com/800x400/ff6b35/ffffff?text=Dashboard+de+Jugadores)

## 📋 Descripción del Proyecto

Aplicación web desarrollada con **React + Vite** que permite:
- 🔍 Buscar jugadores en tiempo real con sistema de debounce
- ⭐ Marcar jugadores favoritos con persistencia en localStorage
- 📊 Visualizar estadísticas calculadas dinámicamente
- 🎨 Alternar entre modo claro y oscuro
- 📄 Paginar resultados de forma dinámica
- ↕️ Ordenar columnas ascendente/descendente
- 🎯 Resaltar filas pares/impares
- 📜 Consultar historial de búsquedas recientes

---

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js (v16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <URL_DEL_REPOSITORIO>
cd dashboard-jugadores
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

5. **Compilar para producción**
```bash
npm run build
```

---

## 🎣 Hooks Utilizados

### **1. useState**
- **Propósito**: Gestionar estados locales de los componentes
- **Usos en el proyecto**:
  - Control del término de búsqueda
  - Estado del modo oscuro/claro
  - Gestión de favoritos
  - Control de paginación (página actual, items por página)
  - Estado del modal (abierto/cerrado)
  - Configuración de ordenamiento de columnas

### **2. useEffect**
- **Propósito**: Manejar efectos secundarios y sincronizaciones
- **Usos en el proyecto**:
  - Implementación del debounce en la búsqueda (300ms)
  - Carga inicial de datos desde localStorage
  - Persistencia de preferencias del usuario
  - Actualización del historial de búsquedas
  - Reset automático de paginación al filtrar

### **3. useMemo**
- **Propósito**: Optimizar cálculos costosos y evitar re-renders innecesarios
- **Usos en el proyecto**:
  - Cálculo de estadísticas en tiempo real (promedios, totales)
  - Filtrado y ordenamiento de jugadores
  - Paginación de resultados

---

## 🗂️ Estructura del Proyecto
```
dashboard-jugadores/
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Barra de búsqueda con historial
│   │   ├── ThemeToggle.jsx        # Toggle modo oscuro/claro
│   │   ├── StatsPanel.jsx         # Panel de estadísticas
│   │   ├── PlayerTable.jsx        # Tabla de jugadores
│   │   ├── PlayerRow.jsx          # Fila individual de jugador
│   │   ├── Modal.jsx              # Modal de detalles
│   │   └── Pagination.jsx         # Controles de paginación
│   ├── data/
│   │   └── playersData.js         # Datos de los jugadores
│   ├── App.jsx                    # Componente principal
│   ├── App.css                    # Estilos globales
│   ├── main.jsx                   # Punto de entrada
│   └── index.css                  # Reset CSS
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── APRENDIZAJE.md
```

---

## 📸 Capturas de Pantalla

### Modo Claro
![Modo Claro](https://via.placeholder.com/800x400/ffffff/333333?text=Modo+Claro)

### Modo Oscuro
![Modo Oscuro](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=Modo+Oscuro)

### Modal de Detalles
![Modal](https://via.placeholder.com/600x400/ff6b35/ffffff?text=Modal+Jugador)

### Búsqueda con Historial
![Búsqueda](https://via.placeholder.com/800x200/ffffff/333333?text=Historial+de+Búsqueda)

---

## 🎨 Características Principales

### 🔍 Sistema de Búsqueda Inteligente
- Búsqueda en tiempo real con debounce de 300ms
- Filtrado por nombre de jugador
- Historial de las últimas 5 búsquedas
- Contador de resultados encontrados

### ⭐ Sistema de Favoritos
- Marcado/desmarcado de jugadores favoritos
- Persistencia en localStorage
- Filtro para mostrar solo favoritos
- Contador visible de favoritos guardados

### 📊 Estadísticas en Tiempo Real
- Total de jugadores mostrados
- Promedio de goles
- Promedio de edad
- Jugador con más goles (máximo goleador)
- Cálculos optimizados con useMemo

### 🎨 Personalización Visual
- Modo oscuro/claro persistente
- Resaltado de filas pares/impares
- Animaciones suaves en interacciones
- Diseño responsive para móviles

### 📄 Paginación Completa
- Selector de items por página (5, 10, 20)
- Navegación: Primera, Anterior, Números, Siguiente, Última
- Información de registros mostrados
- Reset automático al aplicar filtros

### ↕️ Ordenamiento Dinámico
- Click en cualquier columna para ordenar
- Tres estados: sin ordenar → ascendente → descendente
- Indicadores visuales con flechas
- Funciona con texto y números

---

## 👥 Integrantes del Proyecto

- **[JUAN PABLO SALAZAR]**
- **[BRAYAN ANDRES SANCHEZ]**

---

## 🔗 Enlaces

- **Deploy en Netlify/Vercel**: [URL del deploy]
- **Repositorio**: [URL del repositorio]

---

## 🛠️ Tecnologías Utilizadas

- **React 18** - Librería de interfaz de usuario
- **Vite** - Build tool y dev server
- **CSS3** - Estilos con variables CSS y animaciones
- **LocalStorage API** - Persistencia de datos del cliente

---


---

## 🤖 Herramienta de IA Utilizada

**Claude 3.7 Sonnet** (Anthropic) - Asistencia en la estructura del código, implementación de hooks y mejores prácticas de React.

---
## 🙏 Agradecimientos

- Profesor: [JACKSON FLOREZ]
- Institución: [UNIVERSIDAD DE MANIZALES]

---

**Desarrollado con ❤️ y ⚽ por [BRAYAN SANCHEZ Y JUAN PABLO SALAZAR]**