'use client'
import type React from 'react'
import { useTranslation } from '@payloadcms/ui'

import type {
  CustomTranslationsObject,
  CustomTranslationsKeys,
} from '../../custom-translations'

const BeforeLogin: React.FC = () => {
  const { i18n, t } = useTranslation<
    CustomTranslationsObject,
    CustomTranslationsKeys
  >() // These generics merge your custom translations with the default client translations
  return (
    <div>
      <p>
        <b>{t('general:myCustomKey')}</b>
        {/* {t('general:welcomeMessage')} */}
      </p>
    </div>
  )
}

export default BeforeLogin
