# 🏗️ ARQUITECTURA SEO WRAPPED M26 — GUÍA DE DESARROLLO

## 1. ESTRUCTURA DE CARPETAS RECOMENDADA

```
resultados-m26/
├── data/
│   ├── seo-hierarchy.json          # Data normalizada jerárquica
│   └── raw/
│       └── SEO_Info__1_.xlsx       # Fuente original
│
├── src/
│   ├── components/
│   │   ├── views/
│   │   │   ├── RegionalView.jsx      # Vista raíz (ULA)
│   │   │   ├── CountryDetailView.jsx # Vista país
│   │   │   └── BrandDetailView.jsx   # Vista marca (hoja)
│   │   ├── shared/
│   │   │   ├── MetricCard.jsx        # Card reutilizable
│   │   │   ├── BrandBadge.jsx        # Badge interactivo
│   │   │   └── AnimatedNumber.jsx    # Contador animado
│   │   └── hooks/
│   │       ├── useHierarchy.js       # Navegación jerárquica
│   │       └── useAnimatedCounter.js # Animación de números
│   │
│   ├── utils/
│   │   ├── hierarchyBuilder.js       # Constructor recursivo
│   │   ├── metricsAggregator.js      # Agregación de datos
│   │   └── formatters.js             # Formatos USD, %, etc.
│   │
│   └── constants/
│       ├── hierarchy.js              # Mapeo país-marca
│       └── colors.js                 # Paleta de colores
│
├── scripts/
│   ├── parse-excel.py                # Parser Excel → JSON
│   └── validate-data.py              # Validación de integridad
│
├── index.html                        # Versión original (backup)
├── index-v2.html                     # Versión modular (USAR ESTA)
├── package.json                      # Dependencias (opcional)
└── README.md                         # Documentación
```

## 2. PATRONES CLAVE

### 2.1 RECURSIVIDAD JERÁRQUICA

```javascript
/* Patrón: Cada componente renderiza su próximo nivel */

RegionalView
  ↓ (usuario selecciona país)
CountryDetailView (recibe country)
  ↓ (usuario selecciona marca)
BrandDetailView (recibe brand + country)
  ↓ (usuario vuelve atrás)
CountryDetailView → RegionalView
```

**Ventaja**: No hay duplicación de lógica. Cada nivel sabe cómo navegar al siguiente.

### 2.2 PROP DRILLING CON CONTEXTO

**Actual** (index-v2.html): prop drilling es aceptable porque:
- Solo 3 niveles de profundidad
- Datos no cambian frecuentemente
- Menos complejidad de Context API

**Si escalas**: Usa React Context
```javascript
const HierarchyContext = createContext();
<HierarchyProvider>
  <RegionalView />
</HierarchyProvider>
```

### 2.3 AGREGACIÓN RECURSIVA DE DATOS

```javascript
function aggregateMetrics(data, level = 'region') {
  if (level === 'region') {
    // Sumar todas las métricas de todos los países
    return sumMetrics(Object.values(data.countries));
  } else if (level === 'country') {
    // Sumar todas las marcas del país
    return sumMetrics(Object.values(data.brands));
  } else {
    // Nivel brand: retornar datos como-están
    return data;
  }
}

function sumMetrics(items) {
  return items.reduce((acc, item) => ({
    impressions: (acc.impressions || 0) + (item.metrics?.impressions || 0),
    clicks: (acc.clicks || 0) + (item.metrics?.clicks || 0),
    // ... etc
  }), {});
}
```

## 3. ORDENAMIENTO ÓPTIMO DE DATOS

### 3.1 ESTRUCTURA JSON JERÁRQUICA (RECOMENDADA)

```json
{
  "name": "ULA Regional",
  "level": "region",
  "countries": {
    "CR": {
      "name": "Costa Rica",
      "code": "CR",
      "level": "country",
      "brands": {
        "Gollo": {
          "name": "Gollo",
          "code": "Gollo",
          "level": "brand",
          "color": "#00ff87",
          "metrics": {
            "M25": { "impressions": 38004663, "clicks": 5129000 },
            "M26": { "impressions": 62992730, "clicks": 6262497 }
          },
          "keywords": [
            { "k": "play 5", "cl": 7076, "p": 3.1 }
          ]
        }
      }
    }
  }
}
```

**Ventajas**:
- ✅ Refleja la UI exactamente
- ✅ Fácil de navegar recursivamente
- ✅ Sin datos duplicados
- ✅ Compatible con GraphQL (futuro)

### 3.2 CÓMO PARSEAR DEL EXCEL

```python
# Pseudocódigo: flujo de parseo
1. Leer hojas múltiples en paralelo
2. Normalizar columnas (mapear "Negocio" → "brand")
3. Agrupar por (País, Marca)
4. Construir árbol: país → marca → métricas
5. Validar: ¿todas las marcas están en HIERARCHY?
6. Guardar JSON
```

## 4. FLUJO DE DATOS

```
Excel (SEO_Info__1_.xlsx)
    ↓
scripts/parse-excel.py
    ↓
data/seo-hierarchy.json
    ↓
React App
    ↓ (fetch en useEffect)
RegionalView con datos actuales
```

## 5. CÓMO MANTENERLO ESCALABLE

### Agregar un nuevo país:

1. Editar `HIERARCHY` en constants:
```javascript
const HIERARCHY = {
  // ... existentes
  "PA": ["Curacao", "RadioShack"], // Panamá
};
```

2. Agregar flag:
```javascript
const COUNTRY_FLAGS = {
  // ... existentes
  "PA": "🇵🇦",
};
```

3. Re-parsear Excel (script)

✅ **El código no requiere cambios**.

### Agregar una nueva métrica (ej: "conversationValue"):

1. Incluir en Excel
2. Parser la agrega automáticamente en `brand.metrics`
3. En BrandDetailView:
```javascript
{metrics.conversationValue && (
  <MetricCard label="Conversation Value" value={metrics.conversationValue} />
)}
```

## 6. PERFORMANCE & OPTIMIZACIONES

### 6.1 Lazy Loading (si JSON es >5MB)
```javascript
const [data, setData] = useState(null);
useEffect(() => {
  fetch('data/seo-hierarchy.json')
    .then(r => r.json())
    .then(setData);
}, []);
```

### 6.2 Memoización de componentes
```javascript
const BrandDetailView = React.memo(({ brand, country }) => { ... });
```

### 6.3 Code splitting (si usas bundler)
```javascript
const RegionalView = lazy(() => import('./views/RegionalView'));
const CountryDetailView = lazy(() => import('./views/CountryDetailView'));
```

## 7. PRÓXIMOS PASOS RECOMENDADOS

1. **[AHORA]** → Usar index-v2.html con datos hardcodeados de ejemplo
2. **[MAÑANA]** → Completar parser Excel con datos reales
3. **[SEMANA]** → Migrar a React + Vite para mejor DX
4. **[FUTURO]** → GraphQL backend + caching

## 8. CHECKLIST DE VALIDACIÓN

- [ ] Todos los países tienen ≥1 marca
- [ ] Todos los marcas tienen color único
- [ ] No hay datos duplicados en JSON
- [ ] M25 y M26 están presentes para comparación
- [ ] Números están en formato numérico (no strings)
- [ ] Keywords están ordenados por clics DESC

---

**Mantenedor**: Tu equipo de desarrollo  
**Última actualización**: M26  
**Stack**: React 18 + Vanilla JS (sin bundler)
