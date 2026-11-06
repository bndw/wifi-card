// The GIF at the top of the README, saved to docs/demo.gif.
export const alt = 'Demo of filling in and printing a WiFi card';

export default async ({ click, hold, moveTo, place, showPrint, type }) => {
  await place(900, 700);
  await hold(10);
  await moveTo('#ssid-');
  await click();
  await type('MyGuestNetwork');
  await hold(5);
  await moveTo('#password-');
  await click();
  await type('MySecurePassword');
  await hold(10);
  await moveTo('label.checkbox:has-text("Portrait")');
  await click();
  await hold(14);
  await click();
  await hold(8);
  await moveTo('#print');
  await click();
  await hold(6);
  await showPrint(40);
};
