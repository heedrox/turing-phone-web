import forge from 'node-forge'

const hash = (str) => {
  var md = forge.md.sha1.create();
  md.update(str);
  return md.digest().toHex()
};

export default hash;
