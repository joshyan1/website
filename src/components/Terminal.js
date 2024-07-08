import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { commands, fileSystem, motd } from '../commands';

const TerminalComponent = () => {
    const terminalRef = useRef(null);
    const terminalInstance = useRef(null);
    const fitAddonRef = useRef(null);
    const inputBuffer = useRef('');
    const inputHist = useRef([]);
    const histIndex = useRef(0);
    const tempInput = useRef('');

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
            const [command, ...args] = input.trim().split(' ');

            // Newline
            terminalInstance.current.writeln('');
            switch (command) {
                case 'help':
                    terminalInstance.current.writeln(commands.help.replace(/\n/g, '\r\n'));
                    break;
                case 'tree':
                    terminalInstance.current.writeln(commands.tree.replace(/\n/g, '\r\n'));
                    break;
                case 'chat':
                    terminalInstance.current.writeln(commands.chat);
                    break;
                case 'ls':
                    const dir = args[0] ? resolveLs(args[0]) : resolveLs(null);
                    if (dir && typeof dir === 'object') {
                        terminalInstance.current.writeln(Object.keys(dir).join('  '));
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
                        terminalInstance.current.writeln(`cd: ${args[0]}: no such directory`);
                    }
                    break;
                case 'cat':
                    const file = resolvePath(currentDirectory + '/' + args[0]);
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
            const inputLength = inputBuffer.length;

            // Handle Enter key
            if (e.charCodeAt(0) === 13) { // Enter key
                if (inputBuffer.current.length === 0) {
                    terminalInstance.current.writeln('');
                    terminalInstance.current.prompt();
                    return;
                }
                handleCommand(inputBuffer.current);
                inputHist.current.push(inputBuffer.current);
                histIndex.current = histIndex.current + 1;
                inputBuffer.current = '';
                terminalInstance.current.prompt();
            }
            // Handle Backspace key
            else if (e.charCodeAt(0) === 127) { // Backspace key
                if (inputBuffer.current.length > 0) {
                    terminalInstance.current.write('\b \b');
                    inputBuffer.current = inputBuffer.current.slice(0, -1); // Remove last character from input buffer
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
            // Handle Up Arrow key
            else if (e.charCodeAt(0) === 27 && e.charAt(1) === '[' && e.charAt(2) === 'A') { // Up arrow key
                if (histIndex.current === inputHist.current.length) {
                    tempInput.current = inputBuffer.current;
                }
                if (histIndex.current > 0) {
                    histIndex.current--;
                    terminalInstance.current.write('\r\x1b[K');
                    terminalInstance.current.prompt();
                    terminalInstance.current.write(inputHist.current[histIndex.current]);
                    inputBuffer.current = inputHist.current[histIndex.current];
                }
            }
            // Handle Down Arrow key
            else if (e.charCodeAt(0) === 27 && e.charAt(1) === '[' && e.charAt(2) === 'B') { // Down arrow key
                if (histIndex.current < inputHist.current.length - 1) {
                    histIndex.current++;
                    terminalInstance.current.write('\r\x1b[K');
                    terminalInstance.current.prompt();
                    terminalInstance.current.write(inputHist.current[histIndex.current]);
                    inputBuffer.current = inputHist.current[histIndex.current];
                } else if (histIndex.current === inputHist.current.length - 1) {
                    histIndex.current++;
                    terminalInstance.current.write('\r\x1b[K');
                    terminalInstance.current.prompt();
                    terminalInstance.current.write(tempInput.current);
                    inputBuffer.current = tempInput.current;
                }
            }
            // Handle other keys
            else {
                terminalInstance.current.write(e);
                inputBuffer.current = inputBuffer.current + e // Remove last character from input buffer
            }
        });


        terminalInstance.current.prompt = () => {
            terminalInstance.current.write('\rguest@joshyan: ' + curDirDisplay + ' % ');
        };

        const lengthOfPrompt = () => {
            return 18 + curDirDisplay.length;
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
            <div id="terminal-container" className="w-full h-full pl-2 text-left leading-7 pt-2 autofocus" ref={terminalRef}></div>
        </div>
    );
};

export default TerminalComponent;
