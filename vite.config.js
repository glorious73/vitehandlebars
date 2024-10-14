import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

const pageContext = {
    '/index.html': {
      title: 'Main Page',
    },
    '/about.html': {
      title: 'About Page',
    },
    '/contact.html': {
      title: 'Contact Page',
    },
  };

export default {
  plugins: [
    handlebars({
        context(pagePath) {
            return pageContext[pagePath]
        },
        partialDirectory: resolve(__dirname, 'partials')
    })],
};