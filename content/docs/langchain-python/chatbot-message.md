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

