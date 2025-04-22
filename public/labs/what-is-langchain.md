### what is langchain ?

LangChain is like a "toolkit" for building application with LLMs . it provides a way to use these powerful AI "brains" effectively . Think of it as a set of instrustions that helps you guide and connect with an LLM to build something bigger and more userful 

```
                  user 
                   |
                   |
                   |
External Source <--LangChain-->LLM 
```
langchain helps in a few key ways , fistly it allows us to chain or connect multiple LLMs Together, enabling us to perform complex tasks . 
secondly , it lets LLMs access and use information from ousdie of their buil-in knowledge . 

this is essential when working with things like current news or specific data .overall langchain turns the abstarct potiential of LLMs into something we can use to  make awesome things 

### Why should you learn LangChain?

Now that we understand how LangChain simplifies working with LLMs, let’s explore why learning it can be so valuable. Well, it dramatically simplifies the process of building AI applications. Instead of wrestling with the raw complexity of LLMs, LangChain lets you focus on building your vision. It makes things easier even for beginners!

With LangChain, you can create all sorts of cool things. Chatbots with human-like conversations, AI tools that can help you write or research, or data analysis tools that can provide powerful insights. The possibilities are truly vast.

Plus, as AI becomes increasingly important, knowing how to use tools like Langhain is becoming a valuable skill. The demand for people who understand this technology is only going to grow.

### How Langchain work? 

Imagine you want to cook a complex recipe. You wouldn’t just dump all the ingredients together and hope for the best, right? You’d likely follow a recipe with specific steps, where each step builds on the previous one. LangChain does something similar with LLMs.

Instead of directly asking an LLM to do everything at once, LangChain allows you to:

- Define a “Chain” of actions: You can create a sequence of actions that the LLM will execute. Each action might be a different task, like summarizing text, translating content, or answering questions based on a specific source of information.

- Connect different tools: LangChain can hook into various external tools, like:
LLMs: To generate text, analyze, translate, etc.
Data Sources: To load information from text files, databases, or APIs.


- Other Utilities: Like web search or even math tools
Manage the flow of information: LangChain acts as the orchestrator, ensuring that the output from one action becomes the input for the next action in the chain. This flow allows for complex operations that are beyond what a single LLM call could achieve.

The word “chain” is central because it represents the core way LangChain structures its work. Imagine a physical chain with multiple connected links. Each link represents one step in your process, whether it's using an LLM for a specific task, transforming some data, retrieving information, etc. By “chaining” these actions, you create more complex and powerful workflows.


--> Input Query --> [Prompt Templete, LLM , Output parser]---> respose 


### Chat Models, Messages, and Prompt Templates in LangChain

```
from langchain_groq import ChatGroq
llm = ChatGroq(model="llama3-8b-8192")
response = llm.invoke("What is the tallest building in the world?")
print(response.content)
```

output 

```

As of 2021, the tallest building in the world is the Burj Khalifa, located in Dubai, United Arab Emirates. It stands at a height of 828 meters (2,722 feet) tall, with 163 floors. It was completed in 2010 and was designed by the American architectural firm Skidmore, Owings & Merrill.

The Burj Khalifa is not only the tallest building in the world but also holds several other records, including the highest occupied floor, highest outdoor observation deck, elevator with the longest travel distance, and the tallest freestanding structure in the world.

Here are some interesting facts about the Burj Khalifa:

* It took over 6 years to build the Burj Khalifa, with a workforce of over 10,000 people.
* The building's foundation is 43 meters (141 feet) deep and is designed to withstand extreme winds and earthquakes.
* The Burj Khalifa has 57 elevators, including the world's fastest elevator, which travels at a speed of 46 km/h (29 mph).
* The building's exterior is designed to resemble a Hymenocallis, a desert flower native to the UAE.
* The Burj Khalifa has 9,000 tons of structural steel, which is equivalent to the weight of 1,600 elephants.

I hope you find these facts interesting!
```

## Messages

Messages allow us to easily create and maintain chats with the models. Each message in the chat has a role corresponding to the type or sender of the message, and some content, which as the name suggests, is the content of the message. This enables us to use a large variety of models using a single format.


```
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage

llm = ChatGroq(model="llama3-8b-8192")

messages = [
  SystemMessage(content="You are a math tutor who provides answers with a bit of sarcasm."),
  HumanMessage(content="What is the square of 2?"),
]

response = llm.invoke(messages)
print(response.content)

```

output 

