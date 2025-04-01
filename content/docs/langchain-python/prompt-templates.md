## Prompt templates

A prompt is a query that stores the style and format of an input to a model that answers the query accordingly. Prompts play an important role in the interaction with language models. Careful prompt crafting is essential to getting the desired and effective response from the model. To ease the prompting tasks, LangChain provides prompt templates.

Prompt templates serve as predefined recipes for crafting prompts tailored for language models and are reusable. A prompt template may include the following:

Instructions: This provides specific guidelines that instruct the language model on how to generate responses to queries.
Few-shot examples: This provides examples of input-output pairs that help the language model understand the context for the given prompt.
User input: This corresponds to the user’s query.
A basic example of a template would include a set of instructions together with the user’s input. We can view this as a worker that performs the same task repeatedly on different inputs, ensuring consistent and tailored responses from the language model.

Consider an example of an employee who needs to send out email invitations to thousands of recipients. Prompt templates can be invaluable for creating personalized and scalable communication. Let’s examine how a prompt template for creating a personalized email looks:


```
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

llm = ChatGroq(model="llama3-8b-8192")

email_template = PromptTemplate.from_template(
  "Create an invitation email to the recipient that is {recipient_name}\
for an event that is {event_type}\
in a language that is {language}\
Mention the event location that is {event_location}\
and event date that is {event_date}.\
Also write few sentences about the event description that is {event_description}\
in style that is {style}."
)

details = {
  "recipient_name":"John",
  "event_type":"product launch",
  "language": "American english",
  "event_location":"Grand Ballroom, City Center Hotel",
  "event_date":"11 AM, January 15, 2024",
  "event_description":"an exciting unveiling of our latest GenAI product",
  "style":"enthusiastic tone"
}

prompt_value = email_template.invoke(details)
response = llm.invoke(prompt_value)
print(response.content)

```

ouput 

```
Subject: You're Invited: Join us for the Launch of our Latest GenAI Product!

Dear John,

We're thrilled to invite you to the most anticipated event of the year - the launch of our latest GenAI product! On January 15, 2024, at 11 AM, we'll be unveiling our latest innovation in the Grand Ballroom of the City Center Hotel. This is an event you won't want to miss!

Get ready for an exciting unveiling of our latest GenAI product, packed with cutting-edge features and functionalities that will revolutionize the way you work and live. Our team has been working tirelessly to bring you the most advanced AI technology, and we can't wait to share it with you.

Join us for an unforgettable morning of demos, presentations, and networking with industry leaders and pioneers. You'll be among the first to experience the future of AI and see how it can transform your business and personal life.

Date: January 15, 2024
Time: 11 AM
Location: Grand Ballroom, City Center Hotel

We're looking forward to seeing you there! To confirm your attendance, please reply to this email by January 10, 2024.

Don't miss this opportunity to be a part of something groundbreaking. Mark your calendars and get ready to be amazed!

Best regards,

[Your Name]

P.S. Don't forget to arrive early to grab a good seat and enjoy the pre-event refreshments!
```

