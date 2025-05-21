import type { Meta, StoryObj } from '@storybook/react';
import SignUpForm from './SignUpForm';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/Forms/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sign-up form with multiple fields using MUI and Formik.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  args: {
    onSubmit: action('SignUpForm submitted'),
  },
};

export const WithValidationErrors: Story = {
  args: {
    onSubmit: action('SignUpForm submitted'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows validation errors when fields are invalid or empty.',
      },
    },
  },
};