```
Wow, I'm just so excited to be calculating the square of 2. It's not like I have better things to do, like solving world hunger or curing cancer. Nope, let me just put my Ph.D. in math to good use and calculate the square of 2.
So, without further ado, the answer is... (drumroll please)... 4! Wow, I know, I know, it's a real brain-twister. I'm just so glad I could help you with that earth-shattering calculation. Now, if you'll excuse me, I have to go calculate the square root of -1. That's right, folks, it's a real challenge.

```



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

#### Parsing Outputs with LangChain

LLMs typically provide a string of text as an output. However, when creating an LLM-powered application, we might need a more structured and formatted output that provides us with concise information rather than reading the complete response.



> Lab 1 - Promt Templating and parcing date and time 


```
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain.output_parsers import DatetimeOutputParser
llm = ChatGroq(model="llama3-8b-8192")
parser_dateTime = DatetimeOutputParser()
prompt_dateTime = PromptTemplate.from_template(
    template = "Answer the question.\n{format_instructions}\n{question}",
    input_vairables = ["question"],
    partial_variables = {"format_instructions": parser_dateTime.get_format_instructions()}
)

prompt_value = prompt_dateTime.invoke({"question": "When was the iPhone released"})
response = llm.invoke(prompt_value)
print(response.content)

returned_object = parser_dateTime.parse(response.content)
print(type(returned_object))

```
Output

```
2007-06-29T19:00:00.000000Z
<class 'datetime.datetime'>
```

Lab 2 - Promt Templating and list output parcer 


```
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain.output_parsers import CommaSeparatedListOutputParser

llm = ChatGroq(model="llama3-8b-8192")

parser_list = CommaSeparatedListOutputParser()
prompt_list = PromptTemplate.from_template(
    template = "Answer the question.\n{format_instructions}\n{question}",
    input_vairables = ["question"],
    partial_variables = {"format_instructions": parser_list.get_format_instructions()},
)

prompt_value = prompt_list.invoke({"question": "List 4 chocolate brands"})
response = llm.invoke(prompt_value)
print(response.content)

returned_object = parser_list.parse(response.content)
print(type(returned_object))

```
output 

```
Nestle, Lindt, Ghirardelli, Hershey
<class 'list'>
```

Pydantic parser


So far, we’ve seen some examples of output parsers that convert the input string to a single specific format. To extract multiple fields from the output string of an LLM, we can use the PydanticOutputParser. This parser parses the response into a defined TypedDict class, JSON schema or a Pydantic class.


```
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field

llm = ChatGroq(model="llama3-8b-8192")

class Author(BaseModel):
    name: str = Field(description="The name of the author")
    number: int = Field(description="The number of books written by the author")
    books: list[str] = Field(description="The list of books they wrote")

output_parser = PydanticOutputParser(pydantic_object=Author)

prompt_list = PromptTemplate.from_template(
    template = "Answer the question.\n{format_instructions}\n{question}",
    input_vairables = ["question"],
    partial_variables = {"format_instructions": output_parser.get_format_instructions()},
)

prompt_value = prompt_list.invoke({"question": "Generate the books written by Dan Brown"})
response = llm.invoke(prompt_value)

returned_object = output_parser.parse(response.content)
print(f"{returned_object.name} wrote {returned_object.number} books.")
print(returned_object.books)

```
output 

```

Dan Brown wrote 18 books.
['Digital Fortress', 'Angels & Demons', 'The Da Vinci Code', 'The Lost Symbol', 'Inferno', 'Origin', 'The Solomon Key', 'Deception Point', 'The Bourne Legacy', 'The Last Symbol', "The Patriot's Warning", 'The Third Secret', 'The Last Man', 'The Rite', 'The Lost City', 'The Oracle', 'The Infernal', 'Wild Signs and Wicked City']
```

Notice at the end of the code above we can access the members of the Author class once the output has been parsed by the output_parser.

.with_structured_output() method

The .with_structured_output() method is an easier and simpler way to get structured output from the model. This is supported by most models and greatly reduces the complexity with getting a structured output. Let’s modify our existing code to use this new method.


```
from langchain_groq import ChatGroq
from pydantic import BaseModel, Field

llm = ChatGroq(model="llama3-8b-8192")

class Author(BaseModel):
    name: str = Field(description="The name of the author")
    number: int = Field(description="The number of books written by the author")
    books: list[str] = Field(description="The list of books they wrote")

structured_llm = llm.with_structured_output(Author)
returned_object = structured_llm.invoke("Generate the books written by Dan Brown")

print(f"{returned_object.name} wrote {returned_object.number} books.")
print(returned_object.books)

```

ouput 

