import type { ArrayField, Field } from 'payload'

import type { LinkAppearances } from './link'

import deepMerge from '@/utilities/deepMerge'
import { link } from './link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
      }),
      {
        name: 'icon',
        type: 'select',
        defaultValue: 'onsaanbod',
        label: 'Icoon',
        options: [
          {
            label: 'Bellen',
            value: 'bellen',
          },
          {
            label: 'E-mail',
            value: 'email',
          },
          {
            label: 'Ik huur',
            value: 'ikhuur',
          },
          {
            label: 'Ons aanbod',
            value: 'onsaanbod',
          },
          {
            label: 'Reparaties',
            value: 'reparaties',
          },
          {
            label: 'Zoeken',
            value: 'zoeken',
          },
          {
            label: 'Geen',
            value: ''
          }
        ],
        required: false,
      },
    ],
    admin: {
      initCollapsed: true,
    },
  }

  return deepMerge(generatedLinkGroup, overrides)
}
