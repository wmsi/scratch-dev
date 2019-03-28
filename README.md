<h3>Welcome to scratch-dev @ WMSI!</h3> 
This is where we develop Scratch 3.0 extensions in a fork of the <a href="https://github.com/LLK/scratch-gui">scratch-gui repository from LLK.</a> This repository contains clear instructions for getting scratch-gui up and running locally, and for building a version for distribution. To preview the GUI in a version similar to the one in the scratch-dev/ repository, visit <a href="https://wmsinh.org/scratch-gui">https://wmsinh.org/scratch-gui.</a>

<h4>WMSI Extensions</h4>
Within the Scratch application structure, all extension files are located in <a href="https://github.com/wmsi/scratch-vm/tree/develop/src/extensions">scratch-vm/src/extensions.</a> Each folder in this directory contains an index.js file defining the extension class, followed by a "module.exports" line at the bottom of the file to make the extension part of the the node.js application. Each extension also needs to be listed as part of the <code>BuiltInExtensions const</code> in <a href="https://github.com/wmsi/scratch-dev/blob/master/WMSI/scratch-gui/node_modules/scratch-vm/src/extension-support/extension-manager.js">extension-manager.js.</a>

For Scratch project examples that use our extensions check out the scratch3examples directory.

The majority of our extension-development effort has been focused on the <a href="https://github.com/wmsi/scratch-vm/tree/develop/src/extensions/scratch3_db_blocks">DB Blocks extension</a>, which supports Scratch 3 integration into the Digital Data Storytelling project. This extension contains blocks for pushing and pulling data from the wmsinh.org database (using XML HTTP Requests) and managing that data in localStorage. The same database content can be viewed at <a href="https://wmsinh.org/data-story">https://wmsinh.org/data-story</a>.

<h4>Project History</h4>
This project originally focused on replicating our ScratchX extension for handling data transactions with wmsinh.org. To check out the ScratchX extensions and some example sketches, go to our <a href="https://github.com/wmsi/scratchx-examples">ScratchX repository.</a> 
