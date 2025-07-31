import type { Meta, StoryObj } from '@storybook/react'
import { delay, HttpResponse, http } from 'msw'

import { BASE_URL } from '../../../../api'
import { restaurants } from '../../../../stub/restaurants'

import { RestaurantsSection } from './RestaurantsSection'

const meta = {
  title: 'Pages/HomePage/Components/RestaurantsSection',
  component: RestaurantsSection,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
          },
        ],
      },
    },
  },
} satisfies Meta<typeof RestaurantsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Our favorite picks',
  },
  parameters: {
    msw: {
      handlers: [http.get(BASE_URL, () => HttpResponse.json(restaurants))],
    },
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    msw: {
      handlers: [
        http.get(BASE_URL, async () => {
          await delay('infinite')
        }),
      ],
    },
  },
}
