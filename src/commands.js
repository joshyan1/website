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
│   └── portfolio.md
├── work/
│    └── ollama
├── about.md
└── contact.md`,
    chat: `under construction...`,
    resume: `|\x1b]8;;mailto:j49yan@uwaterloo.ca\x1b\\j49yan@uwaterloo.ca\x1b]8;;\x1b\\ | \x1b]8;;https://www.linkedin.com/in/joshyan1\x1b\\linkedin:joshyan1\x1b]8;;\x1b\\ | \x1b]8;;https://github.com/joshyan1\x1b\\github:joshyan1\x1b]8;;\x1b\\
|
|skills
|languages: golang, python, javascript, sql, c++, c, java
|frameworks: postgresql, django, gin, flask, react, tailwind, htmx, nextjs, node
|tools: aws, git, docker, google cloud, postman, figma, jupyter notebook
|
|education
|university of waterloo                                            sept 2023 - present
|bachelor of computer science
|
|experience
|ollama                                                             may 2024 - present
|software engineer intern                                         
|• implemented multilingual support for input and display in ollama’s cli, enhancing 
|  accessibility for over 50% of users
|• displayed vision model metadata and cached layer information on ollama.com 
|  resulting in 70% faster loads
|• developed a search engine end-to-end to enhance model discovery using full-text 
|  search and advanced filters. leveraged tailwind, javascript, and htmx for search
|  page design and optimized search logic in sql
|• optimized model creation for local users by short-circuiting blob uploads, 
|  reducing file transfer times by 50%
|
|projects
|skyline                                                            june 2024 - present
|• created a multi-agent based city simulation of la to model daily population 
|  movement and optimize transit routes, reducing travel time and carbon expenditure. 
|  grand finalist at 2024 berkeley ai hackathon
|• concurrently generated 500+ unique interactive agents with personalized schedules 
|  using census data, population densities, and chain-of-thought reasoning with 
|  mistral. mapped agent actions to simulate daily movement within a city
|• developed a websocket api in flask to simultaneously stream agent locations and 
|  transportation routes
|
|personal website                                                   july 2024 - present
|• built a terminal emulator and chatbot portfolio website using react
|• fine-tuned a llama3 model on myself using mlx and hosted on ollama to mimic
|  real-time user conversation and provide personal information
|
|timetable maker                                                   may 2023 - june 2023
|• developed a python script to automate the generation of a full year’s schedule 
|  given student course requests and class constraints for school administration
|• produced thousands of schedule permutations in under 3 minutes, saving admin 30 
|  hours of schedule processing
|• created a final school schedule matching 98% of students to 6 class requests or 
|  more using my highschool's 2023/24 course forms
`,
};

const contactMe = `contact me!

email:      jyan00017@gmail.com
            j49yan@uwaterloo.ca
linkedin:   \x1b]8;;https://www.linkedin.com/in/joshyan1\x1b\\joshyan1\x1b]8;;\x1b\\
github:     \x1b]8;;https://github.com/joshyan1\x1b\\joshyan1\x1b]8;;\x1b\\
x:          \x1b]8;;https://twitter.com/josh1yan\x1b\\josh1yan\x1b]8;;\x1b\\
beli:       chefjoshua`;

const aboutMe = `hi! i'm josh
        
i'm a cs student at waterloo (1B) and am currently updating READMEs for \x1b]8;;https://ollama.com/\x1b\\ollama\x1b]8;;\x1b\\
i like playing badminton, going to the gym, and eating food

use \`chat\` to learn more and \`cat contact\` to find my socials`;

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

i'm currently a software engineer intern at ollama`;

export const fileSystem = {
    '~': {
        'about.md': aboutMe,
        'projects': {
            'skyline.md': skyline,
            'portfolio.md': portfolio
        },
        'work': {
            'ollama.md': ollama
        },
        'contact.md': contactMe,
    }
};
