/**
 * Translations dictionary for EN/RU/UZ localization.
 * Keys match the data-i18n attributes in HTML elements.
 */

export type Lang = 'en' | 'ru' | 'uz';

export interface TranslationEntry {
  en: string;
  ru: string;
  uz: string;
}

const translations: Record<string, TranslationEntry> = {
  /* ── Header Nav ─────────────────────────────────── */
  'nav.about':     { en: 'ABOUT',      ru: 'О НАС',      uz: 'BIZ HAQIMIZDA' },
  'nav.map':       { en: 'MAP',        ru: 'КАРТА',      uz: 'XARITA' },
  'nav.zoos':      { en: 'ZOOS',       ru: 'ЗООПАРКИ',   uz: 'ZOOPARKLAR' },
  'nav.contact':   { en: 'CONTACT US', ru: 'КОНТАКТЫ',   uz: 'ALOQA' },
  'nav.design':    { en: 'DESIGN',     ru: 'ДИЗАЙН',     uz: 'DIZAYN' },

  /* ── Landing: Hero ──────────────────────────────── */
  'hero.title':        { en: 'WATCH YOUR\nFAVORITE ANIMAL\nONLINE', ru: 'СМОТРИТЕ ВАШИХ\nЛЮБИМЫХ ЖИВОТНЫХ\nОНЛАЙН', uz: 'SEVIMLI JONIVORLARINGIZNI\nONLAYN\nTOMOSHA QILING' },
  'hero.subtitle':     { en: 'Explore the exciting and mysterious world of wild animals in a natural setting without leaving your home.', ru: 'Исследуйте захватывающий и таинственный мир диких животных в естественных условиях, не выходя из дома.', uz: 'Uyingizdan chiqmasdan turib yovvoyi hayvonlarning hayajonli va sirli olamini tabiiy sharoitda o\'rganing.' },
  'hero.cta':          { en: 'VIEW LIVE CAM →', ru: 'СМОТРЕТЬ КАМЕРУ →', uz: 'LIVE KAMERANI KO‘RISH →' },

  /* ── Landing: Welcome ───────────────────────────── */
  'welcome.title':     { en: 'WELCOME TO THE\nONLINE ZOO!', ru: 'ДОБРО ПОЖАЛОВАТЬ В\nОНЛАЙН ЗООПАРК!', uz: 'ONLAYN ZOOPARKKA\nXUSH KELIBSIZ!' },
  'welcome.text':      { en: 'On our website, using live webcams, fans of all ages can observe various animals. Among them are Giant pandas, eagles, alligators, forest gorillas, African lions, and others. It is the whole natural world in real time in front of our cameras. We hope you will enjoy watching closely and explore animal behavior and habitats. Note: animals are not always on view on cameras, so please check back if you don\'t see anything.', ru: 'На нашем сайте с помощью веб-камер в реальном времени поклонники всех возрастов могут наблюдать за различными животными. Среди них — гигантские панды, орлы, аллигаторы, лесные гориллы, африканские львы и другие. Это целый мир природы в реальном времени перед нашими камерами. Надеемся, вам понравится наблюдать за поведением и средой обитания животных. Примечание: животные не всегда находятся в поле зрения камер, пожалуйста, проверяйте позже.', uz: 'Veb-saytimizda barcha yoshdagi muxlislar jonli veb-kameralar yordamida turli hayvonlarni kuzatishlari mumkin. Ular orasida Gigant pandalar, burgutlar, alligatorlar, o\'rmon gorillalari, Afrika sherlari va boshqalar bor. Kameralarimiz oldida real vaqtdagi butun tabiat olami. Umid qilamizki, siz hayvonlarning xulq-atvori va yashash joylarini diqqat bilan kuzatishdan va o\'rganishdan zavqlanasiz. Eslatma: hayvonlar har doim ham kameralarda ko\'rinmaydi, shuning uchun agar nimanidir ko\'rmasangiz, keyinroq yana tekshirib ko\'ring.' },

  /* ── Landing: Meet Our Animals ──────────────────── */
  'pets.title':        { en: 'MEET SOME OUR PETS', ru: 'ПОЗНАКОМЬТЕСЬ С НАШИМИ ПИТОМЦАМИ', uz: 'BIZNING HAYVONLARIMIZ BILAN TANISHING' },
  'pets.subtitle':     { en: 'Get up close with our incredible animals and discover what makes each species unique. Learn about their habitats, behaviors, and the conservation efforts keeping them safe.', ru: 'Познакомьтесь поближе с нашими удивительными животными и узнайте, что делает каждый вид уникальным. Узнайте об их среде обитания, поведении и усилиях по сохранению.', uz: 'Bizning ajoyib hayvonlarimiz bilan yaqindan tanishing va har bir turni nima o\'ziga xos qilishini bilib oling. Ularning yashash joylari, xulq-atvori va ularni xavfsiz saqlash bo\'yicha mas\'uliyat haqida bilib oling.' },
  'pets.cta':          { en: 'CHOOSE YOUR FAVORITE →', ru: 'ВЫБЕРИТЕ ЛЮБИМЦА →', uz: 'SEVIMLI HAYVONINGIZNI TANLANG →' },

  /* ── Landing: How We Work ───────────────────────── */
  'howwework.title':   { en: 'HOW WE WORK', ru: 'КАК МЫ РАБОТАЕМ', uz: 'BIZ QANDAY ISHLAYMIZ' },
  'howwework.text':    { en: 'Online Zoo is a nonprofit committed to inspiring awareness and preservation of nature and wild animals in our zoo and world. We want the world to understand the integral role every species plays in our natural world and their health and wellness of the animals. To continue these efforts, we need your help. We\'re so grateful to our numerous supporters. All donations, large and small, go a long way to the conservation efforts of our pets.', ru: 'Онлайн Зоопарк — это некоммерческая организация, посвящённая повышению осведомлённости и сохранению природы и диких животных в нашем зоопарке и во всём мире. Мы хотим, чтобы мир понимал важную роль каждого вида в экосистеме и заботился о здоровье и благополучии животных. Чтобы продолжить эти усилия, нам нужна ваша помощь. Мы очень благодарны нашим многочисленным сторонникам. Все пожертвования, большие и маленькие, вносят значительный вклад в сохранение наших питомцев.', uz: 'Online Zoo notijorat tashkilot bo\'lib, u bizning zooparkimiz va dunyodagi tabiat va yovvoyi hayvonlarni saqlash haqida ma\'lumot berishga bag\'ishlangan. Biz har bir turning ekotizimdagi ajralmas rolini va hayvonlarning salomatligi hamda farovonligi qanchalik muhimligini dunyo tushunishini istaymiz. Bu ishlarni davom ettirish uchun bizga sizning yordamingiz kerak. Ko\'plab qo\'llab-quvvatlovchilarimizdan juda minnatdormiz. Katta va kichik barcha xayriyalar jonivorlarimizni asrash ishlariga katta yordam beradi.' },

  /* ── Landing: Donation ──────────────────────────── */
  'donation.title':    { en: 'YOUR DONATION MAKES A DIFFERENCE!', ru: 'ВАШЕ ПОЖЕРТВОВАНИЕ ИМЕЕТ ЗНАЧЕНИЕ!', uz: 'SIZNING XAYRIYANGIZ KATTA AHAMIYATGA EGA!' },
  'donation.text':     { en: 'The Online Zoo\'s animal webcams are some of the most famous on the internet. Tune in to watch your favourite animals — live, 24/7', ru: 'Веб-камеры животных Онлайн Зоопарка — одни из самых популярных в интернете. Подключайтесь, чтобы наблюдать за вашими любимыми животными — в прямом эфире, 24/7', uz: 'Onlayn zooparkning hayvonlar veb-kameralari internetdagi eng mashhurlaridan biridir. O\'zingiz yoqtirgan hayvonlarni 24/7 jonli tomosha qilish uchun bizga qo\'shiling' },

  /* ── Landing: Pay and Feed ──────────────────────── */
  'payfeed.title':     { en: 'PAY AND FEED', ru: 'ОПЛАТИТЕ И ПОКОРМИТЕ', uz: 'TOLOV VA BOQISH' },
  'payfeed.step1.title': { en: 'Your donation has an impact', ru: 'Ваше пожертвование имеет значение', uz: 'Xayriyangizning ta\'siri bor' },
  'payfeed.step1.text':  { en: 'Providing our animals with high-quality nutrition diets is one element of our mission. Proper care promotes the health of our animals and ensures they develop to their full potential. A healthy animal diet may include meat, grains, fresh fruits and vegetables. Nutritious food for our animals helps them to be happy and healthy. Please help us provide nutritious food for our animals.', ru: 'Обеспечение наших животных высококачественным питанием — один из элементов нашей миссии. Надлежащий уход способствует здоровью наших животных и обеспечивает их полноценное развитие. Здоровый рацион может включать мясо, зерно, свежие фрукты и овощи. Питательная пища помогает нашим животным быть счастливыми и здоровыми. Пожалуйста, помогите нам обеспечить животных питательной едой.', uz: 'Hayvonlarimizni yuqori sifatli oziq-ovqat bilan ta\'minlash bizning vazifamizning bir qismidir. To\'g\'ri g\'amxo\'rlik hayvonlarimiz salomatligini yaxshilaydi va ularning to\'liq salohiyatini rivojlantirishga yordam beradi. Sog\'lom hayvonlarning ratsioni go\'sht, donlar, yangi meva va sabzavotlarni o\'z ichiga olishi mumkin. Jonivorlarimiz uchun to\'yimli oziq-ovqat ularga baxtli va sog\'lom bo\'lishga yordam beradi. Iltimos, hayvonlarimizni to\'yimli oziq-ovqat bilan ta\'minlashda yordam bering.' },
  'payfeed.step2.title': { en: 'Make a donation', ru: 'Сделайте пожертвование', uz: 'Xayriya qiling' },
  'payfeed.step2.text':  { en: 'You can donate through your credit card without any fees. It is easy and safe. We do not keep donor\'s personal information on an online network. Choose our support to give and we will direct it to more effective ways you can possibly help. Thank you for your wonderful support.', ru: 'Вы можете сделать пожертвование с помощью кредитной карты без каких-либо комиссий. Это легко и безопасно. Мы не храним личную информацию доноров в сети. Выберите нашу поддержку, и мы направим её наиболее эффективным образом. Спасибо за вашу замечательную поддержку.', uz: 'Siz o\'zingizning kredit kartangiz orqali hech qanday to\'lovsiz xayriya qilishingiz mumkin. Bu oson va xavfsiz. Biz donorning shaxsiy ma\'lumotlarini onlayn tarmoqda saqlamaymiz. Xayriya qilish uchun bizning yordamimizni tanlang va biz uni siz yordam berishingiz mumkin bo\'lgan samaraliroq usullarga yo\'naltiramiz. Ajoyib yordamingiz uchun rahmat.' },
  'payfeed.step3.title': { en: 'Bring your food charity — straight to your favourite pets.', ru: 'Доставьте вашу кормовую помощь — прямо вашим любимым питомцам.', uz: 'Sizning oziq-ovqat yordamingiz — to\'g\'ridan-to\'g\'ri sevimli hayvonlaringizga.' },
  'payfeed.step3.text':  { en: 'After your donation, the animal receives its favorite foods. You can support your favorite animals or any animal you care about and make a real social impact. Never doubt that you can make a difference even if it\'s small.', ru: 'После вашего пожертвования животное получает свою любимую еду. Вы можете поддержать ваших любимых животных или любое животное, которое вам дорого, и оказать реальное социальное влияние. Никогда не сомневайтесь, что вы можете изменить ситуацию, даже если это малое.', uz: 'Xayriyangizdan so\'ng, hayvon o\'zining sevimli ovqatini oladi. Siz sevimli hayvoningizga yoki o\'zingiz g\'amxo\'rlik qilayotgan boshqa hayvonga yordam berasiz va haqiqiy ijtimoiy ta\'sir ko\'rsatasiz. Kichik bo\'lsa ham uning ahamiyati borligiga aslo shubha qilmang.' },
  'payfeed.cta':       { en: 'DONATE NOW →', ru: 'ПОЖЕРТВОВАТЬ →', uz: 'HOZIR XAYRIYA QILISH →' },

  /* ── Landing: Testimonials ──────────────────────── */
  'testimonials.title': { en: 'WHAT OUR USERS THINK', ru: 'ЧТО ДУМАЮТ НАШИ ПОЛЬЗОВАТЕЛИ', uz: 'FOYDALANUVCHILARIMIZ FIKRI' },
  'testimonials.intro': { en: 'We are continuously striving to improve the experiences of our future guests. Below you can leave your own feedback, or simply view feedback from past clients.', ru: 'Мы постоянно стремимся улучшить впечатления наших будущих гостей. Ниже вы можете оставить свой отзыв или просто ознакомиться с отзывами прошлых клиентов.', uz: 'Biz doimiy ravishda mijozlarimiz tajribasini yaxshilashga harakat qilamiz. Quyida siz o\'z fikr-mulohazangizni qoldirishingiz yoki shunchaki oldingi mijozlarning fikrlarini ko\'rishingiz mumkin.' },
  'testimonials.feedback': { en: 'LEAVE FEEDBACK →', ru: 'ОСТАВИТЬ ОТЗЫВ →', uz: 'FIKR QOLDIRISH →' },

  /* ── Landing: Second Hero ───────────────────────── */
  'hero2.title':       { en: 'Care for the\nanimals you love', ru: 'Заботьтесь о\nживотных, которых любите', uz: 'O\'zingiz yaxshi ko\'rgan\nhayvonlarga g\'amxo\'rlik qiling' },
  'hero2.text':        { en: 'You can help to look after the animals you love with your gift today', ru: 'Вы можете помочь заботиться о животных, которых любите, вашим пожертвованием сегодня', uz: 'Siz bugungi xayriyangiz bilan o\'zingiz yaxshi ko\'rgan hayvonlarga g\'amxo\'rlik qilishga yordam bera olasiz' },

  /* ── Landing: Feed Cards ────────────────────────── */
  'feed.btn':          { en: 'FEED', ru: 'ПОКОРМИТЬ', uz: 'BOQISH' },
  'feed.panda':        { en: 'Your $30 could give Lucas a slice of panda cake, made with our secret recipe.', ru: 'Ваши $30 могут дать Лукасу кусочек панда-торта, приготовленного по нашему секретному рецепту.', uz: 'Sizning 30 dollaringiz Lukasga sirli retsept bo\'yicha tayyorlangan panda torti bo\'lagini berishi mumkin.' },
  'feed.tiger':        { en: 'Your $150 will help to care for Senja, a Sumatran tiger, for three weeks.', ru: 'Ваши $150 помогут ухаживать за Сенджей, суматранским тигром, в течение трёх недель.', uz: 'Sizning 150 dollaringiz Senja provesiyali Sumatra yo\'lbarsiga uch hafta davomida g\'amxo\'rlik qilishga yordam beradi.' },
  'feed.lemur':        { en: 'With your support, we can give Andy his favorite fruits. Especially when it\'s not fruit season in its natural habitat.', ru: 'С вашей поддержкой мы сможем дать Энди его любимые фрукты. Особенно когда в его естественной среде обитания не сезон фруктов.', uz: 'Sizning yordamingiz bilan biz Endi ga sevimli mevalarini bera olamiz. Ayniqsa uning tabiiy yashash joylarida meva mavsumi bo\'lmaganda.' },
  'feed.eagles':       { en: 'Sam & Lora have hatched and raised numerous young and will be happy with your help.', ru: 'Сэм и Лора вырастили множество птенцов и будут рады вашей помощи.', uz: 'Sem va Lora ko\'plab bolalarni o\'stirishdi va ular sizning yordamingiz bilan xursand bo\'lishadi.' },
  'feed.choosefav':    { en: 'CHOOSE YOUR FAVORITE', ru: 'ВЫБЕРИТЕ ЛЮБИМЦА', uz: 'SEVIMLI HAYVONINGIZNI TANLANG' },

  /* ── Footer ─────────────────────────────────────── */
  'footer.about':      { en: 'ABOUT',      ru: 'О НАС', uz: 'BIZ HAQIMIZDA' },
  'footer.map':        { en: 'MAP',        ru: 'КАРТА', uz: 'XARITA' },
  'footer.zoos':       { en: 'ZOOS',       ru: 'ЗООПАРКИ', uz: 'ZOOPARKLAR' },
  'footer.contact':    { en: 'CONTACT US', ru: 'КОНТАКТЫ', uz: 'ALOQA' },
  'footer.donate':     { en: 'DONATE FOR VOLUNTEERS', ru: 'ПОЖЕРТВОВАТЬ ВОЛОНТЁРАМ', uz: 'KONGILLILAR UCHUN XAYRIYA' },
  'footer.donateBtn':  { en: 'DONATE', ru: 'ПОЖЕРТВОВАТЬ', uz: 'XAYRIYA QILISH' },

  /* ── Donation Modal ─────────────────────────────── */
  'modal.title':       { en: 'Together We Care,\nSave and Protect!', ru: 'Вместе мы заботимся,\nспасаем и защищаем!', uz: 'Birgalikda Biz G\'amxo\'rlik Qilamiz,\nQutqaramiz va Himoya Qilamiz!' },
  'modal.desc':        { en: 'Your most generous gift not only cares for countless animals, but it also offers hope and a vital lifeline to the world\'s most endangered wildlife relying on us to survive.', ru: 'Ваш щедрый дар не только заботится о бесчисленных животных, но и дарит надежду и жизненно важную поддержку самым исчезающим видам дикой природы, полагающимся на нас для выживания.', uz: 'Sizning eng samimiy sovg\'angiz nafaqat son-sanoqsiz hayvonlarga g\'amxo\'rlik qiladi, balki yashab qolish uchun bizga tayangan holda dunyo bo\'ylab xavf ostida qolgan yovvoyi tabiatga umid va hayot chizig\'ini tortadi.' },
  'modal.other':       { en: 'Other Amount', ru: 'Другая сумма', uz: 'Boshqa Miqdor' },
  'modal.customSubmit': { en: 'DONATE →', ru: 'ПОЖЕРТВОВАТЬ →', uz: 'XAYRIYA QILISH →' },
  'modal.customCancel': { en: 'Cancel', ru: 'Отмена', uz: 'Bekor qilish' },

  /* ── Donation Step 1 ────────────────────────────── */
  'step1.title':       { en: 'Make Your Donation', ru: 'Сделайте пожертвование', uz: 'Xayriya qiling' },
  'step1.info':        { en: 'Donation Information:', ru: 'Информация о пожертвовании:', uz: 'Xayriya haqida ma\'lumot:' },
  'step1.choose':      { en: '* Choose your donation amount:', ru: '* Выберите сумму пожертвования:', uz: '* Xayriya miqdorini tanlang:' },
  'step1.other':       { en: 'Other Amount', ru: 'Другая сумма', uz: 'Boshqa Miqdor' },
  'step1.pet':         { en: 'For Special Pet', ru: 'Для особого питомца', uz: 'Maxsus Uy Hayvoni Uchun' },
  'step1.selectPet':   { en: 'Choose your favourite', ru: 'Выберите любимца', uz: 'Sevimli hayvoningizni tanlang' },
  'step1.recurring':   { en: 'Make this a monthly recurring gift', ru: 'Сделать ежемесячным пожертвованием', uz: 'Buni oylik takrorlanuvchi xayriya qiling' },
  'step1.next':        { en: 'Next', ru: 'Далее', uz: 'Keyingisi' },

  /* ── Donation Step 2 ────────────────────────────── */
  'step2.title':       { en: 'Make Your Donation', ru: 'Сделайте пожертвование', uz: 'Xayriya qiling' },
  'step2.billing':     { en: 'Billing Information:', ru: 'Платёжная информация:', uz: 'Hisob-kitob ma\'lumotlari:' },
  'step2.name':        { en: 'Your Name', ru: 'Ваше имя', uz: 'Ismingiz' },
  'step2.email':       { en: 'Your Email Address', ru: 'Ваш адрес электронной почты', uz: 'Pochta Manzilingiz' },
  'step2.disclaimer':  { en: 'You will receive emails from the Online Zoo, including updates and news on the latest discoveries and translations. You can unsubscribe at any time.', ru: 'Вы будете получать электронные письма от Онлайн Зоопарка, включая обновления и новости о последних открытиях. Вы можете отписаться в любое время.', uz: 'Siz Online Zoo\'dan so\'nggi yangiliklar va kashfiyotlar haqidagi ma\'lumotlarni o\'z ichiga olgan xatlar qabul qilasiz. Istalgan vaqtda obunani bekor qilishingiz mumkin.' },
  'step2.back':        { en: 'Back', ru: 'Назад', uz: 'Orqaga' },
  'step2.next':        { en: 'NEXT', ru: 'ДАЛЕЕ', uz: 'KEYINGISI' },

  /* ── Map Page ───────────────────────────────────── */
  'map.title':         { en: 'FIND WHERE ARE\nTHE ANIMALS LIVE', ru: 'УЗНАЙТЕ, ГДЕ\nЖИВУТ ЖИВОТНЫЕ', uz: 'HAYVONLAR QAYERDA\nYASHASHINI TOPING' },

  /* ── Live Zoo Page ──────────────────────────────── */
  'livezoo.pandaTitle':   { en: 'LIVE PANDA CAMS', ru: 'КАМЕРЫ ПАНД В ПРЯМОМ ЭФИРЕ', uz: 'JONLI PANDA KAMERALAR' },
  'livezoo.eagleTitle':   { en: 'LIVE BALD EAGLE CAMS', ru: 'КАМЕРЫ ОРЛОВ В ПРЯМОМ ЭФИРЕ', uz: 'JONLI BURGUT KAMERALAR' },
  'livezoo.gorillaTitle': { en: 'LIVE GORILLA CAMS', ru: 'КАМЕРЫ ГОРИЛЛ В ПРЯМОМ ЭФИРЕ', uz: 'JONLI GORILLA KAMERALAR' },
  'livezoo.lemurTitle':   { en: 'LIVE LEMUR CAMS', ru: 'КАМЕРЫ ЛЕМУРОВ В ПРЯМОМ ЭФИРЕ', uz: 'JONLI LEMUR KAMERALAR' },
  'livezoo.moreLive':     { en: 'MORE LIVE VIEWS', ru: 'ЕЩЁ КАМЕРЫ', uz: 'BOSHQA JONLI KAMERALAR' },
  'livezoo.donateTitle':  { en: 'MAKE THE BAMBOO DONATION!', ru: 'СДЕЛАЙТЕ ПОЖЕРТВОВАНИЕ НА БАМБУК!', uz: 'BAMBUK UCHUN XAYRIYA QILING!' },
  'livezoo.donateText':   { en: 'Our process for bamboo donations first starts with a site evaluation. Thank you for your interest in donating bamboo for our pandas.', ru: 'Процесс пожертвования бамбука начинается с оценки участка. Спасибо за ваш интерес к пожертвованию бамбука для наших панд.', uz: 'Bambuk uchun xayriya jarayonining birinchi bosqichi yerni baholash bilan boshlanadi. Bizning pandalarimiz uchun bambuk xayriya qilmoqchi bo\'lganingiz uchun rahmat.' },
  'livezoo.didYouKnow':   { en: 'DID YOU KNOW?', ru: 'ЗНАЕТЕ ЛИ ВЫ?', uz: 'BILASIZMI?' },
  'livezoo.viewMap':      { en: 'VIEW MAP →', ru: 'СМОТРЕТЬ КАРТУ →', uz: 'XARITANI KO\'RISH →' },

  /* ── Contact Us Page ────────────────────────────── */
  'contact.title':     { en: 'GET IN TOUCH', ru: 'СВЯЖИТЕСЬ С НАМИ', uz: 'BIZ BILAN BOG\'LANING' },
  'contact.text':      { en: 'Whether you have a question, or would like to say hello, we\'re happy to hear from you. Please use the form to send us a message and we\'ll get back to you as soon as we can.', ru: 'Если у вас есть вопрос или вы хотите поздороваться, мы будем рады услышать вас. Пожалуйста, воспользуйтесь формой, чтобы отправить нам сообщение, и мы ответим как можно скорее.', uz: 'Savolingiz bo\'lsa yoki shunchaki salomlashmoqchi bo\'lsangiz, biz sizni tinglashdan hursand bo\'lamiz. Iltimos, bizga xabar yuborish uchun formadan foydalaning va biz imkon qadar tezroq aloqaga chiqamiz.' },
  'contact.name':      { en: 'Your Name', ru: 'Ваше имя', uz: 'Ismingiz' },
  'contact.email':     { en: 'Your Email Address', ru: 'Ваш адрес электронной почты', uz: 'Pochta Manzilingiz' },
  'contact.subject':   { en: 'Subject', ru: 'Тема', uz: 'Mavzu' },
  'contact.message':   { en: 'Message', ru: 'Сообщение', uz: 'Xabar' },
  'contact.send':      { en: 'SEND MESSAGE →', ru: 'ОТПРАВИТЬ СООБЩЕНИЕ →', uz: 'XABAR YUBORISH →' },

  /* ── Sign In Page ───────────────────────────────── */
  'signin.title':      { en: 'WELCOME BACK', ru: 'С ВОЗВРАЩЕНИЕМ', uz: 'XUSH KELIBSIZ' },
  'signin.subtitle':   { en: 'Sign in to your account', ru: 'Войдите в свой аккаунт', uz: 'O\'z profilingizga kiring' },
  'signin.login':      { en: 'Login', ru: 'Логин', uz: 'Tizimga kirish' },
  'signin.password':   { en: 'Password', ru: 'Пароль', uz: 'Parol' },
  'signin.btn':        { en: 'SIGN IN →', ru: 'ВОЙТИ →', uz: 'KIRISH →' },
  'signin.noAccount':  { en: 'Don\'t have an account?', ru: 'Нет аккаунта?', uz: 'Hisobingiz yo\'qmi?' },
  'signin.register':   { en: 'Create Account', ru: 'Создать аккаунт', uz: 'Hisob yaratish' },

  /* ── Register Page ──────────────────────────────── */
  'register.title':    { en: 'CREATE ACCOUNT', ru: 'СОЗДАТЬ АККАУНТ', uz: 'HISOB YARATISH' },
  'register.subtitle': { en: 'Join our community and help protect wildlife', ru: 'Присоединяйтесь к нашему сообществу и помогите защитить дикую природу', uz: 'Bizning hamjamiyatimizga qo\'shiling va yovvoyi tabiatni saqlab qolishda yordam bering' },
  'register.login':    { en: 'Login', ru: 'Логин', uz: 'Tizimga kirish' },
  'register.name':     { en: 'Full Name', ru: 'Полное имя', uz: 'To\'liq Ism' },
  'register.gmail':    { en: 'Gmail', ru: 'Gmail', uz: 'Gmail' },
  'register.password': { en: 'Password', ru: 'Пароль', uz: 'Parol' },
  'register.btn':      { en: 'CREATE ACCOUNT →', ru: 'СОЗДАТЬ АККАУНТ →', uz: 'HISOB YARATISH →' },
  'register.hasAccount': { en: 'Already have an account?', ru: 'Уже есть аккаунт?', uz: 'Allaqachon hisobingiz bormi?' },
  'register.signin':   { en: 'Sign In', ru: 'Войти', uz: 'Kirish' },

  /* ── Placeholder attributes ─────────────────────── */
  'ph.donationAmount': { en: '$ DONATION AMOUNT', ru: '$ СУММА ПОЖЕРТВОВАНИЯ', uz: '$ XAYRIYA MIQDORI' },
  'ph.enterAmount':    { en: 'Enter amount', ru: 'Введите сумму', uz: 'Miqdorni kiriting' },
  'ph.firstName':      { en: 'First and last name', ru: 'Имя и фамилия', uz: 'Ism va familiya' },
  'ph.enterEmail':     { en: 'Enter your email', ru: 'Введите ваш email', uz: 'Elektron pochtangizni kiriting' },
  'ph.enterSubject':   { en: 'Enter the subject', ru: 'Введите тему', uz: 'Mavzuni kiriting' },
  'ph.enterMessage':   { en: 'Enter your message', ru: 'Введите сообщение', uz: 'Xabaringizni kiriting' },
};

export default translations;
