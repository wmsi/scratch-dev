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
            var type_index = data_set_list.findIndex(e => e.data_type === data_type);
            if(type_index != -1) {
                console.log('data type ' + data_type + ' already exists; replacing with new data set');
                data_set_list.splice(type_index, 1);
            }
        } else {
            data_set_list = [];
        }
        data_set_list.push(data_set);
        localStorage.setItem('data_set_list', JSON.stringify(data_set_list));
        console.log('all data sets: ' + JSON.stringify(data_set_list));
    }

    _addProject(project) {
        var all_projects = this._getLocalVariable('all_projects');
        console.log('adding project ' + JSON.stringify(project));

        if(all_projects && all_projects != "undefined") {
            all_projects = JSON.parse(all_projects);
            var proj_index = all_projects.findIndex(e => e.id === project.id);
            if(proj_index != -1) {
                console.log('project ' + project.name + ' already in memory. Replacing with new data');
                all_projects.splice(proj_index, 1);
            }
        } else {
            all_projects = [];
        }
        all_projects.push(project);
        localStorage.setItem('all_projects', JSON.stringify(all_projects));
        // console.log('all projects: ' + all_projects);
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
        var data_set_list = [];
        var all_projects = this._getLocalVariable('all_projects');
        if(all_projects && all_projects != "undefined") {
            all_projects = JSON.parse(all_projects);
            all_projects.forEach(function(e) {
                for(var type in  e.data_sets) {
                    if(!data_set_list.includes(type))
                        data_set_list.push(type);
                }
            });
            return data_set_list;
        // deprecated - phase this out soon
        }
    }

    /**
     * Read all project IDs out of local storage. These will then be displayed in the 'projects'
     * menu, e.g. for reading meta data. This is designed to work with the new project_meta_data
     * extension spec and will not work if project meta data has not been stored
     * @returns {array} of project IDs
     * @private
     */
     // add handling for duplicate project names (e.g. name + id) or add unique name constraint to database
    _getProjectIDs() {
        var all_projects = this._getLocalVariable('all_projects');
        if(all_projects && all_projects != "undefined") {
            all_projects = JSON.parse(all_projects);
            var project_ids = [];
            all_projects.forEach(function(e) {
                project_ids.push(String(e.id));
            });
            project_ids.sort();
            console.log('project ids: ' + String(project_ids));
            // for (var i = 0; i < all_projects.length; i++) {
            //     project_names.push(all_projects[i]['name']);
            // }
            return project_ids;
        } else {
            return ['no projects'];
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
            console.error(xhr.statusText);
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
                    opcode: 'getProject',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'get_project',
                        default: 'Get project [PROJECT_ID]',
                        description: 'get the meta data and all data sets of a project'
                    }),
                    arguments: {
                        // SENSOR_ID: {
                        //     type: 'number',
                        //     default: 1
                        // },
                        PROJECT_ID: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        } // we should add an option for project name too
                    }
                },
                {
                    opcode: 'deleteProject',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'delete_project',
                        default: 'Delete project [PROJECT_ID] from local memory',
                        description: 'delete a project from localStorage'
                    }),
                    arguments: {
                        PROJECT_ID: {
                            type: ArgumentType.STRING,
                            menu: 'projects'
                        } // we should add an option for project name too
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
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DATA_TYPE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'tempC'
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'editProjectMetaData',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'edit_project_metadata',
                        default: 'Replace field [FIELD] for project [PROJECT_ID] with [NEW_VALUE]',
                        description: 'edit the specified field of project metadata'
                    }),
                    arguments: {
                        FIELD: {
                            type: ArgumentType.STRING,
                            menu: 'metadata'
                        },
                        PROJECT_ID: {
                            type: ArgumentType.NUMBER,
                            menu: 'projects'
                        },
                        NEW_VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'getDataSet',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'get_data_set',
                        default: 'Dataset [DATA_TYPE] from project [PROJECT_ID]',
                        description: 'string of a data set'
                    }),
                    arguments: {
                        DATA_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'dataSet'
                        },
                        PROJECT_ID: {
                            type: ArgumentType.NUMBER,
                            menu: 'projects'
                        }
                    }
                },
                {
                    opcode: 'getDataSetLength',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'get_data_set_length',
                        default: 'Length of [DATA_SET]',
                        description: 'length of a data set'
                    }),
                    arguments: {
                        DATA_SET: {
                            type: ArgumentType.STRING,
                            defaultValue: '[Dataset Block]'
                        }
                    }
                },
                {
                    opcode: 'getDataSetIndex',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'get_data_set_index',
                        default: 'Index [INDEX] of [DATA_SET]',
                        description: 'one element from a data set'
                    }),
                    arguments: {
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        DATA_SET: {
                            type: ArgumentType.STRING,
                            defaultValue: '[Dataset Block]'
                        }
                    }
                },
                // reporter blocks that work with project meta data. Should these work with project name or id
                // as the defining user interface?
                {
                    opcode: 'getProjectMetaData',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'get_project_metadata',
                        default: '[FIELD] from project [PROJECT_ID]',
                        description: 'return the specified field from project metadata'
                    }),
                    arguments: {
                        FIELD: {
                            type: ArgumentType.STRING,
                            menu: 'metadata'
                        },
                        PROJECT_ID: {
                            type: ArgumentType.NUMBER,
                            menu: 'projects'
                        }
                    }
                }
            ],
            menus: {
                method: ['POST', 'GET'],
                dataSet: this._getDataSets(),
                metadata: ['name', 'description', 'miscellaneous'],//id,],
                projects: this._getProjectIDs()
            }
        };
    }

    /**
     * Retreive a project from the database,including its metadata and all data sets
     * @param {string} PROJECT_ID - id of project to get from database
     */
     getProject(args) {
        console.log('getting project ' + String(args.PROJECT_ID))
        var query_string = DEFAULT_URL + '?project_id=' + String(args.PROJECT_ID) + '&pmd=true';
        var self = this;

        var callback = function(xhr) {
            var project = JSON.parse(xhr.responseText);
            console.log('project: ' + project);

            if (!window.localStorage) {
                alert('LocalStorage not supported by your browser!');
            } else {
                self._addProject(project);
            }
        };

        this._openXHR('GET', query_string, callback);
     }

    /**
     * Delete a project from localStorage
     * @param {string} PROJECT_ID - id of project to delete
     */
     deleteProject(args) {
        console.log('deleting project ' + args.PROJECT_ID)
        var all_projects = this._getLocalVariable('all_projects');
        if(all_projects && all_projects != "undefined") {
            all_projects = JSON.parse(all_projects);
            // var this_project = all_projects[all_projects.findIndex(e => e.id === parseInt(args.PROJECT_ID))];
            var proj_index = all_projects.findIndex(e => e.id === parseInt(args.PROJECT_ID));
            if(proj_index != -1) {
                all_projects.splice(proj_index, 1);
                console.log('project ' + args.PROJECT_ID + ' deleted');
                localStorage.setItem('all_projects', JSON.stringify(all_projects));
            } else {
                console.log('project not found');
            }
        } else {
            console.log('no projects found');
        }
     }

    /**
     * Post a dataset to a remote database via an XHR AJAX POST request
     * @param {string} PROJECT_ID - Integer ID number for the desired database project
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
            console.log('wmsinh.org - ', xhr.response);
            // this._response_text = xhr.responseText;
        }

        this._openXHR('POST', DEFAULT_URL, callback, post_data);
    }

    /**
     * Edit the specified meta data field for a project
     * @param {string} FIELD - key for the meta data field
     * @param {string} PROJECT_ID - id of the project
     * @param {string} NEW_VALUE - new value for the field
     */ 
    editProjectMetaData(args) {
        // console.log('replace metadata field ' + String(args.FIELD) + ' from project ' + String(args.PROJECT_ID) ' with value ' + String(args.NEW_VALUE));
        var all_projects = this._getLocalVariable('all_projects');
        if(all_projects && all_projects != "undefined") {
            all_projects = JSON.parse(all_projects);
            var this_project = all_projects[all_projects.findIndex(e => e.id === parseInt(args.PROJECT_ID))];
            var edit_data = new FormData();

            edit_data.append('project_id', this_project.id);
            edit_data.append(args.FIELD, args.NEW_VALUE);
            edit_data.append('pmd', true);
            var callback = function(xhr) {
                console.log('wmsinh.org - ', xhr.response);
            }

            this._openXHR('POST', DEFAULT_URL, callback, edit_data);
        } else {
            console.log('no projects found');
        }
    }

    /**
     * Return the string of a data set
     * This can also be used within the 'get length' and 'get index' blocks
     * @param {string} DATA_TYPE - type of data in the data set
     * @param {number} PROJECT_ID - id of project to pull the data set from // replace with name?
     * @returns {string} full data set as stringified array
     */
    getDataSet(args) {
        var all_projects = this._getLocalVariable('all_projects');
        if(all_projects && all_projects != "undefined") {
            all_projects = JSON.parse(all_projects);
            var this_project = all_projects[all_projects.findIndex(e => e.id === parseInt(args.PROJECT_ID))];
            if(this_project['data_sets'].hasOwnProperty(args.DATA_TYPE)) {
                return JSON.stringify(this_project['data_sets'][args.DATA_TYPE]);
            } else {
                console.log('project has no data set of that type');
                return '[]';
            }
        } else {
            return 'no projects found';
        }
    }

    /**
     * Report the length of a data set
     * @param {string} DATA_SET - stringified array of a data set (Dataset Block)
     * @returns {number} length of array
     */
    getDataSetLength(args) {
        var data_set = JSON.parse(args.DATA_SET);
        return data_set.length;
    }

    /**
     * Return one element of a data set
     * @param {string} DATA_SET - stringified array of a data set (Dataset Block)
     * @param {number} INDEX - Index of the element to return
     * @returns {string} element of the data set
     */
    getDataSetIndex(args) {
        var data_set = JSON.parse(args.DATA_SET);
        if(data_set.length <= args.INDEX) {
            console.log('data set has no element at that index');
            return -1;
        }
        return data_set[args.INDEX];
    }

    /**
     * Return the requested meta data field for a project
     * @param {string} FIELD - key for the meta data field
     * @param {number} PROJECT_ID - id of the project
     * @returns {string} - attribute for the meta data field 
     */ 
    getProjectMetaData(args) {
        console.log('get metadata field ' + args.FIELD + ' from project ' + String(args.PROJECT_ID));
        var all_projects = this._getLocalVariable('all_projects');
        if(all_projects && all_projects != "undefined") {
            all_projects = JSON.parse(all_projects);
            var this_project = all_projects[all_projects.findIndex(e => e.id === parseInt(args.PROJECT_ID))];
            console.log('this project: ' + this_project);
            return this_project[args.FIELD];
        } else {
            return 'no projects found';
        }
    }

    /* DEPRECATED */
                // {
                //     opcode: 'pullDataSet',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({
                //         id: 'pull_data_set',
                //         default: 'Pull entries from project [PROJECT_ID] of type [DATA_TYPE]',
                //         description: 'pull one data set from a project'
                //     }),
                //     arguments: {
                //         // SENSOR_ID: {
                //         //     type: 'number',
                //         //     default: 1
                //         // },
                //         PROJECT_ID: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         },
                //         DATA_TYPE: {
                //             type: ArgumentType.STRING,
                //             defaultValue: 'tempC'
                //         }
                //     }
                // },
                // {
                //     opcode: 'pullAllData',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({
                //         id: 'pull_all_data',
                //         default: 'Pull all data types from project [PROJECT_ID]',
                //         description: 'pull all data sets from a project'
                //     }),
                //     arguments: {
                //         // SENSOR_ID: {
                //         //     type: 'number',
                //         //     default: 1
                //         // },
                //         PROJECT_ID: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         }
                //     }
                // },
                // {
                //     opcode: 'getDataLength',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'get_data_length',
                //         default: 'length of dataset [DATA_TYPE]',
                //         description: 'length of the data set currently in local storage'
                //     }),
                //     arguments: {
                //         DATA_TYPE: {
                //             type: ArgumentType.STRING,
                //             menu: 'dataSet'
                //         }
                //     }
                // },
                // {
                //     opcode: 'getDataString',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'get_data_string',
                //         default: 'string of dataset [DATA_TYPE]',
                //         description: 'currently stored dataset as a string'
                //     }),
                //     arguments: {
                //         DATA_TYPE: {
                //             type: ArgumentType.STRING,
                //             menu: 'dataSet'
                //         }
                //     }
                // },
                // {
                //     opcode: 'getDataElement',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'get_data_element',
                //         default: 'Get element [INDEX] of dataset [DATA_TYPE]',
                //         description: 'return the specified element of the dataset'
                //     }),
                //     arguments: {
                //         DATA_TYPE: {
                //             type: ArgumentType.STRING,
                //             menu: 'dataSet'
                //         },
                //         INDEX: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 0
                //         }
                //     }
                // },
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
    // /**
    //  * Retreive a dataset from a remote database by executing an XHR AJAX request
    //  * @param {int} PROJECT_ID - Integer ID number for the desired database project
    //  * @param {string} DATA_TYPE - String descriptor of the type of data to retreive
    //  * -- @param {int} SENSOR_ID - Integer ID for the desired sensor dataset --
    //  */
    // pullDataSet(args) { 
    //     console.log('new data pull')
    //     var query_string = DEFAULT_URL + '?project_id=' + String(args.PROJECT_ID) + '&data_type=' + String(args.DATA_TYPE);
    //     var self = this;
        
    //     var callback = function(xhr) {
    //         if (xhr.readyState == XMLHttpRequest.DONE && xhr.status== 200) {
    //             console.log('DONE', xhr.status);
    //             var data_set = JSON.parse(xhr.responseText);
    //             var data_length = data_set.length;

    //             if (!window.localStorage) {
    //                 alert('LocalStorage not supported by your browser!');
    //             } else {
    //                 self._addDataSet(String(args.DATA_TYPE), data_set, data_length);
    //             }
    //         }
    //     };

    //     this._openXHR('GET', query_string, callback);
    // }

    // /**
    //  * Retreive all data sets from a project on wmsinh.org/data-story
    //  * @param {int} PROJECT_ID - Integer ID number for the desired database project
    //  * -- @param {int} SENSOR_ID - Integer ID for the desired sensor dataset --
    //  */
    // pullAllData(args) {
    //     console.log('new data pull')
    //     var query_string = DEFAULT_URL + '?project_id=' + String(args.PROJECT_ID);
    //     var self = this;

    //     var callback = function(xhr) {
    //         var data_set = JSON.parse(xhr.responseText);

    //         if (!window.localStorage) {
    //             alert('LocalStorage not supported by your browser!');
    //         } else {
    //             var new_data = {};
    //             data_set.forEach(function(e) {
    //                 var data_type = e[0];
    //                 if (!new_data.hasOwnProperty(data_type))
    //                     new_data[data_type] = [];

    //                 new_data[data_type].push(e[1]);

    //             });
    //             for(var key in new_data) {
    //                 self._addDataSet(key, new_data[key], new_data[key].length);
    //             }
    //         }
    //     };

    //     this._openXHR('GET', query_string, callback);
    // }

    // /** 
    //  * Report the length of a dataset stored in localStorage
    //  * @param {string} DATA_TYPE - type of data to find in localStorage
    //  * @returns {number} length of the data set
    //  */
    // getDataLength(args) {
    //     var all_data_sets = JSON.parse(this._getLocalVariable('data_set_list'));
    //     var typeIndex = all_data_sets.findIndex(e => e.data_type === args.DATA_TYPE);
    //     console.log('data type found at index ' + typeIndex + ' with length ' + all_data_sets[typeIndex]['data_length']);
    //     return all_data_sets[typeIndex]['data_length'];
    //     // return this._getLocalVariable('data_length');
    // }

    // /** 
    //  * Report a list of data of a certain type stored in localStorage
    //  * @param {string} DATA_TYPE - type of data to find in localStorage
    //  * @returns {string} stringified array of the data stored under this data type
    //  */
    // getDataString(args) {
    //     var all_data_sets = JSON.parse(this._getLocalVariable('data_set_list'));
    //     var typeIndex = all_data_sets.findIndex(e => e.data_type === args.DATA_TYPE);
    //     console.log('data type found at index ' + typeIndex);
    //     return JSON.stringify(all_data_sets[typeIndex]['data_set']);
    //     // return this._getLocalVariable('data_set');
    // }

    // /**
    //  * Return a single element of the dataset
    //  * @param {number} INDEX - index within the dataset of the desired item
    //  * @returns {string} current dataset
    //  */
    // getDataElement(args) {
    //     var all_data_sets = JSON.parse(this._getLocalVariable('data_set_list'));
    //     var type_index = all_data_sets.findIndex(e => e.data_type === args.DATA_TYPE);
    //     var data_set = all_data_sets[type_index]['data_set'];
    //     if(data_set[args.INDEX]) {
    //         return data_set[args.INDEX];
    //     } else {
    //         console.error("couldn't find that index. make sure your dataset is defined and check its length");
    //         return -1;
    //     }
    // }
    // _getDataSets() {
    //      else {
    //         data_set_list = this._getLocalVariable('data_set_list');
    //         var set_names = [];
    //         if(data_set_list && data_set_list != "undefined") {
    //             data_set_list = JSON.parse(data_set_list);
    //             console.log(data_set_list);
    //             // for (var i = 0; i < data_set_list.length; i++) {
    //             //     set_names.push(data_set_list[i].data_type);
    //             // }
    //             data_set_list.forEach(function(e) {
    //                 set_names.push(e.data_type);
    //             });
    //             return set_names;
    //         } else {
    //             console.log("no data set list found in local storage");
    //             return ['no data sets'];
    //         }
    //     }
    // }


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
