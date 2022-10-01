import forge from 'node-forge';

const hash = (str) => {
  const md = forge.md.sha1.create();
  md.update(str);
  return md.digest().toHex();
};

export default hash;
