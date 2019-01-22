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

const DEFAULT_URL = 'https://wmsinh.org/scratchx';
/**
 * @typedef {object} PenState - the pen state associated with a particular target.
 * @property {Boolean} penDown - tracks whether the pen should draw for this target.
 * @property {number} color - the current color (hue) of the pen.
 * @property {PenAttributes} penAttributes - cached pen attributes for the renderer. This is the authoritative value for
 *   diameter but not for pen color.
 */

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3DatabaseBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        /**
         * Class-wide variables. Check syntax for initializing these (especially arrays) and accessing
         * them from functions and blocks.
         */

        // can we make these persist between block calls?
        this._formdata;
        this._request = '';
        this._status = 0;
        this._response_text = '';
        this._data_set;
        this._data_length = -1;
    }

    /**
     * Set a variable in localStorage.
     * @param {string} varName - the name of the variable to set in localStorage.
     * @param {string} varValue - the value to set for the variable.
     * @private
     */
    _setLocalVariable(var_name, var_value) {
        localStorage.setItem(var_name, var_value);
    }
    
    /**
     * Get the value of a variable in localStorage.
     * @param {string} varName - the name of the variable to retrieve from localStorage.
     * @returns {string} the value of the variable in localStorage, or null if the variable doesn't exist
     * @private
     */
    _getLocalVariable(var_name) {
        if (localStorage.getItem(var_name)) {
            // console.log("Local variables supported, variable " + var_name + " has a value of " + localStorage.getItem(var_name));
            return localStorage.getItem(var_name);
        } else {
            console.log("Variable " + var_name + " does not exist. ;(");
            return 0;
        }
    }

    /**
     * Execute an AJAX GET query and pass the response on to a callback function.
     * @param {string} queryString - the query to execute.
     * @param {string} callback - callback function to receive the response.
     * @private
     */
    _getData(query_string, callback) {
        // ajax for response
        $.ajax({
            url: query_string,
            dataType: 'json',
            success: function( data_set ) {
                response_string = JSON.stringify(data_set);
                callback(response_string);
            }
        });
    }

    /**
     * Add a data set to the list in localStorage
     * @param {string} data_type - type of data of the set being added
     * @param {array} data_set - array of all elements in the data set
     * @param {int} data_length - number of items in the data set
     */
    _addDataSet(data_type, data_set, data_length) {
        // var data = JSON.parse(dataString);
        var data_set = {data_type, data_set, data_length};
        var data_set_list = this._getLocalVariable('data_set_list');
        console.log('adding data set ' + JSON.stringify(data_set));

        if(data_set_list && data_set_list != "undefined") {
            data_set_list = JSON.parse(data_set_list);
            // for now each data_type can only be stored once in the list
            var typeExists = data_set_list.findIndex(e => e.data_type === data_type);
            if(typeExists != -1) {
                console.log('data type ' + data_type + ' already exists; replacing with new data set');
                data_set_list.splice(typeExists ,1);
            }
        } else {
            data_set_list = [];
        }
        data_set_list.push(data_set);
        localStorage.setItem('data_set_list', JSON.stringify(data_set_list));
        console.log('all data sets: ' + JSON.stringify(data_set_list));
    }

    /**
     * Get the names of all data sets stored in localStorage. This function gets called
     * to populate the "Date Sets" menu, which Scratch3 does upon initializing extension blocks.
     * In order to see new data sets you must refresh the page- then data sets with names in 
     * the menu can be updated with the 'pull' block.
     * @returns {array} of the names of data sets stored in localStorage
     * @private
     */
    _getDataSets() {
        console.log('getting data sets');
        var data_set_list = this._getLocalVariable('data_set_list');
        var set_names = [];
        if(data_set_list && data_set_list != "undefined") {
            data_set_list = JSON.parse(data_set_list);
            console.log(data_set_list);
            for (var i = 0; i < data_set_list.length; i++) {
                set_names.push(data_set_list[i].data_type);
            }
            return set_names;
        } else {
            console.log("no data set list found in local storage");
            return ['no data sets'];
        }
    }

    /*
     * Open an XML HTTP Request with the given parameters
     * @param {string} method - either GET or POST
     * @param {string} query_string - the URL and query to use with the request
     * @param {function} callback - function to use when the request loads
     * @param {FormData} formdata *optional* - data to post if using the POST method
     */
    _openXHR(method, query_string, callback, form_data) {
        var xhr = new XMLHttpRequest();

        xhr.timeout = 4000;
        xhr.onload = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status== 200) {
                console.log('DONE', xhr.status);
                callback(xhr);
            }
        }
        xhr.onerror = function(e) {
            consoler.error(xhr.statusText);
        };
        xhr.ontimeout = function() {
            console.error("Pull request timed out with status " + xhr.status);
        };


        xhr.open(method, query_string, true);
        xhr.setRequestHeader('*', 'scratchx');
        if(method == 'POST') {
            xhr.send(form_data);
        } else {
            xhr.send();
        }
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'dbBlocks',
            name: formatMessage({
                id: 'dbBlocks.categoryName',
                default: 'Database Blocks',
                description: 'Label for the database extension category'
            }),
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'pullDataSet',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'pull_data_set',
                        default: 'Pull entries from project [PROJECT_ID] of type [DATA_TYPE]',
                        description: 'pull one data set from a project'
                    }),
                    arguments: {
                        // SENSOR_ID: {
                        //     type: 'number',
                        //     default: 1
                        // },
                        PROJECT_ID: {
                            type: 'number',
                            defaultValue: 1
                        },
                        DATA_TYPE: {
                            type: 'string',
                            defaultValue: 'tempC'
                        }
                    }
                },
                {
                    opcode: 'pullAllData',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'pull_all_data',
                        default: 'Pull all data types from project [PROJECT_ID]',
                        description: 'pull all data sets from a project'
                    }),
                    arguments: {
                        // SENSOR_ID: {
                        //     type: 'number',
                        //     default: 1
                        // },
                        PROJECT_ID: {
                            type: 'number',
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'postData',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'post_data',
                        default: 'Post value [VALUE] to project [PROJECT_ID] with data type [DATA_TYPE]',
                        description: 'prototype for posting data to the database'
                    }),
                    arguments: {
                        // SENSOR_ID: {
                        //     type: 'number',
                        //     default: 1
                        // },
                        PROJECT_ID: {
                            type: 'number',
                            defaultValue: 1
                        },
                        DATA_TYPE: {
                            type: 'string',
                            defaultValue: 'tempC'
                        },
                        VALUE: {
                            type: 'number',
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'getDataLength',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'get_data_length',
                        default: 'length of dataset [DATA_TYPE]',
                        description: 'length of the data set currently in local storage'
                    }),
                    arguments: {
                        DATA_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'dataSet'
                        }
                    }
                },
                {
                    opcode: 'getDataString',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'get_data_string',
                        default: 'string of dataset [DATA_TYPE]',
                        description: 'currently stored dataset as a string'
                    }),
                    arguments: {
                        DATA_TYPE: {
                            type: 'string',
                            menu: 'dataSet'
                        }
                    }
                },
                {
                    opcode: 'getDataElement',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'get_data_element',
                        default: 'Get element [INDEX] of dataset [DATA_TYPE]',
                        description: 'return the specified element of the dataset'
                    }),
                    arguments: {
                        DATA_TYPE: {
                            type: 'string',
                            menu: 'dataSet'
                        },
                        INDEX: {
                            type: 'number',
                            defaultValue: 0
                        }
                    }
                }//,
                // {
                //     opcode: 'get_status',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'get_status',
                //         default: 'request status',
                //         description: 'status of the HTTP request'
                //     })
                // },
                // {
                //     opcode: 'get_timestamp',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'get_timestamp',
                //         default: 'timestamp of last pull',
                //         description: 'timestamp of last dataset pull'
                //     })
                // }
            ],
            menus: {
                method: ['POST', 'GET'],
                dataSet: this._getDataSets()
            }
        };
    }

    /**
     * Retreive a dataset from a remote database by executing an XHR AJAX request
     * @param {int} PROJECT_ID - Integer ID number for the desired database project
     * @param {string} DATA_TYPE - String descriptor of the type of data to retreive
     * -- @param {int} SENSOR_ID - Integer ID for the desired sensor dataset --
     */
    pullDataSet(args) {
        console.log('new data pull')
        var query_string = DEFAULT_URL + '?project_id=' + String(args.PROJECT_ID) + '&data_type=' + String(args.DATA_TYPE);
        var self = this;
        
        var callback = function(xhr) {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status== 200) {
                console.log('DONE', xhr.status);
                var data_set = JSON.parse(xhr.responseText);
                var data_length = data_set.length;

                if (!window.localStorage) {
                    alert('LocalStorage not supported by your browser!');
                } else {
                    self._addDataSet(String(args.DATA_TYPE), data_set, data_length);
                }
            }
        };

        this._openXHR('GET', query_string, callback);
    }

    /**
     * Retreive all data sets from a project on wmsinh.org/data-story
     * @param {int} PROJECT_ID - Integer ID number for the desired database project
     * -- @param {int} SENSOR_ID - Integer ID for the desired sensor dataset --
     */
    pullAllData(args) {
        console.log('new data pull')
        var query_string = DEFAULT_URL + '?project_id=' + String(args.PROJECT_ID);
        var self = this;

        var callback = function(xhr) {
            var data_set = JSON.parse(xhr.responseText);

            if (!window.localStorage) {
                alert('LocalStorage not supported by your browser!');
            } else {
                var new_data = {};
                data_set.forEach(function(e) {
                    var data_type = e[0];
                    if (!new_data.hasOwnProperty(data_type))
                        new_data[data_type] = [];

                    new_data[data_type].push(e[1]);

                });
                for(var key in new_data) {
                    self._addDataSet(key, new_data[key], new_data[key].length);
                }
            }
        };

        this._openXHR('GET', query_string, callback);
    }

    /**
     * Post a dataset to a remote database via an XHR AJAX POST request
     * @param {int} PROJECT_ID - Integer ID number for the desired database project
     * @param {string} DATA_TYPE - String descriptor of the type of data to retreive
     * -- @param {int} SENSOR_ID - Integer ID for the desired sensor dataset --
     */
    postData(args) {
        var post_data = new FormData();

        post_data.append('project_id', String(args.PROJECT_ID));
        // this.append_formdata('sensor_id', String(sensor_id));
        post_data.append('sensor_id', '0');
        post_data.append('data_type', String(args.DATA_TYPE));
        post_data.append('value', String(args.VALUE));

        var callback = function(xhr) {
            console.log('Done Posting - ', xhr._response_text);
            // this._response_text = xhr.responseText;
        }

        this._openXHR('POST', DEFAULT_URL, callback, post_data);
    }

    /** Report the length of a dataset stored in localStorage
     * @param {string} DATA_TYPE - type of data to find in localStorage
     * @returns {number} length of the data set
     */
    getDataLength(args) {
        var all_data_sets = JSON.parse(this._getLocalVariable('data_set_list'));
        var typeIndex = all_data_sets.findIndex(e => e.data_type === args.DATA_TYPE);
        console.log('data type found at index ' + typeIndex + ' with length ' + all_data_sets[typeIndex]['data_length']);
        return all_data_sets[typeIndex]['data_length'];
        // return this._getLocalVariable('data_length');
    }

    /** Report a list of data of a certain type stored in localStorage
     * @param {string} DATA_TYPE - type of data to find in localStorage
     * @returns {string} stringified array of the data stored under this data type
     */
    getDataString(args) {
        var all_data_sets = JSON.parse(this._getLocalVariable('data_set_list'));
        var typeIndex = all_data_sets.findIndex(e => e.data_type === args.DATA_TYPE);
        console.log('data type found at index ' + typeIndex);
        return JSON.stringify(all_data_sets[typeIndex]['data_set']);
        // return this._getLocalVariable('data_set');
    }

    /** Return a single element of the dataset
     * @param {number} INDEX - index within the dataset of the desired item
     * @returns {string} current dataset
     */
    getDataElement (args) {
        var all_data_sets = JSON.parse(this._getLocalVariable('data_set_list'));
        var type_index = all_data_sets.findIndex(e => e.data_type === args.DATA_TYPE);
        var data_set = all_data_sets[type_index]['data_set'];
        if(data_set[args.INDEX]) {
            return data_set[args.INDEX];
        } else {
            console.error("couldn't find that index. make sure your dataset is defined and check its length");
            return -1;
        }
    }

    /** Report the status of the HTTP request
     * @returns {int} current status
     */
    // get_status() {
    //     return this._status;
    // }

    // get_timestamp() {
    //     return this._response_text;
    // }
}

module.exports = Scratch3DatabaseBlocks;
