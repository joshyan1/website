// commands.js

export const motd = "welcome to my website. type 'help' to see available commands and 'chat' to chat with me!";

export const commands = {
    help: `here's how to use my website:

help    display this help message
ls      list files in the current directory
cd      change directory
cat     display file contents
tree    display file system structure
chat    chat with me!
`,
    tree: `home
├── about
├── contact
├── projects/
│   ├── skyline
│   └── portfolio
└── work/
    └── ollama
`,
    chat: `under construction...`,
};

const contactMe = `contact me!

email:      jyan00017@gmail.com
            j49yan@uwaterloo.ca
linkedin:   \x1b]8;;https://www.linkedin.com/in/joshyan1\x1b\\joshyan1\x1b]8;;\x1b\\
github:     \x1b]8;;https://github.com/joshyan1\x1b\\joshyan1\x1b]8;;\x1b\\
x:          \x1b]8;;https://twitter.com/josh1yan\x1b\\josh1yan\x1b]8;;\x1b\\
beli:       chefjoshua
`;

const aboutMe = `hi! i'm josh
        
i'm a cs student at waterloo (1B) and am currently updating READMEs for \x1b]8;;https://ollama.com/\x1b\\ollama\x1b]8;;\x1b\\
i like playing badminton, going to the gym, and eating food

use \`chat\` to learn more and \`contact\` to find my socials
`;

const skyline = `multi-agent based city simulation software          \x1b]8;;https://github.com/ishaan1013/skyline\x1b\\github\x1b]8;;\x1b\\    \x1b]8;;https://devpost.com/software/skyline-ywc8r6/\x1b\\devpost\x1b]8;;\x1b\\
-- nextjs flask python

skyline is a project that leverages agents to simulate people in a city started during the 2024 berkeley ai hackathon. 
we finished as grand finalists and got invited to \x1b]8;;https://x.com/_rajanagarwal/status/1805144595627675950\x1b\\dinner with andrej karpathy!\x1b]8;;\x1b\\.
we are currently working on a new version of skyline with a more advanced agent-based model and a more realistic city simulation.
stay up to date @ \x1b]8;;https://github.com/ishaan1013/skyline\x1b\\our website\x1b]8;;\x1b\\
`;

const portfolio = `terminal emulator and chatbot portfolio website     \x1b]8;;https://github.com/joshyan1/website\x1b\\github\x1b]8;;\x1b\\
-- react

i made a portfolio website (that you're on right now!) in the form of a terminal (because i used the terminal a lot at work).
use \`chat\` to talk to me (but fine-tuned on conversation) and use the commands to navigate the website.
`;

const ollama = `run llms locally                                    \x1b]8;;https://ollama.com/\x1b\\ollama.com\x1b]8;;\x1b\\   \x1b]8;;https://github.com/ollama/ollama\x1b\\github\x1b]8;;\x1b\\
-- golang

i'm currently a software engineer intern at ollama
`;

export const fileSystem = {
    '~': {
        'about': aboutMe,
        'projects': {
            'skyline': skyline,
            'portfolio': portfolio
        },
        'work': {
            'ollama': ollama
        },
        'contact': contactMe
    }
};
