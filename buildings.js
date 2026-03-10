// ══════════════════════════════════════════
// buildings.js — SVG data for gallery & team
// ══════════════════════════════════════════

const TEAM_MEMBERS = [
  {
    name: "Dipl.-Ing. Maria Hofmann",
    role: "Gründerin & Geschäftsführerin",
    bio: "Maria Hofmann studierte Architektur an der TU Wien und der ETH Zürich. Nach Stationen bei Herzog & de Meuron und Zaha Hadid Architects gründete sie 1998 das Büro Form & Raum. Ihr Werk wurde mit zahlreichen nationalen und internationalen Preisen ausgezeichnet.",
    tags: ["Wohnbau", "Konzept", "Nachhaltigkeit"],
    svgBg: "#1e1e1c",
    svgAccent: "#2a2a28"
  },
  {
    name: "Arch. Thomas Bergmann",
    role: "Partner & Projektleiter",
    bio: "Thomas Bergmann ist seit 2003 Teil des Büros und verantwortlich für Großprojekte im öffentlichen Bereich. Er lehrt an der Akademie der bildenden Künste Wien.",
    tags: ["Öffentlicher Bau", "Bestand", "Städtebau"],
    svgBg: "#222220",
    svgAccent: "#2e2e2c"
  },
  {
    name: "Dipl.-Ing. Lena Fuchs",
    role: "Seniorarchitektin — Innenraum",
    bio: "Lena Fuchs verbindet Architektur und Interior Design zu einer ganzheitlichen Raumsprache. Sie hat an der Universität für angewandte Kunst Wien studiert.",
    tags: ["Interior", "Luxuswohnbau", "Material"],
    svgBg: "#1a1a18",
    svgAccent: "#272725"
  },
  {
    name: "Arch. Julian Werner",
    role: "Projektarchitekt",
    bio: "Julian Werner bringt Expertise im Bereich parametrisches Design und digitale Fabrikation ein. Seine Arbeit erforscht die Grenzen zwischen computergesteuerter Formfindung und handwerklicher Ausführung.",
    tags: ["Parametrisch", "Digital", "Experiment"],
    svgBg: "#202020",
    svgAccent: "#2c2c2a"
  },
  {
    name: "Dipl.-Ing. Sophie Klein",
    role: "Projektarchitektin",
    bio: "Sophie Klein absolvierte ihr Studium an der Bartlett School of Architecture in London und ist seit 2019 bei Form & Raum tätig.",
    tags: ["Widmung", "Wohnbau", "BIM"],
    svgBg: "#1c1c1a",
    svgAccent: "#282826"
  },
  {
    name: "Arch. Markus Steiner",
    role: "Technischer Leiter",
    bio: "Markus Steiner ist verantwortlich für die technische Qualitätssicherung aller Projekte. Mit 20 Jahren Berufserfahrung koordiniert er die Schnittstellen zwischen Architektur, Tragwerk und Haustechnik.",
    tags: ["Bauphysik", "Statik", "Ausführung"],
    svgBg: "#242422",
    svgAccent: "#302e2c"
  }
];

