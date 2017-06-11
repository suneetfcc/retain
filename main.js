(function(window, document) {

    'use strict';

    var model = {
        init: function () {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function (note) {
            var notes = JSON.parse(localStorage.notes);
            notes.push(note);
            localStorage.notes = JSON.stringify(notes);
        },
        getAll: function () {
            return JSON.parse(localStorage.notes);
        }
    };

    var view = {
        init: function () {
            var that = this;
            document.addEventListener('DOMContentLoaded', function() {
                var notesForm = document.querySelectorAll('#new-note')[0];
                notesForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    octopus.saveNewNote(notesForm.name.value);
                    notesForm.name.value = '';
                    that.render();
                });
            });
            this.render();
        },
        render: function() {
            var notesList = document.querySelectorAll('#notes')[0];
            while(notesList.hasChildNodes()) {
                notesList.removeChild(notesList.firstChild);
            }
            octopus.getNotes().forEach(function(item) {
                var noteListItem = document.createElement('li');
                noteListItem.innerText = item;
                notesList.appendChild(noteListItem);
                this.fadeIn(noteListItem);
            }, this);
        },
        fadeIn: function(element) {
            element.className += ' fade-in';
        }
    };

    var octopus = {
        init: function () {
            model.init();
            view.init();
        },
        getNotes: function() {
            return model.getAll();
        },
        saveNewNote: function(note) {
            model.add(note);
        }
    };

    octopus.init();

})(window, document);
