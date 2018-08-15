/*
JAVASCRIPT VARIABLES
*/

//The 'dict' variable is a dictionary that is used to store the words that appear in a given essay, as well as the number of times they are present.
var dict = {};

//The 'maxRepeat' variable is a number that is used as a reference by functions to determine how many times a word may be repeated before a suggestion for a replacment is provided.
var maxRepeat = 0;

//The 'commonWords' variable is an array containing common words that 
//will be overlooked when suggesting synonyms.
var commonWords = ["the", "what","up","that", "youre", "its", "it", "your", "were", "my", "here", "im", "are", "you", "for", "this", "be", "to", "dont", "we", "in","if", "of", "i", "a", "and", "but", "if", "when", "where", "how", "", " ", "or", "why", "is"];

//The 'flaggedWords' variabe is an array containing all words that have been
//flagged as exceeding the maximum number of repeats for the current essay. 
var flaggedWords = [];

//The 'essay' variable is used to store essay that is input by the user.
var essay = "";

//The 'repeatedWords' variable is used to store the elements of 'flaggedWords' as a string for printing 
var repeatedWords = "";

//The 'synonymDict' variale is used to store the objects returned by '$getWords' so they may be later used
//by the 'getSynonyms' function.
var synonymDict = {};

//The 'finalOutput' variable is the final string that is created as output to tell the user the words
//that have been repeated, how many times they have been repeated, and their synonyms.
var finalOutput = ""

/*
JAVASCRIPT FUNCTIONS
*/

//The 'setEssayVal' function is run when the check Repeats button is pressed. The function
//runs the 'setMaxRepeat' function, setting the maximum value based on what the user has entered.
//The function then value of the 'essay' variable to the text that the user has entered.
//The function then runs this value through the compileWordsRunner and WordRepeatChecker; the function 
//prints the words that are repeated mroe than the maximum allowed amount in the OutputBox.
//The 'synonymDict' object is then filled with the synonym objects of the flagged words.
function setEssayVal()
{
	setMaxRepeat();
	document.getElementById("EssayOutput").value = '';
	essay = document.getElementById("EssayBox").value;
	compileWordsRunner(essay);
	wordRepeatChecker();
	document.getElementById("EssayOutput").value = "The following words are repeated more than " + maxRepeat + " times:\n\n" + flaggedWordsToString();

	for (x in flaggedWords)
		{
			synonymDict[flaggedWords[x]] = $getWords(flaggedWords[x]);
		}
}

//The 'getSynonyms' function assigns the values of synonyms from the synonymDict values, organizes
//them in the 'finalOutput' string. The format shows the word, number of time it is reapeated,
//and the respective synonyms for nouns, verbs, and adjectives. The 'EssayOutput' value is then printed
//to the EssayOutput box.
function getSynonyms()
{	
	finalOutput = "";
	for (x in synonymDict)
	{
		finalOutput = finalOutput + "Word: " + x + "\nRepeats: " + dict[x] + "\n";
		finalOutput = finalOutput  + "Noun Synonyms: " + getNouns(synonymDict[x]) + "\n";
		finalOutput = finalOutput  +"Verb Synonyms: " + getVerbs(synonymDict[x]) + "\n";
		finalOutput = finalOutput +"Adjective Synonyms: " + getAdjectives(synonymDict[x]) + "\n" + "\n" +"\n";
	}
	document.getElementById("EssayOutput").value = finalOutput;
	synonymDict = {};
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
	if ((typeof JSON.responseJSON == "undefined") || (typeof JSON.responseJSON.noun == "undefined")|| (typeof JSON.responseJSON.noun.syn == "undefined"))
		return "None";

	var nounString = "";
	var temp = JSON.responseJSON.noun.syn;

	for (i=0; i < 10; i++)
	{
		if(typeof temp[i] =="undefined")
			return nounString.substring(1, nounString.length);
		nounString = nounString + ", " + temp[i];
	}
	return nounString.substring(1, nounString.length);
}

//The 'getVerbs' function takes the output given by the ____ API in the $getWords function, and will return an array of all Verb Synonyms that are present. 
//JSON -> Array of Strings
function getVerbs(JSON)
{
	if ((typeof JSON.responseJSON == "undefined") || (typeof JSON.responseJSON.verb == "undefined")|| (typeof JSON.responseJSON.verb.syn  == "undefined"))
		return "None";
	var verbString = "";
	var temp = JSON.responseJSON.verb.syn;
	
	for (i=0; i < 10; i++)
	{
		if(typeof temp[i] =="undefined")
			return verbString.substring(1, verbString.length);
		verbString = verbString + ", " + temp[i];
	}
	return verbString.substring(1, verbString.length);
}

//The 'getAdjectives' function takes the output given by the ____ API in the $getWords function, and will return an array of all Adjective Synonyms that are present. 
//JSON -> Array of Strings
function getAdjectives(JSON)
{
	if ((typeof JSON.responseJSON == "undefined") || (typeof JSON.responseJSON.adjective == "undefined")|| (typeof JSON.responseJSON.adjective.syn == "undefined"))
		return "None";
	var adjectiveString = "";
	var temp = JSON.responseJSON.adjective.syn;
	
	for (i=0; i < 10; i++)
	{
		if(typeof temp[i] =="undefined")
			return adjectiveString.substring(1, adjectiveString.length);
		adjectiveString = adjectiveString + ", " + temp[i];
	}
	return adjectiveString.substring(1, adjectiveString.length);
}

//The 'wordRepeatChecker' function checks the dictionary to see what words have been repeated more times than the maximum value allotted by 'maxRepeat', and stores them in an array of strings.
//[Value of 'dict'] -> [Change value of 'maxRepeat']
function wordRepeatChecker()
{
	flaggedWords = [];
  for (x in dict)
  {
    if(!(commonWords.includes(x)) && (dict[x] >= maxRepeat))
    {
      flaggedWords.push(x);
  }
  }
  return 0;
}

//'compileWordsRunner' takes in an essay in the form of a String, and places all of the words in order into an array called wordList. It the nuses helper functions to determine the number of times each word repeats.
//String -> [Change Values in 'dict']
function compileWordsRunner(essay)
{
	essay = essay.replace(/\n/ig," ");

  //splits up input into array where each word is an index
  var wordList = essay.split(" ");

  //for loop designed to make all words in the array completely lowercase
  var x;
  for (x in wordList)
  {
  	wordList[x] = wordList[x].replace(',','');
  	wordList[x] = wordList[x].replace('.','');
  	wordList[x] = wordList[x].replace('(','');
  	wordList[x] = wordList[x].replace('\\','');
  	wordList[x] = wordList[x].replace('/','');
  	wordList[x] = wordList[x].replace(')','');
  	wordList[x] = wordList[x].replace(';','');
  	wordList[x] = wordList[x].replace('\'','');
  	wordList[x] = wordList[x].replace('-','');
  	wordList[x] = wordList[x].replace('?','');
  	wordList[x] = wordList[x].replace('!','');
  	wordList[x] = wordList[x].replace(':','');
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

//The 'flaggedWordsToString' function is designed to take the values from 'flaggedWords' and save
//them to 'repeatedWords' separated by commas.
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