import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { commands, fileSystem, motd } from '../commands';

const TerminalComponent = () => {
    const terminalRef = useRef(null);
    const terminalInstance = useRef(null);
    const fitAddonRef = useRef(null);

    useEffect(() => {
        if (terminalInstance.current) {
            return; // If terminal instance already exists, do not recreate
        }

        // Initialize Terminal and FitAddon
        terminalInstance.current = new Terminal({
            theme: {
                background: '#000000',
                foreground: '#ffffff',
                cursor: '#ffffff',
                selection: '#ffffff'
            },
            cursorBlink: true
        });

        fitAddonRef.current = new FitAddon();
        terminalInstance.current.loadAddon(fitAddonRef.current);

        // Open the terminal in the container
        terminalInstance.current.open(terminalRef.current);

        // Fit the terminal to the container size
        if (fitAddonRef.current) {
            fitAddonRef.current.fit();
        }

        /* const commands = {
            help: `here's how to use my website:

help    display this help message
ls      list files in the current directory
cd      change directory
cat     display file contents
struct  display file system structure
chat    chat with me!
`,
            struct: `home
├── about
├── contact
├── projects/
│   ├── skyline
│   └── portfolio
└── work/
    └── ollama
`
        };
        const contactMe = `contact me!
email:      jyan00017@gmail.com
            j49yan@uwaterloo.ca
linkedin:   \x1b]8;;https://www.linkedin.com/in/joshyan1\x1b\\joshyan1\x1b]8;;\x1b\\
github:     \x1b]8;;https://github.com/joshyan1\x1b\\joshyan1\x1b]8;;\x1b\\
x:          \x1b]8;;https://twitter.com/josh1yan\x1b\\josh1yan\x1b]8;;\x1b\\
beli:       chefjoshua`;

        const aboutMe = `hi! i'm josh
        
i'm a cs student at waterloo and am currently updating READMEs for \x1b]8;;https://ollama.com/\x1b\\ollama\x1b]8;;\x1b\\
i like playing badminton, going to the gym, and eating food

use \`chat\` to learn more`;

        const fileSystem = {
            '~': {
                'about': aboutMe,
                'projects': {
                    'skyline': 'Details about project 1...',
                    'portfolio': 'Details about project 2...'
                },
                'work': {
                    'ollama': 'I work at ollama, place to '
                },
                'contact': contactMe
            }
        }; */

        let currentDirectory = '~';
        let curDirDisplay = currentDirectory.split('/').pop();

        const resolvePath = (path) => {
            const parts = path.split('/');
            let current = fileSystem;
            for (const part of parts) {
                if (part && current[part]) {
                    current = current[part];
                } else if (!part) {
                    continue
                } else {
                    return null
                }
            }
            return current;
        };

        const resolveLs = (path) => {
            console.log(path)
            var parts = [];
            if (path != null) {
                parts = path.split('/')
            }

            const cur = currentDirectory.split('/')

            let current = fileSystem;
            for (const part of cur) {
                if (part && current[part]) {
                    current = current[part];
                } else if (!part) {
                    continue
                } else {
                    return null
                }
            }


            for (const part of parts) {
                if (part && current[part]) {
                    current = current[part];
                } else if (!part) {
                    continue
                } else {
                    return null
                }
            }
            return current;
        }

        const handleCommand = (input) => {
            const [user, location, start, command, ...args] = input.trim().split(' ');
            console.log(user, location, start, command, args)

            // Newline
            terminalInstance.current.writeln('');
            if (command == null) {
                return;
            }
            switch (command) {
                case 'help':
                    terminalInstance.current.write(commands.help.replace(/\n/g, '\r\n'));
                    break;
                case 'struct':
                    terminalInstance.current.write(commands.struct.replace(/\n/g, '\r\n'));
                    break;
                case 'about':
                    terminalInstance.current.writeln(commands.about);
                    break;
                case 'projects':
                    terminalInstance.current.writeln(commands.projects);
                    break;
                case 'contact':
                    terminalInstance.current.writeln(commands.contact);
                    break;
                case 'ls':
                    const dir = args[0] ? resolveLs(args[0]) : resolveLs(null);
                    if (dir && typeof dir === 'object') {
                        terminalInstance.current.writeln(Object.keys(dir).join(' '));
                    } else {
                        terminalInstance.current.writeln(`ls: cannot access '${args[0]}': No such file or directory`);
                    }
                    break;
                case 'cd':
                    const newDir = args[0] ? resolvePath(args[0]) : fileSystem['~'];
                    if (newDir && typeof newDir === 'object') {
                        currentDirectory = args[0] ? currentDirectory + '/' + args[0] : '~';
                        curDirDisplay = currentDirectory.split('/').pop();
                        terminalInstance.current.prompt();
                    } else {
                        terminalInstance.current.writeln(`cd: no such file or directory: ${args[0]}`);
                    }
                    break;
                case 'cat':
                    const file = resolvePath(currentDirectory + '/' + args[0]);
                    console.log(file)
                    if (file && typeof file === 'string') {
                        terminalInstance.current.writeln(file.replace(/\n/g, '\r\n'));
                    } else {
                        terminalInstance.current.writeln(`cat: ${args[0]}: No such file or directory`);
                    }
                    break;
                default:
                    terminalInstance.current.writeln(`${command}: command not found`);
            }
        };

        terminalInstance.current.onData(e => {
            if (e.charCodeAt(0) === 13) { // Enter key
                handleCommand(terminalInstance.current.buffer.active.getLine(terminalInstance.current.buffer.active.baseY + terminalInstance.current.buffer.active.cursorY).translateToString(true));
                terminalInstance.current.prompt();
            } else if (e.charCodeAt(0) === 127) { // Backspace key
                if (terminalInstance.current.buffer.active.cursorX > lengthOfPrompt()) {
                    terminalInstance.current.write('\b \b');
                }
            } else {
                terminalInstance.current.write(e);
            }
        });

        terminalInstance.current.prompt = () => {
            terminalInstance.current.write('\rvisitor@joshyanwebsite: ' + curDirDisplay + ' % ');
        };

        const lengthOfPrompt = () => {
            return 27 + curDirDisplay.length;
        }

        terminalInstance.current.writeln(motd + '\n');
        terminalInstance.current.prompt();

        // Cleanup function to dispose the terminal instance when component unmounts
        return () => {
            if (terminalInstance.current) {
                terminalInstance.current.dispose();
                terminalInstance.current = null;
            }
        };
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center bg-black text-white">
            <div id="terminal-container" className="w-full h-full pl-2 text-left leading-7 pt-2" ref={terminalRef}></div>
        </div>
    );
};

export default TerminalComponent;
