# LangChain Practical Labs

## Lab 1: Getting Started with LangChain and Chat Models

In this lab, we'll explore how to use LangChain to interact with LLMs through a simple question-answering system.

### Objective
- Set up a ChatGroq model
- Use basic invocation to get responses
- Understand the model's response format

### Implementation

```python
from langchain_groq import ChatGroq

# Initialize the LLM
llm = ChatGroq(model="llama3-8b-8192")

# Ask a simple question
response = llm.invoke("What is the tallest building in the world?")

# Print the response
print(response.content)
```

### Expected Output
A detailed response about the Burj Khalifa in Dubai, including its height, construction details, and interesting facts.

### Exercise
Try modifying the prompt to ask about other landmarks or topics. Observe how the model responds to different types of questions.

---

## Lab 2: Working with Messages and System Prompts

This lab demonstrates how to use different message types to control the model's behavior and responses.

### Objective
- Use SystemMessage to set the model's behavior
- Use HumanMessage to provide user input
- Understand how message roles affect responses

### Implementation

```python
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage

# Initialize the LLM
llm = ChatGroq(model="llama3-8b-8192")

# Create a conversation with system and human messages
messages = [
  SystemMessage(content="You are a math tutor who provides answers with a bit of sarcasm."),
  HumanMessage(content="What is the square of 2?"),
]

# Get the response
response = llm.invoke(messages)
print(response.content)
```

### Expected Output
A sarcastic response about calculating the square of 2, following the persona defined in the system message.

### Exercise
Experiment with different system messages to create various personas (e.g., a poet, a scientist, a chef). Observe how the tone and content of responses change.

---

## Lab 3: Creating Prompt Templates

This lab covers creating reusable prompt templates for consistent interactions with LLMs.

### Objective
- Create a flexible prompt template
- Pass variables to populate the template
- Use the template with an LLM

### Implementation

```python
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

# Initialize the LLM
llm = ChatGroq(model="llama3-8b-8192")

# Create an email template
email_template = PromptTemplate.from_template(
  "Create an invitation email to the recipient that is {recipient_name}\
for an event that is {event_type}\
in a language that is {language}\
Mention the event location that is {event_location}\
and event date that is {event_date}.\
Also write few sentences about the event description that is {event_description}\
in style that is {style}."
)

# Define the details
details = {
  "recipient_name": "John",
  "event_type": "product launch",
  "language": "American English",
  "event_location": "Grand Ballroom, City Center Hotel",
  "event_date": "11 AM, January 15, 2024",
  "event_description": "an exciting unveiling of our latest GenAI product",
  "style": "enthusiastic tone"
}

# Generate the prompt and get response
prompt_value = email_template.invoke(details)
response = llm.invoke(prompt_value)
print(response.content)
```

### Expected Output
A professionally formatted invitation email for a product launch event, following the specified parameters.

### Exercise
Create a different template for another use case, such as a product description or a thank-you note. Add more variables to make it flexible.

---

## Lab 4: Using Output Parsers - DateTime

This lab shows how to parse model outputs into structured formats, starting with datetime.

### Objective
- Use DatetimeOutputParser to convert text to datetime objects
- Format instructions and prompts for the parser
- Parse the response into a Python datetime object

### Implementation

```python
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain.output_parsers import DatetimeOutputParser

# Initialize the LLM
llm = ChatGroq(model="llama3-8b-8192")

# Create a datetime parser
parser_dateTime = DatetimeOutputParser()

# Create a template with format instructions
prompt_dateTime = PromptTemplate.from_template(
    template="Answer the question.\n{format_instructions}\n{question}",
    input_variables=["question"],
    partial_variables={"format_instructions": parser_dateTime.get_format_instructions()}
)

# Generate the prompt and get response
prompt_value = prompt_dateTime.invoke({"question": "When was the iPhone released"})
response = llm.invoke(prompt_value)
print(response.content)

# Parse the response into a datetime object
returned_object = parser_dateTime.parse(response.content)
print(type(returned_object))
print(returned_object)
```

### Expected Output
- A formatted datetime string: `2007-06-29T19:00:00.000000Z`
- Confirmation that it's a datetime object: `<class 'datetime.datetime'>`
- The datetime object itself

### Exercise
Try asking for different historical dates and observe the parser's accuracy.

---

## Lab 5: Using Output Parsers - Lists

This lab explores parsing responses into list formats.

### Objective
- Use CommaSeparatedListOutputParser to create lists
- Format instructions for list parsing
- Convert model text output to Python list

### Implementation

```python
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain.output_parsers import CommaSeparatedListOutputParser

# Initialize the LLM
llm = ChatGroq(model="llama3-8b-8192")

# Create a list parser
parser_list = CommaSeparatedListOutputParser()

# Create a template with format instructions
prompt_list = PromptTemplate.from_template(
    template="Answer the question.\n{format_instructions}\n{question}",
    input_variables=["question"],
    partial_variables={"format_instructions": parser_list.get_format_instructions()},
)

# Generate the prompt and get response
prompt_value = prompt_list.invoke({"question": "List 4 chocolate brands"})
response = llm.invoke(prompt_value)
print(response.content)

# Parse the response into a list
returned_object = parser_list.parse(response.content)
print(type(returned_object))
print(returned_object)
```

