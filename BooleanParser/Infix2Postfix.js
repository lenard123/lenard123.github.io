//1+0.1(1-0)
var token_position = 0;

function parseAtom(expression)
{
    var is_negative = false;
    var token = expression.charAt(token_position++);

    if (token == '-') {
        is_negative = true;
        token = expression.charAt(token_position++);
    }

    if (token == '(') {
        var res = parseOr(expression);
        if (expression.charAt(token_position) != ')') {
            console.log("Missing Parenthesis");
            return;
        }
        token_position++;
        return res;
    }
    
    if (is_negative) {
        return token == '0' ? 1 : 0;
    }    
    return token == '0' ? 0 : 1;


}

function parseAnd(expression)
{
    var lhs = parseAtom(expression);

    var token = expression.charAt(token_position);

    if (token != '.' && token != '0' && token != '1' && token != '(' && token != '-') 
        return lhs;
    
    if (token == '.') token_position++;
    var rhs = parseAnd(expression);
    if (lhs == '1' && rhs == '1') return 1;
    else return 0;
}

function parseImplication(expression){
    var lhs = parseAnd(expression)
    var token = expression.charAt(token_position)
    if (token != '>') return lhs
    token_position++
    var rhs = parseImplication(expression)
    if (lhs == '1' && rhs == '0') return 0
    else return 1
}

function parseOr(expression)
{
    var lhs = parseImplication(expression);
    var token = expression.charAt(token_position);
    if (token != '+') return lhs;
    token_position++;
    var rhs = parseOr(expression);    


    if (lhs == '1' || rhs == '1') return 1;
    else return 0;

}

function parseExpression(expression)
{
    token_position = 0;
    return(parseOr(expression));
}

