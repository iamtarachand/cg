import React, { useEffect, useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
  // apiKey: "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",
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const ExtractDataGPT = (props) => {
  const text = props.trans;
  const setJsonStoredData = props.setJsonStoredData;
  console.log("Hello " + text);
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);
  const [persons, setPersons] = useState(null);
  const [location, setLocation] = useState(null);
  const [childCount, setChildCount] = useState(null);
  const [adultCount, setAdultCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const startingDateCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content:
                text +
                " Extract Starting Dates. Without any Explanation in 1 Word with",
            },
          ],
          model: "gpt-3.5-turbo",
        });
        setStartingDate(startingDateCompletion.choices[0].message.content);

        const endingDateCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content:
                text +
                " Extract Ending Date only. Without any Explanation and answere should be in 1 word and the Last date only",
            },
          ],
          model: "gpt-3.5-turbo",
        });
        setEndingDate(endingDateCompletion.choices[0].message.content);

        const personsCompletion = await openai.chat.completions.create({
          messages: [{ role: "user", content: text + " Extract total Persons without any explanation and the result should be in one character and in Numbers like 1, 2, 3 " }],
          model: "gpt-3.5-turbo",
        });
        setPersons(personsCompletion.choices[0].message.content);

        const locationCompletion = await openai.chat.completions.create({
          messages: [
            { role: "user", content: text + " Extract only Locations" },
          ],
          model: "gpt-3.5-turbo",
        });
        setLocation(locationCompletion.choices[0].message.content);

        const childCountCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content:
                text +
                " How many childs they have? Answere should be in 1 character and in Numbers",
            },
          ],
          model: "gpt-3.5-turbo",
        });
        setChildCount(childCountCompletion.choices[0].message.content);

        const adultCountCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content:
                text +
                " How many Adults? Without any Explanation and Answere should be in 1 character and in Numbers like : 1 ,2",
            },
          ],
          model: "gpt-3.5-turbo",
        });
        setAdultCount(adultCountCompletion.choices[0].message.content);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    }

    if (!text) {
      return;
    }

    fetchData();
  }, [text]);

  useEffect (() => {   
      // Creating the JSON object
      const resultJson = {
        startingDate: startingDate,
        endingDate: endingDate,
        persons: persons,
        location: location,
        childCount: childCount,
        adultCount: adultCount,
      };
      setJsonStoredData(resultJson);    
  }, [startingDate, endingDate, persons,location,childCount,adultCount])

  return (
    <div>
      {error && <p>{error}</p>}
      <p>Starting Date: {startingDate}</p>
      <p>Ending Date: {endingDate}</p>
      <p>Persons: {persons}</p>
      <p>Location: {location}</p>
      <p>Child Count: {childCount}</p>
      <p>Adult Count: {adultCount}</p>
    </div>
  );
};

export default ExtractDataGPT;
