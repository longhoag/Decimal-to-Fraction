const input = document.getElementById('input');
var decimal = false;
var invalid_decimal = false;
var open_paren = false;
var close_paren = false;
var isLetter = false;
var index_1p;
var index_2p;

function output() {
    decimal = false;
    invalid_decimal = false;
    open_paren = false;
    close_paren = false;
    isLetter = false;
    document.getElementById("output").style.marginBottom = "20px";
    document.getElementById("output").style.padding = "4px";
    document.getElementById("output").style.paddingTop = "10px";
    document.getElementById("output").style.paddingBottom = "10px";
}


function gcd(a, b) {
    if (a == 0) {
        return b;
    }
    return gcd(b % a, a);
  };

input.addEventListener('input', handler);
input.addEventListener('keyup', handler)

function handler(e) {
  input.textContent= e.target.value;
  input_number = input.textContent;

  for (i = 0; i < input_number.length; i++) {
    if (input_number[i] == '.') {
        temp = i;
        if (temp + 1 == input_number.length) {
            invalid_decimal = true;
            decimal = false;
        } else {
                decimal = true;
             }
        }

        if (input_number[i] == '(') {
            index_1p = i;
            open_paren = true
          }
      
          if (input_number[i] == ')') {
              index_2p = i;
            close_paren = true
          }
    }

    

    for (i = 0; i < input_number.length; i++) {
        if (input_number[i].match(/[a-z]/i)) {
            isLetter = true;
        }
        else {
            isLetter = false;
        }
    }

    if (isLetter) {
        output();
        document.getElementById("output").innerHTML = "Invalid Input!";
        document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
        return;
    }

    dif = Math.abs(index_1p - index_2p);

    if ((open_paren == true && close_paren == false) || (open_paren == false && close_paren == true) || dif == 1) {
        output();
        document.getElementById("output").innerHTML = "Invalid Input!";
        document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
        return;
    }


    if (invalid_decimal == true) {
        output();
        document.getElementById("output").innerHTML = "Invalid Input!";
        document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
        return;
      }

    
    if (decimal) {
        var parts = input_number.split('.');
        var whole = parts[0]; //-- whole number 
        //whole = parseInt(whole);
  
        var behind_decimal = parts[1];
        
        //-- if there's no parenthesis
        if (open_paren == false && close_paren == false) {

            len = behind_decimal.length;
            deno = Math.pow(10, len);
            
            const case_fraction = {
                numerator: (Number(whole * deno) + Number(behind_decimal)),
                denominator: deno, 
            };

            div = gcd(case_fraction.numerator, case_fraction.denominator);

            case_fraction.numerator = case_fraction.numerator / div;
            case_fraction.denominator = case_fraction.denominator / div;

            output()
            document.getElementById("output").innerHTML = "<p id='numerator'>" + String(case_fraction.numerator) + "</p>" + "<p id='denominator'>" + String(case_fraction.denominator) + "</p>";
            document.getElementById("output").style.backgroundColor = "rgba(0, 255, 0, 0.25)";
            
            return;
              
        }
        
        //-- if there's parenthesis
        else if (open_paren == true && close_paren == true) {
            after_dot = behind_decimal.split('(');

            convertable_num = after_dot[0]; //-- number before looping number 
            power = convertable_num.split('');
            x = power.length;

            denominator_1 = Math.pow(10, x);
            inside = after_dot[1];

            var loop_num = inside.split(')')[0]; //-- loop number 
            var size = loop_num.split('').length;

            const first_fraction = {
                numerator: convertable_num,
                denominator: denominator_1,
            };

            const first_sum_fraction = {
                numerator: Number(whole * first_fraction.denominator) + Number(first_fraction.numerator),
                denominator: denominator_1,
            };

            z1 = Math.pow(10, size);
            const denom_fraction = {
                numerator: z1 - 1,
                denominator: z1,
            };

            const numer_fraction = {
                numerator: loop_num,
                denominator: Math.pow(10, Number(x) + 1),
            };

            const last_fraction = {
                numerator: numer_fraction.numerator * denom_fraction.denominator,
                denominator: numer_fraction.denominator * denom_fraction.numerator,
            };

            const final_fraction = {
                numerator: Number(first_sum_fraction.numerator * last_fraction.denominator) + Number(first_sum_fraction.denominator * last_fraction.numerator),
                denominator: first_sum_fraction.denominator * last_fraction.denominator,
            };
        
            divider = gcd(Number(final_fraction.numerator), Number(final_fraction.denominator));
            
            const result = {
                numerator: final_fraction.numerator / divider,
                denominator: final_fraction.denominator / divider,
            };
            

            document.getElementById("output").innerHTML = "<p id='numerator'>" + String(result.numerator) + "</p>" + "<p id='denominator'>" + String(result.denominator) + "</p>";
            document.getElementById("output").style.backgroundColor = "rgba(0, 255, 0, 0.25)";
            output()
              
        }

    } else if (decimal = false && open_paren == false && close_paren == false) {
        output();
        document.getElementById("output").innerHTML = "This number cannot be futhur simplified";
        document.getElementById("output").style.backgroundColor = "rgba(0, 0, 0, 0.25)";
        return;
        }
    
}
