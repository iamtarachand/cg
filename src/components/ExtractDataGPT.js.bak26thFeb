import React, { useEffect, useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

// const text = "Book a hotel room for two adults and one child in New York City for three nights starting on March 5th.";

const ExtractDataGPT = (props) => {
  const text = props.trans;
  console.log("Hello " + text);
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);
  const [persons, setPersons] = useState(null);
  const [location, setLocation] = useState(null);
  const [childCount, setChildCount] = useState(null);
  const [adultCount, setAdultCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStartingDates() {
      try {
        console.log("Called");
        const completion = await openai.chat.completions.create({
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
        setStartingDate(completion.choices[0].message.content);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    }

    async function fetchEndingDates() {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content:
                text +
                " Extract Ending Dates. Without any Explanation in 1 Word",
            },
          ],
          model: "gpt-3.5-turbo",
        });
        setEndingDate(completion.choices[0].message.content);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    }

    async function fetchPersons() {
      try {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: text + " Extract Persons" }],
          model: "gpt-3.5-turbo",
        });
        setPersons(completion.choices[0].message.content);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    }

    async function fetchLocation() {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "user", content: text + " Extract only Locations" },
          ],
          model: "gpt-3.5-turbo",
        });
        setLocation(completion.choices[0].message.content);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    }

    async function fetchChildCount() {
      try {
        const completion = await openai.chat.completions.create({
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
        setChildCount(completion.choices[0].message.content);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    }

    async function fetchAdultCount() {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content:
                text +
                " How many Adults? Answere should be in 1 character and in Numbers like : 1 ,2",
            },
          ],
          model: "gpt-3.5-turbo",
        });
        setAdultCount(completion.choices[0].message.content);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    }
    if (!text) {
      return;
    }
    fetchStartingDates();
    fetchEndingDates();
    fetchPersons();
    fetchLocation();
    fetchChildCount();
    fetchAdultCount();
  }, []);

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
