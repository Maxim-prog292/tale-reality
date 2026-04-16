(function () {
  function makeSvgDataUri(label, bg1, bg2, accent) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${bg1}"/>
            <stop offset="100%" stop-color="${bg2}"/>
          </linearGradient>
        </defs>
        <rect width="320" height="240" rx="28" fill="url(#g)"/>
        <circle cx="160" cy="96" r="58" fill="${accent}" opacity="0.25"/>
        <rect x="84" y="50" width="152" height="92" rx="20" fill="${accent}" opacity="0.55"/>
        <rect x="112" y="150" width="96" height="18" rx="9" fill="#f5ecd7" opacity="0.85"/>
        <text x="160" y="208" text-anchor="middle" font-size="22" font-family="Georgia" fill="#f8f0de">${label}</text>
      </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  window.levels = [
    {
      id: 1,
      title: "Сказочные предметы и современные аналоги",
      type: "image",
      pairs: [
        {
          id: "carpet-plane",
          left: {
            label: "Ковер-самолет",
            image: "../assets/images/level_1/cover_samolet.png",
          },
          right: {
            label: "Самолет",
            image: "../assets/images/level_1/samolet.png",
          },
          explanation:
            "Ковер-самолет — это образ быстрого перемещения на большие расстояния, как современный самолет.",
        },
        {
          id: "mirror-phone",
          left: {
            label: "Волшебное зеркало",
            image: "../assets/images/level_1/zerkalo.png",
          },
          right: {
            label: "Смартфон",
            image: "../assets/images/level_1/smartfon.png",
          },
          explanation:
            "Волшебное зеркало показывает далёкие события и лица, как экран телефона или видеосвязь.",
        },
        {
          id: "feather-bulb",
          left: {
            label: "Перо Жар-птицы",
            image: "../assets/images/level_1/pero.png",
          },
          right: {
            label: "Лампочка",
            image: "../assets/images/level_1/ilampochka.png",
          },
          explanation:
            "Перо Жар-птицы светится и освещает путь, как искусственный источник света.",
        },
        {
          id: "chest-safe",
          left: {
            label: "Ларец",
            image: "../assets/images/level_1/larec.png",
          },
          right: {
            label: "Сейф",
            image: "../assets/images/level_1/seif.png",
          },
          explanation:
            "Ларец хранит ценности, как современный сейф или защищенное хранилище.",
        },
        {
          id: "messenger-mail",
          left: {
            label: "Гонец",
            image: "../assets/images/level_1/gonec.png",
          },
          right: {
            label: "Курьер",
            image: "../assets/images/level_1/kurier.png",
          },
          explanation:
            "Гонец доставляет вести и поручения, как современный курьер или служба доставки.",
        },
        {
          id: "book-internet",
          left: {
            label: "Волшебная книга",
            image: "../assets/images/level_1/kniga.png",
          },
          right: {
            label: "Интернет",
            image: "../assets/images/level_1/internet.png",
          },
          explanation:
            "Волшебная книга знает ответы и открывает знания, как цифровая сеть и поиск информации.",
        },
      ],
    },
    {
      id: 2,
      title: "Сказочные предметы и современные аналоги 2",
      type: "image",
      pairs: [
        {
          id: "klubochek-navigator",
          left: {
            label: "Клубочек",
            image: "../assets/images/level_2/klubochek.png",
          },
          right: {
            label: "Навигатор",
            image: "../assets/images/level_2/navigator.png",
          },
          explanation:
            "Клубочек — Показывает направление движения, как современный навигатор.",
        },
        {
          id: "sapogi-cross",
          left: {
            label: "Сапоги-скороходы",
            image: "../assets/images/level_2/sapogi.png",
          },
          right: {
            label: "Кроссовки",
            image: "../assets/images/level_2/cross.png",
          },
          explanation:
            "Сапоги-скороходы позволяют быстро перемещаться, как современные кроссовки. Практичная обувь для далёких путешествий.",
        },
        {
          id: "yablochko-lekarstva",
          left: {
            label: "Молодильные яблочки",
            image: "../assets/images/level_2/yablochko.png",
          },
          right: {
            label: "Лекарства и витамины",
            image: "../assets/images/level_2/lekarstva.png",
          },
          explanation:
            "Молодильные яблочки сохраняют здоровье и молодость, как современные лекарства и витамины.",
        },
        {
          id: "pech-avtomobil",
          left: {
            label: "Печь",
            image: "../assets/images/level_2/pech.png",
          },
          right: {
            label: "Автомобиль",
            image: "../assets/images/level_2/avtomobil.png",
          },
          explanation:
            "Емеля издил на печке, как мы на современных автомобилях.",
        },
        {
          id: "gorshochek-multivarka",
          left: {
            label: "Волшебный горшочек",
            image: "../assets/images/level_2/gorshochek.png",
          },
          right: {
            label: "Мультиварка",
            image: "../assets/images/level_2/multivarka.png",
          },
          explanation:
            "Волшебный горшочек готовит еду, как современная мультиварка.",
        },
        {
          id: "mech-internet",
          left: {
            label: "Меч-саморуб",
            image: "../assets/images/level_2/mech.png",
          },
          right: {
            label: "Бензопила",
            image: "../assets/images/level_2/benzopila.png",
          },
          explanation:
            "Меч-саморуб используется для рубки дерева, как современная бензопила.",
        },
      ],
    },
    {
      id: 3,
      title: "Древнерусские слова и современные слова",
      type: "text",
      pairs: [
        {
          id: "chelo-lob",
          left: { label: "Чело" },
          right: { label: "Лоб" },
          explanation: "Слово «чело» в старой речи обозначало лоб.",
        },
        {
          id: "usta-guby",
          left: { label: "Уста" },
          right: { label: "Губы" },
          explanation: "«Уста» — древнее книжное слово для губ и рта.",
        },
        {
          id: "ochi-glaza",
          left: { label: "Очи" },
          right: { label: "Глаза" },
          explanation: "«Очи» — поэтическое и древнее слово для глаз.",
        },
        {
          id: "perst-palec",
          left: { label: "Перст" },
          right: { label: "Палец" },
          explanation: "«Перст» — старое слово, которое означало палец.",
        },
        {
          id: "dlan-ladon",
          left: { label: "Длань" },
          right: { label: "Ладонь" },
          explanation: "«Длань» — это ладонь или раскрытая рука.",
        },
        {
          id: "vyya-sheya",
          left: { label: "Выя" },
          right: { label: "Шея" },
          explanation: "«Выя» — древнее обозначение шеи.",
        },
      ],
    },
    {
      id: 4,
      title: "Древнерусские слова и современные слова 2",
      type: "text",
      pairs: [
        {
          id: "ramena-plechi",
          left: { label: "Рамена" },
          right: { label: "Плечи" },
          explanation:
            "Слово «рамена» использовалось в древнерусском языке для обозначения плеч; сейчас это слово считается устаревшим.",
        },
        {
          id: "desnica-pruka",
          left: { label: "Десница" },
          right: { label: "Правая рука" },
          explanation:
            "«Десница» — старинное слово, обозначающее правую руку; часто встречалось в книжной и торжественной речи.",
        },
        {
          id: "shuica-lruka",
          left: { label: "Шуйца" },
          right: { label: "Левая рука" },
          explanation:
            "«Шуйца» — древнерусское слово для обозначения левой руки; в современном языке не употребляется.",
        },
        {
          id: "laniti-sheki",
          left: { label: "Ланиты" },
          right: { label: "Щеки" },
          explanation:
            "«Ланиты» — поэтическое и устаревшее слово, которым в старину называли щёки; встречается в классической литературе.",
        },
        {
          id: "vlasi-volosi",
          left: { label: "Власы" },
          right: { label: "Волосы" },
          explanation:
            "«Власы» — древнерусский вариант слова «волосы»; в современной речи практически не используется, кроме стилистических целей.",
        },
        {
          id: "vezdi-veki",
          left: { label: "Вежды" },
          right: { label: "Веки" },
          explanation:
            "«Вежды» — устаревшее слово для обозначения век; характерно для поэтической и книжной речи прошлых эпох.",
        },
      ],
    },
    {
      id: 5,
      title: "Магия и технологии",
      type: "text",
      pairs: [
        {
          id: "spell-program",
          left: { label: "Заклинание" },
          right: { label: "Программа" },
          explanation:
            "Заклинание запускает эффект по точной формуле, как программа выполняется по заданному алгоритму.",
        },
        {
          id: "potion-medicine",
          left: { label: "Зелье" },
          right: { label: "Лекарство" },
          explanation:
            "Зелье меняет состояние человека или наделяет особыми свойствами, подобно тому как лекарство лечит или даёт терапевтический эффект.",
        },
        {
          id: "staff-tool",
          left: { label: "Посох" },
          right: { label: "Инструмент" },
          explanation:
            "Посох у волшебника — это рабочий предмет для управления магической силой, как специализированный инструмент помогает специалисту выполнять профессиональные задачи.",
        },
        {
          id: "magic-light-electricity",
          left: { label: "Магический свет" },
          right: { label: "Электричество" },
          explanation:
            "То, что в сказке выглядит как чудесный свет от заклинания или артефакта, в реальности обеспечивается электричеством — источником энергии для освещения.",
        },
        {
          id: "crystal-ball-analytics",
          left: { label: "Хрустальный шар" },
          right: { label: "Аналитика" },
          explanation:
            "Хрустальный шар используется для предсказания будущего или раскрытия скрытой информации, подобно тому как аналитика и прогнозные модели помогают прогнозировать события на основе данных.",
        },
        {
          id: "teleport-fast-delivery",
          left: { label: "Телепорт" },
          right: { label: "Скоростная доставка" },
          explanation:
            "Телепортация мгновенно перемещает объект из одной точки в другую, а современная система скоростной доставки минимизирует время перемещения товаров от отправителя к получателю.",
        },
      ],
    },
    {
      id: 6,
      title: "Магия и технологии 2",
      type: "text",
      pairs: [
        {
          id: "zelie-kamuf",
          left: { label: "Зелье невидимости" },
          right: { label: "Камуфляж" },
          explanation:
            "Зелье невидимости делает объект или человека незаметным для глаз, а современные камуфляжные технологии снижают заметность объектов для визуального наблюдения и радаров.",
        },
        {
          id: "skatert-servis",
          left: { label: "Скатерть‑самобранка" },
          right: { label: "Сервис доставки еды" },
          explanation:
            "Скатерть‑самобранка в любой момент предоставляет готовую еду, а сервисы доставки позволяют заказать блюда из ресторанов и получить их в течение короткого времени.",
        },
        {
          id: "skorohodi-electro",
          left: { label: "Сапоги‑скороходы" },
          right: { label: "Электросамокат" },
          explanation:
            "Сапоги‑скороходы позволяют мгновенно преодолевать большие расстояния пешком, а современные компактные транспортные средства (электросамокат, гироскутер) ускоряют передвижение по городу без использования автомобиля.",
        },
        {
          id: "stupa-vertolet",
          left: { label: "Ступа Бабы‑Яги" },
          right: { label: "Вертолёт" },
          explanation:
            "Ступа позволяет летать и маневрировать в воздухе, зависать на месте, а вертолёт — это летательный аппарат с вертикальным взлётом и посадкой, способный зависать и перемещаться в любом направлении.",
        },
        {
          id: "eliksir-antivozrast",
          left: { label: "Эликсир молодости" },
          right: { label: "Антивозрастные технологии" },
          explanation:
            "Оба нацелены на борьбу со старением — зелье магическим путём, технологии — через химию, биологию и медицину.",
        },
        {
          id: "amulet-nosimoe",
          left: { label: "Амулет" },
          right: { label: "Носимое устройство" },
          explanation:
            "Оба призваны защищать или улучшать состояние владельца — амулет магически, гаджет — через мониторинг и оповещения.",
        },
      ],
    },
  ];
})();
