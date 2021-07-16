import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
  简体中文: {
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
  'pt-BR': {
    translation: {
      title: 'Cartão WiFi',
      'desc.use':
        'Imprime um simples cartão com os dados de login de sua WiFi. Cole na sua geladeira, guarde na sua carteira etc.',
      'desc.privacy':
        'As informações da sua WiFi nunca será enviada para o servidor. Nenhum serviço de tracking, analytics ou fingerprint é usado nesse site. Veja o',
      'desc.source': 'código fonte',
      'wifi.login': 'WiFi Login',
      'wifi.name': 'Nome da rede',
      'wifi.name.placeholder': 'Nome da Rede',
      'wifi.password': 'Senha',
      'wifi.password.placeholder': 'Senha',
      'wifi.password.hide': 'Esconder senha antes de imprimir',
      'wifi.password.encryption': 'Tipo de Segurança',
      'wifi.tip':
        'Aponte a camera do seu ceular para o código QR para se conectar automaticamente.',
      'wifi.alert.name': 'Nome da rede não pode estar em branco',
      'wifi.alert.password.length.5':
        'A Senha deve ter pelo menos 5 caracteres',
      'wifi.alert.password.8': 'A Senha deve ter pelo menos 5 caracteres',
      'button.rotate': 'Rotacionar',
      'button.print': 'Imprimir',
      select: 'Escolha o idioma',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
