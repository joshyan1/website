import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

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
            const [user, location, start, command, ...args] = input.trim().split(' ');
            console.log(user, location, start, command, args);

            switch (command) {
                case 'help':
                    terminalInstance.current.writeln(commands.help);
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
                    if (dir && typeof dir === 'object') {
                        terminalInstance.current.writeln(Object.keys(dir).join(' '));
                    } else {
                        terminalInstance.current.writeln(`ls: cannot access '${args[0]}': No such file or directory`);
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
            terminalInstance.current.write('\r\nvisitor@joshyanwebsite: ' + ((currentDirectory === '/') ? '~' : currentDirectory) + ' % ');
        };

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
            <div id="terminal-container" className="w-full h-full pl-2 text-left" ref={terminalRef}></div>
        </div>
    );
};

export default TerminalComponent;
