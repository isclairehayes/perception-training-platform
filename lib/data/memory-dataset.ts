/**
 * Dataset de Memoria - 100+ rostros, nombres y rasgos
 * Generado para ejercicios de memoria del Método de Loci
 */

export interface FaceData {
  id: string;
  name: string;
  imageUrl: string;
  traits: string[]; // rasgos distintivos
  category: 'faces'; // para filtrar por tipo
}

export interface GeneralItem {
  id: string;
  text: string;
  imageUrl?: string;
  category: 'objects' | 'numbers' | 'words';
}

/**
 * 100+ rostros generados (placeholders usando dicebear API pública)
 * En producción, usar dataset como This Person Does Not Exist o similar
 */
export const FACES_DATASET: FaceData[] = [
  // Nombres hispanos
  { id: 'f001', name: 'Carlos Mendoza', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza', category: 'faces', traits: ['barba', 'gafas', 'sonrisa'] },
  { id: 'f002', name: 'Ana Rodríguez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnaRodriguez', category: 'faces', traits: ['pelo rizado', 'ojos verdes'] },
  { id: 'f003', name: 'Miguel Torres', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MiguelTorres', category: 'faces', traits: ['cejas pobladas', 'sonrisa amplia'] },
  { id: 'f004', name: 'Laura Fernández', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LauraFernandez', category: 'faces', traits: ['pelo liso', 'lunar'] },
  { id: 'f005', name: 'David García', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidGarcia', category: 'faces', traits: ['gafas redondas', 'barba corta'] },
  { id: 'f006', name: 'Carmen López', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarmenLopez', category: 'faces', traits: ['pendientes', 'pelo ondulado'] },
  { id: 'f007', name: 'José Martínez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JoseMartinez', category: 'faces', traits: ['bigote', 'ojos marrones'] },
  { id: 'f008', name: 'Isabel Sánchez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IsabelSanchez', category: 'faces', traits: ['flequillo', 'sonrisa tímida'] },
  { id: 'f009', name: 'Antonio Pérez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AntonioPerez', category: 'faces', traits: ['calvo', 'barba larga'] },
  { id: 'f010', name: 'María González', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaGonzalez', category: 'faces', traits: ['pelo corto', 'ojos azules'] },
  
  // Nombres anglosajones
  { id: 'f011', name: 'John Smith', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnSmith', category: 'faces', traits: ['nariz grande', 'gafas'] },
  { id: 'f012', name: 'Sarah Johnson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJohnson', category: 'faces', traits: ['pecas', 'pelo rubio'] },
  { id: 'f013', name: 'Michael Brown', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelBrown', category: 'faces', traits: ['barba poblada', 'ojos oscuros'] },
  { id: 'f014', name: 'Emma Davis', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaDavis', category: 'faces', traits: ['coleta', 'sonrisa grande'] },
  { id: 'f015', name: 'William Wilson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WilliamWilson', category: 'faces', traits: ['pelo canoso', 'arrugas'] },
  { id: 'f016', name: 'Olivia Moore', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OliviaMoore', category: 'faces', traits: ['gafas de sol', 'pelo largo'] },
  { id: 'f017', name: 'James Taylor', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JamesTaylor', category: 'faces', traits: ['cicatriz', 'mandíbula cuadrada'] },
  { id: 'f018', name: 'Sophia Anderson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SophiaAnderson', category: 'faces', traits: ['lunar en mejilla', 'pelo rizado'] },
  { id: 'f019', name: 'Benjamin Thomas', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BenjaminThomas', category: 'faces', traits: ['barba de candado', 'perilla'] },
  { id: 'f020', name: 'Ava Jackson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AvaJackson', category: 'faces', traits: ['pelo teñido', 'piercing'] },
  
  // Nombres diversos
  { id: 'f021', name: 'Yuki Tanaka', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YukiTanaka', category: 'faces', traits: ['pelo negro', 'ojos rasgados'] },
  { id: 'f022', name: 'Ahmed Hassan', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AhmedHassan', category: 'faces', traits: ['barba islámica', 'piel morena'] },
  { id: 'f023', name: 'Priya Patel', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaPatel', category: 'faces', traits: ['bindi', 'pelo trenzado'] },
  { id: 'f024', name: 'Hans Mueller', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HansMueller', category: 'faces', traits: ['gafas cuadradas', 'pelo rubio'] },
  { id: 'f025', name: 'Fatima Ali', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FatimaAli', category: 'faces', traits: ['hijab', 'ojos grandes'] },
  { id: 'f026', name: 'Dmitri Volkov', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DmitriVolkov', category: 'faces', traits: ['orejas grandes', 'barba rusa'] },
  { id: 'f027', name: 'Mei Chen', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MeiChen', category: 'faces', traits: ['gafas redondas', 'pelo corto'] },
  { id: 'f028', name: 'Giovanni Rossi', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GiovanniRossi', category: 'faces', traits: ['bigote italiano', 'nariz romana'] },
  { id: 'f029', name: 'Amara Okafor', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmaraOkafor', category: 'faces', traits: ['trenzas africanas', 'piel oscura'] },
  { id: 'f030', name: 'Lars Andersen', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LarsAndersen', category: 'faces', traits: ['pelo platino', 'ojos azules'] },
  
  // Más nombres hispanos (30-60)
  { id: 'f031', name: 'Pedro Ramírez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PedroRamirez', category: 'faces', traits: ['patillas', 'sonrisa pícara'] },
  { id: 'f032', name: 'Lucía Morales', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LuciaMorales', category: 'faces', traits: ['pelo castaño', 'pecas'] },
  { id: 'f033', name: 'Javier Ruiz', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JavierRuiz', category: 'faces', traits: ['cejas finas', 'barba de tres días'] },
  { id: 'f034', name: 'Sofía Díaz', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaDiaz', category: 'faces', traits: ['moño', 'ojos verdes'] },
  { id: 'f035', name: 'Francisco Navarro', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FranciscoNavarro', category: 'faces', traits: ['gafas', 'calva incipiente'] },
  { id: 'f036', name: 'Elena Castro', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaCastro', category: 'faces', traits: ['pelo liso largo', 'lunar'] },
  { id: 'f037', name: 'Roberto Ortiz', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RobertoOrtiz', category: 'faces', traits: ['nariz aguileña', 'barba'] },
  { id: 'f038', name: 'Patricia Romero', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PatriciaRomero', category: 'faces', traits: ['flequillo', 'sonrisa amplia'] },
  { id: 'f039', name: 'Andrés Jiménez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AndresJimenez', category: 'faces', traits: ['cejas pobladas', 'ojos marrones'] },
  { id: 'f040', name: 'Beatriz Vargas', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BeatrizVargas', category: 'faces', traits: ['pelo ondulado', 'pendientes grandes'] },
  { id: 'f041', name: 'Diego Herrera', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DiegoHerrera', category: 'faces', traits: ['bigote', 'gafas de sol'] },
  { id: 'f042', name: 'Cristina Medina', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CristinaMedina', category: 'faces', traits: ['pelo corto', 'ojos azules'] },
  { id: 'f043', name: 'Raúl Moreno', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RaulMoreno', category: 'faces', traits: ['barba candado', 'nariz chata'] },
  { id: 'f044', name: 'Teresa Gil', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TeresaGil', category: 'faces', traits: ['coleta alta', 'pecas'] },
  { id: 'f045', name: 'Alberto Vega', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlbertoVega', category: 'faces', traits: ['calvo', 'barba larga'] },
  { id: 'f046', name: 'Marta Aguilar', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MartaAguilar', category: 'faces', traits: ['pelo rizado', 'sonrisa tímida'] },
  { id: 'f047', name: 'Sergio Ibáñez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SergioIbanez', category: 'faces', traits: ['gafas redondas', 'cejas finas'] },
  { id: 'f048', name: 'Raquel Campos', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RaquelCampos', category: 'faces', traits: ['pelo teñido', 'lunar en mejilla'] },
  { id: 'f049', name: 'Pablo Cortés', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PabloCortes', category: 'faces', traits: ['barba poblada', 'ojos oscuros'] },
  { id: 'f050', name: 'Natalia Méndez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NataliaMendez', category: 'faces', traits: ['flequillo recto', 'ojos verdes'] },
  { id: 'f051', name: 'Víctor Santos', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VictorSantos', category: 'faces', traits: ['perilla', 'gafas'] },
  { id: 'f052', name: 'Alicia Parra', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AliciaParra', category: 'faces', traits: ['pelo liso', 'sonrisa grande'] },
  { id: 'f053', name: 'Iván Guerrero', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IvanGuerrero', category: 'faces', traits: ['cicatriz', 'mandíbula cuadrada'] },
  { id: 'f054', name: 'Silvia Cruz', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SilviaCruz', category: 'faces', traits: ['moño bajo', 'pendientes'] },
  { id: 'f055', name: 'Fernando Prieto', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FernandoPrieto', category: 'faces', traits: ['barba de tres días', 'nariz grande'] },
  { id: 'f056', name: 'Mónica Rubio', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MonicaRubio', category: 'faces', traits: ['pelo ondulado', 'ojos marrones'] },
  { id: 'f057', name: 'Óscar Molina', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OscarMolina', category: 'faces', traits: ['calva', 'gafas cuadradas'] },
  { id: 'f058', name: 'Pilar Reyes', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PilarReyes', category: 'faces', traits: ['pelo corto', 'lunar'] },
  { id: 'f059', name: 'Adrián Flores', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdrianFlores', category: 'faces', traits: ['bigote fino', 'ojos claros'] },
  { id: 'f060', name: 'Nuria Lozano', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NuriaLozano', category: 'faces', traits: ['coleta', 'pecas'] },
  
  // Más nombres internacionales (61-100)
  { id: 'f061', name: 'Ethan Miller', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EthanMiller', category: 'faces', traits: ['pelo revuelto', 'sonrisa'] },
  { id: 'f062', name: 'Isabella Garcia', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IsabellaGarcia', category: 'faces', traits: ['pelo largo', 'ojos grandes'] },
  { id: 'f063', name: 'Noah Martinez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NoahMartinez', category: 'faces', traits: ['gafas', 'barba corta'] },
  { id: 'f064', name: 'Mia Rodriguez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MiaRodriguez', category: 'faces', traits: ['flequillo', 'sonrisa tímida'] },
  { id: 'f065', name: 'Liam Hernandez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LiamHernandez', category: 'faces', traits: ['cejas pobladas', 'nariz'] },
  { id: 'f066', name: 'Charlotte Lopez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CharlotteLopez', category: 'faces', traits: ['pelo rizado', 'pendientes'] },
  { id: 'f067', name: 'Lucas Gonzalez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LucasGonzalez', category: 'faces', traits: ['barba poblada', 'ojos oscuros'] },
  { id: 'f068', name: 'Amelia Wilson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmeliaWilson', category: 'faces', traits: ['moño', 'lunar'] },
  { id: 'f069', name: 'Oliver Anderson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OliverAnderson', category: 'faces', traits: ['pelo canoso', 'gafas'] },
  { id: 'f070', name: 'Harper Thomas', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HarperThomas', category: 'faces', traits: ['pelo liso', 'ojos azules'] },
  { id: 'f071', name: 'Elijah Taylor', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElijahTaylor', category: 'faces', traits: ['barba candado', 'cicatriz'] },
  { id: 'f072', name: 'Evelyn Moore', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EvelynMoore', category: 'faces', traits: ['coleta alta', 'pecas'] },
  { id: 'f073', name: 'Mason Jackson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MasonJackson', category: 'faces', traits: ['calvo', 'sonrisa amplia'] },
  { id: 'f074', name: 'Abigail Martin', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AbigailMartin', category: 'faces', traits: ['pelo ondulado', 'ojos verdes'] },
  { id: 'f075', name: 'Logan Lee', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LoganLee', category: 'faces', traits: ['gafas redondas', 'barba'] },
  { id: 'f076', name: 'Emily Perez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyPerez', category: 'faces', traits: ['flequillo', 'sonrisa grande'] },
  { id: 'f077', name: 'Alexander Thompson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexanderThompson', category: 'faces', traits: ['bigote', 'nariz aguileña'] },
  { id: 'f078', name: 'Elizabeth White', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElizabethWhite', category: 'faces', traits: ['pelo corto', 'lunar en mejilla'] },
  { id: 'f079', name: 'Sebastian Harris', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SebastianHarris', category: 'faces', traits: ['barba larga', 'ojos claros'] },
  { id: 'f080', name: 'Sofia Sanchez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaSanchez', category: 'faces', traits: ['pelo trenzado', 'pendientes grandes'] },
  { id: 'f081', name: 'Daniel Clark', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DanielClark', category: 'faces', traits: ['gafas cuadradas', 'pelo revuelto'] },
  { id: 'f082', name: 'Avery Ramirez', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AveryRamirez', category: 'faces', traits: ['moño bajo', 'ojos marrones'] },
  { id: 'f083', name: 'Matthew Lewis', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MatthewLewis', category: 'faces', traits: ['barba de tres días', 'mandíbula'] },
  { id: 'f084', name: 'Ella Robinson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EllaRobinson', category: 'faces', traits: ['pelo liso largo', 'sonrisa'] },
  { id: 'f085', name: 'Joseph Walker', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JosephWalker', category: 'faces', traits: ['calva incipiente', 'gafas'] },
  { id: 'f086', name: 'Scarlett Young', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ScarlettYoung', category: 'faces', traits: ['pelo rizado', 'pecas'] },
  { id: 'f087', name: 'David Allen', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidAllen', category: 'faces', traits: ['bigote fino', 'ojos oscuros'] },
  { id: 'f088', name: 'Victoria King', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VictoriaKing', category: 'faces', traits: ['coleta', 'lunar'] },
  { id: 'f089', name: 'Carter Wright', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarterWright', category: 'faces', traits: ['barba poblada', 'cejas finas'] },
  { id: 'f090', name: 'Grace Scott', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GraceScott', category: 'faces', traits: ['pelo ondulado', 'ojos azules'] },
  { id: 'f091', name: 'Jayden Green', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JaydenGreen', category: 'faces', traits: ['gafas de sol', 'sonrisa pícara'] },
  { id: 'f092', name: 'Chloe Baker', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChloeBaker', category: 'faces', traits: ['flequillo recto', 'pendientes'] },
  { id: 'f093', name: 'Dylan Adams', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DylanAdams', category: 'faces', traits: ['pelo canoso', 'barba'] },
  { id: 'f094', name: 'Lily Nelson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LilyNelson', category: 'faces', traits: ['moño', 'ojos verdes'] },
  { id: 'f095', name: 'Jackson Hill', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JacksonHill', category: 'faces', traits: ['cicatriz', 'nariz chata'] },
  { id: 'f096', name: 'Zoey Campbell', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZoeyCampbell', category: 'faces', traits: ['pelo corto', 'pecas'] },
  { id: 'f097', name: 'Gabriel Mitchell', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GabrielMitchell', category: 'faces', traits: ['barba candado', 'gafas'] },
  { id: 'f098', name: 'Penelope Roberts', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PenelopeRoberts', category: 'faces', traits: ['pelo liso', 'sonrisa amplia'] },
  { id: 'f099', name: 'Anthony Turner', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnthonyTurner', category: 'faces', traits: ['calvo', 'ojos oscuros'] },
  { id: 'f100', name: 'Riley Phillips', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RileyPhillips', category: 'faces', traits: ['pelo teñido', 'lunar en mejilla'] },
  { id: 'f101', name: 'Samuel Parker', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamuelParker', category: 'faces', traits: ['gafas redondas', 'sonrisa'] },
  { id: 'f102', name: 'Layla Evans', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LaylaEvans', category: 'faces', traits: ['coleta alta', 'ojos azules'] },
  { id: 'f103', name: 'Christopher Edwards', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChristopherEdwards', category: 'faces', traits: ['barba larga', 'cejas pobladas'] },
  { id: 'f104', name: 'Nora Collins', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NoraCollins', category: 'faces', traits: ['moño bajo', 'pendientes grandes'] },
  { id: 'f105', name: 'Andrew Stewart', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AndrewStewart', category: 'faces', traits: ['pelo revuelto', 'nariz grande'] },
];

/**
 * Ítems generales para ejercicios de memoria
 */
export const GENERAL_ITEMS: GeneralItem[] = [
  // Objetos comunes
  { id: 'obj001', text: 'Llave', category: 'objects', imageUrl: '🔑' },
  { id: 'obj002', text: 'Teléfono', category: 'objects', imageUrl: '📱' },
  { id: 'obj003', text: 'Libro', category: 'objects', imageUrl: '📚' },
  { id: 'obj004', text: 'Taza', category: 'objects', imageUrl: '☕' },
  { id: 'obj005', text: 'Reloj', category: 'objects', imageUrl: '⌚' },
  { id: 'obj006', text: 'Gafas', category: 'objects', imageUrl: '👓' },
  { id: 'obj007', text: 'Lámpara', category: 'objects', imageUrl: '💡' },
  { id: 'obj008', text: 'Silla', category: 'objects', imageUrl: '🪑' },
  { id: 'obj009', text: 'Ordenador', category: 'objects', imageUrl: '💻' },
  { id: 'obj010', text: 'Cámara', category: 'objects', imageUrl: '📷' },
  { id: 'obj011', text: 'Paraguas', category: 'objects', imageUrl: '☂️' },
  { id: 'obj012', text: 'Maleta', category: 'objects', imageUrl: '🧳' },
  { id: 'obj013', text: 'Planta', category: 'objects', imageUrl: '🪴' },
  { id: 'obj014', text: 'Pincel', category: 'objects', imageUrl: '🖌️' },
  { id: 'obj015', text: 'Manzana', category: 'objects', imageUrl: '🍎' },
  { id: 'obj016', text: 'Globo', category: 'objects', imageUrl: '🎈' },
  { id: 'obj017', text: 'Guitarra', category: 'objects', imageUrl: '🎸' },
  { id: 'obj018', text: 'Balón', category: 'objects', imageUrl: '⚽' },
  { id: 'obj019', text: 'Vela', category: 'objects', imageUrl: '🕯️' },
  { id: 'obj020', text: 'Corona', category: 'objects', imageUrl: '👑' },
  
  // Números memorables
  { id: 'num001', text: '42', category: 'numbers' },
  { id: 'num002', text: '1984', category: 'numbers' },
  { id: 'num003', text: '3.14159', category: 'numbers' },
  { id: 'num004', text: '007', category: 'numbers' },
  { id: 'num005', text: '2001', category: 'numbers' },
  { id: 'num006', text: '1492', category: 'numbers' },
  { id: 'num007', text: '365', category: 'numbers' },
  { id: 'num008', text: '100', category: 'numbers' },
  { id: 'num009', text: '1776', category: 'numbers' },
  { id: 'num010', text: '2024', category: 'numbers' },
  
  // Palabras abstractas
  { id: 'word001', text: 'Libertad', category: 'words' },
  { id: 'word002', text: 'Justicia', category: 'words' },
  { id: 'word003', text: 'Amor', category: 'words' },
  { id: 'word004', text: 'Coraje', category: 'words' },
  { id: 'word005', text: 'Sabiduría', category: 'words' },
  { id: 'word006', text: 'Paz', category: 'words' },
  { id: 'word007', text: 'Esperanza', category: 'words' },
  { id: 'word008', text: 'Verdad', category: 'words' },
  { id: 'word009', text: 'Belleza', category: 'words' },
  { id: 'word010', text: 'Creatividad', category: 'words' },
  { id: 'word011', text: 'Paciencia', category: 'words' },
  { id: 'word012', text: 'Gratitud', category: 'words' },
  { id: 'word013', text: 'Felicidad', category: 'words' },
  { id: 'word014', text: 'Empatía', category: 'words' },
  { id: 'word015', text: 'Resiliencia', category: 'words' },
];

/**
 * Obtener rostros aleatorios para un ejercicio
 */
export function getRandomFaces(count: number): FaceData[] {
  const shuffled = [...FACES_DATASET].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Obtener ítems aleatorios de una categoría
 */
export function getRandomItems(count: number, category?: 'objects' | 'numbers' | 'words'): GeneralItem[] {
  const filtered = category 
    ? GENERAL_ITEMS.filter(item => item.category === category)
    : GENERAL_ITEMS;
  
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Mezclar rostros e ítems para niveles avanzados
 */
export function getMixedMemoryItems(faceCount: number, itemCount: number) {
  return {
    faces: getRandomFaces(faceCount),
    items: getRandomItems(itemCount),
  };
}