```
Dan Brown wrote 17 books.
['Digital Fortress', "Angel's & Demons", 'Deception Point', 'The Da Vinci Code', 'The Lost Symbol', 'Inferno', 'Origin', 'Wild Sign', 'The Solomon Key', 'The Last Symbol', 'The Third Secret', 'The New Atlantis', 'Angels & Demons', 'The Paris Affair', 'The Lost City', 'The Sacred Code']

```


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

### What exactly is a tool?

At its core, a tool is simply a Python function that performs a specific task. But in the context of LangChain, it’s more than just a function. A tool is a function packaged with metadata that helps the AI understand what it does, how to use it, and what kind of information it needs. Think of it like a well-documented instruction manual for your AI assistant.

### The BaseTool interface


LangChain uses a class called BaseTool as the blueprint for all tools. It defines the core attributes and methods that all tools should have:

name: A descriptive name for the tool (e.g., “weather_lookup”, “multiply_numbers”).

description: A natural language explanation of what the tool does (e.g., “Retrieves the current weather conditions for a given city.”).

args: A definition of the expected inputs for the tool (e.g., a “city” string).

invoke(args): This is the method that is called to execute the tool.

#### The @tool Decorator

While we could manually create tools by subclassing BaseTool, LangChain provides a much easier way: the @tool decorator. Think of it like a magic wand that transforms your regular Python functions into powerful AI tools.

Here’s how it works:

We define a regular Python function to do something.
We decorate that function with @tool.
LangChain automatically infers the tool’s name, description, and input arguments based on the function’s name, docstring, and type hints.

```
from langchain_core.tools import tool

@tool
def calculate_discount(price: float, discount_percentage: float) -> float:
    """
    Calculates the final price after applying a discount.

    Args:
        price (float): The original price of the item.
        discount_percentage (float): The discount percentage (e.g., 20 for 20%).

    Returns:
        float: The final price after the discount is applied.
    """
    if not (0 <= discount_percentage <= 100):
        raise ValueError("Discount percentage must be between 0 and 100")

    discount_amount = price * (discount_percentage / 100)
    final_price = price - discount_amount
    return final_price

```
In this example, @tool has done several things:

The name of the tool will be calculate_discount.
The description will be “Calculates the final price after applying a discount.”.

The expected input will be an object with keys price and discount_percentage which must be floats.
The tool also validates the input to make sure the discount is between 0 and 100.

Tools in LangChain implement the Runnable interface. This means they can be invoked using the invoke() method directly. We will pass the invoke method our dictionary of inputs, with the keys set to the parameters that the function expects. We can also print the name, description and args of the tool. Let’s see this in action.

```
from langchain_core.tools import tool

@tool
def calculate_discount(price: float, discount_percentage: float) -> float:
    """
    Calculates the final price after applying a discount.

    Args:
        price (float): The original price of the item.
        discount_percentage (float): The discount percentage (e.g., 20 for 20%).

    Returns:
        float: The final price after the discount is applied.
    """
    if not (0 <= discount_percentage <= 100):
        raise ValueError("Discount percentage must be between 0 and 100")

    discount_amount = price * (discount_percentage / 100)
    final_price = price - discount_amount
    return final_price
    
print(calculate_discount.name)
print(calculate_discount.description)
print(calculate_discount.args)
print(calculate_discount.invoke({"price":100, "discount_percentage": 15}))

```
ouput 

```
Output

calculate_discount
Calculates the final price after applying a discount.

Args:
    price (float): The original price of the item.
    discount_percentage (float): The discount percentage (e.g., 20 for 20%).

Returns:
    float: The final price after the discount is applied.
{'price': {'title': 'Price', 'type': 'number'}, 'discount_percentage': {'title': 'Discount Percentage', 'type': 'number'}}
85.0


```

As you can see, running the tool directly gives the correct output. This output, in more complex scenarios, can be passed back to the LLM to continue with a given conversation


### Tool calling: putting tools to work

Now that we know how to create tools, let’s see how our AI can actually use them. This is where the concept of tool calling comes in. The problem is we have a tool, but how does the AI know when to use it? It can’t just randomly use it!


### Tool binding

Tool calling involves two steps. First, we need to bind the tools to a language model. We do this using the bind_tools() method. This tells the model about the tools it can use. It also tells the model the format with which to communicate with the given tools. Think of it like giving your AI an instruction manual for a toolbox.

```
# Example with an imaginary tool-calling model and our calculate_discount function

llm = ToolCallingModel()
llm_with_tools = llm.bind_tools([calculate_discount)])

```

### Model decision-making

