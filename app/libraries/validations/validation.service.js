(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('Validation', Validation);

    /* @ngInject */
    function Validation() {
        var service = {
            mail: mail,
            field: field,
            passwords: passwords
        };

        return service;

        function passwords(firstPassword, secondPassword) {
        	return firstPassword === secondPassword;
        }

        function field(field, minLength, maxLength) {
        	if (nullOrEmpty(field)) {
        		return false;
        	} else {
        		if (field.length < minLength || 
        				field.length > maxLength) {
        			return false;
        		} else {
        			return true;
        		}
        	}
        }

        function mail(mail) {
        	if (nullOrEmpty(mail)) {
        		return false;
        	} else {
        		if (regexMail(mail)) {
        			return true;
        		} else {
        			return false;
        		}
        	}        	
        };

        function regexMail(mail) {
        	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(mail);
        }
        
        function nullOrEmpty(input) {
            if (input == null || input == undefined) {
                return true;
            } else {
                if (input.length == 0) {
                    return true;
                }
            }
            return false;
        }

    };

})();