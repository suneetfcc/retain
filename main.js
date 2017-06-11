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
                    octopus.saveNewNote({
                        timestamp: Date.now(),
                        text: notesForm.name.value
                    });
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
                noteListItem.innerHTML = '<div class="clear"><div class="right muted sub">'                                                         + Util.fromNow(item.timestamp)                                                                             + ' ago</div></div><div class="clear">'                                                                    + item.text +'</div>';
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
            return model.getAll().reverse();
        },
        saveNewNote: function(note) {
            model.add(note);
        }
    };

    var Util = {
        fromNow: function(date) {
            var seconds = Math.floor((new Date() - new Date(date)) / 1000);
            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        }
    };

    octopus.init();

})(window, document);
