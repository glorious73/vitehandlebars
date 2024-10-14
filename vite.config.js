import { resolve } from 'path';
import { build } from 'vite';
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
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
            }
        }
    },
    plugins: [
        handlebars({
            context(pagePath) {
                return pageContext[pagePath]
            },
            partialDirectory: resolve(__dirname, 'src/partials')
        })
    ],
};