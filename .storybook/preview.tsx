import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { globalDecorators } from './decorators'
import { viewports as breakpoints } from '../src/styles/breakpoints'
import { DocsContainer, DocsContainerProps } from '@storybook/blocks'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../src/styles/theme'
import { mswLoader } from 'msw-storybook-addon'

// Create custom viewports using widths defined in design tokens
const breakpointViewports = Object.keys(breakpoints).reduce(
  (acc, key) => {
    acc[`breakpoint${key}`] = {
      name: `Breakpoint - ${key}`,
      styles: {
        width: `${breakpoints[key as keyof typeof breakpoints]}px`,
        // Account for padding and border around viewport preview
        height: 'calc(100% - 20px)',
      },
      type: 'other',
    }
    return acc
  },
  {} as typeof INITIAL_VIEWPORTS
)

const preview: Preview = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'button-name',
            enabled: false, // Disable this rule globally
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'aria-allowed-role',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'aria-prohibited-attr',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'aria-hidden-focus',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'image-alt',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'landmark-no-duplicate-banner',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'landmark-unique',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'color-contrast',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'select-name',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'label',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'heading-order',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'valid-lang',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'meta-refresh',
            enabled: false,
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'empty-heading',
            enabled: false,
          },
        ],
      },
      /*
       * Axe's options parameter
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
       * to learn more about the available options.
       */
      options: {},
    },
    viewport: {
      viewports: {
        ...breakpointViewports,
        ...INITIAL_VIEWPORTS,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
      source: {
        excludeDecorators: true,
      },
      container: (props: DocsContainerProps) => (
        <ThemeProvider theme={lightTheme}>
          <DocsContainer {...props} />
        </ThemeProvider>
      ),
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Theme for the components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'light' },
          { value: 'dark', icon: 'circle', title: 'dark' },
        ],
      },
    },
  },

  decorators: globalDecorators,
  loaders: [mswLoader],
  tags: ['autodocs']
}
export default preview
