
### Runnable and LCEL

In LangChain, runnables are a powerful abstraction representing any callable unit of work. They're used to encapsulate and manage different kinds of tasks, including LLM calls, database queries, or calls to external APIs. This allows us to chain together diverse operations in a consistent and manageable way, making it easy to construct complex workflows within LangChain applications.

We have been using the ChatGroq ChatModel with the invoke() method to send our queries to the model. The chat model class is a type of a runnable component. Runnable components use a runnable interface that enables these components to work in a consistent manner. Methods like invoke(), batch() and stream() are common for all runnable components.

invoke() processes a single input and returns a single output, ideal for individual requests.
batch() allows us to process a list of inputs simultaneously, returning a list of corresponding outputs, which is much more efficient for handling multiple requests at once.
stream() processes a single input but returns an output as a stream of chunks, which is useful for displaying real-time progress or handling very large outputs.
So far, we have used the Prompt , ChatModel, and OutputParser earlier in the course. These are all types of runnables. If you were paying attention, you might have noticed that we were using the output of one component as the input for another.

The PromptValue output from the PromptTemplate was passed as input to the ChatModel.
The string output from the ChatModel was passed as input to the OutputParser.
Essentially, runnable components take an input and transform it into an output. Now, imagine a more complex workflow. It would become difficult to create and manage this series of actions. This is where LangChain Expression Language (LCEL) comes in, offering a declarative approach to simplify chaining operations.


### Using runnables with LCEL


LCEL simplifies how we build and execute chains of actions within LangChain.

Declarative approach: Instead of writing step-by-step instructions, we use LCEL to describe the desired outcome. This lets LangChain figure out the most efficient way to achieve that result.
“Chain” as a Runnable: An LCEL-defined chain is itself a “Runnable,” meaning it can be executed directly. This ensures consistency and allows for easy integration with other LangChain components.
The concept of chaining actions together has existed for a while, especially in the Linux/Unix community. LangChain has overloaded the | operator, allowing it to be used in place of the pipe() method. This enables runnables to be structured in a familiar way. Let’s see this in action with a simple LLM chain.

User Query -> [Prompt Template , LLM , Ouput Parser ] -> Output 


```
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatGroq(model="llama-3.1-8b-instant")

sentiment_template = PromptTemplate(
    input_variables=["feedback"],
    template="Determine the sentiment of this feedback and reply in one word as either 'Positive', 'Neutral', or 'Negative':\n\n{feedback}"
)

# Neutral
user_feedback = "The delivery was late, and the product was damaged when it arrived. However, the customer support team was very helpful in resolving the issue quickly."

# Postive
# user_feedback = "The customer service was fantastic. The representative was friendly, knowledgeable, and resolved my issue quickly."

# Negative
# user_feedback = "I was extremely disappointed with the customer service. The representative was unhelpful and rude."

chain = sentiment_template | llm | StrOutputParser()
feeback_sentiment = chain.invoke({"feedback": user_feedback})

print(feeback_sentiment)

```

ouput 

```
negative 

```

### Extending the chain

While our current chain seems to be working fine, not all user feedback might be properly structured. Fret not, we can create a chain that can help us with that. While we are at this, we can also generate a summary of the user feedback. This will help us later when deciding what action needs to be taken.

So, an LLM chain can be seen as a basic building block for building a complex system of chains with multiple chains. A sequential chain is a sequence of multiple LLM chains where the output of the former acts as the input of the next until we reach the final result.


```
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.schema.runnable import RunnableLambda

llm = ChatGroq(model="llama-3.1-8b-instant")

parse_template = PromptTemplate(
    input_variables=["raw_feedback"],
    template="Parse and clean the following customer feedback for key information:\n\n{raw_feedback}"
)

summary_template = PromptTemplate(
    input_variables=["parsed_feedback"],
    template="Summarize this customer feedback in one concise sentence:\n\n{parsed_feedback}"
)

sentiment_template = PromptTemplate(
    input_variables=["feedback"],
    template="Determine the sentiment of this feedback and reply in one word as either 'Positive', 'Neutral', or 'Negative':\n\n{feedback}"
)

format_parsed_output = RunnableLambda(lambda output: {"parsed_feedback": output})
format_summary_output = RunnableLambda(lambda output: {"feedback": output})

# Neutral
user_feedback = "The delivery was late, and the product was damaged when it arrived. However, the customer support team was very helpful in resolving the issue quickly."

# Postive
# user_feedback = "The customer service was fantastic. The representative was friendly, knowledgeable, and resolved my issue quickly."

# Negative
# user_feedback = "I was extremely disappointed with the customer service. The representative was unhelpful and rude."

chain = parse_template | llm | format_parsed_output | summary_template | llm | format_summary_output | sentiment_template| llm | StrOutputParser()
feedback_sentiment = chain.invoke({"raw_feedback": user_feedback})

print(feedback_sentiment)

```
ouput 

```
positive 

```


### Conditional routing with a custom function

LangChain also allows us to build a more complex sequential chain with multiple inputs. This is particularly useful where a chain needs to create a meaningful response considering the outputs of the previous chains.