Now, here’s the magic! When we give a prompt to the model that has tools bound to it, the model decides if and when to use the given tools. It’s not enough that the tool is available, it also needs to be relevant to the prompt. For example, if you ask the model “What’s the capital of France?” it probably won’t make use of any tools, b “What is the price of an item that costs $100 after a 20% discount?” the model might decide to use our previously defined calculate_discount function.

```
from langchain_groq import ChatGroq
from langchain_core.tools import tool

llm = ChatGroq(model="llama-3.1-8b-instant")

@tool
def calculate_discount(price: float, discount_percentage: float) -> float:
    """
    Calculates the final price after applying a discount.

    Args:
        price (float): The original price of the item.
        discount_percentage (float): The discount percentage (e.g., 20 for 20%).

    Returns:
        float: The final price after the discount is applied.
    """
    if not (0 <= discount_percentage <= 100):
        raise ValueError("Discount percentage must be between 0 and 100")

    discount_amount = price * (discount_percentage / 100)
    final_price = price - discount_amount
    return final_price
    
llm_with_tools = llm.bind_tools([calculate_discount])

hello_world = llm_with_tools.invoke("Hello world!")
print("Content:", hello_world.content,'\n')

result = llm_with_tools.invoke("What is the price of an item that costs $100 after a 20% discount?")
print("Content:", result.content)
print(result.tool_calls)

```

output 

```
Content: It looks like you just wanted to say hello. How can I assist you today? Do you have any questions or need help with a specific task? 

Content: 
[{'name': 'calculate_discount', 'args': {'price': 100, 'discount_percentage': 20}, 'id': 'call_575y', 'type': 'tool_call'}]

```

In the first example, the model correctly concludes that the prompt doesn’t need a tool, which why we can see the output in the content attribute. In the second example, however, the model correctly identifies that the user is requesting a mathematical operation, and it then formulates a prompt that has the tool-calling arguments. This is why the content attribute is empty and the tool_calls attribute has been set.

The tool_calls attribute
When a model decides to use a tool, its response will have a tool_calls attribute that we can access. This attribute is a dictionary that contains everything needed to execute the tool, including:

name: The name of the tool to use.
args: The input arguments for the tool.
id: An identifier of the specific call.
type: Type of the call, for example, tool_call.
Let's go back to our "What is the price of an item that costs $100 after a 20% discount?" example. In the output, you will observe something similar:

```
# Assuming we have made the call like we did before
print(result.tool_calls)
# This would output something like:
{'name': 'calculate_discount', 'args': {'price': 100.0, 'discount_percentage': 20.0}, 'id': 'abcdef', 'type': 'tool_call'}

```

Lab 


```
from langchain_groq import ChatGroq
from langchain_core.tools import tool

llm = ChatGroq(model="llama-3.1-8b-instant")

@tool
def calculate_discount(price: float, discount_percentage: float) -> float:
    """
    Calculates the final price after applying a discount.

    Args:
        price (float): The original price of the item.
        discount_percentage (float): The discount percentage (e.g., 20 for 20%).

    Returns:
        float: The final price after the discount is applied.
    """
    if not (0 <= discount_percentage <= 100):
        raise ValueError("Discount percentage must be between 0 and 100")

    discount_amount = price * (discount_percentage / 100)
    final_price = price - discount_amount
    return final_price
    
llm_with_tools = llm.bind_tools([calculate_discount])


result = llm_with_tools.invoke("What is the price of an item that costs $100 after a 20% discount?")
print(result.tool_calls)

args = result.tool_calls[0]['args']
print(calculate_discount.invoke(args))

```

ouput 

```
[{'name': 'calculate_discount', 'args': {'price': 100, 'discount_percentage': 20}, 'id': 'call_aezt', 'type': 'tool_call'}]
80.0

```

Note 

Best practices
To get the best results with tools and tool calling, keep the following points in mind:

Clear Naming and Documentation: Choose descriptive names and provide clear docstrings/descriptions for all your tools. This helps the model understand how to use them correctly.

Keep it Simple: Design tools that are simple and focused on a narrow scope. This makes it easier for the model to use them correctly.

Tool-Calling Models: Some LLMs have explicit tool-calling APIs, and they will work better than models that do not support it. A complete list of models that support tool-calling can be found here.

Avoid Overloading: Don’t give the model too many tools to choose from, especially if the tools have similar functionalities.

Test your Tools: Test your tools individually before integrating them with the LLM. It is important to make sure your tools work as intended.
Tools unlock the full potential of LangChain 

### Embeddings and Vector Stores in LangChain



