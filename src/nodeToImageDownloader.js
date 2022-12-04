import { toPng } from 'html-to-image';

const downloader = require('downloadjs');

export const nodeToImageDownloader = ({
  nodeId,
  imageName,
  filter = (node) => node,
}) => {
  if (!nodeId || !imageName) return;
  toPng(document.getElementById(nodeId), { filter })
    .then((dataUrl) => {
      downloader(dataUrl, `${imageName}.png`);
    })
    .catch(() => {
      console.error('ERROR: the image downloader crashed.');
    });
};
