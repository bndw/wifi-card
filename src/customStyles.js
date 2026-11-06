// Selectors stay inside the cards, and this prefix adds enough specificity
// for user rules to beat the app's print rules on #print-area.
const CARD_SCOPE = ':is(#print-area, .preview)';

export const CUSTOM_STYLE_CLASSES = [
  ['.wc-card', 'The whole card'],
  ['.wc-portrait', 'Added to portrait cards'],
  ['.wc-header', 'Logo and title row'],
  ['.wc-logo', 'WiFi logo'],
  ['.wc-title', 'Card title'],
  ['.wc-details', 'QR code and fields'],
  ['.wc-qr', 'QR code'],
  ['.wc-fields', 'All fields'],
  ['.wc-field', 'One field'],
  ['.wc-field-ssid', 'Network name field'],
  ['.wc-field-password', 'Password field'],
  ['.wc-label', 'Field labels'],
  ['.wc-input', 'Field text boxes'],
  ['.wc-divider', 'Line above the tip'],
  ['.wc-tip', 'Tip text and icons'],
];

const CUSTOM_STYLE_SELECTORS = new Set([
  ...CUSTOM_STYLE_CLASSES.map(([selector]) => selector),
  '.wc-portrait .wc-qr',
]);

const CAFE = `.wc-card {
  background: #f6ecd9;
  border: 1px solid #6b4226;
  border-radius: 2px;
  color: #6b4226;
}
.wc-title { color: #6b4226; font-family: Georgia, serif; font-style: italic; }
.wc-label { color: #6b4226; font-family: Georgia, serif; }
.wc-input { background: #fffaf0; border-color: #c9a982; color: #3d2413; }
.wc-qr {
  --wc-qr-color: #3d2413;
  --wc-qr-background: #f6ecd9;
}
.wc-divider { border-top: 1px dashed #c9a982; }`;

const PRESET_CSS = {
  cafe: CAFE,
  guestPass: `.wc-card {
  border: 1px solid #0f766e;
  border-radius: 14px;
  color: #0b3f3a;
  overflow: hidden;
}
.wc-header {
  background: #0f766e;
  margin: -1em -1em 1em;
  padding: 10px 1em;
}
.wc-logo { filter: brightness(0) invert(1); }
.wc-title {
  color: #fff;
  font-size: 15px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.wc-qr {
  --wc-qr-color: #0b3f3a;
  border-inline-end: 2px dashed #7fb8b0;
  box-sizing: content-box;
  margin-inline-end: 1em;
  padding: 0 1em 0 0;
}
.wc-portrait .wc-qr {
  border-block-end: 2px dashed #7fb8b0;
  border-inline-end: 0;
  margin-inline: 0;
  padding: 0 0 1em;
}
.wc-label {
  color: #0f766e;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.wc-input {
  background: transparent;
  border: 0;
  color: #0b3f3a;
  font-weight: 700;
  height: 34px;
  margin-inline-start: -4px;
  padding-inline: 4px;
}
.wc-divider { border-top-color: #cfe6e2; }
.wc-tip { color: #0f766e; }`,
};

export const CUSTOM_STYLE = 'custom';

export const STYLE_PRESETS = [
  {
    id: 'default',
    swatch: { background: '#fff', border: '#d8dae5', ink: '#101840' },
  },
  {
    id: 'cafe',
    swatch: { background: '#f6ecd9', border: '#6b4226', ink: '#6b4226' },
  },
  {
    id: 'guestPass',
    swatch: { background: '#e6f4f1', border: '#0f766e', ink: '#0f766e' },
  },
];

export const presetCss = (id) => PRESET_CSS[id] ?? '';

export const activeCss = ({ cardStyle, customCss }) =>
  cardStyle === CUSTOM_STYLE ? customCss : presetCss(cardStyle);

const STORAGE_KEY = 'wifi-card-style';

// Only the card style is saved. Network details are never stored.
export const loadCardStyle = () => {
  const fallback = { cardStyle: 'default', customCss: '' };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const known =
      saved?.cardStyle === CUSTOM_STYLE ||
      STYLE_PRESETS.some((preset) => preset.id === saved?.cardStyle);
    return known
      ? { cardStyle: saved.cardStyle, customCss: String(saved.customCss ?? '') }
      : fallback;
  } catch {
    return fallback;
  }
};

export const saveCardStyle = ({ cardStyle, customCss }) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cardStyle, customCss }));
  } catch {
    // Private windows can refuse storage. The style still works for this visit.
  }
};

const isConditional = (rule) =>
  rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule;

const filterCustomRules = (parent, dropped) => {
  let index = 0;
  while (index < parent.cssRules.length) {
    const rule = parent.cssRules[index];
    if (isConditional(rule)) {
      filterCustomRules(rule, dropped);
      index++;
      continue;
    }
    if (
      rule instanceof CSSStyleRule &&
      !rule.cssRules?.length &&
      CUSTOM_STYLE_SELECTORS.has(rule.selectorText)
    ) {
      index++;
      continue;
    }
    dropped.push(rule.cssText.split('{')[0].trim());
    parent.deleteRule(index);
  }
};

// Parse first, so unbalanced braces can't escape the scope and anything the
// browser rejects is gone. Only flat rules with public selectors survive;
// nesting selectors and other compounds must not reach outside the cards.
// Constructed stylesheets also ignore @import.
export const buildCustomStyles = (css) => {
  if (!css.trim()) {
    return { cssText: '', dropped: [] };
  }
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  const dropped = [];
  filterCustomRules(sheet, dropped);
  const body = [...sheet.cssRules].map((rule) => rule.cssText).join('\n');
  return { cssText: `${CARD_SCOPE} {\n${body}\n}`, dropped };
};

const toRgb = (color) =>
  color
    .match(/[\d.]+/g)
    ?.slice(0, 3)
    .map(Number);

const luminance = (rgb) => {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Scanners need dark modules on a light background with strong contrast.
export const checkQrContrast = (qrElement) => {
  const [background, modules] = qrElement?.querySelectorAll('path') ?? [];
  if (!background || !modules) {
    return '';
  }
  const light = luminance(toRgb(getComputedStyle(background).fill));
  const dark = luminance(toRgb(getComputedStyle(modules).fill));
  if (dark >= light) {
    return 'style.warning.inverted';
  }
  return (light + 0.05) / (dark + 0.05) < 4.5 ? 'style.warning.contrast' : '';
};
