import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
    const terminalRef = useRef(null);
    const terminalInstance = useRef(null);
    const fitAddonRef = useRef(null);
    const motd = "Welcome to my portfolio website. Type 'help' to see available commands."

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

        const commands = {
            help: `Here's how to use my website:

help    Display this help message
ls      List files in the current directory
cd      Change directory
cat     Display file contents
struct  Display file system structure
`,
            struct: `home
├── about
├── chat
├── contact
├── projects/
│   ├── skyline
│   └── portfolio
└── work/
    └── ollama
`
        };

        const fileSystem = {
            '/': {
                'about.txt': 'I am a passionate developer...',
                'projects': {
                    'project1.txt': 'Details about project 1...',
                    'project2.txt': 'Details about project 2...'
                },
                'work': {
                    'ollama': 'I work'
                },
                'contact.txt': 'Email: example@example.com'
            }
        };

        let currentDirectory = '/';

        const resolvePath = (path) => {
            const parts = path.split('/');
            const cur = currentDirectory.split('/')

            console.log(cur)
            let current = fileSystem['/'];
            for (const part of cur) {
                console.log(current)
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
        };

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
                    const dir = args[0] ? resolvePath(args[0]) : resolvePath(currentDirectory);
                    console.log(dir)
                    if (dir && typeof dir === 'object') {
                        terminalInstance.current.writeln(Object.keys(dir).join(' '));
                    } else {
                        terminalInstance.current.writeln(`ls: cannot access '${args[0]}': No such file or directory`);
                    }
                    break;
                case 'cd':
                    const newDir = args[0] ? resolvePath(args[0]) : resolvePath(currentDirectory);
                    if (newDir && typeof newDir === 'object') {
                        currentDirectory = args[0] ? currentDirectory + args[0] : '/';
                        terminalInstance.current.prompt();
                    } else {
                        terminalInstance.current.writeln(`cd: no such file or directory: ${args[0]}`);
                    }
                    break;
                case 'cat':
                    const file = resolvePath(currentDirectory + '/' + args[0]);
                    if (file && typeof file === 'string') {
                        terminalInstance.current.writeln(file);
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
                if (terminalInstance.current.buffer.active.cursorX > 28) {
                    terminalInstance.current.write('\b \b');
                }
            } else {
                terminalInstance.current.write(e);
            }
        });

        terminalInstance.current.prompt = () => {
            terminalInstance.current.write('\rvisitor@joshyanwebsite: ' + ((currentDirectory === '/') ? '~' : currentDirectory) + ' % ');
        };

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
