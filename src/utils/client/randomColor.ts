const randomColor = (n: number) => {
  const colors = [
    "var(--color-orange)",
    "var(--color-green)",
    "var(--color-purple)",
    "var(--color-yellow)",
    "var(--color-red)",
  ]

  const randomColor = () => {
  }

  let output = [];

  for(let i = 0; i < n; i++) {
    const i = Math.floor(Math.random() * colors.length);
    output.push(colors.splice(i, 1)[0]);
  }

  return output;
}

export default randomColor;