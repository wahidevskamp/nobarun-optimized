const imageLoader = ({ src, width = 100, height = 100, quality = 75 }) => {
  return `https://d1v2sbji1mlin2.cloudfront.net/${src}?w=${width}&h=${height}&q=${quality}`;
};

export default imageLoader;
