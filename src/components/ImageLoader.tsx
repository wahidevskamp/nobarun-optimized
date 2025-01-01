const imageLoader = ({ src, width, height, quality }) => {
  return `https://d1v2sbji1mlin2.cloudfront.net/${src}?w=${width}&h=${height}&q=${
    quality || 75
  }`;
};

export default imageLoader;
