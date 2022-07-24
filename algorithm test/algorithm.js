const input = document.getElementById('input');

input.addEventListener('input', handler);
input.addEventListener('keyup', handler)

function handler(e) {
    input.textContent= e.target.value;

    input_number = input.textContent;

    var parts = input_number.split('.');
    
    whole = parts[0]; //-- whole number 
    //whole = parseInt(whole);
    
    behind_decimal = parts[1];
    after_dot = behind_decimal.split('(');

    convertable_num = after_dot[0]; //-- number before looping number 
    power = convertable_num.split('');
    x = power.length;

    denominator_1 = Math.pow(10, x);
    inside = after_dot[1];

    loop_num = inside.split(')')[0]; //-- loop number 
    size = loop_num.split('').length;

    const first_fraction = {
        numerator: convertable_num,
        denominator: denominator_1,
    };

    y1 = Number(whole * first_fraction.denominator) + Number(first_fraction.numerator);

    const first_sum_fraction = {
        numerator: y1,
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

   

    function gcd(a, b) {
        if (a == 0) {
            return b;
        }
        return gcd(b % a, a);
    };

    divider = gcd(Number(final_fraction.numerator), Number(final_fraction.denominator));
 
    const result = {
        numerator: final_fraction.numerator / divider,
        denominator: final_fraction.denominator / divider,
    };

//   if (isNaN(num)) {
//     document.getElementById("output").innerHTML = "Invalid Input!";
//     document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
//   }
//   else{
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0)";

    if (e.keyCode === 13 || e.keyCode === 76) {
        document.getElementById("output").innerHTML = String(result.numerator) + "/" + String(result.denominator) ;
        document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0)";
      }
    }
  
//}