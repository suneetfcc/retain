(function(window, document) {
    
    'use strict';

    var model = {
        init: function () {
            if(!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        save: function (note) {
            var notes = JSON.parse(localStorage.notes);
            notes.push(note);
        },
        getAll: function () {
            return JSON.parse(localStorage.notes);
        }
    };

    var view = {
        init: function () {
            octupus.getNotes().array.forEach(function(item) {
                
            }, this);
        },
        render: function() {

        }
    }
})(window, document);
