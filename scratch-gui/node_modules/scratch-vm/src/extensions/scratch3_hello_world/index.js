const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const Clone = require('../../util/clone');
const Color = require('../../util/color');
const formatMessage = require('format-message');
const MathUtil = require('../../util/math-util');
const RenderedTarget = require('../../sprites/rendered-target');
const log = require('../../util/log');
const StageLayering = require('../../engine/stage-layering');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==';

/**
 * Host for the Hello World extension in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3HelloWorldBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'helloWorld',
            name: formatMessage({
                id: 'helloWorld.categoryName',
                default: 'Hello World',
                description: 'Label for the hello world extension category'
            }),
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'hello',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'helloWorld.hello',
                        default: 'hello world!',
                        description: 'example extension block'
                    })
                },
                {
                    opcode: 'set_local_var',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'set_local_var',
                        default: 'Set variable [VAR_NAME] to value [VAR_VALUE]',
                        description: 'set a local variable'
                    }),
                    arguments: {
                        VAR_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'helloWorld.defaultVarNameValue',
                                default: 'foo',
                                description: 'The default variable name to be stored in localStorage.'
                            })
                        },
                        VAR_VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'helloWorld.defaultVarValue',
                                default: 'bar',
                                description: 'The default variable value to be stored in localStorage.'
                            })  
                        }
                    }
                },
                {
                    opcode: 'get_local_var',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'get_local_var',
                        default: 'Get value of local variable [VAR_NAME].',
                        description: 'get the value of a local variable'
                    }),
                    arguments: {
                        VAR_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'helloWorld.defaultVarNameValue',
                                default: 'foo',
                                description: 'The default variable name to be retrieved from localStorage.'
                            })
                        }
                    }
                }
            ],
            menus: {
                method: ['POST', 'GET']
            }
        };
    }

    /**
     * Something to do with cloning Targets using this extension.
     * @listens Runtime#event:targetWasCreated
     * @private
     */
    _onTargetCreated (newTarget, sourceTarget) {
        if (sourceTarget) {
            const helloWorldState = true;
        }  
    }

    /**
     * Example Block function
     */
    hello () {
        // This message contains ICU placeholders, not Scratch placeholders
        const message = formatMessage({
            id: 'hello.result',
            defaultMessage: 'Hello World!',
            description: 'Text for example block'
        });

        // Note: this implementation is not Unicode-clean; it's just here as an example.
        // const result = args.TEXT.charAt(args.LETTER_NUM);

        return "hello world!";
    }

    /*
     * Set a variable in local storage with the given name and value
     * @param {string} VAR_NAME - name of the variable in localStorage
     * @param {string} VAR_VALUE - value to be stored with the variable
     * returns {boolean} - true if the variable was set succesfully, false if some error occurred.
     */
    set_local_var(args) {
        try {
            localStorage.setItem(args.VAR_NAME, args.VAR_VALUE);
            return true;
        } catch(err) {
            console.log("local storage is not supported by your browser: " + err);
            return false;
        }
    }

    /*
     * Get the value of a variable from localStorage
     * @param {string} VAR_NAME - name of the variable to be read from localStorage
     * @returns {string} - value of the variable, or null if the variable doesn't exist
     */
    get_local_var(args) {
        if (localStorage.getItem(args.VAR_NAME)) {
            return localStorage.getItem(args.VAR_NAME);
        } else {
            console.log("Variable " + args.VAR_NAME + " does not exist.");
            return null;
        }
    }
}


module.exports = Scratch3HelloWorldBlocks;
