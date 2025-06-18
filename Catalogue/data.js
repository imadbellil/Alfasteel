// Product data
const products = [
  {
    id: 1,
    name: "IPE",
    image: "src/img/IPE.png",
    category: "Poutrelles",
    description: "Poutrelle en acier de type IPE, idéale pour les structures porteuses.",
    specs: ["Hauteur: 80–600 mm", "Longueur: 6m/12m", "Norme: S235/S275/S355"],
    details: "Utilisée dans la construction métallique, charpentes et bâtiments industriels. Les poutrelles IPE offrent un excellent rapport résistance/poids et sont parfaites pour les structures nécessitant une grande portée."
  },
  {
    id: 2,
    name: "Tube Rond",
    image: "src/img/Tube_rond.jpeg",
    category: "Tubes",
    description: "Tube en acier rond, disponible en noir ou galvanisé: étiré ou soudé.",
    specs: ["Diamètre: 10–219 mm", "Longueur: 6m", "Norme: A/S et S/S"],
    details: "Convient pour la construction, la serrurerie et les clôtures. Disponible en finition noire ou galvanisée pour une meilleure résistance à la corrosion."
  },
  {
    id: 3,
    name: "Fer Plat",
    image: "src/img/Fer_plat.jpg",
    category: "Fer marchand",
    description: "Barre plate en acier, pour usages multiples en construction.",
    specs: ["Largeur: 15–500 mm", "Épaisseur: 2–40 mm", "Longueur: 6m"],
    details: "Employée en charpente, menuiserie métallique et fabrication de pièces. Sa forme plate permet une grande polyvalence d'utilisation dans de nombreux projets."
  },
  {
    id: 4,
    name: "Fer Carré",
    image: "src/img/Fer_carre.png",
    category: "Fer marchand",
    description: "Barre carrée en acier, robuste et polyvalente.",
    specs: ["dimensions: 7x7–50x50 mm", "Longueur: 6m", "Norme: Local et importation"],
    details: "Utilisée pour structures, grilles, portails et ferronnerie. Sa section carrée offre une excellente résistance dans toutes les directions."
  },
  {
    id: 5,
    name: "HEB",
    image: "src/img/HEB.png",
    category: "Poutrelles",
    description: "Poutrelle en acier de type HEB, forte capacité portante.",
    specs: ["Hauteur: 100–700 mm", "Longueur: 12m", "Norme: S235/S275/S355"],
    details: "Idéale pour les charpentes lourdes et bâtiments industriels. Les poutrelles HEB sont conçues pour supporter des charges importantes."
  },
  {
    id: 6,
    name: "Tube Carré",
    image: "src/img/tube_carre.jpg",
    category: "Tubes",
    description: "Tube en acier à section carrée, pour structures légères.",
    specs: ["dimensions: 16x16–200x200 mm", "Longueur: 6m", "Norme: local et importation"],
    details: "Parfait pour menuiserie métallique, portails et mobiliers. Sa forme carrée facilite les assemblages et offre un aspect esthétique moderne."
  },
  {
    id: 7,
    name: "Fer Rond",
    image: "src/img/fer_rond.png",
    category: "Fer marchand",
    description: "Barre ronde en acier, pour armatures et pièces métalliques.",
    specs: ["Diamètre: 8–80 mm", "Longueur: 6m", "Norme: Local et importation"],
    details: "Utilisée en armature, ferronnerie et fabrication de pièces. Sa forme ronde permet une excellente résistance à la torsion."
  },
  {
    id: 8,
    name: "Tôle Inox",
    image: "src/img/inox.jpg",
    category: "Tôles",
    description: "Tôle en acier inoxydable, finition brossée ou polie.",
    specs: ["Épaisseur: 0.5–8 mm", "Format: 1x2m, 1.25x2.5m", "Sur mesure"],
    details: "Pour l'industrie agroalimentaire, décoration et équipements médicaux. L'acier inoxydable garantit une résistance optimale à la corrosion."
  },
  {
    id: 9,
    name: "HEA",
    image: "src/img/HEA.jpg",
    category: "Poutrelles",
    description: "Poutrelle en acier de type HEA, légère et résistante.",
    specs: ["Hauteur: 100–600 mm", "Longueur: 12m", "Norme: S235/S275/S355"],
    details: "Utilisée pour structures porteuses et charpentes métalliques. Plus légère que les HEB, elle convient parfaitement aux structures moyennes."
  },
  {
    id: 10,
    name: "Tube Rectangulaire",
    image: "src/img/tube_rect.jpeg",
    category: "Tubes",
    description: "Tube en acier à section rectangulaire, pour structures variées.",
    specs: ["dimensions: 30x20–200x100 mm", "Longueur: 6m", "Norme: local et importation"],
    details: "Idéal pour structures métalliques, mobilier et portails. Sa forme rectangulaire optimise la résistance selon les axes principaux."
  },
  {
    id: 11,
    name: "Tôle Larmée",
    image: "src/img/tole_larme.jpeg",
    category: "Tôles",
    description: "Tôle acier à relief (larmée), antidérapante.",
    specs: ["Épaisseur: 1,8-5/7 mm", "Dimension: 1m, 2m / 1.25m, 2.5m ou coupe sur mesure", "Norme: Local et importation"],
    details: "Utilisée pour planchers, escaliers, passerelles et protections. Son relief en larmes assure une excellente adhérence et sécurité."
  },
  {
    id: 12,
    name: "Cornière",
    image: "src/img/corniere.jpg",
    category: "Fer marchand",
    description: "Cornière en acier, profilé en L pour assemblages.",
    specs: ["dimensions : 20x20–150x150 mm", "Longueur: 6m/12m", "Norme: Local et importation"],
    details: "Employée en charpente, serrurerie et structures métalliques. Sa forme en L permet des assemblages d'angle robustes et durables."
  },
  {
    id: 13,
    name: "UPN",
    image: "src/img/UPN.png",
    category: "Poutrelles",
    description: "Poutrelle en acier de type UPN, profilé en U.",
    specs: ["Hauteur: 50–300 mm", "Longueur: 6m/12m", "Norme: S235/S275/S355"],
    details: "Pour structures métalliques, ossatures et charpentes. Son profil en U offre une excellente résistance à la flexion."
  },
  {
    id: 14,
    name: "Tôle Acier Noire",
    image: "src/img/tole_noire.jpeg",
    category: "Tôles",
    description: "Tôle en acier brut (noire), pour usages industriels.",
    specs: ["Épaisseur: 0.5–120 mm", "Dimension: 1m, 2m / 1.25m, 2.5m / 2m, 6m ou coupe sur mesure"],
    details: "Idéale pour la chaudronnerie, la construction et la fabrication. Tôle brute nécessitant un traitement de surface selon l'application."
  },
  {
    id: 15,
    name: "Tôle Acier Galvanisée",
    image: "src/img/tole_galva.jpg",
    category: "Tôles",
    description: "Tôle en acier galvanisé, résistante à la corrosion.",
    specs: ["Épaisseur: 0.3–3 mm", "Dimension: 1m, 2m / 1.25m, 2.5m", "norme: Local et importation"],
    details: "Utilisée pour toiture, bardage et applications extérieures. Le revêtement galvanisé assure une protection durable contre la corrosion."
  },
  {
    id: 16,
    name: "TN40",
    image: "src/img/tn40.jpg",
    category: "Tôles",
    description: "Tôle nervurée TN40, idéale pour couverture et bardage.",
    specs: ["Épaisseur: 0.25–1 mm", "Largeur utile: 0,75/0,85/1m", "Longueur: personnalisée"],
    details: "Utilisée pour toitures, bardages et protections industrielles. Ses nervures apportent rigidité et résistance mécanique."
  },
   
  {
    id: 17,
    name: "bobine acier"  ,
    image: "src/img/bobine.webp",
    category: "Tôles",
    description: "Bobine d'acier laminé à chaud ou à froid, pour diverses applications industrielles.",
    specs: ["Largeur: 500–2000 mm", "Épaisseur: 0.5–20 mm", "Pour découpe Peronalisée"],    
    details: "Utilisée pour la fabrication de tôles, profilés et pièces métalliques. Disponible en acier noir ou galvanisé, elle est idéale pour les industries nécessitant des matériaux en rouleaux."
  }

];

// Category groups for filtering
const categoryGroups = [
  { 
    label: "Fer marchand", 
    names: ["Fer Plat", "Fer Carré", "Fer Rond", "Cornière"] 
  },
  { 
    label: "Poutrelles", 
    names: ["IPE", "HEB", "HEA", "UPN"] 
  },
  { 
    label: "Tôles", 
    names: ["Tôle Inox", "Tôle Larmée", "Tôle Acier Noire", "Tôle Acier Galvanisée", "TN40", "bobine acier"] 
  },
  { 
    label: "Tubes", 
    names: ["Tube Rond", "Tube Carré", "Tube Rectangulaire"] 
  }
];