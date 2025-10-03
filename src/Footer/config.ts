import type { GlobalConfig } from 'payload'
import { lexicalEditor, HeadingFeature, BlocksFeature, FixedToolbarFeature, UnorderedListFeature, OrderedListFeature, LinkFeature, InlineToolbarFeature, HorizontalRuleFeature } from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      localized: true,
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            LinkFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: false,
      required: false,
    },
    {
      name: 'email',
      type: 'text',
      required: false,
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
