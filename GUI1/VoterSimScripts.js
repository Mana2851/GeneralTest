$( document ).ready(function() {
    console.log( "true" );
$('#OuterBox').append(`<div id = \"addNewPerson\"><button type =\"button\" onclick=\"addBar()\"> Add New Candidate </button> <input id= \"add\" type=\"text\" name=\"newCandidate\">
	</div>
    <div id =\"addNewPerson"\"><button type =\"button\" onclick=\"removeBar()\"> Remove Old Candidate </button> <input id= \"remove\" type=\"text\" name=\"newCandidate\">
	</div>`);
})

let VoteTotal = 0;
let allCandidates= [];
let candidatesVotes =[];
let count = 0;


// so there is not an onclick call to the removeBar()

function randomColors()
// This function causes the different bars for the candidates to have random colors
// This randomizing effect causes the different candidates to be more easily seen in the bar graph 
{
    var round = Math.round;
	var rand= Math.random;
	var size = 350; // the size of the color selection the higher the more color selection, the lower the more grey colors
    return 'rgba(' + round(rand()*size) + ',' + round(rand()*size) + ',' + round(rand()*size) + ',' + rand().toFixed(1) + ')';
}

function checkForCand(c){
    return jQuery.inArray(c,allCandidates);
}

function AddVote(n)
{
    if (n>-1)
	{
        allCandidates.splice(n,1);
        candidatesVotes.splice(n,1);
    }
}

function addBar()
// This function adds a bar when called, essentially adding a new candidate 
{
    candidate = $("#add").val();
    candidate = candidate.replace(" ", "_");
    let foundCandidate = checkForCand(candidate);
    if(foundCandidate==-1)
	{
		// Adding a Div for a new bar without using onclick in the html file
        html= `<div id = "${candidate}" onclick=\"AddVote('${candidate}')\"><h1 id =\"text\">${candidate.replace("_", " ")}</h1></div>`;
        $("#InnerBox").append(html);
        allCandidates.push(candidate);
        candidatesVotes.push(0);
        width = getBarWidth();
		// adds a style to the bar for the candidate
		$("#"+candidate).css(
		{
			"position": "relative",
			"height":"10%",
			"background-color": randomColors(),
			"transition-property" : ["width", "height"],
			"transition-duration" : "300ms",   
		})
    }
    else{
		// Creates a pop up when a candidate is already in the list of candidates
        alert(`${candidate.replace("_", " ")} already exists.`);
        VoteTotal -= candidatesVotes[foundCandidate];
        candidatesVotes[foundCandidate]=0;  
    }
    changeBarLen();
}

function getBarWidth()
// This function gets the bar width 
{
    return $("#innerBox").width();
}

function removeBar()
// Removes bar from graph when called. 
// takes away the candidate from the bar graph
{
    candidate = $("#remove").val();
    candidate = candidate.replace(" ", "_");
    let foundCandidate = checkForCand(candidate)
    if(foundCandidate ==-1)
	{
		// If a candidate has been made before
		alert(candidate  + ' cannot be removed.')
	}
    $(`#${candidate}`).remove()
    AddVote(foundCandidate)
    VoteTotal = calculateTotal()
    changeBarLen()
}

function AddVote(a)
// Updates votes when called. Adds a single vote when called to the appropriate candidate
{
    let index = checkForCand(a)
    //console.log(a)
    candidatesVotes[index] += 1
    VoteTotal++ // increment total votes by one
    changeBarLen()

}

function changeBarLen()
{
    for (var i = 0; i < allCandidates.length; i++) 
	{
        // alters the indexes of arrays. 0 to 5
        if(candidatesVotes[i] ==0 )
		{
			// Refer back to the style sheet
            $(`#${allCandidates[i]}`).css("width", "10px")
        }
        else 
		{
            var t = (candidatesVotes[i])/(VoteTotal) *100
            let dim = t + "%"
			// Refer back to the style sheet
            $(`#${allCandidates[i]}`).css("width", dim)
        }
    }
}

function calculateTotal()
// This function simply calculates the total amount of votes for the candidate 
{
    return candidatesVotes.reduce((a, b) => a + b, 0)
}

alert("Click on the bar to vote for the candidate you wish to support")
if(allCandidates.length>10)
{
	// Box holds up to 10 candidates without moving out of the inner box
    alert("No more than 10 candidates. Else it gets a little strange")
}