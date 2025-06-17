'use server';

import { SignUpFormValues } from '../components/Forms/Forms.types';

export const signupAction = async (data: SignUpFormValues) => {
  console.log({ data });

  try {
    const response = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    console.log({ response });
  } catch (error) {
    console.log({ error });
  }
};