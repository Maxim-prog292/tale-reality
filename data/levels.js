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
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  window.levels = [
    {
      id: 1,
      title: 'Сказочные предметы и современные аналоги',
      type: 'image',
      pairs: [
        {
          id: 'carpet-plane',
          left: { label: 'Ковер-самолет', image: makeSvgDataUri('Ковер-самолет', '#5e3b73', '#25172f', '#ffd77b') },
          right: { label: 'Самолет', image: makeSvgDataUri('Самолет', '#235576', '#132638', '#83e0ff') },
          explanation: 'Ковер-самолет — это образ быстрого перемещения на большие расстояния, как современный самолет.'
        },
        {
          id: 'mirror-phone',
          left: { label: 'Волшебное зеркало', image: makeSvgDataUri('Волшебное зеркало', '#76562f', '#2f2214', '#f8d38c') },
          right: { label: 'Смартфон', image: makeSvgDataUri('Смартфон', '#475f7a', '#17202f', '#8ac0ff') },
          explanation: 'Волшебное зеркало показывает далёкие события и лица, как экран телефона или видеосвязь.'
        },
        {
          id: 'feather-bulb',
          left: { label: 'Перо Жар-птицы', image: makeSvgDataUri('Перо Жар-птицы', '#7b331d', '#2a110b', '#ffb35d') },
          right: { label: 'Лампочка', image: makeSvgDataUri('Лампочка', '#726321', '#2a220b', '#ffe77a') },
          explanation: 'Перо Жар-птицы светится и освещает путь, как искусственный источник света.'
        },
        {
          id: 'chest-safe',
          left: { label: 'Ларец', image: makeSvgDataUri('Ларец', '#6a4836', '#241914', '#f4c28d') },
          right: { label: 'Сейф', image: makeSvgDataUri('Сейф', '#51565d', '#1a1d22', '#bfc8cf') },
          explanation: 'Ларец хранит ценности, как современный сейф или защищенное хранилище.'
        },
        {
          id: 'messenger-mail',
          left: { label: 'Гонец', image: makeSvgDataUri('Гонец', '#315b48', '#14261f', '#8fe0b4') },
          right: { label: 'Курьер', image: makeSvgDataUri('Курьер', '#314d67', '#15202b', '#9accff') },
          explanation: 'Гонец доставляет вести и поручения, как современный курьер или служба доставки.'
        },
        {
          id: 'book-internet',
          left: { label: 'Волшебная книга', image: makeSvgDataUri('Волшебная книга', '#6a2845', '#220d18', '#ff9fc0') },
          right: { label: 'Интернет', image: makeSvgDataUri('Интернет', '#1e4d63', '#0b1b23', '#7fe0ff') },
          explanation: 'Волшебная книга знает ответы и открывает знания, как цифровая сеть и поиск информации.'
        }
      ]
    },
    {
      id: 2,
      title: 'Древнерусские слова и современные слова',
      type: 'text',
      pairs: [
        { id: 'chelo-lob', left: { label: 'Чело' }, right: { label: 'Лоб' }, explanation: 'Слово «чело» в старой речи обозначало лоб.' },
        { id: 'usta-guby', left: { label: 'Уста' }, right: { label: 'Губы' }, explanation: '«Уста» — древнее книжное слово для губ и рта.' },
        { id: 'ochi-glaza', left: { label: 'Очи' }, right: { label: 'Глаза' }, explanation: '«Очи» — поэтическое и древнее слово для глаз.' },
        { id: 'perst-palec', left: { label: 'Перст' }, right: { label: 'Палец' }, explanation: '«Перст» — старое слово, которое означало палец.' },
        { id: 'dlan-ladon', left: { label: 'Длань' }, right: { label: 'Ладонь' }, explanation: '«Длань» — это ладонь или раскрытая рука.' },
        { id: 'vyya-sheya', left: { label: 'Выя' }, right: { label: 'Шея' }, explanation: '«Выя» — древнее обозначение шеи.' }
      ]
    },
    {
      id: 3,
      title: 'Магия и технологии',
      type: 'text',
      pairs: [
        { id: 'spell-program', left: { label: 'Заклинание' }, right: { label: 'Программа' }, explanation: 'Заклинание запускает эффект по точной формуле, как программа по алгоритму.' },
        { id: 'potion-medicine', left: { label: 'Зелье' }, right: { label: 'Лекарство' }, explanation: 'Зелье меняет состояние человека, как современное лекарство.' },
        { id: 'staff-tool', left: { label: 'Посох' }, right: { label: 'Инструмент' }, explanation: 'Посох у волшебника — рабочий предмет управления силой, как инструмент у специалиста.' },
        { id: 'magic-light-electricity', left: { label: 'Магический свет' }, right: { label: 'Электричество' }, explanation: 'То, что в сказке выглядит как чудесный свет, в реальности обеспечивает электричество.' },
        { id: 'crystal-ball-analytics', left: { label: 'Хрустальный шар' }, right: { label: 'Аналитика' }, explanation: 'Хрустальный шар предсказывает и показывает скрытое, как аналитика и прогнозные модели.' },
        { id: 'teleport-fast-delivery', left: { label: 'Телепорт' }, right: { label: 'Скоростная доставка' }, explanation: 'Обе идеи про минимизацию времени перемещения от точки А к точке Б.' }
      ]
    }
  ];
})();
