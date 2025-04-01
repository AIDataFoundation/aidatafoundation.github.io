Parsing Outputs with LangChain

LLMs typically provide a string of text as an output. However, when creating an LLM-powered application, we might need a more structured and formatted output that provides us with concise information rather than reading the complete response.



Lab 1 - Promt Templating and parcing date and time 


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

