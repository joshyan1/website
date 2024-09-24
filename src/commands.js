// commands.js

export const motd = "welcome to my website. type 'help' to see available commands and 'chat' to chat with me!";

export const commands = {
    help: `here's how to use my website:

help    display this help message
ls      list files in the current directory
cd      change directory
cat     display file contents
tree    display file system structure
resume  see my (condensed) resume
chat    chat with me!`,
    tree: `home/
├── projects/
│   ├── skyline.md
│   ├── portfolio.md
│   └── stealth-startup.md
├── work/
│    ├── ollama.md
│    ├── 8vc.md
│    └── loop.md
├── about.md
└── contact.md`,
    chat: `under construction...`,
    resume: `|\x1b]8;;mailto:j49yan@uwaterloo.ca\x1b\\j49yan[at]uwaterloo.ca\x1b]8;;\x1b\\ | \x1b]8;;https://www.linkedin.com/in/joshyan1\x1b\\linkedin:joshyan1\x1b]8;;\x1b\\ | \x1b]8;;https://github.com/joshyan1\x1b\\github:joshyan1\x1b]8;;\x1b\\
|
|skills
|languages: golang, python, javascript, sql, c++, c, java
|frameworks: pytorch, postgresql, django, gin, flask, react, tailwind, htmx, nextjs
|
|education
|\x1b]8;;https://uwaterloo.ca/\x1b\\university of waterloo\x1b]8;;\x1b\\                                             sep 2023 - present
|bachelor of computer science
|
|experience
|\x1b]8;;https://loop.com/\x1b\\loop\x1b]8;;\x1b\\                                                                             soon
|incoming ml engineer intern
|
|\x1b]8;;https://ollama.com/\x1b\\ollama\x1b]8;;\x1b\\                                                            may 2024 - aug 2024
|software engineer intern                                         
|• architected inference support for google’s paligemma in C/C++ demoed capabilities 
|  to 200+ researchers and engineers at google sf
|• built a model creation pipeline, optimizing model importing by reducing
|  out-of-memory errors and model create times by 75%.
|• developed a search engine end-to-end to enhance model discovery using full-text 
|  search and advanced filters with tailwind, sql, and go
|• enhanced accessibility for 600,000+ users by introducing multilingual support 
|  for input and display in cli
|
|\x1b]8;;https://www.8vc.com/fellows/josh-yan\x1b\\8vc\x1b]8;;\x1b\\                                                                 may 2024 - present
|engineering fellow
|• 1 of 31 fellows selected to explore 8vc’s ventures with palantir co-founder joe 
|  lonsdale
|
|projects
|skyline                                                             jun 2024 - present
|• created a simulation of la with 500+ agents using census data and chain of thought 
|  reasoning to model population movement. grand-finalist at 2024 berkeley ai hackathon
|• built a scalable websocket api in flask, leveraging concurrency to generate, 
|  structure, and stream agent and transit routes to a next.js frontend
|
|stealth startup                                                               sep 2024
|• engineered an llm-based agentic framework for simulating a startup with autonomous 
|  agents capable of code generation, discussion, and research through external tools
|
|personal website                                                    jul 2024 - present
|• built a terminal emulator and chatbot portfolio website using react
|• fine-tuned a llama3 model on myself using mlx and hosted on ollama to mimic
|  real-time user conversation and provide personal information
`,
};

const contactMe = `contact me!

email:      jyan00017[at]gmail.com
            j49yan[at]uwaterloo.ca
linkedin:   \x1b]8;;https://www.linkedin.com/in/joshyan1\x1b\\joshyan1\x1b]8;;\x1b\\
github:     \x1b]8;;https://github.com/joshyan1\x1b\\joshyan1\x1b]8;;\x1b\\
x:          \x1b]8;;https://twitter.com/josh1yan\x1b\\josh1yan\x1b]8;;\x1b\\
beli:       chefjoshua`;