### Expected Output
- A comma-separated list of chocolate brands: `Nestle, Lindt, Ghirardelli, Hershey`
- Confirmation that it's a list: `<class 'list'>`
- The list itself: `['Nestle', 'Lindt', 'Ghirardelli', 'Hershey']`

### Exercise
Try different list requests, such as countries, car brands, or programming languages.

---

## Lab 6: Using Pydantic for Structured Output

This lab demonstrates using Pydantic to create complex structured outputs.

### Objective
- Define a Pydantic model for the output structure
- Use PydanticOutputParser to parse responses
- Access structured data from the response

### Implementation

```python
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field

# Initialize the LLM
llm = ChatGroq(model="llama3-8b-8192")

# Define a Pydantic model
class Author(BaseModel):
    name: str = Field(description="The name of the author")
    number: int = Field(description="The number of books written by the author")
    books: list[str] = Field(description="The list of books they wrote")

# Create a Pydantic parser
output_parser = PydanticOutputParser(pydantic_object=Author)

# Create a template with format instructions
prompt_list = PromptTemplate.from_template(
    template="Answer the question.\n{format_instructions}\n{question}",
    input_variables=["question"],
    partial_variables={"format_instructions": output_parser.get_format_instructions()},
)

# Generate the prompt and get response
prompt_value = prompt_list.invoke({"question": "Generate the books written by Dan Brown"})
response = llm.invoke(prompt_value)
print(response.content)

# Parse the response into a Pydantic object
returned_object = output_parser.parse(response.content)
print(f"{returned_object.name} wrote {returned_object.number} books.")
print(returned_object.books)
```

### Expected Output
- A structured JSON-like response with author details
- A formatted statement: `Dan Brown wrote 18 books.`
- A list of book titles by Dan Brown

### Exercise
Create a different Pydantic model for another entity, such as a Movie or Product class.

---

## Lab 7: Simplified Structured Output

This lab shows the simplified approach to structured output using with_structured_output().

### Objective
- Use the with_structured_output() method for simpler structured outputs
- Compare with the traditional Pydantic parser approach
- Access structured data from the response

### Implementation

```python
from langchain_groq import ChatGroq
from pydantic import BaseModel, Field

# Initialize the LLM
llm = ChatGroq(model="llama3-8b-8192")

# Define a Pydantic model
class Author(BaseModel):
    name: str = Field(description="The name of the author")
    number: int = Field(description="The number of books written by the author")
    books: list[str] = Field(description="The list of books they wrote")

# Use with_structured_output for simplicity
structured_llm = llm.with_structured_output(Author)
returned_object = structured_llm.invoke("Generate the books written by Dan Brown")

# Access the structured data
print(f"{returned_object.name} wrote {returned_object.number} books.")
print(returned_object.books)
```

### Expected Output
- A formatted statement: `Dan Brown wrote 17 books.`
- A list of book titles by Dan Brown

### Exercise
Try with a different author or modify the Author model to include additional fields like genre or publication years.

---

## Lab 8: Building a Simple LLM Chain

This lab introduces the concept of chaining operations using LCEL (LangChain Expression Language).

### Objective
- Create a simple chain for sentiment analysis
- Understand the pipeline operator (|) for chaining
- Parse and use the output

### Implementation

```python
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Initialize the LLM
llm = ChatGroq(model="llama-3.1-8b-instant")

# Create a sentiment analysis template
sentiment_template = PromptTemplate(
    input_variables=["feedback"],
    template="Determine the sentiment of this feedback and reply in one word as either 'Positive', 'Neutral', or 'Negative':\n\n{feedback}"
)

# Sample feedback
user_feedback = "The delivery was late, and the product was damaged when it arrived. However, the customer support team was very helpful in resolving the issue quickly."

# Create and execute the chain
chain = sentiment_template | llm | StrOutputParser()
feedback_sentiment = chain.invoke({"feedback": user_feedback})

print(feedback_sentiment)
```

