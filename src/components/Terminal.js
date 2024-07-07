import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
    const terminalRef = useRef(null);

    useEffect(() => {
        const terminal = new Terminal({
            theme: {
                background: '#000000',
                foreground: '#ffffff',
                cursor: '#ffffff',
                selection: '#ffffff'
            },
            cursorBlink: true
        });

        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);

        terminal.open(terminalRef.current);
        fitAddon.fit();

        const commands = {
            help: 'Available commands: help, about, projects, contact, ls, cd, cat',
            about: 'I am a passionate developer...',
            projects: 'Project 1, Project 2, Project 3',
            contact: 'Email: example@example.com'
        };

        const fileSystem = {
            '/': {
                'about.txt': 'I am a passionate developer...',
                'projects': {
                    'project1.txt': 'Details about project 1...',
                    'project2.txt': 'Details about project 2...'
                },
                'contact.txt': 'Email: example@example.com'
            }
        };

        let currentDirectory = '/';

        const resolvePath = (path) => {
            const parts = path.split('/');
            let current = fileSystem;
            for (const part of parts) {
                if (part && current[part]) {
                    current = current[part];
                } else {
                    return null;
                }
            }
            return current;
        };

        const handleCommand = (input) => {
            const [command, ...args] = input.trim().split(' ');

            switch (command) {
                case 'help':
                    terminal.writeln(commands.help);
                    break;
                case 'about':
                    terminal.writeln(commands.about);
                    break;
                case 'projects':
                    terminal.writeln(commands.projects);
                    break;
                case 'contact':
                    terminal.writeln(commands.contact);
                    break;
                case 'ls':
                    const dir = args[0] ? resolvePath(args[0]) : resolvePath(currentDirectory);
                    if (dir && typeof dir === 'object') {
                        terminal.writeln(Object.keys(dir).join(' '));
                    } else {
                        terminal.writeln(`ls: cannot access '${args[0]}': No such file or directory`);
                    }
                    break;
                case 'cat':
                    const file = resolvePath(currentDirectory + '/' + args[0]);
                    if (file && typeof file === 'string') {
                        terminal.writeln(file);
                    } else {
                        terminal.writeln(`cat: ${args[0]}: No such file or directory`);
                    }
                    break;
                default:
                    terminal.writeln(`${command}: command not found`);
            }
        };

        terminal.onData(e => {
            if (e.charCodeAt(0) === 13) { // Enter key
                handleCommand(terminal.buffer.active.getLine(terminal.buffer.active.baseY + terminal.buffer.active.cursorY).translateToString(true));
                terminal.prompt();
            } else if (e.charCodeAt(0) === 127) { // Backspace key
                if (terminal.buffer.active.cursorX > 2) {
                    terminal.write('\b \b');
                }
            } else {
                terminal.write(e);
            }
        });

        terminal.prompt = () => {
            terminal.write('\r\n$ ');
        };

        terminal.prompt();
    }, []);

    return (
        <div className="w-full h-full flex justify-left items-center bg-black text-white">
            <div id="terminal-container" className="w-full h-full" ref={terminalRef}></div>
        </div>
    );
};

export default TerminalComponent;