const aboutMe = `hi! i'm josh
        
i'm a cs student at waterloo (2A) and am currently struggling through class, job applications, 
and cooking for myself. i previously interned at \x1b]8;;https://ollama.com/\x1b\\ollama\x1b]8;;\x1b\\ where i did some pretty cool
ml and infrastructure stuff. please checkout my work directory for more info!

i also like playing badminton, going to the gym, and eating food

use \`chat\` to learn more and \`cat contact.md\` to find my socials`;

const skyline = `multi-agent based city simulation software          
|─ \x1b]8;;https://github.com/ishaan1013/skyline\x1b\\github\x1b]8;;\x1b\\  \x1b]8;;https://devpost.com/software/skyline-ywc8r6/\x1b\\devpost\x1b]8;;\x1b\\
|─ nextjs  flask  python

skyline is a project that leverages agents to simulate people in a city started during the 2024 berkeley ai hackathon. 
we finished as grand finalists (top 8 of 290+ teams) and got invited to \x1b]8;;https://x.com/_rajanagarwal/status/1805144595627675950\x1b\\dinner with andrej karpathy!\x1b]8;;\x1b\\.
we are currently working on a new version of skyline with a more advanced agent-based model and a more realistic city simulation.
stay up to date @ \x1b]8;;https://github.com/ishaan1013/skyline\x1b\\our website\x1b]8;;\x1b\\`;

const portfolio = `terminal emulator and chatbot portfolio website     
|─ \x1b]8;;https://github.com/joshyan1/website\x1b\\github\x1b]8;;\x1b\\
|─ react

i made a portfolio website (that you're on right now!) in the form of a terminal (because i used the terminal a lot at work).
use \`chat\` to talk to me (but fine-tuned on conversation) and use the commands to navigate the website.`;

const ollama = `run llms locally                                    
|─ \x1b]8;;https://ollama.com/\x1b\\ollama.com\x1b]8;;\x1b\\ \x1b]8;;https://github.com/ollama/ollama\x1b\\github\x1b]8;;\x1b\\
|─ golang  c++  htmx  tailwind  sql

i was a software engineer intern at ollama during summer 24'. i worked on ml infrastructure and backend development. 
my coolest moment of the summer was presenting my implementation inference of paligemma, google's open source vlm,
to google researchers and engineers in SF. i also optimized model creation and got to explore the startup life!`;

const loop = `automating supply chains
|- \x1b]8;;https://www.loop.com/\x1b\\loop.com\x1b]8;;\x1b\\
|- python 

incoming ml engineer intern at loop`;

const stealthStartup = `ai running an ai startup
|─ \x1b]8;;https://github.com/rajansagarwal/stealth-startup\x1b\\github\x1b]8;;\x1b\\
|─ python

stealth startup is an agentic framework leveraging llm-based agents to simulate the essential people in a startup. we created 
a variety of agents able to reason about their own actions through internal models and interact with each other through a slack
channel to coordinate and develop their startup. we developed agents to have individual capabilities: one of our coolest agents
is our cto, which leverages groq and llama3.1 for code generation, iterating upon the codebase and pushing diffs to github. 
check out our github and website for a more in-depth look!`;

const eightVC = `engaging in venture capital
|─ \x1b]8;;https://www.8vc.com/fellows/josh-yan\x1b\\fellowship\x1b]8;;\x1b\\

i was 1 of 31 fellows selected to participate in the 8vc fellowship program, a 12-week program that exposes students to venture 
capital, start ups, and emerging tech. i had the opportunity to work with and meet a variety of incredible founders, students, 
and investors like joe lonsdale.`;

export const fileSystem = {
    '~': {
        'about.md': aboutMe,
        'projects': {
            'skyline.md': skyline,
            'portfolio.md': portfolio,
            'stealth-startup.md': stealthStartup,
        },
        'work': {
            'ollama.md': ollama,
            '8vc.md': eightVC,
            'loop.md': loop,
        },
        'contact.md': contactMe,
    }
};
