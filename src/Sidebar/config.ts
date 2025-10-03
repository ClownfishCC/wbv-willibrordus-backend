import type { GlobalConfig } from 'payload'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, UnorderedListFeature, OrderedListFeature, LinkFeature, InlineToolbarFeature, HorizontalRuleFeature } from '@payloadcms/richtext-lexical'

// import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateSidebar } from './hooks/revalidateSidebar'

export const Sidebar: GlobalConfig = {
  slug: 'sidebar',
  access: {
    read: () => true,
  },
  fields: [
    linkGroup(),
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
  ],
  hooks: {
    afterChange: [revalidateSidebar],
  },
}
