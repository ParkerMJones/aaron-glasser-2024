const curatedPrograms = [
  {
    id: 1,
    title: "Argentine Experimentalists",
    date: "January 16",
    year: "2020",
    description:
      "For the last twenty years, Argentine film has risen to the top of the world cinema stage with countlessly acclaimed auteurs such as Marco Berger, Lucrecia Martel, Martín Rejtman, Lisandro Alonso, and Lucía Puenzo, not to mention the incredible emerging talents involved with El Pampero Cine. With all of the international acclaim for narrative and independent film, the experimental scene spanning from in Buenos Aires can be neglected on the world stage. This program zooms into this underbelly of the enormous amount of filmic creativity coming out of Argentina.",
    firstHalf: [
      "Indestructible (2016) — Ernesto Baca (4m)",
      "Testamento y vida interior (1977) — Narcisa Hirsch (10m)",
      "Ofrenda (1978) — Claudio Caldini (2m)",
      "No obstante, es peligroso (2008) — Mariano Ramis (5m)",
      "Composición nro. 1 (2016) — Rodrigo Noya (4m)",
      "Girasoles (2015) — Jeff Zorrilla (5m)",
    ],
    secondHalf: ["La película infinita (2018) — Leandro Lisorti (52m)"],
  },
  {
    id: 2,
    title: "Avant-Docs",
    date: "February 13",
    year: "2020",
    description:
      "How does one present a subject for a documentary? This program shows different ways in which filmmakers have approached this question. Form matters for how non-narrative ideas are presented, and the artists shown here work to keep their form innovative and thoughtful.",
    firstHalf: [
      "Il Capo / Yuri Ancarani / 2010",
      "Valentin de las Sierras / Bruce Baillie / 1971",
      "Ueita / Andrea Oranday / 2019",
      "Riverview / Will Jones / 2019 (in person!)",
    ],
    secondHalf: [
      "Occidente / Ana Vaz / 2014",
      "An Aviation Field / Joana Pimenta / 2016",
      "The Questioning / Zhu Rikun / 2013",
    ],
  },
  {
    id: 3,
    title: "POST processing",
    date: "February 27",
    year: "2020",
    description:
      "POST processing will showcase all sorts of innovative ways filmmakers have manipulated their images after capture. Manipulations span from Bill Morrison’s physical decaying of found footage to Naomi Uman’s use of nail polish remover to extract the females from old pornographic films to Isiah Medina’s unique usage of pacing and overlay.",
    firstHalf: [
      "Space Invaders (2019) — Colectivo Los Ingrávidos",
      "Body Contours (2017) — Kristin Reeves",
      "MUÑE (2018) — Catalina Jordan Alvarez",
      "idizwadidiz (2016) — Isiah Medina",
      "I’ll Remember You as You Were, Not as What You’ll Become (2016) — Sky Hopinka",
    ],
    secondHalf: [
      "All That You Can’t Leave Behind (2019) — Ufuoma Essi",
      "Removed (1999) — Naomi Uman",
      "THE WHOLE SHEBANG (1982/2019) — Ken/Flo/Nisi Jacobs",
      "Light Is Calling (2004) — Bill Morrison",
    ],
  },
  {
    id: 4,
    title: "existential cartoons",
    date: "October 3",
    year: "2019",
    description:
      "This selection covers the hilarious to the dreary to the utterly strange. Filmmakers use animation to depict how weird it is to be alive and here.",
    firstHalf: [
      "Old Lady and the Pigeons (1998) — Sylvain Chomet (22m)",
      "Aníbal (2005) — Mariano Ramis (3m)",
      "everything will be okay (2006) — Don Hertzfeldt (17m)",
    ],
    secondHalf: [
      "Revolver (1994) — Stig Bergquist, Jonas Odell, Martti Ekstrand & Lars Ohlson (8m)",
      "Who’s the daddy? (2018) — Wong Ping (9m)",
      "deuce (2010) — Monica Cook (3m)",
      "Umbilical World (2018) — David Firth (excerpt-18m)",
    ],
  },
  {
    id: 5,
    title: "The Body",
    date: "October 16",
    year: "2019",
    description: `
      The role of the body and how it determines experience is especially salient in visual mediums, such as film, because of both the vulnerability of being before the camera—exposed—and the act of being presented as an object to be confronted and engaged with. This objectified experience of being viewed can be subverted into subjectivity—and agency—on film. In depicting the body, artists showcase how it is to live embodied: exposing certain ways of being for the eyes of the other.`,
    firstHalf: [
      "Greetings from Africa (1994) — Cheryl Dunye (9m)",
      "moloko (2014) — Pauline Shongov (5m)",
      "Un chant d’amour (1950) — Jean Genet (25m)",
    ],
    secondHalf: [
      "Madame (prologue) (2010) — Qiu Joingjiong (5m)",
      "Element (1973) — Amy Greenfield (12m)",
      "Fuses — Carolee Schneemann (1967) (22m)",
    ],
  },
  {
    id: 6,
    title: "Assorted Sorcery (ft. Live Scores)",
    date: "October 30",
    year: "2019",
    description: `Alchemy, magic, witchcraft, sorcery. Cinema has conjured all sorts of these comparisons. The original cinematic artform was the magic lantern after all! Cinema has been enthralled with the possibility of flirting with the unknown, through the edit in order to manifest illusion.

    In this program, we dive into different approaches filmmakers have used in order to summon the spirits. From an vessel for magic at cinema’s impetus in George Méliès’ iconic work to the algorithmic alchemy of Guy Maddin’s interactive piece Seances to Brakhage’s ‘sexual witchcraft’ to the ‘artist-alchemist’ Patrick Bokanowski’s first film.`,
    firstHalf: [
      "The Mysterious Dislocation (1901) — George Méliès (2m)",
      "Whimsical Illusions (1909) — George Méliès (5m)",
      "--live score by Heather Mease",
      "Seances (2016) — Guy Maddin, Galen & Evan Johnson (12-20m)",
      "Cat’s Cradle (1959) — Stan Brakhage (6m)",
      "--live score by Heather Mease",
    ],
    secondHalf: [
      "Lincoln, Lonnie, and Me (2012) — Carrie Mae Weems (18m)",
      "Flammes (1998) — Patrick Bokanowski (4m)",
      "La femme qui se poudre (1972) — Patrick Bokanowski (18m)",
      "--live score by Becky Brown",
    ],
  },
  {
    id: 7,
    title: "you don’t need a fancy camera to make movies",
    date: "November 14",
    year: "2019",
    description: `Filmmaking is expensive, they say. You need to get a whole crew and a production company and donors in order to make a movie. Right?

    This program serves to prove that line of thinking wrong. No, you don’t need a fancy camera to make movies. In fact, there is a whole strain of filmmakers devoted to making films without cameras. Camera-less filmmaking can use found footage, animation, old photos, apple notes, etc.`,
    firstHalf: [
      "GreenScreenRefrigeratorAction (2010) — Mark Leckey (17m)",
      "cavity (2019) — ariella tai (5m)",
      "E-ticket (2019) — Simon Liu (13m)",
      "My Thoughts (2010) — Andrew Norman Wilson (8m)",
    ],
    secondHalf: [
      "Like All Bad Men He Looks Attractive (2003) — Michelle Smith (23m)",
      "An Ecstatic Experience (2015) — Ja’Tovia Gary (6m)",
      `I Feel, Therefore I Can Be Free (2017) — Nzingha Kendall (7m)
      w/ filmmaker in person`,
    ],
  },
  {
    id: 8,
    title: "Comedy!",
    date: "June 20",
    year: "2019",
    description: `First up: The peculiar, expansive and surprisingly tasteful comedy of Gabriel Abrantes. In just the three films being shown in this program, he manages to poke fun at pretentiousness, Herzog, Obama, poets, period pieces, sci-fi, Freud, and himself.

    Here is his more formal blurb:
    Gabriel Abrantes (b. 1984, USA) is an artist and filmmaker. His work has been shown in exhibitions at the MIT List Center for the Visual Arts, the Palais de Tokyo, the Centre Pompidou, the Musée d’Art Moderne de la Ville de Paris, the Centre d’Art Contemporain, Geneva and Museu Serralves. His films have screened in competition at festivals such as La Biennale di Venezia, the Berlinale, Locarno International Film Festival, and IndieLisboa. He was been awarded prizes at the Berlinale, Locarno International Film Festival, among others.`,
    firstHalf: [
      "Taprobana (2014) – 23 min",
      "Freud Und Friends (2015) – 23 min",
      "The Hunchback (2016) – 30 min (w/ Ben Rivers)",
    ],
    secondHalf: [],
  },
  {
    id: 9,
    title: "Pure Formalism",
    date: "July 3",
    year: "2019",
    description: `
    Film still remains one of the newer media. In this program, we showcase some historic and contemporary (as well as local!) investigations of the moving image as an artistic media in and of itself. Scrap the narrative and conceptual mumbo jumbo, here we embrace the form to see how film uniquely contributes to the history of art. In the spirit of Stan Brakhage, we stand face to face with the image itself—and absorb.`,
    firstHalf: [
      "Castro Street (1966) — Bruce Baillie (10m)^",
      "Game of Stones (1965) — Jan Svankmajer (9m)",
      "Something Between Us (2015) — Jodie Mack (9m)^",
      "GET WET (2018) — Heather Mease (6m)*",
      "The Dante Quartet (1987) — Stan Brakhage (6m)^",
      "Tiber (2013) — Michael Ashkin (18m)",
      "TRYPPS #5 (2008) — Ben Russell (3m)^",
      "JALOPY (2019) — Aaron Glasser (10m)*",
      "Tails (1976) — Paul Sharits (5m)^",
    ],
    secondHalf: [],
    notes: `^=screened in 16mm
    *=w/ filmmaker in audience`,
  },
  {
    id: 10,
    title: "Dance on Camera",
    date: "July 18",
    year: "2019",
    description: `The moving image and the moving body together on the screen.  The history of dance on film is actually quite extensive, especially among the experimental communities. And considering dance’s elaborate history with experimentation itself, we found it fitting to devote a night to the various ways the camera has depicted the contortions and undulations of the human figure. Dance of all kinds, used in films in all sorts of ways.`,
    firstHalf: [
      "A Study in Choreography for Camera (1945) — Maya Deren (2m)",
      "Hand Movie (1966) — Yvonne Rainer (5m)",
      "Coyote (2010) — Joel Potrykus (22m)",
      "AntiBodies (excerpt) (2018) — Sabine Gruffat (2m)",
      "Take Off (1972) — Gunvor Nelson (10m)",
      "Sing To Me (2018) — Wes Swing & Cat Kneip (7m)",
      "Quadrant 1+2 (1982) — Samuel Becket (13m)",
      "Fase, Four Movements to the Music of Steve Reich (excerpt) (1982) — Anne Teresa De Keersmaeker (12m)",
      "Swimming in Your Skin Again (2014) — Terrance Nance (21m)",
    ],
    secondHalf: [],
  },
  {
    id: 11,
    title: "films Of the Outside, watched In the Outside",
    date: "August 2",
    year: "2019",
    description: `
    These films are all primarily shot in or about the the outside world. From Bruce Baillie to Caryn Cline to the late Jonas Mekas, we see the prismatic nature of the outside and all its possibility. Whether we are present within it, looking out towards it or refusing to forget it, the outside is ironically necessary to the often introspective nature of experimental cinema. In order to show something, we must first see it.`,
    firstHalf: [
      "All My Life (1966) — Bruce Baillie (3m)^",
      "XCTRY (2018) — Bill Brown (6m)",
      "fryar hole punch (2019) — Will Jones (6m)*",
      "Fainting Spells (2018) — Sky Hopinka (11m)",
      "Garden of Earthly Delights (1989) — Stan Brakhage (2m)^",
      "Salers (2014) — Fernando Dominguez (9m)",
    ],
    secondHalf: [
      "Daybreak Express (1953) — DA Pennebaker (5m)",
      "Workers Leaving the Factory (1895) — Lumière Brothers (2m)",
      "Austerity Measures (2011) — Guillaume Cailleau and Ben Russell (8m)",
      "Blue (2018) — Apichatpong Weerasethakul (12m)",
      "In the Conservatory (2010) — Caryn Cline (5m)^",
      "Song of Avignon (2000) — Jonas Mekas (12m)",
    ],
    notes: `^=screened in 16mm
    *= w/ filmmaker in person`,
  },
  {
    id: 12,
    title: "Family Portraits",
    date: "August 15",
    year: "2019",
    description: `Experimental film in particular can be phenomenally personal. Often, filmmakers, in attempts to display their perspective upon the world, inevitably return back to their core foundation: their family. In this showcase, we show work from the late Barbara Hammer experiencing her grandmother’s final days, as well as a video work dedicated to a mother by Mona Hatoum and a more joyful portrait of an estranged uncle by Agnes Varda, among more.`,
    firstHalf: [
      "NOTE ONE (1968) — Saul Levine (6m)",
      "Measures of Distance (1988) — Mona Hatoum (16m)",
      "Optic Nerve (1985) — Barbara Hammer (17m)^",
    ],
    secondHalf: [
      "Uncle Yanko (1967) — Agnes Varda (18m)",
      "Creeping Crimson (1987) — George Kuchar (13m)",
      "Old Wives’ Tales (2015) — Tânia Dinis (4m)",
      "Evenings (2015) — Anna Wang (3m)*",
      "Close the Shutters (2017) — Ynon Lan (5m)",
    ],
    notes: `^=screened in 16mm
    *=w/ filmmaker in person`,
  },
  {
    id: 13,
    title: "Live Film Scores",
    date: "August 29",
    year: "2019",
    description: `We have a wonderful program of old silent films with rich histories of being improvised to, a structuralist film with added sound and a new improvised score to a more recent piece.`,
    firstHalf: [
      "Emak-Bakia (Leave Me Alone) — (Man Ray / 1926 / 16m)",
      "Performed to by Raven Bauer Durham and James Wolf",
      "The Fourth Watch — (Janie Geiser / 2000 / 10m)",
      "Performed to by Dave Gibson",
      "By Night With Torch and Spear — (Joseph Cornell / 1946 / 8m)",
      "Performed to by Colin Killalea",
    ],
    secondHalf: [
      "Zorn’s Lemma — (Hollis Frampton / 1970 / 60m, ~45m score)",
      "Performed to by Ear Infection",
    ],
  },
  {
    id: 14,
    title: "Puppets & Clay: A Taste of Czech Stop Motion Cinema",
    date: "March 14",
    year: "2019",
    description: `Puppets and Clay: A Taste of Czech Stop Motion Cinema, is an embrace of the Czech Republic’s rich cinematic culture. We present works by three giants in the tradition: Jiří Trnka, Jiří Barta, and Jan Švankmajer, who all deeply engage with material and imagination.`,
    firstHalf: [
      "Dimensions of Dialogue (1982) – Jan Švankmajer (12 min)",
      "The Hand (1965) – Jiří Trnka (18 min)",
      "The Club of the Laid Off (1989) – Jiří Barta (25 min)",
      "Food (1991) – Jan Švankmajer (17 min)",
    ],
    secondHalf: [],
  },
  {
    id: 15,
    title: "The Neorealism of Nicolás Pereda",
    date: "April 4",
    year: "2019",
    description:
      "Nicolás Pereda is a Mexican-Canadian filmmaker working at the intersection of documentary and fiction. In addition to screening his films at festivals around the world such as Venice, Berlinale, Rotterdam, and Toronto, Pereda’s work has been presented at several retrospectives in various museums and archives including Anthology Film Archives, the Film Society of Lincoln Center, the Pacific Film Archive, and the Harvard Film Archive. Pereda is the Director of the Filmmaking Program at Rutgers University.",
    firstHalf: [
      "Entrevista con la tierra (2008) – 18 min",
      "Minotauro (2015) – 52 min",
    ],
    secondHalf: [],
  },
  {
    id: 16,
    title: "Films with Stills",
    date: "April 18",
    year: "2019",
    description:
      "This time, we showcase films that incorporate still images. These moving image pieces revisit their static foundation to drastically differing effects. Experimentation is paramount; there is no one way to do it. Check out how some of the masters have!",
    firstHalf: [
      "Elsa la rose – Agnes Varda (1966; 20 min)",
      "Antonyms of Beauty – Khalik Allah (2013; 27 min)",
      "(nostalgia) – Hollis Frampton (1971; 36 min)",
    ],
    secondHalf: [],
  },
  {
    id: 17,
    title: "Experiments in Digital",
    date: "May 2",
    year: "2019",
    description: `Experimental film has always been interested in materiality. These films often explore, augment, and assess the nature of the media that allows for the images to be represented in the way that they are. But in delving into this tradition, we sometimes see an elitism of film (usually 16mm film) as the ideal medium for the experimental and the avant-garde.

    This program is intended to subvert that notion. An incredible swath of distinctly digital art has appeared since the millennium, particularly with the rise early internet art.`,
    firstHalf: [
      "LEGENDARY REALITY – Jon Rafman (2011; 15min)",
      "A Tom Tom Chaser – Ken Jacobs (2002; 10min)",
      "Foyer – Ismaïl Bahri (2016; 30min)",
      "Sometimes I get lossy – Penny Lane (2005; 1min)",
      "Men Seeking Women – Penny Lane (2007; 4min)",
      "Transplant – HUOZHUKUAIYUN CO., LTD. (2015; 5min)*",
      "RECLUSE – Jimmy ScreamerClauz (2016; 8min)",
    ],
    secondHalf: [],
    notes: "*INTERNATIONAL PREMIERE",
  },
  {
    id: 18,
    title: "An Observer’s Rebellion: Wang Wo",
    date: "May 16",
    year: "2019",
    description: `Internationally acclaimed experimental documentarian Wang Wo will present two films, Up&Down and Noise, both from 2007, which have become bedrocks in the independent filmmaking community in China.

    Wang Wo (王我) was born in Hebei Province, and is currently living in USA. He studied graphic design at the Central Academy of Arts and Design, and received an MA in Arts and Design from Tsinghua University. He began making films in 2004, establishing himself as one of the most innovative independent documentary filmmakers. His experimental documentaries include Outside (2005), Noise (2007), Zhe Teng: According to China (2010), The Dialogue (2014) and Filmless Festival (2015). Along with his filmmaking, Wang established himself as an artist and graphic designer. His powerful posters for the Beijing Independent Film Festival are admired the world around.`,
    firstHalf: ["Up&Down (2007; 10min)", "Noise (2007; 60min)"],
    secondHalf: [],
  },
];

export { curatedPrograms };
