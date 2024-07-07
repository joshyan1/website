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
                case 'tree':
                    terminalInstance.current.write(commands.tree.replace(/\n/g, '\r\n'));
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
                    const newDir = args[0] ? resolveLs(args[0]) : fileSystem['~'];
                    if (args[0] === '..') {
                        if (currentDirectory === '~') {
                            terminalInstance.current.writeln(`cd: sorry, you can't go back any further`);
                            break
                        }
                        currentDirectory = currentDirectory.split('/').slice(0, -1).join('/');
                        curDirDisplay = currentDirectory.split('/').pop();
                        terminalInstance.current.prompt();
                    } else if (newDir && typeof newDir === 'object') {
                        currentDirectory = args[0] ? currentDirectory + '/' + args[0] : '~';
                        curDirDisplay = currentDirectory.split('/').pop();
                        terminalInstance.current.prompt();
                    } else {
                        terminalInstance.current.writeln(`cd: ${args[0]} :no such directory`);
                    }
                    break;
                case 'cat':
                    const file = resolvePath(currentDirectory + '/' + args[0]);
                    console.log(file)
                    if (file && typeof file === 'string') {
                        terminalInstance.current.writeln(file.replace(/\n/g, '\r\n'));
                    } else {
                        terminalInstance.current.writeln(`cat: ${args[0]}: no such file`);
                    }
                    break;
                default:
                    terminalInstance.current.writeln(`${command}: command not found`);
            }
        };

        terminalInstance.current.onData(e => {
            const cursorX = terminalInstance.current.buffer.active.cursorX;
            const lenPrompt = lengthOfPrompt(); // Replace with your actual prompt length
            const inputLength = terminalInstance.current.buffer.active.getLine(terminalInstance.current.buffer.active.baseY + terminalInstance.current.buffer.active.cursorY).translateToString(true).length - lenPrompt;

            console.log(inputLength, lenPrompt)
            // Handle Enter key
            if (e.charCodeAt(0) === 13) { // Enter key
                handleCommand(terminalInstance.current.buffer.active.getLine(terminalInstance.current.buffer.active.baseY + terminalInstance.current.buffer.active.cursorY).translateToString(true));
                terminalInstance.current.prompt();
            }
            // Handle Backspace key
            else if (e.charCodeAt(0) === 127) { // Backspace key
                if (cursorX > lenPrompt) {
                    terminalInstance.current.write('\b \b');
                }
            }
            // Handle Left Arrow key
            else if (e.charCodeAt(0) === 27 && e.charAt(1) === '[' && e.charAt(2) === 'D') { // Left arrow key
                if (cursorX > lenPrompt) {
                    terminalInstance.current.write(e);
                }
            }
            // Handle Right Arrow key
            else if (e.charCodeAt(0) === 27 && e.charAt(1) === '[' && e.charAt(2) === 'C') { // Right arrow key
                if (cursorX < lenPrompt + inputLength) {
                    terminalInstance.current.write(e);
                }
            }
            // Handle Up and Down Arrow keys
            else if (e.charCodeAt(0) === 27 && e.charAt(1) === '[' && (e.charAt(2) === 'A' || e.charAt(2) === 'B')) {
                // Do nothing for now
            }
            // Handle other keys
            else {
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
