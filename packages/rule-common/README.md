# Passtrength rule plugin: common

This package includes a few common rules, that most password systems like to use to increase password strength.
The rules included are listed below.

## Rule: minLength

Require the password to be at least X amount of characters long.

## Rule: maxLength

Require the password to be at most X amount of characters long.

_Note: While this will do nothing to increase account security, it can help prevent [certain kinds of DDoS attacks](https://www.acunetix.com/vulnerabilities/web/long-password-denial-of-service/)._

## Rule: minLowercaseLetters

Require a certain amount of lowercase letters to be present in the password.

## Rule: minUppercaseLetters

Require a certain amount of uppercase letters to be present in the password.

## Rule: minNumbers

Require a certain amount of numbers to be present in the password.

## Rule: minSpecialCharacters

Require a certain amount of special characters to be present in the password.

By default the set of special characters is ` !"#$%&'()*+,-./:;<=>?@[]^_{|}~` but can be defined to be whatever is needed for your project.

## Rule: minNonStandardCharacters

Require a certain amount of non-alphanumeric characters to be present in the password.

This is very similar to the minSpecialCharacters rule, but allows users a wider range of special characters, which also increases account security by increasing that character set.
