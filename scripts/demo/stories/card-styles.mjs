export const alt =
  'Demo of choosing card styles, editing custom CSS and printing';

const style = (id) => `label:has(input[name="card-style"][value="${id}"])`;

export default async ({
  click,
  hold,
  moveTo,
  page,
  place,
  showPrint,
  type,
}) => {
  await page.fill('#ssid-', 'MyGuestNetwork');
  await page.fill('#password-', 'MySecurePassword');
  await page.evaluate(() => document.activeElement.blur());
  await place(760, 300);
  await hold(10);

  await moveTo(style('cafe'));
  await click();
  await hold(18);
  await moveTo(style('guestPass'));
  await click();
  await hold(18);

  await moveTo('label.checkbox:has-text("Portrait")');
  await click();
  await hold(14);
  await click();
  await hold(6);

  await moveTo('.link-button.customize');
  await click();
  await hold(8);
  await moveTo('#custom-css');
  await click();
  await page.keyboard.press('Control+End');
  await hold(3);
  await type('\n.wc-header { background: #b4234a; }', { perFrame: 2 });
  await hold(18);

  await moveTo('.link-button.back');
  await click();
  await hold(10);
  await moveTo('#print');
  await click();
  await hold(6);
  await showPrint();
};