### Expected Output
The sentiment classification: `Neutral` (or possibly `Negative` depending on the model's interpretation)

### Exercise
Try with different feedback examples that are clearly positive or negative to see how the model classifies them.

---

## Lab 9: Advanced Chains with Multiple Steps

This lab expands on chaining by creating a more complex workflow with multiple steps.

### Objective
- Create multiple stages in a chain
- Use RunnableLambda for data transformation
- Process feedback through multiple stages

### Implementation

```python
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.schema.runnable import RunnableLambda

# Initialize the LLM
llm = ChatGroq(model="llama-3.1-8b-instant")

# Create templates for each stage
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

# Create lambda functions to format outputs
format_parsed_output = RunnableLambda(lambda output: {"parsed_feedback": output})
format_summary_output = RunnableLambda(lambda output: {"feedback": output})

# Sample feedback
user_feedback = "The delivery was late, and the product was damaged when it arrived. However, the customer support team was very helpful in resolving the issue quickly."

# Create and execute the chain
chain = parse_template | llm | format_parsed_output | summary_template | llm | format_summary_output | sentiment_template | llm | StrOutputParser()
feedback_sentiment = chain.invoke({"raw_feedback": user_feedback})

print(feedback_sentiment)
```

### Expected Output
The sentiment classification after processing through multiple stages: `Positive` (interpretation may vary)

### Exercise
Break down the chain and print intermediate results to understand what happens at each stage.

---

## Lab 10: Conditional Routing in Chains

This lab demonstrates how to implement conditional logic in chains to generate different responses based on sentiment.

### Objective
- Create response templates for different sentiment outcomes
- Implement a routing function for conditional logic
- Generate appropriate responses based on feedback sentiment

### Implementation

```python
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.schema.runnable import RunnableLambda

# Initialize the LLM
llm = ChatGroq(model="llama-3.1-8b-instant")

# Create templates for parsing and sentiment analysis
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

# Create response templates based on sentiment
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

# Create chains for each response type
thankyou_chain = thankyou_template | llm | StrOutputParser()
details_chain = details_template | llm | StrOutputParser()
apology_chain = apology_template | llm | StrOutputParser()

# Define routing function
def route(info):
    if "positive" in info['sentiment'].lower():
        return thankyou_chain
    elif "negative" in info['sentiment'].lower():
        return apology_chain
    else:
        return details_chain

# Sample feedback
user_feedback = "The delivery was late, and the product was damaged when it arrived. However, the customer support team was very helpful in resolving the issue quickly."

# Format output function
format_parsed_output = RunnableLambda(lambda output: {"parsed_feedback": output})

# Create summary and sentiment chains
summary_chain = parse_template | llm | format_parsed_output | summary_template | llm | StrOutputParser()
sentiment_chain = sentiment_template | llm | StrOutputParser()

# Get summary and sentiment
summary = summary_chain.invoke({'raw_feedback': user_feedback})
sentiment = sentiment_chain.invoke({'feedback': summary})

print("The summary of the user's message is:", summary)
print("The sentiment was classified as:", sentiment)

# Apply conditional routing
full_chain = {"feedback": lambda x: x['feedback'], 'sentiment': lambda x: x['sentiment']} | RunnableLambda(route)
response = full_chain.invoke({'feedback': summary, 'sentiment': sentiment})
print("\nGenerated response:")
print(response)
```

### Expected Output
- Summary of the feedback
- Sentiment classification
- An appropriate response message based on the sentiment (likely an apology or details request for the given example)

### Exercise
Try different feedback scenarios to ensure all three response types are triggered.

---

## Lab 11: Creating and Using Tools in LangChain

This lab introduces creating and using tools that LLMs can call to perform specific functions.

### Objective
- Define a tool using the @tool decorator
- Understand tool properties and invocation
- Manually invoke tools with arguments

### Implementation

```python
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
    
# Print tool information
print("Tool name:", calculate_discount.name)
print("Tool description:", calculate_discount.description)
print("Tool args:", calculate_discount.args)

# Invoke the tool directly
result = calculate_discount.invoke({"price": 100, "discount_percentage": 15})
print("Final price after 15% discount on $100:", result)
```

### Expected Output
- Tool metadata information
- The calculated discount result: `85.0`

### Exercise
Create another tool for a different calculation, such as tax calculation or shipping cost estimation.

---

## Lab 12: Tool Calling with LLMs

This lab demonstrates how LLMs can automatically decide when to use available tools.

### Objective
- Bind tools to an LLM
- Observe how the LLM decides when to use tools
- Extract and use tool calls from the LLM's response

### Implementation

```python
from langchain_groq import ChatGroq
from langchain_core.tools import tool

# Initialize the LLM
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
    
# Bind the tool to the LLM
llm_with_tools = llm.bind_tools([calculate_discount])

# Test with a non-tool query
hello_world = llm_with_tools.invoke("Hello world!")
print("Response to hello world:", hello_world.content, '\n')

# Test with a query that should trigger the tool
result = llm_with_tools.invoke("What is the price of an item that costs $100 after a 20% discount?")
print("Tool calls:", result.tool_calls)

# Use the tool call arguments to execute the tool
if result.tool_calls:
    args = result.tool_calls[0]['args']
    tool_result = calculate_discount.invoke(args)
    print("Calculated result:", tool_result)
    
    # Create a complete response
    final_response = llm.invoke(f"The price of an item that costs $100 after a 20% discount is ${tool_result}.")
    print("\nFinal response:", final_response.content)
```

### Expected Output
- Regular response to "Hello world!"
- Tool call information for the discount question
- Calculated result: `80.0`
- A natural language response incorporating the calculated result

### Exercise
Create a more complex scenario with multiple tools and queries that might trigger different tools.