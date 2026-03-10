# FORM & RAUM — Architekturbüro Website

Eine moderne, interaktive Website für ein fiktives Architekturbüro. Entwickelt mit reinem HTML, CSS und JavaScript – ohne externe Abhängigkeiten außer Google Fonts.

## 🏗️ Struktur

```
architektur-website/
├── index.html          # Hauptdatei mit allen Seiten
├── css/
│   └── style.css       # Alle Styles
├── js/
│   ├── buildings.js    # SVG-Daten für Gebäude & Team
│   └── main.js         # Interaktivität & Animationen
└── README.md
```

## ✨ Features

- **Startseite** mit Hero-Bereich, animiertem Gebäude, Neuigkeiten-Grid
- **Team-Seite** mit 6 Teammitgliedern und interaktiven Karten
- **Galerie** mit 8 Projekten, filterbar nach gebaut/geplant
- **Kontakt-Seite**

### Interaktionen
- 🖱️ Custom-Cursor mit Hover-Reaktion
- 🏢 Hero-Gebäude folgt der Maus (Parallax + 3D-Tilt)
- 💡 Fenster leuchten beim Nähern des Cursors auf
- 🃏 News-Karten mit 3D-Tilt-Effekt
- 🖼️ Galerie-Objekte heben sich an und kippen beim Hover
- 👤 Team-Portraits bewegen sich mit dem Cursor
- 🔢 Zahlen-Counter beim Laden der Startseite
- 📜 Scroll-Reveal-Animationen

## 🚀 GitHub Pages Deployment

1. Repository auf GitHub erstellen
2. Alle Dateien hochladen (Struktur beibehalten)
3. Unter **Settings → Pages → Branch: main → / (root)** aktivieren
4. Die Website ist nach wenigen Minuten unter `https://USERNAME.github.io/REPO-NAME` erreichbar

## 🎨 Design

- Farbpalette: Schwarz, Weiß, Grau (`#0a0a0a`, `#f5f4f0`, `#3a3a38`)
- Schriften: Cormorant Garamond (Überschriften), Space Mono (Labels)
- Alle Gebäude-Illustrationen sind SVG (skalierbar, kein Bildladen nötig)

## 📱 Responsive

Funktioniert auf Desktop, Tablet und Mobilgeräten.
