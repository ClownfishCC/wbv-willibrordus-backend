// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
// import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { en } from '@payloadcms/translations/languages/en'
import { nl } from '@payloadcms/translations/languages/nl'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { customTranslations } from './custom-translations'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Sidebar } from './Sidebar/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    dateFormat: 'yyyy-MM-dd HH:mm',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      url: 'http://localhost:5178/en',
      collections: ['pages'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  i18n: {
    fallbackLanguage: 'nl', // default
    supportedLanguages: { nl, en },
    translations: customTranslations
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // email: nodemailerAdapter({
  //   defaultFromAddress: 'website@wbv-willibrordus.nl',
  //   defaultFromName: 'Website WBV St. Willibrordus',
  //   // Nodemailer transportOptions
  //   transportOptions: {
  //     host: 'smtp.soverin.net',
  //     port: process.env.SMTP_PORT,
  //     requireTLS: true,
  //     auth: {
  //       user: 'pieter@pietervanderweel.com',
  //       pass: "eT4wk-h37b3-93FvS-ueQvx-2WYPv"
  //     },
  //   },
  // }),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
    push: true,
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  localization: {
    locales: ['en', 'nl'], // required
    defaultLocale: 'nl', // required
  },
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Sidebar],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
