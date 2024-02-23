import React, { useEffect } from 'react';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

const MyComponent = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'user', content: 'Who won the World Series in 2020?' },
          ],
          model: 'gpt-3.5-turbo'
        });       

        console.log(completion.choices[0].message.content);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); 

  return (
    <div>
      {}
    </div>
  );
};

export default MyComponent;
