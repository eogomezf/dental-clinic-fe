import type { Meta, StoryObj } from '@storybook/react';
import FormsWrapper from './FormsWrapper';

const meta: Meta<typeof FormsWrapper> = {
  title: 'Components/Forms/FormsWrapper',
  component: FormsWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Wrapper component that contains both SignIn and SignUp forms with tab switching.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormsWrapper>;

export const Default: Story = {
  args: {},
};

export const InitiallyOnSignUpTab: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the wrapper starting on the Sign Up tab instead of Sign In.',
      },
    },
  },
  render: () => {
    return <FormsWrapper />;
  },
};
