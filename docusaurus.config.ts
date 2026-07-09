import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Tech Alerts',
  tagline: 'Your technical documentation hub',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'sivadotblog',
  projectName: 'techalerts',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Tech Alerts',
      logo: {
        alt: 'Tech Alerts Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'libraryOneSidebar',
          position: 'left',
          label: 'Library One',
        },
        {
          type: 'docSidebar',
          sidebarId: 'libraryTwoSidebar',
          position: 'left',
          label: 'Library Two',
        },
        {
          label: 'Radar',
          href: '/radar/',
          position: 'right',
        },
        {
          href: 'https://github.com/sivadotblog/techalerts',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Library One',
              to: '/docs/library-one/intro',
            },
            {
              label: 'Library Two',
              to: '/docs/library-two/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tech Alerts. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
