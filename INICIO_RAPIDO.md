# 🚀 INICIO RÁPIDO — SEO WRAPPED M26

## Lo que hemos construido

```
├── 📊 index-v2.html              ← Tu nuevo wrapper (USAR ESTE)
├── 🐍 seo-wrapped-parser.py      ← Convierte Excel → JSON
├── ⚛️ seo-wrapped-components.js   ← Componentes React reutilizables
├── 📘 ARQUITECTURA.md            ← Guía técnica completa
└── 📁 data/seo-hierarchy.json    ← (Generado por parser)
```

---

## PASO 1: Visualizar el nuevo wrapper

1. Abre `/resultados-m26/index-v2.html` en tu navegador
2. Deberías ver:
   - Pantalla principal con 6 botones (países)
   - Cada país tiene sus marcas
   - Click en marca → detalles SEO

**¿Qué ves?**
- Números animados (Spotify style)
- Gradientes suaves
- Navegación fluida

---

## PASO 2: Entender la estructura

### Nivel 1: REGIÓN (ULA)
```
6 tarjetas → 6 países
```

### Nivel 2: PAÍS (ej: Costa Rica)
```
2 marcas (Gollo + RadioShack)
Click en cualquiera → Detalles
```

### Nivel 3: MARCA (ej: Gollo)
```
- Impresiones: 62.9M
- Clics: 6.2M
- CTR: 9.94%
- Posición: 2.5
- Revenue: $9.7M
- Órdenes: 25,356
- Top Keywords
```

---

## PASO 3: Agregar datos REALES

### Opción A: Manual (Rápido)

1. Abre `index-v2.html`
2. Busca esta sección:
```javascript
const SEO_DATA = {
  name: "ULA Regional",
  countries: {
    CR: {
      name: "Costa Rica",
      brands: {
        Gollo: {
          metrics: {
            impressions: 62992730,  // ← EDITA AQUÍ
            clicks: 6262497,        // ← EDITA AQUÍ
            // ... etc
          }
        }
      }
    }
  }
};
```

3. Copias valores de tu Excel
4. Guarda y refresca navegador

### Opción B: Automático (Recomendado para datos grandes)

1. Instala Python (si no lo tienes)
2. Descarga tu Excel a `/data/raw/SEO_Info__1_.xlsx`
3. Ejecuta:
```bash
python seo-wrapped-parser.py
```
4. Genera `data/seo-hierarchy.json`
5. En `index-v2.html` reemplaza `SEO_DATA` por:
```javascript
const [seoData, setSeoData] = useState(null);
useEffect(() => {
  fetch('data/seo-hierarchy.json')
    .then(r => r.json())
    .then(setSeoData);
}, []);
```

---

## PASO 4: Customizar colores

En `SEO_DATA`, cada marca tiene un `color`:

```javascript
Gollo: { color: "#00ff87", ... }  // Verde neón
RSO:   { color: "#f97316", ... }  // Naranja
ATO:   { color: "#8b5cf6", ... }  // Púrpura
LCO:   { color: "#ec4899", ... }  // Rosa
```

Usa: https://www.colorhexa.com para encontrar códigos hex

---

## PASO 5: Desplegar en GitHub

```bash
# 1. Clona el repo (si no lo hiciste)
git clone https://github.com/haidyduenas/resultados-m26.git
cd resultados-m26

# 2. Reemplaza index.html con index-v2.html
cp index-v2.html index.html

# 3. Agrega datos (JSON si lo creaste)
mkdir data
cp seo-hierarchy.json data/

# 4. Commit
git add .
git commit -m "feat: SEO Wrapped M26 modular y jerárquico"
git push origin main
```

---

## PASO 6: Presentar a directivos

**URL de presentación:**
```
https://haidyduenas.github.io/resultados-m26/
```
(Si tienes GitHub Pages habilitado)

**O simplemente:**
```
Abre index.html en navegador
```

---

## 📊 PREGUNTAS FRECUENTES

### P: ¿Por qué index-v2.html y no el original?

R: El original solo tenía Costa Rica hardcodeado. El v2 es:
- ✅ Modular (fácil de agregar países)
- ✅ Recursivo (navegación fluida)
- ✅ Escalable (sin duplicación de código)

### P: ¿Necesito Node.js o npm?

R: **No**. Todo está en HTML puro + React CDN. Sin build step.

### P: ¿Cómo agrego un 7mo país?

R:
1. En `HIERARCHY`, agrega: `"PY": ["Marca1", "Marca2"]`
2. En `COUNTRY_FLAGS`, agrega: `"PY": "🇵🇾"`
3. En `SEO_DATA.countries`, agrega los datos
4. **Listo.** El código se adapta automáticamente.

### P: ¿Cómo cambio el nombre del título?

R: En `index-v2.html`, busca:
```javascript
<h1>SEO Wrapped M26</h1>
```
Cámbialo a lo que quieras.

### P: ¿Los números se animan siempre?

R: Sí. Si no quieres animación, comenta en `BrandDetailView`:
```javascript
// <AnimatedNumber value={metrics.impressions} />
{(metrics.impressions || 0).toLocaleString()}
```

### P: ¿Puedo agregar gráficos (charts)?

R: Sí. Usa Recharts (CDN) o Chart.js:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/recharts/2.10.0/..."></script>
```

---

## 🔧 ESTRUCTURA DEL CÓDIGO EXPLICADA

### index-v2.html

```javascript
// DATOS (nivel 1)
const SEO_DATA = { ... }  // Estructura jerárquica

// COMPONENTES (nivel 2)
function RegionalView() { ... }           // Muestra 6 países
function CountryDetailView() { ... }      // Muestra marcas de país
function BrandDetailView() { ... }        // Muestra detalles de marca

// HELPERS (nivel 3)
function AnimatedNumber() { ... }         // Anima números
```

### Flujo React

```
RegionalView (renderiza)
  ↓ click en país
CountryDetailView (renderiza con country)
  ↓ click en marca
BrandDetailView (renderiza con brand + country)
  ↓ click "volver"
CountryDetailView → RegionalView
```

---

## 📋 CHECKLIST FINAL

- [ ] Abrí `index-v2.html` y se ve bien
- [ ] Entiendo cómo navegar (3 niveles)
- [ ] Sé dónde editar datos (const SEO_DATA)
- [ ] Subí cambios a GitHub
- [ ] Compartí URL con directivos
- [ ] Recibí feedback positivo ✨

---

## 🆘 PROBLEMAS COMUNES

**Problema**: No veo las 6 banderas  
**Solución**: Verifica que tu navegador soporta emoji (Firefox/Chrome reciente)

**Problema**: Los números se ven raros  
**Solución**: Recarga (Ctrl+F5) para limpiar caché

**Problema**: Los colores no se ven  
**Solución**: Verifica que los códigos hex sean válidos (#RRGGBB)

**Problema**: Las animaciones son muy lentas  
**Solución**: Reduce 1600 a 800 en `AnimatedNumber` (línea ~300)

---

## 🎓 SIGUIENTE NIVEL

Si quieres mejorar más adelante:

1. **Agregar filtros**: Por período (M25 vs M26)
2. **Exportar PDF**: Con números finales
3. **Sincronizar con Google Sheets**: Datos en vivo
4. **Modo oscuro/claro**: Toggle en UI
5. **Comparación país vs país**: Side-by-side

---

**¿Preguntas? Necesita soporte, revisa ARQUITECTURA.md para el diseño técnico.**

¡Éxito con tu presentación! 🚀
