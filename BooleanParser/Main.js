

function submit()
{
    document.getElementById('header').innerHTML = ''
    document.getElementById('rows').innerHTML = ''
    var variables = []
    var matrix = [];
    var expression = document.getElementById('expression').value
    expression = expression.toUpperCase().trim();
    for(var i in expression){
        if (isLetter(expression.charAt(i)) && variables.find((x)=>x==expression.charAt(i)) == undefined) 
            variables.push(expression.charAt(i));
    }
    for(var i = Math.pow(2,variables.length)-1; i >= 0 ; i--)
    {
        matrix.push(binary(i, variables.length));
    }
    
    
    for(var i = 0; i < matrix.length ; i++)
    {
        var temp = expression;
        for (var j = 0; j < variables.length; j++)
        {
            temp = temp.replaceAll(variables[j], matrix[i][j]);
        }
        matrix[i].push(parseExpression(temp));
    }

    var header = document.getElementById('header');    
    for (var i = 0; i < variables.length; i++)
    {
        var h = document.createElement('th');
        h.innerHTML = variables[i];
        header.appendChild(h)
    }
    var res = document.createElement('th');
    res.innerHTML = expression;
    header.appendChild(res)

    var body = document.getElementById('rows'); 
    for (var i = 0; i < matrix.length; i++){
        var col = document.createElement('tr');
        for (var j = 0; j < matrix[i].length; j++){
            var cell = document.createElement('td');
            cell.innerHTML = matrix[i][j];
            col.appendChild(cell);
        }
        body.appendChild(col)
    }   

}

function binary(decimal, length){
    var res = [];
    while(decimal > 0) {
        res.splice(0,0,decimal%2);
        decimal = Math.floor(decimal/2);
    }

    while(res.length < length) {
        res.splice(0,0,0);
    }
    return res

}

function isLetter(x)
{
    return x.toUpperCase() != x.toLowerCase();
}


