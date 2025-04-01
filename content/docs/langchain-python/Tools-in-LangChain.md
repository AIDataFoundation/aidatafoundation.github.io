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
Tools unlock the full potential of LangCh



