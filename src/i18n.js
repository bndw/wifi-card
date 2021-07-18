import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  'en-US': {
    translation: {
      title: 'WiFi Card',
      'desc.use':
        'Print a simple card with your WiFi login details. Tape it to the fridge, keep it in your wallet, etc.',
      'desc.privacy':
        'Your WiFi information is never sent to the server. No tracking, analytics, or fingerprinting are used on this website. View the',
      'desc.source': 'source code',
      'wifi.login': 'WiFi Login',
      'wifi.name': 'Network name',
      'wifi.name.placeholder': 'WiFi Network name',
      'wifi.password': 'Password',
      'wifi.password.placeholder': 'Password',
      'wifi.password.hide': 'Hide password field before printing',
      'wifi.password.encryption': 'Encryption',
      'wifi.tip':
        "Point your phone's camera at the QR Code to connect automatically",
      'wifi.alert.name': 'Network name cannot be empty',
      'wifi.alert.password.length.5': 'Password must be at least 5 characters',
      'wifi.alert.password.8': 'Password must be at least 8 characters',
      'button.rotate': 'Rotate',
      'button.print': 'Print',
      select: 'Select Language',
    },
  },
  'nl-NL': {
    translation: {
      title: 'WiFi Kaart',
      'desc.use':
        'Print een eenvoudige kaart met uw WiFi inloggegevens. Plak het op je koelkast, stop het in je portemonnee, etc.',
      'desc.privacy':
        'Je WiFi informatie wordt nooit naar de server verzonden. Geen tracking, analytics of fingerprinting wordt gebruikt op deze website. Bekijk de',
      'desc.source': 'broncode',
      'wifi.login': 'WiFi Login',
      'wifi.name': 'Netwerk naam',
      'wifi.name.placeholder': 'WiFi Netwerk naam',
      'wifi.password': 'Wachtwoord',
      'wifi.password.placeholder': 'Wachtwoord',
      'wifi.password.hide': 'Wachtwoord verbergen voor afdrukken',
      'wifi.password.encryption': 'Encryptie',
      'wifi.tip':
        'Wijs met de camera van je telefoon naar de QR code om automatisch verbinding te maken',
      'wifi.alert.name': 'Netwerk naam kan niet leeg zijn',
      'wifi.alert.password.length.5':
        'Wachtwoord moet ten minste 5 tekens bevatten',
      'wifi.alert.password.8': 'Wachtwoord moet ten minste 8 tekens bevatten',
      'button.rotate': 'Draai',
      'button.print': 'Print',
      select: 'Selecteer Taal',
    },
  },

  'zh-CN': {
    translation: {
      title: 'WiFi 连接卡',
      'desc.use':
        '打印一张带有 WiFi 详细信息的登录卡片，把它贴到冰箱上、放到你的钱包里...',
      'desc.privacy':
        '您的 WiFi 信息永远不会发送到服务端。本网站不使用追踪、分析或指纹识别。查看',
      'desc.source': '源码',
      'wifi.login': '连接 WiFi',
      'wifi.name': '网络名称',
      'wifi.name.placeholder': 'WiFi 网络名称',
      'wifi.password': '密码',
      'wifi.password.placeholder': '密码',
      'wifi.password.hide': '打印前隐藏密码字段',
      'wifi.password.encryption': '加密',
      'wifi.tip': '将手机摄像头对准二维码即可自动连接',
      'wifi.alert.name': '网络名称不能为空',
      'wifi.alert.password.length.5': '密码至少 5 个字符',
      'wifi.alert.password.8': '密码至少 8 个字符',
      'button.rotate': '翻转',
      'button.print': '打印',
      select: '选择语言',
    },
  },
  es: {
    translation: {
      title: 'Tarjeta WiFi',
      'desc.use':
        'Imprima una sencilla tarjeta con sus datos de acceso a la WiFi. Pégela en la nevera, guárdela en la cartera, etc.',
      'desc.privacy':
        'Su información WiFi nunca se envía al servidor. En este sitio web no se utiliza ningún tipo de rastreo, análisis o huella digital. Ver el',
      'desc.source': 'código fuente',
      'wifi.login': 'Acceso WiFi',
      'wifi.name': 'Nombre de la red',
      'wifi.name.placeholder': 'Nombre de la red WiFi',
      'wifi.password': 'Contraseña',
      'wifi.password.placeholder': 'Contraseña',
      'wifi.password.hide':
        'Ocultar el campo de la contraseña antes de imprimir',
      'wifi.password.encryption': 'Cifrado',
      'wifi.tip':
        'Apunte la cámara de su teléfono al código QR para conectarse automáticamente',
      'wifi.alert.name': 'El nombre de la red no puede estar vacío',
      'wifi.alert.password.length.5':
        'La contraseña debe tener al menos 5 caracteres',
      'wifi.alert.password.8': 'La contraseña debe tener al menos 8 caracteres',
      'button.rotate': 'Girar',
      'button.print': 'Imprimir',
      select: 'Seleccionar idioma',
    },
  },
  pt: {
    translation: {
      title: 'Cartão WiFi',
      'desc.use':
        'Imprima um cartão com detalhes de autenticação da sua WiFi. Cole na geladeira, perto da churrasqueira, etc.',
      'desc.privacy':
        'As informações da sua WiFi não são enviadas ao servidor. Nenhum dado é coletado por esse website. Veja o',
      'desc.source': 'código fonte',
      'wifi.login': 'Autenticação WiFi ',
      'wifi.name': 'Nome da Rede',
      'wifi.name.placeholder': 'Nome da sua rede WiFi',
      'wifi.password': 'Senha',
      'wifi.password.placeholder': 'Senha',
      'wifi.password.hide': 'Esconder o campo senha antes da impressão',
      'wifi.password.encryption': 'Criptografia',
      'wifi.tip':
        'Abra o aplicativo de câmera no seu telemóvel e aponte para o QR Code para conectar-se automaticamente.',
      'wifi.alert.name': 'O Nome da rede não pode ficar em branco',
      'wifi.alert.password.length.5': 'A senha precisa ter no mímimo 4 digítos',
      'wifi.alert.password.8': 'A senha precisa ter no mímimo 8 digítos',
      'button.rotate': 'Girar',
      'button.print': 'Imprimir',
      select: 'Selecionar Linguagem',
    },
  },
  ja: {
    translation: {
      title: 'WiFi ログイン',
      'desc.use':
        'WiFiのログイン情報を記載したシンプルなカードを印刷します。冷蔵庫に貼ったり、お財布に入れたりしてください。',
      'desc.privacy':
        'お客様のWiFi情報がサーバーに送信されることはありません。このウェブサイトでは、トラッキング、アナリティクス、フィンガープリントは使用されていません。確認する',
      'desc.source': 'ソースコード',
      'wifi.login': ' WiFi ログイン',
      'wifi.name': 'ネットワーク名',
      'wifi.name.placeholder': 'WiFi ネットワーク名',
      'wifi.password': 'パスワード',
      'wifi.password.placeholder': 'パスワード',
      'wifi.password.hide': '印刷前にパスワードを非表示にする',
      'wifi.password.encryption': '暗号化',
      'wifi.tip': '携帯電話のカメラをQRコードに向けると、自動的に接続されます',
      'wifi.alert.name': 'ネットワーク名は空にできません',
      'wifi.alert.password.length.5':
        'パスワードは5文字以上でなければなりません',
      'wifi.alert.password.8': 'パスワードは8文字以上でなければなりません',
      'button.rotate': '回転する',
      'button.print': '印刷する',
      select: '言語を選択',
    },
  },
  'ru-RU': {
    translation: {
      title: 'Карта WiFi',
      'desc.use':
        'Распечатайте простую карточку с данными для входа в WiFi. Приклейте ее на холодильник, храните в бумажнике и т.д.',
      'desc.privacy':
        'Информация о вашем WiFi никогда не отправляется на сервер. На этом сайте не используется отслеживание, аналитика или цифровые отпечатки. Посмотреть',
      'desc.source': 'исходный код',
      'wifi.login': 'Вход в WiFi',
      'wifi.name': 'Название сети',
      'wifi.name.placeholder': 'Название сети WiFi',
      'wifi.password': 'Пароль',
      'wifi.password.placeholder': 'Пароль',
      'wifi.password.hide': 'Скрыть поле пароля перед печатью',
      'wifi.password.encryption': 'Шифрование',
      'wifi.tip':
        'Наведите камеру телефона на QR-код для автоматического подключения',
      'wifi.alert.name': 'Название сети не может быть пустым',
      'wifi.alert.password.length.5':
        'Пароль должен состоять не менее чем из 5 символов',
      'wifi.alert.password.8':
        'Пароль должен состоять не менее чем из 8 символов',
      'button.rotate': 'Повернуть',
      'button.print': 'Распечатать',
      select: 'Выбор языка',
    },
  },
  'uk-UA': {
    translation: {
      title: 'Карта WiFi',
      'desc.use':
        'Роздрукуйте просту картку з даними для входу в WiFi. Приклейте її на холодильник, зберігайте в гаманці і т.д.',
      'desc.privacy':
        'Інформація про ваш WiFi ніколи не відправляється на сервер. На цьому сайті не використовується відстеження, аналітика або цифрові відбитки. Переглянути',
      'desc.source': 'вихідний код',
      'wifi.login': 'Вхід в WiFi',
      'wifi.name': 'Назва мережі',
      'wifi.name.placeholder': 'Назва мережі WiFi',
      'wifi.password': 'Пароль',
      'wifi.password.placeholder': 'Пароль',
      'wifi.password.hide': 'Приховати поле пароля перед друком',
      'wifi.password.encryption': 'Шифрування',
      'wifi.tip':
        'Наведіть камеру телефону на QR-код, щоб автоматично підключитися',
      'wifi.alert.name': 'Назва мережі не може бути порожньою',
      'wifi.alert.password.length.5':
        'Пароль повинен містити принаймні 5 символів',
      'wifi.alert.password.8': 'Пароль повинен містити принаймні 8 символів',
      'button.rotate': 'Повернути',
      'button.print': 'Друкувати',
      select: 'Вибір мови',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  interpolation: {
    escapeValue: false,
  },
});

i18n.use(LanguageDetector).init();

export default i18n;
