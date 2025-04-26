module.exports = async function styleTextWithRandomGradient(text) {
  const gradientModule = await import('gradient-string');
  const gradient = gradientModule.default;

  const gradients = []

  for (const gradientElement in gradient) {
    if (gradientElement === 'default') {
      continue
    }
    gradients.push(gradientElement)
  }

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]
  return gradient[randomGradient](text)
};
