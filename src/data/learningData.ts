// Lernmodule für den Blutkreislauf
export interface LearningModule {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  image: string;
  steps: LearningStep[];
  exercises: Exercise[];
}

export interface LearningStep {
  id: string;
  title: string;
  content: string;
  image?: string;
  tip?: string;
}

export interface Exercise {
  id: string;
  type: 'fillBlank' | 'matching' | 'quiz' | 'labeling' | 'ordering';
  title: string;
  instructions: string;
  questions?: QuizQuestion[];
  pairs?: MatchingPair[];
  blanks?: FillBlank[];
  labels?: Label[];
  items?: OrderItem[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface FillBlank {
  id: string;
  text: string;
  answer: string;
  hint: string;
}

export interface Label {
  id: string;
  text: string;
  answer: string;
}

export interface OrderItem {
  id: string;
  text: string;
  correctPosition: number;
}

export const learningModules: LearningModule[] = [
  {
    id: 'einfuehrung',
    title: 'Modul 1: Einführung',
    subtitle: 'Was ist der Blutkreislauf?',
    duration: '15 Minuten',
    description: 'Lerne die Grundlagen des Blutkreislaufs und seine lebenswichtigen Funktionen kennen.',
    image: 'images/blutkreislauf-gesamt.jpg',
    
    steps: [
      {
        id: 'e1',
        title: 'Schritt 1: Definition',
        content: `Der Blutkreislauf ist ein geschlossenes System aus Herz und Blutgefäßen, das das Blut durch den gesamten Körper pumpt. Er versorgt alle Zellen mit lebenswichtigen Substanzen und transportiert Abfallprodukte ab.

Das Herz-Kreislauf-System besteht aus:
• Dem Herz als Antrieb (Muskelpumpe)
• Arterien (Schlagadern) - führen Blut vom Herzen weg
• Venen - führen Blut zum Herzen zurück
• Kapillaren (Haargefäße) - ermöglichen den Stoffaustausch

Der Mensch besitzt zwei hintereinander geschaltete Blutkreisläufe, die über das Herz miteinander verbunden sind.`,
        tip: 'Merke: Das Herz pumpt in Ruhe etwa 5 Liter Blut pro Minute durch den Körper - das sind 7.200 Liter pro Tag!'
      },
      {
        id: 'e2',
        title: 'Schritt 2: Funktionen des Blutkreislaufs',
        content: `Der Blutkreislauf erfüllt lebenswichtige Aufgaben:

1. Sauerstofftransport: Transport von Sauerstoff aus der Lunge zu allen Körperzellen
2. Nährstofftransport: Versorgung der Zellen mit Glucose, Aminosäuren, Fetten etc.
3. Abtransport von Stoffwechselprodukten: Kohlendioxid und andere Abfallstoffe werden abtransportiert
4. Hormontransport: Verteilung von Botenstoffen im Körper
5. Wärmetransport: Regulierung der Körpertemperatur
6. Immunabwehr: Transport von Abwehrzellen und Antikörpern`,
        tip: 'Der Blutkreislauf ist wie ein Transportsystem: Er bringt "Waren" (Sauerstoff, Nährstoffe) zu den Zellen und holt "Müll" (CO2, Abfallstoffe) ab.'
      },
      {
        id: 'e3',
        title: 'Schritt 3: Die zwei Kreisläufe im Überblick',
        content: `Der menschliche Körper hat zwei Blutkreisläufe:

Großer Kreislauf (Körperkreislauf):
• Start: Linke Herzkammer
• Ziel: Rechter Vorhof
• Transportiert sauerstoffreiches Blut zu allen Organen
• Bringt Sauerstoff und Nährstoffe zu den Zellen
• Nimmt CO2 und Abfallstoffe auf

Kleiner Kreislauf (Lungenkreislauf):
• Start: Rechte Herzkammer  
• Ziel: Linker Vorhof
• Transportiert sauerstoffarmes Blut zur Lunge
• In der Lunge wird Sauerstoff aufgenommen
• CO2 wird abgegeben (ausgeatmet)`,
        image: 'images/blutkreislauf-gesamt.jpg',
        tip: 'Wichtig: Im Körperkreislauf fließt in den Arterien sauerstoffreiches Blut, im Lungenkreislauf fließt in der Lungenarterie sauerstoffarmes Blut!'
      }
    ],
    exercises: [
      {
        id: 'e1-quiz',
        type: 'quiz',
        title: 'Verständnis-Check',
        instructions: 'Beantworte die folgenden Fragen zum Blutkreislauf:',
        questions: [
          {
            id: 'q1',
            question: 'Wie viele Blutkreisläufe hat der Mensch?',
            options: ['Einen', 'Zwei', 'Drei', 'Vier'],
            correctAnswer: 1,
            explanation: 'Der Mensch hat zwei hintereinander geschaltete Blutkreisläufe: den großen Körperkreislauf und den kleinen Lungenkreislauf.'
          },
          {
            id: 'q2',
            question: 'Welche Funktion hat der Blutkreislauf NICHT?',
            options: ['Sauerstofftransport', 'Nährstofftransport', 'Hormontransport', 'Verdauung von Fetten'],
            correctAnswer: 3,
            explanation: 'Die Verdauung von Fetten erfolgt im Verdauungstrakt, nicht im Blutkreislauf. Der Blutkreislauf transportiert jedoch die verdauten Nährstoffe.'
          },
          {
            id: 'q3',
            question: 'Wohin transportiert der große Kreislauf das Blut?',
            options: ['Nur zur Lunge', 'Zu allen Organen des Körpers', 'Nur zum Gehirn', 'Nur zur Leber'],
            correctAnswer: 1,
            explanation: 'Der große Kreislauf (Körperkreislauf) transportiert sauerstoffreiches Blut zu allen Organen und Geweben des Körpers.'
          }
        ]
      },
      {
        id: 'e1-fillblank',
        type: 'fillBlank',
        title: 'Lückentext: Grundbegriffe',
        instructions: 'Fülle die Lücken mit den passenden Begriffen aus!',
        blanks: [
          {
            id: 'b1',
            text: 'Der Blutkreislauf besteht aus dem Herz, den Arterien, den Venen und den ___.',
            answer: 'Kapillaren',
            hint: 'Die kleinsten Blutgefäße heißen...'
          },
          {
            id: 'b2',
            text: 'Der große Kreislauf startet in der ___ Herzkammer.',
            answer: 'linken',
            hint: 'Es ist die linke Seite des Herzens'
          },
          {
            id: 'b3',
            text: 'Der kleine Kreislauf dient dem ___ in der Lunge.',
            answer: 'Gasaustausch',
            hint: 'Hier wird Sauerstoff aufgenommen und CO2 abgegeben'
          }
        ]
      }
    ]
  },
  {
    id: 'herz',
    title: 'Modul 2: Das Herz',
    subtitle: 'Aufbau und Funktion des Herzens',
    duration: '20 Minuten',
    description: 'Lerne den Aufbau des Herzens mit seinen vier Kammern und vier Klappen kennen.',
    image: 'images/herz-anatomie.jpg',
    steps: [
      {
        id: 'h1',
        title: 'Schritt 1: Die vier Herzabschnitte',
        content: `Das Herz ist ein hohler Muskel, der in vier Abschnitte unterteilt ist:

Vorhöfe (oben):
• Rechter Vorhof (Atrium dextrum): Empfängt sauerstoffarmes Blut aus dem Körper über die obere und untere Hohlvene
• Linker Vorhof (Atrium sinistrum): Empfängt sauerstoffreiches Blut aus der Lunge über die Lungenvenen

Kammern (unten):
• Rechte Kammer (Ventriculus dexter): Pumpt sauerstoffarmes Blut in die Lungenarterie zur Lunge
• Linke Kammer (Ventriculus sinister): Pumpt sauerstoffreiches Blut in die Aorta zum Körper

Die linke Kammer hat die dickste Muskulatur, da sie das Blut mit hohem Druck in den gesamten Körper pumpen muss.`,
        image: 'images/herz-anatomie.jpg',
        tip: 'Merksatz: Rechts = Lunge (sauerstoffarm), Links = Körper (sauerstoffreich)'
      },
      {
        id: 'h2',
        title: 'Schritt 2: Die vier Herzklappen',
        content: `Die Herzklappen stellen sicher, dass das Blut nur in eine Richtung fließt:

Vorhof-Kammer-Klappen (Segelklappen):
• Trikuspidalklappe: Zwischen rechtem Vorhof und rechter Kammer (hat 3 Segel)
• Mitralklappe (Bikuspidalklappe): Zwischen linkem Vorhof und linker Kammer (hat 2 Segel)

Taschenklappen (Ausflussklappen):
• Pulmonalklappe: Zwischen rechter Kammer und Lungenarterie
• Aortenklappe: Zwischen linker Kammer und Aorta

Während der Systole (Kontraktion) schließen sich die Vorhof-Kammer-Klappen und die Taschenklappen öffnen sich. In der Diastole (Erschlaffung) ist es umgekehrt.`,
        image: 'images/herzklappen.jpg',
        tip: 'Stell dir die Klappen wie Einbahnstraßen vor - sie verhindern, dass das Blut zurückfließt!'
      },
      {
        id: 'h3',
        title: 'Schritt 3: Wie schlägt das Herz?',
        content: `Der Herzschlag besteht aus zwei Phasen:

1. Diastole (Erschlaffungsphase):
• Das Herz entspannt sich
• Die Vorhof-Kammer-Klappen öffnen sich
• Blut fließt aus den Vorhöfen in die Kammern
• Die Taschenklappen sind geschlossen

2. Systole (Kontraktionsphase):
• Das Herz zieht sich zusammen
• Die Vorhof-Kammer-Klappen schließen sich ("Lubb"-Ton)
• Die Kammern pumpen Blut in die Arterien
• Die Taschenklappen öffnen sich
• Bei der Entspannung schließen sich die Taschenklappen ("Dubb"-Ton)

In Ruhe schlägt das Herz etwa 60-80 Mal pro Minute und pumpt ca. 5 Liter Blut pro Minute.`,
        tip: 'Der Herzton "Lubb-Dubb" entsteht durch das Schließen der Herzklappen - keine Sorge, das ist normal!'
      }
    ],
    exercises: [
      {
        id: 'h2-labeling',
        type: 'labeling',
        title: 'Herz-Beschriftung',
        instructions: 'Ordne die Begriffe den richtigen Herzstrukturen zu!',
        labels: [
          { id: 'l1', text: 'Welche Kammer pumpt Blut in die Aorta?', answer: 'Linke Kammer' },
          { id: 'l2', text: 'Welcher Vorhof empfängt Blut aus den Venen?', answer: 'Rechter Vorhof' },
          { id: 'l3', text: 'Welche Klappe liegt zwischen linker Kammer und Aorta?', answer: 'Aortenklappe' },
          { id: 'l4', text: 'Welches Gefäß führt sauerstoffarmes Blut zur Lunge?', answer: 'Lungenarterie' }
        ]
      },
      {
        id: 'h2-quiz',
        type: 'quiz',
        title: 'Herz-Quiz',
        instructions: 'Teste dein Wissen über das Herz!',
        questions: [
          {
            id: 'q1',
            question: 'Wie heißt die Klappe zwischen linkem Vorhof und linker Kammer?',
            options: ['Trikuspidalklappe', 'Mitralklappe', 'Pulmonalklappe', 'Aortenklappe'],
            correctAnswer: 1,
            explanation: 'Die Mitralklappe (auch Bikuspidalklappe genannt) liegt zwischen dem linken Vorhof und der linken Kammer.'
          },
          {
            id: 'q2',
            question: 'Welche Kammer hat die dickste Muskulatur?',
            options: ['Rechter Vorhof', 'Rechte Kammer', 'Linker Vorhof', 'Linke Kammer'],
            correctAnswer: 3,
            explanation: 'Die linke Kammer muss das Blut mit hohem Druck in den gesamten Körper pumpen und hat daher die dickste Muskulatur.'
          },
          {
            id: 'q3',
            question: 'Was passiert in der Diastole?',
            options: ['Das Herz pumpt Blut aus', 'Das Herz entspannt sich und füllt sich mit Blut', 'Die Taschenklappen öffnen sich', 'Der Blutdruck steigt maximal'],
            correctAnswer: 1,
            explanation: 'In der Diastole entspannt sich das Herz und füllt sich mit Blut aus den Vorhöfen.'
          }
        ]
      }
    ]
  },
  {
    id: 'blutgefaesse',
    title: 'Modul 3: Blutgefäße',
    subtitle: 'Arterien, Venen und Kapillaren',
    duration: '20 Minuten',
    description: 'Lerne die drei Arten von Blutgefäßen und ihren Aufbau kennen.',
    image: 'images/blutgefaesse-aufbau.jpg',
    steps: [
      {
        id: 'bg1',
        title: 'Schritt 1: Arterien (Schlagadern)',
        content: `Arterien transportieren Blut vom Herzen weg in den Körper:

• Die größte Arterie ist die Aorta (Hauptschlagader)
• Sie entspringt aus der linken Herzkammer
• Hat einen Durchmesser von ca. 2,5-3,5 cm
• Arterien haben dicke, elastische Wände
• Der hohe Blutdruck wird durch die Muskelschicht und elastisches Gewebe ausgehalten
• Arterien verzweigen sich in immer kleinere Äste
• Ausnahme: Die Lungenarterie transportiert sauerstoffarmes Blut!

Aufbau der Arterienwand (von innen nach außen):
1. Intima: Innere Schicht aus glattem Epithel
2. Media: Mittlere Muskelschicht (dick!)
3. Adventitia: Äußere Schicht aus Bindegewebe`,
        tip: 'Merke: Arterien weg vom Herzen = A. Die Aorta ist wie ein Hauptverkehrsstraße, von der alle anderen Straßen abzweigen.'
      },
      {
        id: 'bg2',
        title: 'Schritt 2: Venen',
        content: `Venen führen Blut zum Herzen zurück:

• Die oberen und untere Hohlvene sind die größten Venen
• Sie münden in den rechten Vorhof
• Venen haben dünnere Wände als Arterien
• Der Blutdruck in Venen ist niedriger
• Viele Venen besitzen Venenklappen (Rückschlagventile)
• Die Klappen verhindern ein Zurückfließen des Blutes
• Die Muskelpumpe (Beinmuskulatur) unterstützt den Bluttransport
• Ausnahme: Die Lungenvenen transportieren sauerstoffreiches Blut!

Venen haben ebenfalls drei Wandschichten, aber die Media (Muskelschicht) ist viel dünner als bei Arterien.`,
        tip: 'Die Venenklappen funktionieren wie eine Fliesentreppe - das Blut kann nur nach oben, nicht zurück!'
      },
      {
        id: 'bg3',
        title: 'Schritt 3: Kapillaren (Haargefäße)',
        content: `Kapillaren sind die feinsten und kleinsten Blutgefäße:

• Durchmesser: nur 0,004-0,015 mm (dünner als ein Haar!)
• Sie bilden ein dichtes Netzwerk in allen Organen
• Ihre Wand besteht nur aus einer einzigen Zellschicht (Endothel)
• Hier findet der Stoffaustausch statt!

Was wird ausgetauscht?
• Sauerstoff und Nährstoffe geben vom Blut in das Gewebe ab
• Kohlendioxid und Abfallstoffe werden aus dem Gewebe aufgenommen
• Auch Wasser und Elektrolyte werden ausgetauscht

Besonderheiten:
• Das Blut fließt hier sehr langsam (0,3 mm/s)
• Die Gesamtfläche aller Kapillaren ist riesig
• Etwa 20 Liter Flüssigkeit werden täglich hier ausgetauscht`,
        image: 'images/blutgefaesse-aufbau.jpg',
        tip: 'Stell dir die Kapillaren wie einen Marktplatz vor: Hier findet der Austausch zwischen Blut und Gewebe statt!'
      }
    ],
    exercises: [
      {
        id: 'bg3-matching',
        type: 'matching',
        title: 'Zuordnung: Arterien vs. Venen vs. Kapillaren',
        instructions: 'Ordne die Eigenschaften den richtigen Blutgefäßen zu!',
        pairs: [
          { id: 'm1', left: 'Dicke, muskulöse Wand', right: 'Arterie' },
          { id: 'm2', left: 'Venenklappen vorhanden', right: 'Vene' },
          { id: 'm3', left: 'Stoffaustausch findet hier statt', right: 'Kapillare' },
          { id: 'm4', left: 'Transportiert Blut vom Herzen weg', right: 'Arterie' },
          { id: 'm5', left: 'Transportiert Blut zum Herzen', right: 'Vene' },
          { id: 'm6', left: 'Nur eine Zellschicht als Wand', right: 'Kapillare' }
        ]
      },
      {
        id: 'bg3-fillblank',
        type: 'fillBlank',
        title: 'Lückentext: Blutgefäße',
        instructions: 'Fülle die Lücken mit den passenden Begriffen!',
        blanks: [
          {
            id: 'b1',
            text: 'Die ___ ist die größte Arterie im menschlichen Körper.',
            answer: 'Aorta',
            hint: 'Sie wird auch Hauptschlagader genannt'
          },
          {
            id: 'b2',
            text: 'Venen besitzen ___, die ein Zurückfließen des Blutes verhindern.',
            answer: 'Klappen',
            hint: 'Sie funktionieren wie Rückschlagventile'
          },
          {
            id: 'b3',
            text: 'In den Kapillaren findet der ___ zwischen Blut und Gewebe statt.',
            answer: 'Stoffaustausch',
            hint: 'Hier werden O2 und Nährstoffe abgegeben'
          },
          {
            id: 'b4',
            text: 'Die Wand einer Arterie besteht aus drei Schichten: Intima, Media und ___.',
            answer: 'Adventitia',
            hint: 'Die äußere Schicht aus Bindegewebe'
          }
        ]
      }
    ]
  },
  {
    id: 'koerperkreislauf',
    title: 'Modul 4: Großer Kreislauf',
    subtitle: 'Der Körperkreislauf im Detail',
    duration: '20 Minuten',
    description: 'Verfolge den Weg des Blutes durch den großen Kreislauf und lerne die Versorgung der Organe kennen.',
    image: 'images/koerperkreislauf.jpg',
    steps: [
      {
        id: 'kk1',
        title: 'Schritt 1: Start im Herzen',
        content: `Der große Kreislauf beginnt in der linken Herzkammer:

1. Linke Kammer kontrahiert (Systole)
2. Die Aortenklappe öffnet sich
3. Sauerstoffreiches Blut wird in die Aorta gepumpt
4. Die Aorta biegt bogenförmig nach oben ab (Aortenbogen)
5. Von hier aus verzweigen sich Arterien zu allen Organen

Der Blutdruck in der Aorta ist am höchsten (ca. 120 mmHg systolisch). Dieser hohe Druck ist nötig, um das Blut durch den ganzen Körper zu transportieren.`,
        tip: 'Stell dir die linke Kammer wie eine starke Pumpe vor, die das Blut mit Druck in das "Versorgungsnetz" des Körpers schickt.'
      },
      {
        id: 'kk2',
        title: 'Schritt 2: Versorgung der Organe',
        content: `Von der Aorta aus werden alle Organe versorgt:

Kopf und Gehirn:
• Halsschlagarterien (Arteria carotis) führen zum Gehirn
• Das Gehirn braucht viel Sauerstoff (20% des gesamten Bluts!)

Arme:
• Arterien führen zu den Armen und Händen

Innere Organe:
• Leberarterie versorgt die Leber
• Nierenarterien versorgen die Nieren
• Darmarterien versorgen den Verdauungstrakt

Beine:
• Schlagadern führen zu den Beinen und Füßen

Überall in den Organen verzweigen sich die Arterien in feinere Kapillaren, wo der Stoffaustausch stattfindet.`,
        image: 'images/koerperkreislauf.jpg',
        tip: 'Das Gehirn ist besonders empfindlich auf Sauerstoffmangel - schon nach 4-6 Minuten ohne Sauerstoff kommt es zu bleibenden Schäden!'
      },
      {
        id: 'kk3',
        title: 'Schritt 3: Rückweg zum Herzen',
        content: `Nach dem Stoffaustausch in den Kapillaren:

1. Das Blut ist nun sauerstoffarm und reich an CO2
2. Aus den Kapillaren fließt es in kleine Venen (Venolen)
3. Diese vereinigen sich zu größeren Venen
4. Das Blut aus dem Unterkörper sammelt sich in der unteren Hohlvene (Vena cava inferior)
5. Das Blut aus dem Oberkörper, Kopf und Armen sammelt sich in der oberen Hohlvene (Vena cava superior)
6. Beide Hohlvenen münden in den rechten Vorhof des Herzens

Der Kreislauf ist geschlossen - das sauerstoffarme Blut fließt nun in den kleinen Kreislauf (Lungenkreislauf) zur Sauerstoffaufnahme.`,
        tip: 'Die Hohlvenen sind wie Hauptstraßen, auf denen das "verbrauchte" Blut zurück zum Herzen fließt.'
      }
    ],
    exercises: [
      {
        id: 'kk3-ordering',
        type: 'ordering',
        title: 'Reihenfolge: Der große Kreislauf',
        instructions: 'Bringe die Stationen des großen Kreislaufs in die richtige Reihenfolge!',
        items: [
          { id: 'o1', text: 'Linke Kammer pumpt Blut in die Aorta', correctPosition: 1 },
          { id: 'o2', text: 'Stoffaustausch in den Kapillaren', correctPosition: 3 },
          { id: 'o3', text: 'Arterien verzweigen sich zu den Organen', correctPosition: 2 },
          { id: 'o4', text: 'Sauerstoffarmes Blut fließt in die Hohlvenen', correctPosition: 4 },
          { id: 'o5', text: 'Hohlvenen münden in den rechten Vorhof', correctPosition: 5 }
        ]
      },
      {
        id: 'kk3-quiz',
        type: 'quiz',
        title: 'Quiz: Körperkreislauf',
        instructions: 'Teste dein Wissen!',
        questions: [
          {
            id: 'q1',
            question: 'Wo beginnt der große Kreislauf?',
            options: ['Rechter Vorhof', 'Linke Kammer', 'Rechte Kammer', 'Linker Vorhof'],
            correctAnswer: 1,
            explanation: 'Der große Kreislauf beginnt in der linken Kammer, die sauerstoffreiches Blut in die Aorta pumpt.'
          },
          {
            id: 'q2',
            question: 'Wie heißen die beiden größten Venen?',
            options: ['Lungenvenen', 'Hohlvenen', 'Nierenvenen', 'Lebervenen'],
            correctAnswer: 1,
            explanation: 'Die obere und untere Hohlvene (Vena cava superior und inferior) sind die größten Venen.'
          },
          {
            id: 'q3',
            question: 'Welches Organ erhält 20% des gesamten Blutes?',
            options: ['Leber', 'Herz', 'Gehirn', 'Nieren'],
            correctAnswer: 2,
            explanation: 'Das Gehirn benötigt etwa 20% des gesamten Herzzeitvolumens, obwohl es nur 2% des Körpergewichts ausmacht.'
          }
        ]
      }
    ]
  },
  {
    id: 'lungenkreislauf',
    title: 'Modul 5: Kleiner Kreislauf',
    subtitle: 'Der Lungenkreislauf und Gasaustausch',
    duration: '20 Minuten',
    description: 'Verfolge den Weg des Blutes durch die Lunge und verstehe den Gasaustausch.',
    image: 'images/lungenkreislauf.jpg',
    steps: [
      {
        id: 'lk1',
        title: 'Schritt 1: Weg zur Lunge',
        content: `Der kleine Kreislauf beginnt in der rechten Kammer:

1. Rechte Kammer kontrahiert
2. Die Pulmonalklappe öffnet sich
3. Sauerstoffarmes Blut wird in die Lungenarterie gepumpt
4. Die Lungenarterie teilt sich in einen rechten und linken Ast
5. Diese führen zu den jeweiligen Lungenflügeln
6. Im Lungengewebe verzweigen sie sich in feinere Arteriolen
7. Schließlich erreicht das Blut das Kapillarnetz um die Lungenbläschen

Wichtig: Die Lungenarterie ist die einzige Arterie, die sauerstoffarmes Blut transportiert!`,
        tip: 'Merke: Im Lungenkreislauf ist alles "verkehrt herum" - die Arterie transportiert sauerstoffarmes Blut!'
      },
      {
        id: 'lk2',
        title: 'Schritt 2: Der Gasaustausch',
        content: `In den Lungenbläschen (Alveolen) findet der Gasaustausch statt:

Aufbau der Lungenbläschen:
• Es gibt ca. 300 Millionen Alveolen in der Lunge
• Jede Alveole ist von einem feinen Kapillarnetz umgeben
• Die Wand der Alveole ist nur eine Zellschicht dünn
• Die Kapillarwand ist ebenfalls nur eine Zellschicht dünn

Der Austausch:
• Sauerstoff (O2) diffundiert aus der Alveole in das Blut
• Kohlendioxid (CO2) diffundiert aus dem Blut in die Alveole
• Dies geschieht durch Konzentrationsunterschiede (passiv!)
• Die roten Blutkörperchen nehmen den Sauerstoff auf

Das Blut wird nun sauerstoffreich!`,
        image: 'images/gasaustausch.jpg',
        tip: 'Die Diffusion funktioniert wie ein Aroma, das sich im Raum verteilt - Stoffe bewegen sich immer vom Ort mit höherer Konzentration zum Ort mit niedrigerer Konzentration.'
      },
      {
        id: 'lk3',
        title: 'Schritt 3: Rückweg zum Herzen',
        content: `Nach dem Gasaustausch:

1. Das sauerstoffreiche Blut fließt aus den Kapillaren
2. Es sammelt sich in kleinen Venolen
3. Diese vereinigen sich zu den Lungenvenen
4. Es gibt vier Lungenvenen (zwei pro Lungenflügel)
5. Diese münden in den linken Vorhof des Herzens

Und der Kreislauf beginnt von Neuem:
• Aus dem linken Vorhof fließt das Blut in die linke Kammer
• Die linke Kammer pumpt es in die Aorta
• Der große Kreislauf beginnt wieder!

Der Blutkreislauf ist ein geschlossenes System ohne Anfang und Ende - er läuft kontinuierlich.`,
        image: 'images/lungenkreislauf.jpg',
        tip: 'Atme tief ein - mit jedem Atemzug werden tausende Lungenbläschen mit frischem Sauerstoff versorgt!'
      }
    ],
    exercises: [
      {
        id: 'lk3-fillblank',
        type: 'fillBlank',
        title: 'Lückentext: Lungenkreislauf',
        instructions: 'Fülle die Lücken zum Lungenkreislauf aus!',
        blanks: [
          {
            id: 'b1',
            text: 'Der Lungenkreislauf beginnt in der ___ Herzkammer.',
            answer: 'rechten',
            hint: 'Es ist die rechte Seite des Herzens'
          },
          {
            id: 'b2',
            text: 'Das sauerstoffarme Blut wird durch die ___ zur Lunge transportiert.',
            answer: 'Lungenarterie',
            hint: 'Dies ist die einzige Arterie mit sauerstoffarmem Blut'
          },
          {
            id: 'b3',
            text: 'Der Gasaustausch findet in den ___ statt.',
            answer: 'Lungenbläschen',
            hint: 'Auch Alveolen genannt'
          },
          {
            id: 'b4',
            text: 'Sauerstoff diffundiert vom ___ ins Blut.',
            answer: 'Atemgas',
            hint: 'Oder Lumenbläschen/Luft'
          },
          {
            id: 'b5',
            text: 'Das sauerstoffreiche Blut kehrt durch die ___ zum Herzen zurück.',
            answer: 'Lungenvenen',
            hint: 'Dies sind die einzigen Venen mit sauerstoffreichem Blut'
          }
        ]
      },
      {
        id: 'lk3-quiz',
        type: 'quiz',
        title: 'Quiz: Lungenkreislauf',
        instructions: 'Teste dein Wissen!',
        questions: [
          {
            id: 'q1',
            question: 'Warum transportiert die Lungenarterie sauerstoffarmes Blut?',
            options: ['Weil sie defekt ist', 'Weil sie vom rechten Herzen kommt', 'Weil die Lunge keinen Sauerstoff braucht', 'Weil sie zu dünn ist'],
            correctAnswer: 1,
            explanation: 'Die Lungenarterie kommt vom rechten Herzen, das sauerstoffarmes Blut aus dem Körper empfängt. Sie transportiert es zur Lunge zur Sauerstoffaufnahme.'
          },
          {
            id: 'q2',
            question: 'Wie viele Lungenbläschen hat der Mensch ca.?',
            options: ['3 Millionen', '30 Millionen', '300 Millionen', '3 Milliarden'],
            correctAnswer: 2,
            explanation: 'Die menschliche Lunge enthält etwa 300 Millionen Alveolen (Lungenbläschen).'
          },
          {
            id: 'q3',
            question: 'Womit wird das Blut in der Lunge angereichert?',
            options: ['Kohlendioxid', 'Sauerstoff', 'Stickstoff', 'Wasserstoff'],
            correctAnswer: 1,
            explanation: 'In den Lungenbläschen nimmt das Blut Sauerstoff auf und gibt Kohlendioxid ab.'
          }
        ]
      }
    ]
  },
  {
    id: 'zusammenfassung',
    title: 'Modul 6: Zusammenfassung & Test',
    subtitle: 'Finale Prüfung deines Wissens',
    duration: '25 Minuten',
    description: 'Wiederhole das Gelernte und teste dein Wissen im Abschlusstest.',
    image: 'images/blutkreislauf-gesamt.jpg',
    steps: [
      {
        id: 'z1',
        title: 'Schritt 1: Zusammenfassung',
        content: `Das Herz-Kreislauf-System im Überblick:

Das Herz:
• Vier Kammern: 2 Vorhöfe, 2 Kammern
• Vier Klappen: Trikuspidal-, Mitral-, Pulmonal-, Aortenklappe
• Links = Körper (sauerstoffreich), Rechts = Lunge (sauerstoffarm)
• Pumpt ca. 5 Liter/Minute

Der große Kreislauf (Körperkreislauf):
• Start: Linke Kammer → Aorta
• Ziel: Rechter Vorhof (über Hohlvenen)
• Transportiert O2 und Nährstoffe zu den Zellen
• Sammelt CO2 und Abfallstoffe

Der kleine Kreislauf (Lungenkreislauf):
• Start: Rechte Kammer → Lungenarterie
• Ziel: Linker Vorhof (über Lungenvenen)
• Gasaustausch in den Lungenbläschen
• Blut wird mit Sauerstoff angereichert`,
        tip: 'Du hast jetzt alle Grundlagen gelernt! Zeit für den Abschlusstest.'
      }
    ],
    exercises: [
      {
        id: 'z1-quiz',
        type: 'quiz',
        title: 'Abschlusstest',
        instructions: 'Beantworte alle Fragen richtig, um das Lernmodul abzuschließen!',
        questions: [
          {
            id: 'q1',
            question: 'Welche Aussage über Arterien und Venen ist RICHTIG?',
            options: [
              'Arterien führen immer sauerstoffreiches Blut',
              'Venen haben immer Venenklappen',
              'Arterien transportieren Blut vom Herzen weg',
              'Kapillaren haben dicke Wände'
            ],
            correctAnswer: 2,
            explanation: 'Arterien transportieren Blut vom Herzen weg, unabhängig vom Sauerstoffgehalt. Die Lungenarterie transportiert z.B. sauerstoffarmes Blut.'
          },
          {
            id: 'q2',
            question: 'Was passiert in der Systole?',
            options: [
              'Das Herz entspannt sich',
              'Die Kammern füllen sich mit Blut',
              'Die Kammern pumpen Blut in die Arterien',
              'Die Vorhof-Kammer-Klappen öffnen sich'
            ],
            correctAnswer: 2,
            explanation: 'In der Systole ziehen sich die Herzkammern zusammen und pumpen Blut in die Arterien (Aorta und Lungenarterie).'
          },
          {
            id: 'q3',
            question: 'Welche Klappe liegt zwischen linker Kammer und Aorta?',
            options: ['Trikuspidalklappe', 'Mitralklappe', 'Pulmonalklappe', 'Aortenklappe'],
            correctAnswer: 3,
            explanation: 'Die Aortenklappe liegt zwischen der linken Kammer und der Aorta und verhindert ein Zurückfließen des Bluts.'
          },
          {
            id: 'q4',
            question: 'Wo findet der Gasaustausch zwischen Blut und Gewebe statt?',
            options: ['In der Aorta', 'In den Venen', 'In den Kapillaren', 'Im Herzen'],
            correctAnswer: 2,
            explanation: 'Der Stoffaustausch findet in den Kapillaren statt, da deren Wände nur eine Zellschicht dick sind.'
          },
          {
            id: 'q5',
            question: 'Welche Aussage über den Blutkreislauf ist FALSCH?',
            options: [
              'Der Körperkreislauf beginnt in der linken Kammer',
              'Die Lungenvene transportiert sauerstoffreiches Blut',
              'Das Herz hat vier Kammern',
              'Der Blutkreislauf ist ein offenes System'
            ],
            correctAnswer: 3,
            explanation: 'Der Blutkreislauf ist ein geschlossenes System! Das Blut fließt kontinuierlich in einem Kreis und wird nicht "verbraucht".'
          },
          {
            id: 'q6',
            question: 'Wie wird das sauerstoffarme Blut aus dem Unterkörper zum Herzen transportiert?',
            options: ['Lungenvene', 'Obere Hohlvene', 'Untere Hohlvene', 'Aorta'],
            correctAnswer: 2,
            explanation: 'Die untere Hohlvene (Vena cava inferior) transportiert sauerstoffarmes Blut aus dem Unterkörper zum rechten Vorhof.'
          }
        ]
      },
      {
        id: 'z1-fillblank',
        type: 'fillBlank',
        title: 'Lückentext: Gesamtzusammenfassung',
        instructions: 'Fülle alle Lücken richtig aus!',
        blanks: [
          {
            id: 'b1',
            text: 'Das Herz hat ___ Kammern und ___ Klappen.',
            answer: 'vier',
            hint: '4'
          },
          {
            id: 'b2',
            text: 'Der große Kreislauf wird auch ___ genannt.',
            answer: 'Körperkreislauf',
            hint: 'Weil er den Körper versorgt'
          },
          {
            id: 'b3',
            text: 'Die ___ ist die größte Arterie des Körpers.',
            answer: 'Aorta',
            hint: 'Hauptschlagader'
          },
          {
            id: 'b4',
            text: 'In den Lungenbläschen findet der ___ statt.',
            answer: 'Gasaustausch',
            hint: 'Austausch von O2 und CO2'
          }
        ]
      },
      {
        id: 'z1-matching',
        type: 'matching',
        title: 'Finale Zuordnung',
        instructions: 'Ordne die Begriffe den richtigen Definitionen zu!',
        pairs: [
          { id: 'm1', left: 'Transportiert Blut vom Herzen weg', right: 'Arterie' },
          { id: 'm2', left: 'Transportiert Blut zum Herzen', right: 'Vene' },
          { id: 'm3', left: 'Stoffaustausch zwischen Blut und Gewebe', right: 'Kapillare' },
          { id: 'm4', left: 'Verhindert Rückfluss des Blutes', right: 'Herzklappe' },
          { id: 'm5', left: 'Kammer die Blut in die Aorta pumpt', right: 'Linke Kammer' },
          { id: 'm6', left: 'Größtes Blutgefäß im Körper', right: 'Aorta' }
        ]
      }
    ]
  }
];

export const getModuleById = (id: string): LearningModule | undefined => {
  return learningModules.find(m => m.id === id);
};

export const getTotalModuleCount = (): number => learningModules.length;