function makePortraitSVG(bg, accent, index) {
  const variations = [
    // Classic silhouette
    `<ellipse cx="120" cy="108" rx="44" ry="50" fill="${accent}"/>
     <path d="M38 320 Q62 215 120 206 Q178 215 202 320Z" fill="${accent}"/>
     <line x1="0" x2="240" y1="165" y2="165" stroke="${accent}" stroke-width="0.5" opacity="0.4"/>`,
    // Slightly different proportions
    `<ellipse cx="120" cy="106" rx="42" ry="48" fill="${accent}"/>
     <path d="M42 320 Q65 218 120 208 Q175 218 198 320Z" fill="${accent}"/>
     <rect x="60" y="260" width="120" height="2" fill="${accent}" opacity="0.3"/>`,
    // Taller neck
    `<ellipse cx="120" cy="110" rx="43" ry="49" fill="${accent}"/>
     <rect x="105" y="155" width="30" height="30" fill="${accent}"/>
     <path d="M40 320 Q63 220 120 207 Q177 220 200 320Z" fill="${accent}"/>`,
    // Slightly offset
    `<ellipse cx="118" cy="109" rx="44" ry="51" fill="${accent}"/>
     <path d="M36 320 Q61 216 118 207 Q178 214 204 320Z" fill="${accent}"/>`,
    // With shoulder hint
    `<ellipse cx="120" cy="107" rx="41" ry="47" fill="${accent}"/>
     <path d="M44 320 Q64 217 120 208 Q176 217 196 320Z" fill="${accent}"/>
     <ellipse cx="60" cy="210" rx="25" ry="15" fill="${accent}" opacity="0.5"/>
     <ellipse cx="180" cy="210" rx="25" ry="15" fill="${accent}" opacity="0.5"/>`,
    // Geometric style
    `<polygon points="80,155 120,65 160,155" fill="${accent}"/>
     <rect x="85" y="155" width="70" height="10" fill="${accent}"/>
     <path d="M40 320 Q65 210 120 200 Q175 210 200 320Z" fill="${accent}"/>`
  ];
  return `
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <rect width="240" height="320" fill="${bg}"/>
      <rect x="0" y="200" width="240" height="120" fill="${bg}" opacity="0.7"/>
      ${variations[index % variations.length]}
      <line x1="0" x2="240" y1="200" y2="200" stroke="${accent}" stroke-width="0.4" opacity="0.3"/>
    </svg>`;
}

