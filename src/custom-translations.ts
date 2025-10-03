import { enTranslations } from '@payloadcms/translations/languages/en'
import { nlTranslations } from '@payloadcms/translations/languages/nl'
import type { NestedKeysStripped } from '@payloadcms/translations'

export const customTranslations = {
  en: {
    general: {
      myCustomKey: 'Welcome to the admin panel for WBV St. Willibrordus',
      welcomeMessage: "Welcome! "
    },
    fields: {
      addLabel: 'Add!',
    },
  },
  nl: {
    general: {
      myCustomKey: 'Welkom op het beheerpaneel voor WBV St. Willibrordus',
      welcomeMessage: "Welkom! "
    },
    fields: {
      caption: "Onderschrift",
      addLabel: 'Toevoegen',
      title: 'Titel'
    }
  }
}

export type CustomTranslationsObject = typeof customTranslations.en & typeof customTranslations.nl &
  typeof enTranslations & typeof nlTranslations
export type CustomTranslationsKeys =
  NestedKeysStripped<CustomTranslationsObject>