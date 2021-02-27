import moduleAlias from 'module-alias';
import path from 'path';

const aliases = {
  test: path.join(__dirname, '..', '..', '..', 'src'),
  dev: path.join(__dirname, '..', '..', '..', 'src'),
  prod: path.join(__dirname, '..', '..', '..', 'dist'),
};

moduleAlias.addAlias('@', aliases[process.env.NODE_ENV]);