```
thankyou_template = PromptTemplate(
    input_variables=["feedback"],
    template="Given the feedback, draft a thank you message for the user and request them to leave a positive rating on our webpage:\n\n{feedback}"
)

details_template = PromptTemplate(
    input_variables=["feedback"],
    template="Given the feedback, draft a message for the user and request them provide more details about their concern:\n\n{feedback}"
)

apology_template = PromptTemplate(
    input_variables=["feedback"],
    template="Given the feedback, draft an apology message for the user and mention that their concern has been forwarded to the relevant department:\n\n{feedback}"
)
```

With these prompts ready, we can generate a response that can be sent to the user. Let’s convert these templates into separate chains. This will make it easier for us to use them in our routing function.

```
thankyou_chain = thankyou_template | llm | StrOutputParser()
details_chain = details_template | llm | StrOutputParser()
apology_chain = apology_template | llm | StrOutputParser()
```

Finally, we can create a routing function that will call the relevant chain based on the sentiment. This function will receive a dictionary as input. We can then access the keys that were passed to it. For this route function, we are interested in the sentiment key, as it would determine which chain to call.

```
def route(info):
    if "postive" in info['sentiment'].lower():
        return thankyou_chain
    elif "negative" in info['sentiment'].lower():
        return apology_chain
    else:
        return details_chain
```

Lab 

```

from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.schema.runnable import RunnableLambda

llm = ChatGroq(model="llama-3.1-8b-instant")

parse_template = PromptTemplate(
    input_variables=["raw_feedback"],
    template="Parse and clean the following customer feedback for key information:\n\n{raw_feedback}"
)

summary_template = PromptTemplate(
    input_variables=["parsed_feedback"],
    template="Summarize this customer feedback in one concise sentence:\n\n{parsed_feedback}"
)

sentiment_template = PromptTemplate(
    input_variables=["feedback"],
    template="Determine the sentiment of this feedback and reply in one word as either 'Positive', 'Neutral', or 'Negative':\n\n{feedback}"
)

thankyou_template = PromptTemplate(
    input_variables=["feedback"],
    template="Given the feedback, draft a thank you message for the user and request them to leave a positive rating on our webpage:\n\n{feedback}"
)

details_template = PromptTemplate(
    input_variables=["feedback"],
    template="Given the feedback, draft a message for the user and request them provide more details about their concern:\n\n{feedback}"
)

apology_template = PromptTemplate(
    input_variables=["feedback"],
    template="Given the feedback, draft an apology message for the user and mention that their concern has been forwarded to the relevant department:\n\n{feedback}"
)

thankyou_chain = thankyou_template | llm | StrOutputParser()
details_chain = details_template | llm | StrOutputParser()
apology_chain = apology_template | llm | StrOutputParser()

def route(info):
    if "postive" in info['sentiment'].lower():
        return thankyou_chain
    elif "negative" in info['sentiment'].lower():
        return apology_chain
    else:
        return details_chain

# Neutral
user_feedback = "The delivery was late, and the product was damaged when it arrived. However, the customer support team was very helpful in resolving the issue quickly."

# Postive
# user_feedback = "The customer service was fantastic. The representative was friendly, knowledgeable, and resolved my issue quickly."

# Negative
# user_feedback = "I was extremely disappointed with the customer service. The representative was unhelpful and rude."

format_parsed_output = RunnableLambda(lambda output: {"parsed_feedback": output})

summary_chain = parse_template | llm | format_parsed_output | summary_template | llm | StrOutputParser()
sentiment_chain = sentiment_template| llm | StrOutputParser()

summary = summary_chain.invoke({'raw_feedback' : user_feedback})
sentiment = sentiment_chain.invoke({'feedback': summary})

print("The summary of the user's message is:", summary)
print("The sentiment was classifed as:", sentiment)

full_chain = {"feedback": lambda x: x['feedback'], 'sentiment' : lambda x : x['sentiment']} | RunnableLambda(route)
print(full_chain.invoke({'feedback': summary, 'sentiment': sentiment}))

```

ouput 

```
The summary of the user's message is: A customer experienced two issues with their order: a late delivery with product damage, and a damaged product that was resolved by quick and helpful customer support.
The sentiment was classifed as: Neutral 

(This feedback contains both positive and negative aspects, so it's difficult to categorize as purely positive or negative.)
Subject: Apology for the Issues with Your Order

Dear [Customer's Name],

We are writing to express our sincerest apologies for the issues you experienced with your recent order. We understand that the late delivery and product damage were unacceptable and caused you inconvenience.

We want to assure you that we take situations like this seriously and are committed to making things right. We appreciate the feedback you provided, and we have forwarded it to our logistics and quality control departments to prevent such incidents in the future.

We are glad to hear that our customer support team was able to resolve the issue with the damaged product promptly and helpfully. This is the level of service we strive to provide, and we're grateful that you experienced it firsthand.

Once again, we apologize for the problems you encountered with your order. If there's anything else we can do to make up for the inconvenience, please don't hesitate to contact us. Your satisfaction is our top priority, and we appreciate your patience and understanding.

Thank you for choosing us, and we hope to serve you better in the future.

Sincerely,
[Your Name/Company Representative]
```

