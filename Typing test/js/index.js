var toType= [];
var currentQuote = 0;
var misstypes = 0;
var toGenerate = 0;
var setLength = 0;
var hasGenerated = 0;
var t;
var timekeep = false;
var clicks = 0;
var timepoint = 0;
var clicksecond = 0;

//calculates wpm and cpm
function add()
{
    if(timekeep == true)
    {
        timepoint++
        clicksecond = clicks/timepoint
        console.log(clicks);
        if(toType[0].length == 0)
        {
            var n = clicksecond.toFixed(2);
            document.getElementById('Clicksec').innerHTML = n;
            
            timekeep = false;
        }
    }
}
    t = setInterval(add, 1000);

//generates the new quotes to be typed
function generateWords()
{
    toType.length=0;
    setLength = 0;
    hasGenerated = 0;
    toGenerate = document.getElementById('Generator').value;
    for (i = 0; i < toGenerate; i++) 
    {
        const quotes = document.querySelector('.generated_text');
        let wordz = new XMLHttpRequest();
        quotes.innerHTML = '';

        wordz.onreadystatechange = e =>{    
            if(wordz.readyState == 4)
            if(wordz.status == 200)
            {
                const data = JSON.parse(wordz.response);
                quotes.innerHTML += data.content;
                quotes.innerHTML += '<br><br>';
                toType.push(data.content.split(''));
                hasGenerated++;
                
                setLength += toType[hasGenerated-1].length;
                document.getElementById('WordsSetCount').innerHTML = setLength;
                
            }
        }
        wordz.open('GET', 'https://api.quotable.io/random')
        wordz.send();
    }
}
  
//creates array of characters to type

//Checks what key is clicked
function myKeyPress(e)
{
    var keynum;
    if(window.event || e.which) 
    {               
        //timer;
        keynum = e.keyCode;
        keynum = e.which;
        if(toType[currentQuote][0] != String.fromCharCode(keynum) && keynum != '13' )
        {
            misstypes++
            document.getElementById('mistakes-count').innerHTML = misstypes;
        }
        if(toType[currentQuote][0] == String.fromCharCode(keynum))
        {
            toType[currentQuote].shift();
            timekeep = true;
            clicks++;
        }

        if(toType[currentQuote].length == 0 && keynum == '13')
        {
            document.getElementById('text-place').value = '';
            currentQuote ++;
        }
        console.log(toType[currentQuote]);
    }
}