const GALLERY_PROJECTS = [
  {
    name: "Villa Sonnberg", location: "Wachau",
    type: "Privathaus", area: "340m²", year: "2024", status: "gebaut",
    viewBox: "0 0 300 420", aspect: "3/4.2",
    svgContent: `
      <rect width="300" height="420" fill="#1a1a18"/>
      <g class="proj-building">
        <rect x="40" y="60" width="220" height="300" fill="#222220" stroke="#2a2a28" stroke-width="0.5"/>
        <rect x="60" y="80" width="80" height="120" fill="#2a2a28" class="proj-win"/>
        <rect x="160" y="80" width="80" height="120" fill="#1e1e1c" class="proj-win"/>
        <rect x="60" y="220" width="180" height="60" fill="#242422" class="proj-win"/>
        <rect x="100" y="330" width="100" height="30" fill="#1a1a18"/>
        <line x1="150" x2="150" y1="330" y2="360" stroke="#2a2a28" stroke-width="0.8"/>
      </g>
      <rect x="0" y="360" width="300" height="60" fill="#141412"/>
      <ellipse cx="20" cy="340" rx="18" ry="30" fill="#181816" class="proj-tree"/>
      <ellipse cx="280" cy="345" rx="16" ry="25" fill="#181816" class="proj-tree"/>
      <rect x="40" y="360" width="220" height="8" fill="#0a0a08" opacity="0.5"/>
    `
  },
  {
    name: "Kulturzentrum Graz", location: "Graz",
    type: "Öffentlicher Bau", area: "1800m²", year: "2026", status: "geplant",
    viewBox: "0 0 300 220", aspect: "300/220",
    svgContent: `
      <rect width="300" height="220" fill="#161614"/>
      <g class="proj-building">
        <rect x="20" y="70" width="260" height="110" fill="#1e1e1c"/>
        <rect x="10" y="60" width="280" height="12" fill="#2a2a28" class="proj-roof"/>
        <g stroke="#2a2a28" stroke-width="0.7" class="proj-grid">
          <line x1="20" x2="280" y1="95" y2="95"/>
          <line x1="20" x2="280" y1="115" y2="115"/>
          <line x1="20" x2="280" y1="135" y2="135"/>
          <line x1="20" x2="280" y1="155" y2="155"/>
          <line x1="60" x2="60" y1="70" y2="180"/>
          <line x1="100" x2="100" y1="70" y2="180"/>
          <line x1="140" x2="140" y1="70" y2="180"/>
          <line x1="180" x2="180" y1="70" y2="180"/>
          <line x1="220" x2="220" y1="70" y2="180"/>
          <line x1="260" x2="260" y1="70" y2="180"/>
        </g>
      </g>
      <rect x="0" y="180" width="300" height="40" fill="#111110"/>
      <rect x="20" y="180" width="260" height="6" fill="#0a0a08" opacity="0.5"/>
    `
  },
  {
    name: "Haus im Weinberg", location: "Burgenland",
    type: "Privathaus", area: "280m²", year: "2023", status: "gebaut",
    viewBox: "0 0 300 280", aspect: "300/280",
    svgContent: `
      <rect width="300" height="280" fill="#1c1c1a"/>
      <g class="proj-building">
        <rect x="50" y="100" width="200" height="150" fill="#222220" stroke="#2a2a28" stroke-width="0.5"/>
        <rect x="100" y="60" width="150" height="190" fill="#282826" stroke="#2a2a28" stroke-width="0.5"/>
        <rect x="110" y="78" width="50" height="38" fill="#1e1e1c" class="proj-win"/>
        <rect x="170" y="78" width="60" height="38" fill="#242422" class="proj-win"/>
        <rect x="60" y="130" width="38" height="55" fill="#1a1a18" class="proj-win"/>
        <rect x="110" y="138" width="40" height="38" fill="#1e1e1c" class="proj-win"/>
        <rect x="170" y="138" width="60" height="45" fill="#202020" class="proj-win"/>
        <rect x="165" y="208" width="40" height="42" fill="#161614"/>
      </g>
      <rect x="0" y="250" width="300" height="30" fill="#121210"/>
    `
  },
  {
    name: "Bürohaus Schottenring", location: "Wien",
    type: "Gewerbebau", area: "4200m²", year: "2021", status: "gebaut",
    viewBox: "0 0 300 360", aspect: "300/360",
    svgContent: `
      <rect width="300" height="360" fill="#181816"/>
      <g class="proj-building">
        <rect x="80" y="50" width="140" height="260" fill="#1e1e1c" stroke="#2a2a28" stroke-width="0.5"/>
        <g fill="#242422" class="proj-wins">
          ${Array.from({length:9},(_,row)=>Array.from({length:3},(_,col)=>`<rect x="${90+col*40}" y="${60+row*25}" width="28" height="16"/>`).join('')).join('')}
        </g>
        <rect x="100" y="293" width="100" height="17" fill="#141412"/>
      </g>
      <rect x="0" y="310" width="300" height="50" fill="#0e0e0c"/>
    `
  },
  {
    name: "Wohnanlage Linz Nord", location: "Linz",
    type: "Wohnbau", area: "8600m²", year: "2027", status: "geplant",
    viewBox: "0 0 300 200", aspect: "300/200",
    svgContent: `
      <rect width="300" height="200" fill="#1a1a18"/>
      <g class="proj-building">
        <rect x="10" y="55" width="280" height="8" fill="#282826" class="proj-roof"/>
        <rect x="10" y="63" width="280" height="105" fill="#202020"/>
        <g fill="#1a1a18" stroke="#2a2a28" stroke-width="0.4">
          ${Array.from({length:2},(_,row)=>Array.from({length:7},(_,col)=>`<rect x="${20+col*40}" y="${73+row*38}" width="28" height="26"/>`).join('')).join('')}
        </g>
        <ellipse cx="50" cy="50" rx="12" ry="18" fill="#1e1e1c" class="proj-tree"/>
        <ellipse cx="150" cy="48" rx="14" ry="20" fill="#1e1e1c" class="proj-tree"/>
        <ellipse cx="250" cy="52" rx="11" ry="16" fill="#1e1e1c" class="proj-tree"/>
      </g>
      <rect x="0" y="168" width="300" height="32" fill="#111110"/>
    `
  },
  {
    name: "Kunsthaus Salzburg", location: "Salzburg",
    type: "Museum", area: "2100m²", year: "2019", status: "gebaut",
    viewBox: "0 0 300 340", aspect: "300/340",
    svgContent: `
      <rect width="300" height="340" fill="#161614"/>
      <g class="proj-building">
        <polygon points="30,195 150,78 270,195" fill="#1e1e1c" stroke="#2a2a28" stroke-width="0.7" class="proj-roof"/>
        <rect x="30" y="195" width="240" height="110" fill="#222220"/>
        <rect x="80" y="175" width="15" height="130" fill="#1a1a18"/>
        <rect x="110" y="175" width="15" height="130" fill="#1a1a18"/>
        <rect x="175" y="175" width="15" height="130" fill="#1a1a18"/>
        <rect x="205" y="175" width="15" height="130" fill="#1a1a18"/>
        <rect x="130" y="240" width="40" height="65" fill="#141412"/>
        <rect x="130" y="115" width="40" height="58" fill="#242422" opacity="0.7" class="proj-win"/>
      </g>
      <rect x="0" y="305" width="300" height="35" fill="#0e0e0c"/>
    `
  },
  {
    name: "Brückenhotel Donau", location: "Wien",
    type: "Hotel", area: "5400m²", year: "2028", status: "geplant",
    viewBox: "0 0 300 240", aspect: "300/240",
    svgContent: `
      <rect width="300" height="240" fill="#1c1c1a"/>
      <g class="proj-building">
        <rect x="20" y="80" width="260" height="90" fill="#202020" stroke="#2a2a28" stroke-width="0.5"/>
        <path d="M20 170 Q75 130 130 170" fill="none" stroke="#2a2a28" stroke-width="1.5" class="proj-arch"/>
        <path d="M130 170 Q185 120 240 170" fill="none" stroke="#2a2a28" stroke-width="1.5" class="proj-arch"/>
        <g fill="#282826" class="proj-wins">
          ${Array.from({length:2},(_,row)=>Array.from({length:6},(_,col)=>`<rect x="${30+col*43}" y="${90+row*35}" width="28" height="22"/>`).join('')).join('')}
        </g>
      </g>
      <rect x="0" y="170" width="300" height="70" fill="#161614"/>
      <rect x="20" y="172" width="260" height="6" fill="#1a1a18" opacity="0.5"/>
      <rect x="20" y="182" width="260" height="4" fill="#1a1a18" opacity="0.3"/>
    `
  },
  {
    name: "Gymnasium Innsbruck", location: "Innsbruck",
    type: "Bildungsbau", area: "3800m²", year: "2022", status: "gebaut",
    viewBox: "0 0 300 260", aspect: "300/260",
    svgContent: `
      <rect width="300" height="260" fill="#191917"/>
      <g class="proj-building">
        <rect x="20" y="75" width="180" height="150" fill="#202020" stroke="#2a2a28" stroke-width="0.5"/>
        <rect x="160" y="35" width="120" height="115" fill="#222220" stroke="#2a2a28" stroke-width="0.5"/>
        <g fill="#1c1c1a" stroke="#2a2a28" stroke-width="0.3">
          <rect x="30" y="85"/><rect x="65" y="85"/><rect x="100" y="85"/><rect x="135" y="85"/>
          <rect x="30" y="115"/><rect x="65" y="115"/><rect x="100" y="115"/><rect x="135" y="115"/>
          <rect x="30" y="145"/><rect x="65" y="145"/>
          ${['85','115','145'].map(y=>['30','65','100','135'].map(x=>`<rect x="${x}" y="${y}" width="24" height="18"/>`).join('')).join('')}
          ${['45','75','105'].map(y=>['170','205','240'].map(x=>`<rect x="${x}" y="${y}" width="27" height="20"/>`).join('')).join('')}
        </g>
        <rect x="25" y="165" width="130" height="55" fill="#161614"/>
      </g>
      <rect x="0" y="225" width="300" height="35" fill="#101010"/>
    `
  }
];
