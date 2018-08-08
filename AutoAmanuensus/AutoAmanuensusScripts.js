/*
JAVASCRIPT VARIABLES
*/

//The 'dict' variable is a dictionary that is used to store the words that appear in a given essay, as well as the number of times they are present.
var dict = {};

//The 'maxRepeat' variable is a number that is used as a reference by functions to determine how many times a word may be repeated before a suggestion for a replacment is provided.
var maxRepeat = 0;

//The 'commonWords' variable is an array containing common words that will be overlooked when suggesting synonyms.
var commonWords = ["i", "a", "and", "but", "if", "when", "where", "how", "", " ", ];

//The 'flaggedWords' variabe is an array containing all words that have been flagged as exceeding the maximum number of repeats for the current essay. 
var flaggedWords = [];

//
var essay = "";

//The 'repeatedWords '
var repeatedWords = "";

/*
JAVASCRIPT FUNCTIONS
*/

//
//
function setEssayVal()
{
	setMaxRepeat();
	document.getElementById("EssayOutput").value = '';
	essay = document.getElementById("EssayBox").value;
	compileWordsRunner(essay);
	wordRepeatChecker();
	document.getElementById("EssayOutput").value = "The following words are repeated more than " + maxRepeat + " times:\n\n" + flaggedWordsToString();
}

//The 'setMaxRepeat' function takes a number as an input and sets the 'maxRepeat' variable equal to it. If a number is not entered, the function does nothing.
//Number -> [Change Value of 'maxRepeat']
function setMaxRepeat(num)
{
	maxRepeat = document.getElementById("MaxNum").value;
}

//The '$getWords' function takes a string as input and uses jQuery's getJSON function to pull a JSON array of synonyms and antonyms from http://words.bighugelabs.com/api/2/, using our key de09a1667a75c2330105a64129c9db42.
//String -> JSON 
function $getWords(word)
{
	var data = "http://words.bighugelabs.com/api/2/de09a1667a75c2330105a64129c9db42/" + word + "/json";
	return $.getJSON(data);
}

//The 'getNouns' function takes the output given by the ____ API in the $getWords function, and will return an array of all Noun Synonyms that are present. 
//JSON -> Array of Strings
function getNouns(JSON)
{
  return JSON.responseJSON.noun.syn
}

//The 'getVerbs' function takes the output given by the ____ API in the $getWords function, and will return an array of all Verb Synonyms that are present. 
//JSON -> Array of Strings
function getVerbs(JSON)
{
  return JSON.responseJSON.verb.syn
}

//The 'getAdjectives' function takes the output given by the ____ API in the $getWords function, and will return an array of all Adjective Synonyms that are present. 
//JSON -> Array of Strings
function getAdjectives(JSON)
{
  return JSON.responseJSON.adjective.syn
}

//The 'wordRepeatChecker' function checks the dictionary to see what words have been repeated more times than the maximum value allotted by 'maxRepeat', and stores them in an array of strings.
//[Value of 'dict'] -> [Change value of 'maxRepeat']
function wordRepeatChecker()
{
	flaggedWords = [];
  for (x in dict)
  {
    if(!(commonWords.includes(x)) && (dict[x]> maxRepeat))
    {
      flaggedWords.push(x);
  }
  }
  return 0;
}

//'returnValues' is a function used for quick testing in console that returns all values that may be relevant for troubleshooting.
//Values of Variables -> console message
function returnValues()
{
  console.log("dict Values");
  console.log(dict);
  console.log();
  console.log("maxRepeat Value");
  console.log(maxRepeat);
  console.log();
  console.log("flaggedWords Values");
  console.log(flaggedWords);
}

//'compileWordsRunner' takes in an essay in the form of a String, and places all of the words in order into an array called wordList. It the nuses helper functions to determine the number of times each word repeats.
//String -> [Change Values in 'dict']
function compileWordsRunner(essay)
{
	essay = essay.replace(/\n/ig," ");
	console.log(essay);
  //splits up input into array where each word is an index
  var wordList = essay.split(" ");
  console.log(wordList);
  //var temp = ""
  //temp = 

  //for loop designed to make all words in the array completely lowercase
  var x;
  for (x in wordList)
  {
    wordList[x] = wordList[x].toLowerCase();
  }

  //reset value of 'dict' to avoid potential errors.
  dict = {};

  compileWords(wordList);
  return 0;
}

//CompileWords takes an input string, array of words, and array of numbers corresponding to the words in the same index, and 
//[Array of Strings] -> [Change Values in 'dict']
function compileWords(wordList)
{
  //If the first word in 'wordList' is not yet listed in 'dict', it is added.
  if (dict[wordList[0]] == undefined)
  {
    dict[wordList[0]] = 1;
    endOfArray(wordList);
  }
  //If the first word in 'wordList' is already listed in 'dict', its value is incremented.
  else
  {
    dict[wordList[0]] = dict[wordList[0]] + 1;
    endOfArray(wordList);
  }
}

//endOfArray is a function to test to see if an array is on its final index. If it is not, it calls compileWords on the rest of the 'wordList' Array.
//[Array of Strings] -> [compileWords(Array of Strings)]
function endOfArray(wordList)
{
  if (wordList.length == 1)
    {
      return 0;
    }
    else
    {
      compileWords(wordList.slice(1, wordList.length));
    }
}

//
//[Value of 'flaggedWords'] -> String
function flaggedWordsToString()
{
	repeatedWords = "";
	for (x in flaggedWords)
	{
		repeatedWords = repeatedWords + ", " + flaggedWords[x];
	}
	return repeatedWords.substring(2, repeatedWords.length);

}