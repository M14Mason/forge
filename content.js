/* Forge extra content: story lessons, quizzes, labs, new lessons, mini projects, more projects.
   Quiz format: concept = {id, s: scene index that teaches it, n: name, fix: default one-line fix, q: [[format, question, [choices], fix?], ...]}
   The FIRST choice is always the right answer (choices get shuffled on screen).
   Formats: scn scenario, def definition, term name-the-term, tf true/false, calc calculation / what prints, not which-is-NOT. */
window.FORGE_EXTRA = (function () {
const stories = {};

/* ---------------- 1. print ---------------- */
stories.print = {
  scenes: [
    { a: 'code', p: { lines: ['print("Portfolio value:")', 'print(10000)'], out: ['Portfolio value:', '10000'] }, cap: '**print()** shows a value on the screen. It is how your code talks to you.' },
    { a: 'vs', p: { l: { t: 'String', code: '"25000"', n: 'In quotes = text' }, r: { t: 'Number', code: '25000', n: 'No quotes = math works' } }, cap: 'Quotes make a **string** (text). No quotes make a number.' },
    { a: 'code', p: { lines: ['print("AAPL", 5 * 2)'], out: ['AAPL 10'] }, cap: 'Commas separate items, and print puts **one space** between them.' },
    { a: 'eval', p: { rows: ['print("Total:", 12 * 150)', 'print("Total:", 1800)', 'Total: 1800'] }, cap: 'Python does the **math first**, then prints the answer.' },
    { a: 'code', p: { lines: ['# a note for humans', 'print("Hi")'], out: ['Hi'] }, cap: 'A line starting with # is a **comment**. Python skips it.' },
    { a: 'vs', p: { l: { t: 'Works', code: 'print("Hi")' }, r: { t: 'Crashes', code: 'Print("Hi")', n: 'NameError' } }, cap: 'Python is **case-sensitive**: print works, Print crashes.' }
  ],
  concepts: [
    { id: 'show', s: 0, n: 'What print does', fix: 'print only displays a value. Each print() starts a new line.', q: [
      ['def', 'What does `print()` do?', ['Shows a value on the screen', 'Saves a value to a file', 'Stores a value in a variable', 'Sends a value to the internet']],
      ['calc', 'What shows on screen?\n```\nprint(10000)\nprint(7)\n```', ['10000 and 7 on separate lines', '10000 7 on one line', '100007', 'Only 7'], 'Each print() call starts its own line.'],
      ['scn', 'Your program should show the word Done when it finishes. Which line does that?', ['print("Done")', '"Done"', 'show("Done")', 'print(Done)'], 'Text needs quotes, and print() is what shows it.']
    ] },
    { id: 'str', s: 1, n: 'Strings vs numbers', fix: 'Quotes = text (string). No quotes = a number you can do math with.', q: [
      ['def', 'What makes `"25000"` a string?', ['The quotes around it', 'It is a big number', 'It has no decimal point', 'print() turns it into one']],
      ['term', 'Text in quotes, like `"AAPL"`, is called a...', ['String', 'Number', 'Comment', 'Function']],
      ['not', 'Which one is NOT a number?', ['"0.07"', '0.07', '25000', '150'], '"0.07" has quotes, so it is text even though it looks like a number.']
    ] },
    { id: 'comma', s: 2, n: 'Commas in print', fix: 'A comma inside print() becomes one space in the output.', q: [
      ['calc', 'What does `print("AAPL", 5 * 2)` show?', ['AAPL 10', 'AAPL 5 * 2', 'AAPL10', 'Error']],
      ['calc', 'What does `print("Shares:", 40)` show?', ['Shares: 40', 'Shares:40', '"Shares:" 40', 'Shares: , 40']],
      ['tf', 'True or false: `print("A", "B")` shows AB with no space.', ['False', 'True']]
    ] },
    { id: 'math', s: 3, n: 'Math runs first', fix: 'With no quotes, Python computes the math, then prints the result.', q: [
      ['calc', 'What does `print(12 * 150)` show?', ['1800', '12 * 150', '12150', '"1800"']],
      ['calc', 'What does `print("12 * 150")` show?', ['12 * 150', '1800', 'Error', '12150'], 'Inside quotes it is just text, so no math happens.'],
      ['scn', 'A client has 40 shares at $25. Which line prints the dollar value?', ['print(40 * 25)', 'print("40 * 25")', 'print(40, 25)', 'print(40 + 25)'], 'Value = shares x price, with no quotes so the math runs.']
    ] },
    { id: 'comment', s: 4, n: 'Comments', fix: '# starts a comment: a note for humans that Python skips.', q: [
      ['def', 'What does Python do with a line that starts with `#`?', ['Skips it', 'Prints it', 'Crashes', 'Runs it twice']],
      ['term', 'A note in your code that Python skips is called a...', ['Comment', 'String', 'Variable', 'Hint']],
      ['calc', 'What shows?\n```\n# print("A")\nprint("B")\n```', ['B', 'A then B', 'A', 'Nothing']]
    ] },
    { id: 'case', s: 5, n: 'Case-sensitive', fix: 'Capital letters matter. print works, Print does not.', q: [
      ['tf', 'True or false: `Print("Hi")` works the same as `print("Hi")`.', ['False', 'True']],
      ['not', 'Which line does NOT crash?', ['print("Hi")', 'Print("Hi")', 'PRINT("Hi")', 'print(Hi")']],
      ['term', 'Python treating `price` and `Price` as different names is called being...', ['Case-sensitive', 'Indented', 'Commented', 'Formatted']]
    ] }
  ]
};

/* ---------------- 2. vars ---------------- */
stories.vars = {
  lab: 'compound',
  scenes: [
    { a: 'box', p: { items: [['balance', '10000', 'int'], ['rate', '0.07', 'float']] }, cap: 'A **variable** is a labeled box that stores a value.' },
    { a: 'eval', p: { rows: ['balance = balance * 1.07', 'balance = 10000 * 1.07', 'balance = 10700.0'] }, cap: 'The = sign means **store**: work out the right side, then save it on the left.' },
    { a: 'table', p: { rows: [['2 ** 3', '8', 'power'], ['7 / 2', '3.5', 'divide'], ['7 // 2', '3', 'drop the decimal'], ['7 % 2', '1', 'remainder']] }, cap: '`**` is **power**, `//` drops the decimal, `%` gives the remainder.' },
    { a: 'eval', p: { rows: ['1000 * (1 + 0.07) ** 2', '1000 * 1.07 ** 2', '1000 * 1.1449', '1144.9'] }, cap: 'Python does `**` before `*`, so the power runs **first**.' },
    { a: 'bars', p: { data: [['Y0', 1000, '$1,000'], ['Y1', 1070, '$1,070'], ['Y2', 1145, '$1,145'], ['Y3', 1225, '$1,225'], ['Y4', 1311, '$1,311'], ['Y5', 1403, '$1,403']] }, cap: 'Each year grows the new balance, so growth speeds up. That is **compounding**.' },
    { a: 'code', p: { lines: ['balance = 5618.0', 'print(f"Value: ${balance:,.2f}")'], out: ['Value: $5,618.00'] }, cap: 'An **f-string** drops variables into text. :,.2f adds commas and 2 decimals.' }
  ],
  concepts: [
    { id: 'var', s: 0, n: 'Variables', fix: 'A variable is a labeled box: name on the left, value inside.', q: [
      ['def', 'What is a variable?', ['A name that stores a value', 'A number that never changes', 'A line Python skips', 'A type of loop']],
      ['scn', 'You want to keep a balance of 25000 to use later. Which line does that?', ['balance = 25000', '25000 = balance', 'print(25000)', 'balance == 25000'], 'Name on the left, value on the right, one = sign.'],
      ['term', 'In `rate = 0.07`, the name rate is a...', ['Variable', 'String', 'Function', 'Comment']]
    ] },
    { id: 'assign', s: 1, n: '= means store', fix: 'The right side runs first using the old value, then = stores the result.', q: [
      ['calc', 'What prints?\n```\nx = 10\nx = x * 2\nx = x - 5\nprint(x)\n```', ['15', '10', '20', '5'], 'Line by line: 10, then 20, then 15.'],
      ['def', 'What does `balance = balance * 1.07` do?', ['Multiplies the old balance by 1.07 and stores it back', 'Checks if balance equals balance * 1.07', 'Crashes because balance is on both sides', 'Prints the new balance']],
      ['tf', 'True or false: in Python, = means "is equal to", like in math.', ['False', 'True'], '= stores a value. Comparing uses ==.']
    ] },
    { id: 'ops', s: 2, n: 'Math operators', fix: '** is power, / divides, // drops the decimal, % is the remainder.', q: [
      ['calc', 'What is `2 ** 3`?', ['8', '6', '5', '9'], '** is power: 2 x 2 x 2 = 8. 2 x 3 = 6 is the multiply mistake.'],
      ['calc', 'What is `7 // 2`?', ['3', '3.5', '1', '4'], '// divides and drops the decimal. 1 would be the remainder (%).'],
      ['not', 'Which is NOT true?', ['`7 % 2` is 3.5', '`7 / 2` is 3.5', '`7 // 2` is 3', '`7 % 2` is 1'], '% gives the remainder, which is 1. Plain / gives 3.5.']
    ] },
    { id: 'order', s: 3, n: 'Order of operations', fix: '** runs before * and /, which run before + and -.', q: [
      ['calc', 'What is `1000 * 1.1 ** 2`?', ['1210.0', '1210000.0', '2200.0', '12100.0'], '1.1 ** 2 = 1.21 first, then 1000 x 1.21. Doing 1000 x 1.1 first gives 1210000.'],
      ['scn', '$1,000 grows at 7% for 2 years. Which line is right?', ['1000 * (1 + 0.07) ** 2', '1000 * 1 + 0.07 ** 2', '1000 * 0.07 ** 2', '(1000 * 1.07) * 2'], 'Grow by (1 + rate), raised to the number of years.'],
      ['tf', 'True or false: `2 + 3 * 4` is 20 because Python goes left to right.', ['False', 'True'], '* runs before +, so it is 2 + 12 = 14.']
    ] },
    { id: 'compound', s: 4, n: 'Compounding', fix: 'Each year multiplies the NEW balance, so the gains get bigger every year.', q: [
      ['scn', '$1,000 at 10% a year. How much after 2 years?', ['$1,210', '$1,200', '$1,100', '$1,020'], 'Year 1: 1,100. Year 2: 1,100 x 1.10 = 1,210. 1,200 is simple interest, not compounding.'],
      ['term', 'Earning returns on your past returns is called...', ['Compounding', 'Rebalancing', 'Indexing', 'Diversifying']],
      ['tf', 'True or false: with compounding, the dollar gain is the same every year.', ['False', 'True'], 'The base keeps growing, so each year adds more dollars.']
    ] },
    { id: 'fstr', s: 5, n: 'f-strings', fix: 'f"...{x:,.2f}" puts x in the text with commas and 2 decimals.', q: [
      ['calc', 'What does `print(f"${1234.5:,.2f}")` show?', ['$1,234.50', '$1234.5', '$1,234.5', '{1234.5:,.2f}'], 'The comma adds commas and .2f forces exactly 2 decimals.'],
      ['term', 'Text with an f before the quotes, like `f"Value: {x}"`, is called an...', ['f-string', 'f-function', 'float', 'f-error']],
      ['not', 'In `{balance:,.2f}`, which is NOT what a part does?', ['f means function', 'the comma adds commas', '.2 means 2 decimals', 'the braces hold the variable'], 'The f in .2f means fixed decimal places, not function.']
    ] }
  ]
};

/* ---------------- 3. input ---------------- */
stories.input = {
  scenes: [
    { a: 'code', p: { lines: ['age = input("Age? ")', 'print(age)'], out: ['Age? 16', '16'] }, cap: '**input()** waits for the user to type, then gives back what they typed.' },
    { a: 'box', p: { items: [['age', '"16"', 'str']] }, cap: 'What input() gives back is ALWAYS a **string**, even when they type a number.' },
    { a: 'vs', p: { l: { t: 'Strings glue', code: '"5" + "5"', n: '= "55"' }, r: { t: 'Numbers add', code: '5 + 5', n: '= 10' } }, cap: 'Adding two strings **glues** them together. That is the classic input bug.' },
    { a: 'machine', p: { name: 'int()', ins: ['"16"'], out: '16' }, cap: 'Fix it with **type conversion**: int("16") turns text into the number 16.' },
    { a: 'vs', p: { l: { t: 'int()', code: 'int("16")', n: '16, a whole number' }, r: { t: 'float()', code: 'float("0.07")', n: '0.07, a decimal' } }, cap: 'Use int() for whole numbers and **float()** for decimals like 0.07.' },
    { a: 'code', p: { lines: ['amt = float(input("Amount? "))', 'print(amt * 2)'], out: ['Amount? 50', '100.0'] }, cap: 'Convert the input **right away**, then the math is safe.' }
  ],
  concepts: [
    { id: 'wait', s: 0, n: 'What input does', fix: 'input() shows the prompt, pauses, and returns what the user typed.', q: [
      ['def', 'What does `input("Years? ")` do?', ['Shows the question and waits for the user to type', 'Prints a random number of years', 'Converts years to a number', 'Saves years to a file']],
      ['tf', 'True or false: input() keeps running the next lines while the user is still typing.', ['False', 'True'], 'input() pauses the program until the user presses Enter.'],
      ['scn', 'Your program must ask the client for their name. Which line?', ['name = input("Name? ")', 'name = print("Name? ")', 'input = "Name? "', 'name = "input"']]
    ] },
    { id: 'always', s: 1, n: 'input() returns a string', fix: 'input() ALWAYS returns a string, even for digits. You convert it yourself.', q: [
      ['scn', 'The user types 16 into `age = input("Age? ")`. What is age?', ['"16", a string', '16, a number', '16.0, a float', 'Error']],
      ['tf', 'True or false: if the user types 0.07, input() returns the number 0.07.', ['False', 'True']],
      ['def', 'What type does input() return?', ['Always a string', 'Always an int', 'Always a float', 'It depends on what they type']]
    ] },
    { id: 'glue', s: 2, n: 'Strings glue', fix: '+ on strings glues text together. Convert to numbers before adding.', q: [
      ['calc', 'What does `print("10" + "5")` show?', ['105', '15', 'Error', '10 5']],
      ['scn', 'A user types 5 and 5 into two input() calls and your program prints 55. Why?', ['The inputs are strings, so + glued them', '+ is broken in Python', 'The user typed 55', 'input() doubles the number']],
      ['calc', 'What is `"3" + "4"`?', ['"34"', '7', '"7"', 'Error']]
    ] },
    { id: 'convert', s: 3, n: 'Type conversion', fix: 'Wrap the text in int() or float() to turn it into a number.', q: [
      ['calc', 'What is `int("16") + 4`?', ['20', '"164"', '164', 'Error']],
      ['term', 'Changing "16" into 16 with int() is called...', ['Type conversion', 'Indexing', 'Formatting', 'Commenting']],
      ['scn', 'Which line correctly adds 1 to an age the user typed?', ['age = int(input("Age? ")) + 1', 'age = input("Age? ") + 1', 'age = int(input("Age? ") + 1)', 'age = input(int("Age? ")) + 1'], 'Convert the input first, then do the math outside the int().']
    ] },
    { id: 'intfloat', s: 4, n: 'int vs float', fix: 'int() for whole-number text, float() for decimals like "0.07".', q: [
      ['scn', 'The user types a rate like 0.07. Which converts it correctly?', ['float(r)', 'int(r)', 'str(r)', 'round(r)']],
      ['calc', 'What is `float("2.5") * 2`?', ['5.0', '"2.52.5"', 'Error', '4']],
      ['not', 'Which is NOT a correct conversion?', ['int("3.5") gives 3.5', 'int("3") gives 3', 'float("3.5") gives 3.5', 'float("3") gives 3.0'], 'int() needs whole-number text. "3.5" needs float().']
    ] }
  ]
};

/* ---------------- 4. if ---------------- */
stories.if = {
  scenes: [
    { a: 'flow', p: { val: 'score = 6', checks: [['if score >= 8:', false], ['elif score >= 4:', true], ['else:', null]], out: 'prints Moderate' }, cap: '**if / elif / else** checks top to bottom and runs only the first true block.' },
    { a: 'flow', p: { val: 'score = 9', checks: [['if score >= 8:', true], ['elif score >= 4:', true], ['else:', null]], out: 'prints Aggressive' }, cap: 'Even if a later check is also true, **only one** block runs.' },
    { a: 'vs', p: { l: { t: 'Inside the if', code: 'if r > 0:\n    print("gain")', n: 'Runs only when r > 0' }, r: { t: 'After the if', code: 'if r > 0:\n    print("gain")\nprint("done")', n: '"done" always runs' } }, cap: 'The colon and 4-space **indentation** mark what is inside the if.' },
    { a: 'vs', p: { l: { t: '= stores', code: 'x = 5', n: 'Puts 5 in x' }, r: { t: '== compares', code: 'x == 5', n: 'Gives True or False' } }, cap: '= stores a value. **==** asks a question: are these equal?' },
    { a: 'table', p: { rows: [['5 > 3', 'True', 'greater than'], ['5 >= 5', 'True', 'greater or equal'], ['5 != 5', 'False', 'not equal'], ['0.08 > 0.10', 'False', 'decimals work too']] }, cap: 'Comparisons give **True or False**, and if uses that to decide.' },
    { a: 'flow', p: { val: 'r = -0.05', checks: [['if r > 0.10:', false], ['elif r > 0:', false], ['else:', null]], out: 'prints No gain' }, cap: 'If nothing above is true, **else** catches everything left.' }
  ],
  concepts: [
    { id: 'first', s: 1, n: 'Only the first true block runs', fix: 'Python stops at the first true condition and skips the rest.', q: [
      ['calc', 'What prints?\n```\nscore = 9\nif score >= 8:\n    print("A")\nelif score >= 4:\n    print("B")\nelse:\n    print("C")\n```', ['A', 'A then B', 'B', 'C']],
      ['tf', 'True or false: in if / elif / else, every block whose condition is true runs.', ['False', 'True']],
      ['scn', 'score = 5. The checks are `if score >= 8`, `elif score >= 4`, `else`. Which block runs?', ['The elif', 'The if', 'The else', 'All of them']]
    ] },
    { id: 'else', s: 5, n: 'else', fix: 'else has no condition. It runs when nothing above it was true.', q: [
      ['calc', 'r = -0.05. `if r > 0.10:` prints Beat, `elif r > 0:` prints Positive, `else:` prints No gain. What prints?', ['No gain', 'Positive', 'Beat', 'Nothing']],
      ['def', 'When does the else block run?', ['When no condition above it was true', 'Always, after the if', 'Only when the if was true', 'Never when there is an elif']],
      ['not', 'Which is NOT true about else?', ['It needs its own condition, like `else r < 0:`', 'It goes last', 'It has no condition', 'It runs when nothing above was true'], 'else never takes a condition. Use elif for that.']
    ] },
    { id: 'indent', s: 2, n: 'Indentation', fix: 'Lines indented 4 spaces under the if are inside it. The colon starts the block.', q: [
      ['def', 'How does Python know a line is inside the if?', ['It is indented under it', 'It ends with a semicolon', 'It is in quotes', 'It comes after a comment']],
      ['not', 'Which is NOT required for an if statement?', ['A semicolon at the end', 'A condition', 'A colon after the condition', 'Indented lines under it']],
      ['calc', 'r = -1. What prints?\n```\nif r > 0:\n    print("gain")\nprint("done")\n```', ['done', 'gain then done', 'gain', 'Nothing'], 'done is not indented, so it runs no matter what.']
    ] },
    { id: 'eqeq', s: 3, n: '= vs ==', fix: '= stores a value. == compares and gives True or False.', q: [
      ['scn', 'You want to check if r is exactly 0. What goes after `if`?', ['r == 0', 'r = 0', 'r === 0', 'r equals 0']],
      ['tf', 'True or false: `if price = 100:` checks whether price is 100.', ['False', 'True'], 'That is a syntax error. Comparing needs ==.'],
      ['term', '`==` is called the...', ['Equality comparison', 'Assignment', 'Double store', 'Power operator']]
    ] },
    { id: 'compare', s: 4, n: 'Comparisons', fix: 'A comparison gives True or False. != means not equal.', q: [
      ['calc', 'What is `5 >= 5`?', ['True', 'False', '5', 'Error'], '>= means greater OR equal, and 5 equals 5.'],
      ['calc', 'What is `0.08 > 0.10`?', ['False', 'True', '0.02', 'Error']],
      ['term', 'Which operator means "not equal"?', ['!=', '=!', '<>', '=/=']]
    ] }
  ]
};

/* ---------------- 5. func ---------------- */
stories.func = {
  scenes: [
    { a: 'machine', p: { name: 'grow(balance, rate)', ins: ['1000', '0.07'], out: '1070.0' }, cap: 'A **function** is a reusable machine: inputs go in, a result comes out.' },
    { a: 'code', p: { lines: ['def grow(balance, rate):', '    return balance * (1 + rate)'] }, cap: 'You **define** it once with def, a name, and a colon.' },
    { a: 'code', p: { lines: ['a = grow(1000, 0.07)', 'b = grow(5000, 0.10)', 'print(a, b)'], out: ['1070.0 5500.0'] }, cap: 'Then **call** it as many times as you want, with different inputs.' },
    { a: 'box', p: { items: [['balance', '1000', 'parameter'], ['rate', '0.07', 'parameter']] }, cap: 'The names in the parentheses are **parameters**: the inputs it expects.' },
    { a: 'vs', p: { l: { t: 'return', code: 'def f(x):\n    return x * 2\n\ny = f(3)', n: 'y is 6. You can use it.' }, r: { t: 'print', code: 'def f(x):\n    print(x * 2)\n\ny = f(3)', n: 'Shows 6, but y is None.' } }, cap: '**return** hands a value back. print only shows it.' },
    { a: 'big', p: { t: 'None', s: 'what you get back when there is no return' }, cap: 'No return line means the function gives back **None**.' }
  ],
  concepts: [
    { id: 'what', s: 0, n: 'What a function is', fix: 'A function is reusable code: define once, call many times.', q: [
      ['def', 'What is a function?', ['A reusable block of code you can call', 'A variable that holds text', 'A loop that never ends', 'A comment for other coders']],
      ['scn', 'You need the same growth formula in 5 places. Best move?', ['Write it once as a function and call it 5 times', 'Copy and paste it 5 times', 'Put it in a comment', 'Write it as a string']],
      ['tf', 'True or false: a function can be used with different inputs each time.', ['True', 'False']]
    ] },
    { id: 'defcall', s: 2, n: 'Define vs call', fix: 'def only creates the function. It runs when you call it, like grow(1000, 0.07).', q: [
      ['calc', 'What prints?\n```\ndef hi():\n    print("hi")\n```', ['Nothing, it is defined but never called', 'hi', 'None', 'Error']],
      ['term', 'Running a function, like `grow(1000, 0.07)`, is called...', ['Calling it', 'Defining it', 'Importing it', 'Returning it']],
      ['not', 'Which is NOT part of defining a function?', ['A semicolon after the name', 'The word def', 'Parentheses for the parameters', 'A colon and an indented body']]
    ] },
    { id: 'params', s: 3, n: 'Parameters', fix: 'Parameters are the input names in the parentheses. Calls fill them in order.', q: [
      ['term', 'In `def grow(balance, rate):`, balance and rate are...', ['Parameters', 'Return values', 'Strings', 'Comments']],
      ['calc', 'grow is `return balance * (1 + rate)`. What does `grow(2000, 0.5)` return?', ['3000.0', '2000.5', '1000.0', '2500.0']],
      ['tf', 'True or false: parameters are the inputs a function expects.', ['True', 'False']]
    ] },
    { id: 'return', s: 4, n: 'return vs print', fix: 'return hands a value back so you can store it. print only shows it on screen.', q: [
      ['calc', 'What prints?\n```\ndef f(x):\n    print(x * 2)\n\ny = f(3)\nprint(y)\n```', ['6 then None', '6 then 6', 'None', '6']],
      ['scn', 'You want `total = fee(500)` to store a number. Inside fee you must...', ['return the number', 'print the number', 'remove the parameters', 'use input()']],
      ['def', 'What does return do?', ['Sends a value back to whoever called the function', 'Shows text on screen', 'Restarts the function', 'Ends the whole program']]
    ] },
    { id: 'none', s: 5, n: 'None', fix: 'With no return, a function gives back None, Python for "nothing".', q: [
      ['calc', 'A function has no return line. What does calling it give back?', ['None', '0', 'An error', 'The last number it used']],
      ['tf', 'True or false: a function without return gives back 0.', ['False', 'True']],
      ['term', 'The special value that means "nothing" in Python is...', ['None', 'null', '0', 'empty']]
    ] }
  ]
};

/* ---------------- 6. for ---------------- */
stories.for = {
  scenes: [
    { a: 'loop', p: { head: 'for year in range(1, 4):\n    print("Year", year)', items: ['1', '2', '3'], outs: ['Year 1', 'Year 2', 'Year 3'] }, cap: 'A **for loop** runs the indented code once for each value.' },
    { a: 'list', p: { name: 'range(5)', items: ['0', '1', '2', '3', '4'] }, cap: 'range(5) gives **0 to 4**. It starts at 0 and stops before 5.' },
    { a: 'vs', p: { l: { t: 'range(5)', code: '0 1 2 3 4' }, r: { t: 'range(1, 4)', code: '1 2 3', n: 'the end is NOT included' } }, cap: 'With two numbers, range starts at the first and **stops before** the second.' },
    { a: 'loop', p: { head: 'for year in range(1, 4):\n    balance = balance * 1.10', items: ['year 1', 'year 2', 'year 3'], acc: 'balance', start: '1000', vals: ['1100.0', '1210.0', '1331.0'] }, cap: 'Each pass updates the balance. That is how you **simulate** growth.' },
    { a: 'vs', p: { l: { t: 'Inside: repeats', code: 'for i in range(3):\n    print("hi")', n: 'hi x 3' }, r: { t: 'Outside: once', code: 'for i in range(3):\n    x = i\nprint("hi")', n: 'hi x 1' } }, cap: '**Indentation** decides which lines repeat.' }
  ],
  concepts: [
    { id: 'loop', s: 0, n: 'What a for loop does', fix: 'A for loop runs its indented body once per value.', q: [
      ['def', 'What does a for loop do?', ['Repeats the indented code once per value', 'Runs code only if something is true', 'Stops the program', 'Stores many values']],
      ['calc', 'How many times does hi print?\n```\nfor i in range(4):\n    print("hi")\n```', ['4', '3', '5', '1']],
      ['scn', 'You need one printed line for each of 30 years. Best tool?', ['A for loop with range', '30 print() lines', 'An if statement', 'input()']]
    ] },
    { id: 'range1', s: 1, n: 'range(n)', fix: 'range(n) starts at 0 and stops BEFORE n.', q: [
      ['calc', 'What numbers does `range(5)` give?', ['0, 1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4, 5', '5']],
      ['calc', 'What prints?\n```\nfor i in range(3):\n    print(i)\n```', ['0 1 2, one per line', '1 2 3', '0 1 2 3', '3']],
      ['tf', 'True or false: range(5) includes 5.', ['False', 'True']]
    ] },
    { id: 'range2', s: 2, n: 'range(start, end)', fix: 'range(a, b) starts at a and stops before b. Go one past the last number you want.', q: [
      ['calc', 'What does `range(1, 4)` give?', ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '4']],
      ['scn', 'You want years 1 through 10. Which range?', ['range(1, 11)', 'range(1, 10)', 'range(10)', 'range(0, 10)']],
      ['not', 'Which is NOT true about range(2, 5)?', ['It includes 5', 'It starts at 2', 'It gives 3 numbers', 'It stops before 5']]
    ] },
    { id: 'accum', s: 3, n: 'Updating inside a loop', fix: 'Each pass multiplies the NEW balance from the pass before.', q: [
      ['calc', 'What prints?\n```\nbalance = 100\nfor y in range(2):\n    balance = balance * 2\nprint(balance)\n```', ['400', '200', '100', '800']],
      ['scn', '$1,000 grows 10% a year for 3 years in a loop. Final balance?', ['1331.0', '1300.0', '1100.0', '3300.0'], 'Each year multiplies the new balance: 1100, 1210, 1331. 1300 is simple interest.'],
      ['tf', 'True or false: each pass of the loop starts again from the original balance.', ['False', 'True']]
    ] },
    { id: 'indent', s: 4, n: 'What repeats', fix: 'Only lines indented under the for repeat. The next unindented line runs once, after.', q: [
      ['calc', 'How many times does done print?\n```\nfor i in range(3):\n    print("x")\nprint("done")\n```', ['1', '3', '4', '0']],
      ['def', 'What decides which lines repeat in a loop?', ['Indentation under the for', 'Where the comments are', 'How long the line is', 'The quotes']],
      ['tf', 'True or false: a line that is NOT indented under the for runs once, after the loop.', ['True', 'False']]
    ] }
  ]
};

/* ---------------- 7. while ---------------- */
stories.while = {
  lab: 'payoff',
  scenes: [
    { a: 'loop', p: { head: 'while balance < 2000:\n    balance = balance * 1.07\n    years = years + 1', items: ['True', 'True', 'True', '...', 'False'], acc: 'years', start: '0', vals: ['1', '2', '3', '...', '11, stop'] }, cap: 'A **while loop** repeats as long as its condition is True.' },
    { a: 'vs', p: { l: { t: 'for', code: 'for y in range(30):', n: 'You know the count' }, r: { t: 'while', code: 'while balance < goal:', n: 'You do NOT know the count' } }, cap: 'Use while when you **do not know** how many loops you need.' },
    { a: 'code', p: { lines: ['years = 0', 'while balance < goal:', '    years = years + 1'], out: ['...never stops'] }, cap: 'balance never changes here, so this is an **infinite loop**.' },
    { a: 'code', p: { lines: ['while True:', '    balance = balance * 1.07', '    if balance > 2000:', '        break'] }, cap: '**break** exits the loop immediately.' },
    { a: 'big', p: { t: '11 years', s: 'for $1,000 at 7% to reach $2,000' }, cap: 'Counting passes answers real questions like **time to double**.' }
  ],
  concepts: [
    { id: 'cond', s: 0, n: 'How while runs', fix: 'while checks the condition before every pass and stops the first time it is False.', q: [
      ['calc', 'What prints?\n```\nn = 2\nwhile n < 50:\n    n = n * 2\nprint(n)\n```', ['64', '32', '50', 'Infinite loop'], 'n goes 2, 4, 8, 16, 32, 64. At 64 the check fails, so it stops.'],
      ['def', 'When does a while loop stop?', ['When its condition becomes False', 'After 10 passes', 'When it reaches the last item', 'Never']],
      ['calc', 'How many times does the body run?\n```\nx = 0\nwhile x < 3:\n    x = x + 1\n```', ['3', '2', '4', 'Forever']]
    ] },
    { id: 'when', s: 1, n: 'for vs while', fix: 'for when you know the count. while when you loop until something happens.', q: [
      ['scn', '"How many years until $5,000 grows to $10,000?" Which loop fits?', ['while, because you do not know the count ahead', 'for, because years are numbers', 'if, because it is yes or no', 'No loop is needed']],
      ['scn', '"Print a 10-year table." Which loop fits?', ['for, because you know it is 10', 'while, because money grows', 'if, because it is a table', 'input()']],
      ['tf', 'True or false: while is the better pick when you know the exact number of repeats.', ['False', 'True']]
    ] },
    { id: 'inf', s: 2, n: 'Infinite loops', fix: 'Something inside the loop must change what the condition checks, or it never ends.', q: [
      ['def', 'What causes an infinite loop?', ['A condition that never becomes False', 'Using break', 'Using range()', 'Indenting the body']],
      ['scn', 'This runs forever:\n```\nyears = 0\nwhile balance < goal:\n    years = years + 1\n```\nWhy?', ['balance never changes, so the condition stays True', 'years is not a number', 'goal is too small', 'while needs a range()']],
      ['not', 'Which does NOT cause an infinite loop?', ['Updating the variable the condition checks', '`while True:` with no break', 'Forgetting to change balance in the loop', 'A condition that is always True']]
    ] },
    { id: 'break', s: 3, n: 'break', fix: 'break jumps out of the loop right away.', q: [
      ['def', 'What does break do?', ['Exits the loop right away', 'Skips to the next pass', 'Pauses the program', 'Restarts the loop']],
      ['calc', 'What prints?\n```\nfor i in range(10):\n    if i == 3:\n        break\n    print(i)\n```', ['0 1 2, one per line', '0 1 2 3', '3', '0 through 9']],
      ['term', 'The keyword that stops a loop early is...', ['break', 'stop', 'exit', 'end']]
    ] }
  ]
};

/* ---------------- 8. patterns ---------------- */
stories.patterns = {
  scenes: [
    { a: 'loop', p: { head: 'for r in returns:\n    total = total + r', items: ['0.1', '-0.2', '0.3'], acc: 'total', start: '0', vals: ['0.1', '-0.1', '0.2'] }, cap: 'The **total** pattern: start at 0 and add each item.' },
    { a: 'loop', p: { head: 'for r in returns:\n    if r < 0:\n        count = count + 1', items: ['0.1', '-0.2', '0.3', '-0.4'], acc: 'count', start: '0', vals: ['0', '1', '1', '2'] }, cap: 'The **count** pattern: add 1 only when a condition is true.' },
    { a: 'loop', p: { head: 'for r in returns:\n    if best is None or r > best:\n        best = r', items: ['0.1', '-0.2', '0.3', '-0.4'], acc: 'best', start: 'None', vals: ['0.1', '0.1', '0.3', '0.3'] }, cap: 'The **max** pattern: start at None, replace it when you find bigger.' },
    { a: 'vs', p: { l: { t: 'best = 0', code: 'returns = [-0.2, -0.1]', n: 'best stays 0. Wrong!' }, r: { t: 'best = None', code: 'returns = [-0.2, -0.1]', n: 'best = -0.1. Right.' } }, cap: 'Starting a max at 0 **breaks** when every value is negative.' },
    { a: 'eval', p: { rows: ['average = total / count', 'average = 0.6 / 4', 'average = 0.15'] }, cap: 'The **average** is the total divided by how many items.' },
    { a: 'code', p: { lines: ['def summary(r):', '    # ... loops ...', '    return avg, worst, losses', '', 'a, w, n = summary(data)'] }, cap: 'A function can **return several values** at once, with commas.' }
  ],
  concepts: [
    { id: 'total', s: 0, n: 'Running total', fix: 'Start total at 0, then add each item inside the loop.', q: [
      ['calc', 'What prints?\n```\ntotal = 0\nfor x in [5, 10, 15]:\n    total = total + x\nprint(total)\n```', ['30', '15', '5', '0']],
      ['def', 'What should a running total start at?', ['0', 'None', 'The first item times 2', '1']],
      ['tf', 'True or false: for a running total, you add each item to total inside the loop.', ['True', 'False']]
    ] },
    { id: 'count', s: 1, n: 'Count pattern', fix: 'Start count at 0 and add 1 only when the condition is true.', q: [
      ['calc', 'What prints?\n```\ncount = 0\nfor r in [0.1, -0.2, 0.3, -0.4]:\n    if r < 0:\n        count = count + 1\nprint(count)\n```', ['2', '4', '-0.6', '0'], '-0.6 is what you get by adding the values instead of adding 1.'],
      ['scn', 'You want the number of losing years. Inside the loop you should...', ['Add 1 to count when r < 0', 'Add r to count', 'Set count = r', 'Add 1 to count every year']],
      ['not', 'Which is NOT part of the count pattern?', ['Adding each value to the count', 'Starting count at 0', 'An if condition', 'Adding 1 when it is true']]
    ] },
    { id: 'max', s: 3, n: 'Max / min starts at None', fix: 'Start best or worst at None, so the first real value always replaces it.', q: [
      ['scn', 'Returns are [-0.2, -0.1, -0.4] and you start `best = 0`. What does best end as?', ['0, which is wrong', '-0.1', '-0.4', 'None'], 'Nothing beats 0, so best never updates. Start at None.'],
      ['def', 'Why start a best or worst tracker at None?', ['It works no matter what the values are', 'None is bigger than any number', 'It makes the loop faster', 'Python requires it']],
      ['calc', 'What prints?\n```\nworst = None\nfor r in [0.3, -0.1, 0.2]:\n    if worst is None or r < worst:\n        worst = r\nprint(worst)\n```', ['-0.1', '0.3', '0.2', 'None']]
    ] },
    { id: 'avg', s: 4, n: 'Average', fix: 'average = total / count.', q: [
      ['calc', 'Returns are [0.1, 0.2, 0.3]. What is the average?', ['0.2', '0.6', '0.3', '0.1'], 'Total 0.6 divided by 3 items. 0.6 is the total, not the average.'],
      ['def', 'The average equals...', ['total / count', 'count / total', 'total * count', 'the middle value'], 'The middle value is the median, a different thing.'],
      ['tf', 'True or false: average = count / total.', ['False', 'True'], 'That is the flipped ratio. It is total / count.']
    ] },
    { id: 'multi', s: 5, n: 'Returning several values', fix: 'return a, b, c sends back several values. Unpack them with a, b, c = f().', q: [
      ['scn', '`return avg, worst, losses` sends back...', ['Three values at once', 'Only avg', 'A string', 'An error']],
      ['calc', 'What prints?\n```\ndef f():\n    return 1, 2\n\na, b = f()\nprint(b)\n```', ['2', '1', '(1, 2)', 'Error']],
      ['tf', 'True or false: a Python function can only return one value.', ['False', 'True']]
    ] }
  ]
};

/* ---------------- NEW: strings ---------------- */
stories.strings = {
  scenes: [
    { a: 'list', p: { name: 'ticker = "AAPL"', items: ['A', 'A', 'P', 'L'], hi: [0, 3], say: ['ticker[0] → "A"', 'ticker[-1] → "L"'], neg: true }, cap: 'A string is a row of characters, each with an **index** starting at 0.' },
    { a: 'code', p: { lines: ['s = "2026-11-13"', 'print(len(s))', 'print(s[0:4])'], out: ['10', '2026'] }, cap: '**Slicing** s[0:4] takes characters 0 to 3. The end is not included.' },
    { a: 'vs', p: { l: { t: 'upper()', code: '"aapl".upper()', n: '"AAPL"' }, r: { t: 'strip()', code: '"  msft ".strip()', n: '"msft"' } }, cap: 'strip() removes **spaces at the ends**, upper() makes capitals.' },
    { a: 'split', p: { src: '"2026-11-13,AAPL,227.50"', parts: ['"2026-11-13"', '"AAPL"', '"227.50"'] }, cap: '**split(",")** cuts a string into a list at every comma.' },
    { a: 'machine', p: { name: 'float()', ins: ['"227.50"'], out: '227.5' }, cap: 'The split pieces are still **strings**. Convert prices with float().' },
    { a: 'loop', p: { head: 'for line in lines:\n    d, tick, px = line.split(",")\n    print(tick, float(px))', items: ['line 1', 'line 2'], outs: ['AAPL 227.5', 'MSFT 410.1'] }, cap: 'That is how you **read data files**: one line at a time, split, convert.' }
  ],
  concepts: [
    { id: 'index', s: 0, n: 'String indexing', fix: 'Index 0 is the first character, -1 is the last.', q: [
      ['calc', 'What is `"AAPL"[0]`?', ['"A"', '"AAPL"', '"L"', '0']],
      ['calc', 'What is `"MSFT"[-1]`?', ['"T"', '"M"', '"S"', 'Error']],
      ['tf', 'True or false: the first character of a string is at index 1.', ['False', 'True']]
    ] },
    { id: 'slice', s: 1, n: 'Slicing and len()', fix: 's[a:b] gives characters a up to b-1. len() counts characters.', q: [
      ['calc', 'What is `"2026-11-13"[0:4]`?', ['"2026"', '"2026-"', '"026-"', '"202"'], 'Indexes 0, 1, 2, 3. The end index 4 is not included.'],
      ['calc', 'What is `len("AAPL")`?', ['4', '3', '5', '"AAPL"']],
      ['scn', 'You want the month "11" from `d = "2026-11-13"`. Which slice?', ['d[5:7]', 'd[5:6]', 'd[6:8]', 'd[4:7]'], 'The 1s are at index 5 and 6. End index 7 is not included.']
    ] },
    { id: 'clean', s: 2, n: 'strip() and upper()', fix: 'strip() trims spaces at the ends only. upper() makes capitals.', q: [
      ['calc', 'What is `"  msft ".strip().upper()`?', ['"MSFT"', '"  MSFT "', '"msft"', '"MSFT "']],
      ['def', 'What does `.strip()` do?', ['Removes spaces at both ends', 'Removes every space, even in the middle', 'Splits on spaces', 'Makes it lowercase']],
      ['not', 'Which is NOT what these do?', ['upper() removes spaces', 'lower() makes small letters', 'strip() trims the ends', 'upper() makes capitals']]
    ] },
    { id: 'split', s: 3, n: 'split()', fix: 's.split(",") returns a LIST of string pieces.', q: [
      ['calc', 'What does `"a,b,c".split(",")` give?', ["['a', 'b', 'c']", "'abc'", "['a,b,c']", "'a b c'"]],
      ['calc', 'What is `"2026-11-13,AAPL,227.50".split(",")[1]`?', ['"AAPL"', '"2026-11-13"', '"227.50"', '","'], 'Index 1 is the second piece.'],
      ['term', 'Cutting a string into a list at each comma is done with...', ['split()', 'strip()', 'a slice', 'len()']]
    ] },
    { id: 'pieces', s: 4, n: 'Pieces are strings', fix: 'Pieces from split() are text. Use float() before doing math.', q: [
      ['scn', 'px = "227.50" came from split(). You want px times 10. What is the fix?', ['Use float(px) * 10', 'Nothing, px * 10 gives 2275.0', 'Use int(px) * 10', 'Use px.strip() * 10'], 'int("227.50") crashes because of the decimal. float() is right.'],
      ['tf', 'True or false: pieces from split() are already numbers if they look like numbers.', ['False', 'True']],
      ['calc', 'What is `float("227.50") + 1`?', ['228.5', '"227.501"', 'Error', '227.51']]
    ] }
  ]
};

/* ---------------- 9. lists ---------------- */
stories.lists = {
  lab: 'sma',
  scenes: [
    { a: 'list', p: { name: 'prices = [150, 152, 149]', items: ['150', '152', '149'], hi: [0, 2], say: ['prices[0] → 150', 'prices[-1] → 149'], neg: true }, cap: 'A **list** holds many values in order. Indexing starts at 0.' },
    { a: 'list', p: { name: 'prices.append(158)', items: ['150', '152', '149'], add: '158', say: ['len(prices) → 4'] }, cap: '**append()** adds to the end. len() counts the items.' },
    { a: 'vs', p: { l: { t: 'nums.sort()', code: 'nums = [3, 1, 2]\nnums.sort()', n: 'nums itself is now [1, 2, 3]' }, r: { t: 'sorted(nums)', code: 'nums = [3, 1, 2]\ns = sorted(nums)', n: 'New list. nums is still [3, 1, 2]' } }, cap: 'sort() **changes** the list. sorted() makes a new one.' },
    { a: 'list', p: { name: 'sorted: [3, 5, 9, 12, 40]', items: ['3', '5', '9', '12', '40'], hi: [2], say: ['middle → 9'] }, cap: 'The **median** is the middle of the sorted list.' },
    { a: 'list', p: { name: 'sorted: [1, 2, 3, 10]', items: ['1', '2', '3', '10'], hi: [1, 2], say: ['(2 + 3) / 2 → 2.5'] }, cap: 'Even count? The median is the **average of the two middle** values.' },
    { a: 'vs', p: { l: { t: 'Average', code: '[50, 55, 60, 65, 900]', n: '= 226' }, r: { t: 'Median', code: '[50, 55, 60, 65, 900]', n: '= 60' } }, cap: 'One huge **outlier** wrecks the average. The median barely moves.' },
    { a: 'eval', p: { rows: ['(today - yesterday) / yesterday', '(152 - 150) / 150', '0.0133, about 1.33%'] }, cap: 'A **daily return** compares each day to the day before.' }
  ],
  concepts: [
    { id: 'index', s: 0, n: 'List indexing', fix: 'lst[0] is the first item and lst[-1] is the last.', q: [
      ['calc', '`prices = [150, 152, 149]`. What is `prices[1]`?', ['152', '150', '149', 'Error'], 'Indexing starts at 0, so [1] is the SECOND item.'],
      ['calc', 'What is `prices[-1]` for `[150, 152, 149]`?', ['149', '150', 'Error', '152']],
      ['tf', 'True or false: `lst[0]` is the first item.', ['True', 'False']]
    ] },
    { id: 'append', s: 1, n: 'append() and len()', fix: 'append() adds one item to the end. len() counts items.', q: [
      ['calc', 'What prints?\n```\np = [1, 2]\np.append(3)\nprint(len(p))\n```', ['3', '2', '4', '[1, 2, 3]']],
      ['def', 'What does append() do?', ['Adds one item to the end', 'Adds one item to the front', 'Sorts the list', 'Counts the items']],
      ['not', 'Which is NOT true?', ['len() adds an item', 'append() adds to the end', 'len() counts the items', 'lists keep their order']]
    ] },
    { id: 'sort', s: 2, n: 'sort() vs sorted()', fix: 'sort() changes the list itself. sorted() returns a new list and leaves the original alone.', q: [
      ['calc', 'What prints?\n```\nn = [3, 1, 2]\ns = sorted(n)\nprint(n)\n```', ['[3, 1, 2]', '[1, 2, 3]', 'None', '[3, 2, 1]']],
      ['scn', 'You need the median but must NOT change the original list. Use...', ['sorted(values)', 'values.sort()', 'values.append()', 'len(values)']],
      ['tf', 'True or false: `nums.sort()` leaves nums unchanged.', ['False', 'True']]
    ] },
    { id: 'median', s: 3, n: 'Median', fix: 'Sort first. Odd count: the middle. Even count: the average of the two middle.', q: [
      ['calc', 'Median of `[40, 3, 12, 9, 5]`?', ['9', '12', '13.8', '40'], 'Sort first: 3, 5, 9, 12, 40. The middle is 9. 13.8 is the average.'],
      ['calc', 'Median of `[1, 2, 3, 10]`?', ['2.5', '4', '2', '3'], 'Even count: average the two middle values, 2 and 3.'],
      ['def', 'The median is...', ['The middle value of the sorted list', 'The total divided by the count', 'The most common value', 'The biggest minus the smallest']]
    ] },
    { id: 'outlier', s: 5, n: 'Why the median', fix: 'One extreme value drags the average but barely moves the median.', q: [
      ['scn', 'Five clients earn $50k, $55k, $60k, $65k and $900k. Which number shows a typical client?', ['The median, $60k', 'The average, $226k', 'The max, $900k', 'The total, $1.13M']],
      ['def', 'Why do analysts often prefer the median?', ['One extreme value cannot drag it far', 'It is always bigger', 'It is easier to type', 'It counts every value equally']],
      ['tf', 'True or false: one huge outlier moves the average much more than the median.', ['True', 'False']]
    ] },
    { id: 'dret', s: 6, n: 'Daily return', fix: 'return = (today - yesterday) / yesterday. Divide by the OLD price.', q: [
      ['calc', 'Price goes from 100 to 105. Daily return?', ['0.05', '5', '1.05', '0.0476'], 'Divide by yesterday (100). Dividing by today gives 0.0476, the flipped mistake.'],
      ['not', 'Which is NOT the daily return formula?', ['(today - yesterday) / today', '(today - yesterday) / yesterday', 'today / yesterday - 1', '(new - old) / old']],
      ['calc', 'Prices go 50 then 40. What is the return?', ['-0.2', '0.2', '-10', '-0.25'], '(40 - 50) / 50 = -0.2. Dividing by 40 gives -0.25.']
    ] }
  ]
};

/* ---------------- NEW: dicts ---------------- */
stories.dicts = {
  scenes: [
    { a: 'dict', p: { name: 'holdings', pairs: [['"AAPL"', '10'], ['"MSFT"', '4']] }, cap: 'A **dictionary** stores key: value pairs, like ticker to shares.' },
    { a: 'dict', p: { name: 'holdings', pairs: [['"AAPL"', '10'], ['"MSFT"', '4']], look: 0, say: 'holdings["AAPL"] → 10' }, cap: 'You look up a value **by its key**, not by position.' },
    { a: 'dict', p: { name: 'holdings["NVDA"] = 6', pairs: [['"AAPL"', '10'], ['"MSFT"', '4']], add: ['"NVDA"', '6'] }, cap: 'Assigning to a new key **adds** a pair. An existing key gets replaced.' },
    { a: 'vs', p: { l: { t: 'Crashes', code: 'holdings["TSLA"]', n: 'KeyError' }, r: { t: 'Safe', code: 'holdings.get("TSLA", 0)', n: 'gives 0' } }, cap: 'A missing key crashes with **KeyError**. get() gives a default instead.' },
    { a: 'loop', p: { head: 'for t in holdings:\n    print(t, holdings[t])', items: ['AAPL', 'MSFT', 'NVDA'], outs: ['AAPL 10', 'MSFT 4', 'NVDA 6'] }, cap: 'Looping over a dictionary gives you its **keys**, one at a time.' },
    { a: 'eval', p: { rows: ['10 * 227.5 + 4 * 410.0', '2275.0 + 1640.0', '3915.0'] }, cap: 'Shares times prices, added up, gives **portfolio value**.' }
  ],
  concepts: [
    { id: 'pairs', s: 0, n: 'Key: value pairs', fix: 'A dictionary maps keys to values, like ticker to shares.', q: [
      ['term', 'In `{"AAPL": 10}`, "AAPL" is the...', ['Key', 'Value', 'Index', 'Item number']],
      ['def', 'What does a dictionary store?', ['Key: value pairs', 'Values by numbered position only', 'Only strings', 'One value at a time']],
      ['scn', 'You want to store how many shares you own of each ticker. Best structure?', ['A dictionary: ticker to shares', 'One variable', 'A string', 'A for loop']]
    ] },
    { id: 'lookup', s: 1, n: 'Looking up by key', fix: 'd[key] gets the value. Dictionaries use keys, not positions.', q: [
      ['calc', '`h = {"AAPL": 10, "MSFT": 4}`. What is `h["MSFT"]`?', ['4', '10', '"MSFT"', '1']],
      ['not', 'Which is NOT a way to read from `h = {"AAPL": 10}`?', ['h[0]', 'h["AAPL"]', 'h.get("AAPL")', 'h.get("AAPL", 0)'], 'h[0] looks for a key named 0, which is not there.'],
      ['tf', 'True or false: you look up dictionary values by their key.', ['True', 'False']]
    ] },
    { id: 'add', s: 2, n: 'Adding and replacing', fix: 'd[key] = value adds a new pair or replaces an existing one.', q: [
      ['calc', 'What prints?\n```\nh = {"AAPL": 10}\nh["AAPL"] = 3\nprint(h["AAPL"])\n```', ['3', '10', '13', 'KeyError'], 'Assigning to an existing key replaces the value.'],
      ['calc', 'What prints?\n```\nh = {"AAPL": 10}\nh["NVDA"] = 6\nprint(len(h))\n```', ['2', '1', '6', '16']],
      ['scn', 'You buy 5 more AAPL. Which line updates holdings?', ['h["AAPL"] = h["AAPL"] + 5', 'h["AAPL"] + 5', 'h.append(5)', 'h = 5']]
    ] },
    { id: 'keyerror', s: 3, n: 'KeyError and get()', fix: 'd[missing] crashes. d.get(key, default) returns the default instead.', q: [
      ['calc', 'What does `{"AAPL": 10}["TSLA"]` do?', ['Crashes with KeyError', 'Returns 0', 'Returns None', 'Returns 10']],
      ['calc', 'What does `{"AAPL": 10}.get("TSLA", 0)` give?', ['0', 'KeyError', 'None', '10']],
      ['scn', 'Some tickers might have no price. Safest way to read a price?', ['prices.get(t, 0)', 'prices[t]', 'prices[0]', 'prices.t']]
    ] },
    { id: 'loopkeys', s: 4, n: 'Looping over keys', fix: 'for k in d gives the keys. Use d[k] for each value.', q: [
      ['calc', 'What prints?\n```\nh = {"A": 1, "B": 2}\nfor k in h:\n    print(k)\n```', ['A then B', '1 then 2', 'A 1 then B 2', 'Error']],
      ['scn', 'Inside `for t in holdings:`, how do you get the shares for t?', ['holdings[t]', 't', 'holdings[0]', 'holdings.t']],
      ['tf', 'True or false: looping over a dictionary gives you the values.', ['False', 'True']]
    ] }
  ]
};

/* ---------------- 10. random ---------------- */
stories.random = {
  lab: 'vol',
  scenes: [
    { a: 'code', p: { lines: ['import random', 'print(random.random())'], out: ['0.7381946'] }, cap: '**random.random()** gives a decimal from 0 up to 1.' },
    { a: 'dist', p: { mid: '7%', l: '-38%', r: '+52%' }, cap: 'random.gauss(0.07, 0.15) draws from a **bell curve**: usually near 7%.' },
    { a: 'dist', p: { mid: '7%', l: '-8%', r: '+22%', band: 1 }, cap: 'About **68%** of draws land within one stdev: -8% to +22%.' },
    { a: 'vs', p: { l: { t: 'No seed', code: 'random.random()', n: 'Different every run' }, r: { t: 'With a seed', code: 'random.seed(42)\nrandom.random()', n: 'Same every run' } }, cap: '**random.seed()** makes the random numbers repeat, great for debugging.' },
    { a: 'fan', p: { n: 26, vol: 0.15, drift: 0.07, steps: 20, seed: 11 }, cap: 'A **Monte Carlo** simulation runs thousands of random futures.' },
    { a: 'big', p: { t: '10% chance', s: 'you end below this number' }, cap: 'Planners talk in **odds**, not promises.' },
    { a: 'code', p: { lines: ['r = 0.0734', 'print(f"{r:.1%}")'], out: ['7.3%'] }, cap: 'Format percents with **:.1%** inside an f-string.' }
  ],
  concepts: [
    { id: 'rand', s: 0, n: 'random.random()', fix: 'random.random() gives a decimal from 0 up to (not including) 1.', q: [
      ['def', 'What does `random.random()` give?', ['A decimal from 0 up to 1', 'A whole number from 1 to 100', 'The same number every time', 'A random letter']],
      ['scn', 'You want heads half the time. Which check works?', ['random.random() < 0.5', 'random.random() == 0.5', 'random.random() > 1', 'random.random() < 5']],
      ['tf', 'True or false: random.random() can return 2.5.', ['False', 'True']]
    ] },
    { id: 'gauss', s: 1, n: 'random.gauss()', fix: 'gauss(mean, stdev) draws from a bell curve centered on the mean. It can go negative.', q: [
      ['def', 'What does `random.gauss(0.07, 0.15)` model?', ['A yearly return: usually near 7%, spread out by 15%', 'A return between exactly 7% and 15%', 'A 7% return, 15% of the time', 'Always 7%']],
      ['tf', 'True or false: `random.gauss(0.07, 0.15)` can be negative.', ['True', 'False'], 'The bell curve stretches below 0. Losing years happen.'],
      ['term', 'The bell-curve shape gauss() draws from is called a...', ['Normal distribution', 'Uniform list', 'Moving average', 'Median']]
    ] },
    { id: 'sd', s: 2, n: 'Stdev and the 68% band', fix: 'About 68% of draws land between mean - stdev and mean + stdev. Stdev sets the spread, not the center.', q: [
      ['calc', 'Mean 7%, stdev 15%. About 68% of years land between...', ['-8% and +22%', '7% and 15%', '0% and 15%', '-15% and +15%'], 'Mean minus one stdev to mean plus one stdev.'],
      ['scn', 'Mean 10%, stdev 20%. Roughly 68% of years fall where?', ['-10% to +30%', '10% to 20%', '-20% to +20%', '0% to 30%']],
      ['not', 'Which is NOT true about a bigger stdev?', ['It raises the average return', 'Outcomes spread out wider', 'Big losses get more likely', 'Big gains get more likely']]
    ] },
    { id: 'seed', s: 3, n: 'random.seed()', fix: 'Same seed, same "random" numbers, every run. Useful for debugging.', q: [
      ['def', 'Why use `random.seed(42)`?', ['So the same random numbers repeat each run', 'To make the numbers more random', 'To speed up the code', 'To always get 42']],
      ['scn', 'Your simulation gives a different answer every run and you are trying to debug it. What helps?', ['Add random.seed() at the top', 'Run it 100 more times', 'Remove import random', 'Delete the loop']],
      ['tf', 'True or false: with the same seed, the random numbers come out the same every run.', ['True', 'False']]
    ] },
    { id: 'mc', s: 4, n: 'Monte Carlo', fix: 'Monte Carlo = thousands of random futures, then you study the spread and the odds.', q: [
      ['def', 'What is a Monte Carlo simulation?', ['Running thousands of random futures and studying the spread', 'Predicting the exact future value', 'Averaging last year\'s returns', 'A trading strategy']],
      ['scn', 'A client asks "will I hit $1M?" A Monte Carlo lets you say...', ['"There is about a 70% chance"', '"Yes, exactly $1.2M"', '"No one can know anything"', '"Only if you earn 7% every year"']],
      ['tf', 'True or false: a Monte Carlo gives one guaranteed result.', ['False', 'True']]
    ] },
    { id: 'pct', s: 6, n: 'Percent format', fix: '{r:.1%} multiplies by 100 for you, shows 1 decimal and adds the % sign.', q: [
      ['calc', 'What does `f"{0.0734:.1%}"` give?', ['7.3%', '0.1%', '0.07%', '73.4%']],
      ['calc', 'What does `f"{0.5:.0%}"` give?', ['50%', '0.5%', '5%', '0%']],
      ['not', 'Which is NOT true about `{r:.1%}`?', ['You must multiply r by 100 first', 'It shows 1 decimal', 'It adds the % sign', 'It works on decimals like 0.07'], 'It multiplies by 100 for you. Doing it yourself shows 734.0%.']
    ] }
  ]
};

/* ---------------- New lessons ---------------- */
const newLessons = [
  { before: 'lists', lesson: {
    id: 'strings', title: 'Strings and parsing data', ch: '6-7', min: 20,
    explain: 'A **string** is a row of characters. Each one has an index starting at 0, just like a list.\n\n- `len(s)` is how many characters\n- `s[0]` is the first, `s[-1]` the last\n- **Slicing**: `s[0:4]` gives characters 0 to 3 (the end is NOT included)\n- `s.upper()`, `s.lower()`, `s.strip()` (strip removes spaces at the ends)\n- `s.split(",")` cuts a string into a **list** at each comma\n\nThat last one is how you read data files. A price file line like `2026-11-13,AAPL,227.50` splits into `["2026-11-13", "AAPL", "227.50"]`. The pieces are still strings, so convert prices with `float()`.',
    example: 'line = "2026-11-13,AAPL,227.50"\nparts = line.split(",")\nprint(parts)\nprint(parts[1], float(parts[2]) * 10)\nprint(line[0:4])\n',
    predict: { code: 'ticker = "  msft "\nprint(ticker.strip().upper())', choices: ['MSFT', '  MSFT ', 'msft', 'Error'], answer: 0, why: 'strip() removes the spaces at both ends, then upper() makes it capitals.' },
    task: 'Write `parse_line(line)`. It takes a line like `"2026-11-13,aapl,227.50"` and **returns two values**: the ticker as clean uppercase text and the price as a float.\n\n`parse_line("2026-11-13,aapl,227.50")` returns `("AAPL", 227.5)`\n\nSome lines have spaces around pieces, like `"2026-01-02, msft ,410.10"`.',
    starter: 'def parse_line(line):\n    # 1. split on commas\n    # 2. clean up and uppercase the ticker\n    # 3. convert the price\n    pass\n\nprint(parse_line("2026-11-13,aapl,227.50"))\n',
    tests: [
      { d: 'Basic line', t: "parse_line('2026-11-13,aapl,227.50') == ('AAPL', 227.5)", h: 'Return two values with a comma: return ticker, price' },
      { d: 'Price is a float', t: "type(parse_line('2026-01-02,SPY,500')[1]) is float", h: 'Wrap the price piece in float().' },
      { d: 'Strips extra spaces', t: "parse_line('2026-01-02, msft ,410.10') == ('MSFT', 410.1)", h: 'Use .strip() on the ticker piece before .upper().' }
    ],
    hints: ['parts = line.split(",") gives a list of 3 strings.', 'The ticker is parts[1] and the price is parts[2].', 'return parts[1].strip().upper(), float(parts[2])'],
    cards: [
      { q: 'What does "a,b,c".split(",") give?', a: '["a", "b", "c"], a list of strings' },
      { q: 'What does "2026-11-13"[0:4] give?', a: '"2026" (the end index is not included)' },
      { q: 'What does strip() do?', a: 'Removes spaces and newlines at both ends' }
    ]
  } },
  { after: 'lists', lesson: {
    id: 'dicts', title: 'Dictionaries', ch: '9', min: 20,
    explain: 'A **dictionary** stores **key: value** pairs. You look things up by name instead of by position.\n\n```\nholdings = {"AAPL": 10, "MSFT": 4}\n```\n- `holdings["AAPL"]` is 10\n- `holdings["NVDA"] = 6` adds a new pair (or replaces one that exists)\n- `"AAPL" in holdings` is True\n- `holdings.get("TSLA", 0)` gives 0 instead of crashing when the key is missing\n- `for t in holdings:` loops over the keys, and `holdings[t]` gets each value\n\nAsking for a missing key with `holdings["TSLA"]` crashes with a **KeyError**. Dictionaries are how you store a portfolio: ticker to shares, ticker to price.',
    example: 'holdings = {"AAPL": 10, "MSFT": 4}\nprices = {"AAPL": 227.5, "MSFT": 410.0}\nholdings["NVDA"] = 6\nfor t in holdings:\n    print(t, holdings[t], prices.get(t, 0))\n',
    predict: { code: 'h = {"AAPL": 10}\nh["AAPL"] = h["AAPL"] + 5\nprint(h["AAPL"])', choices: ['15', '10', '105', 'KeyError'], answer: 0, why: 'It reads 10, adds 5, and stores 15 back under the same key.' },
    task: 'Write `portfolio_value(shares, prices)`. Both are dictionaries keyed by ticker. **Return** the total dollar value.\n\nIf a ticker has no price, count it as 0 (use `.get`).\n\n`portfolio_value({"AAPL": 10, "MSFT": 2}, {"AAPL": 200, "MSFT": 400})` returns `2800`',
    starter: 'def portfolio_value(shares, prices):\n    total = 0\n    # loop over the tickers in shares\n    return total\n\nprint(portfolio_value({"AAPL": 10, "MSFT": 2}, {"AAPL": 200, "MSFT": 400}))\n',
    tests: [
      { d: 'Two holdings', t: "portfolio_value({'AAPL': 10, 'MSFT': 2}, {'AAPL': 200, 'MSFT': 400}) == 2800", h: 'Add shares[t] * price for every ticker t.' },
      { d: 'Missing price counts as 0', t: "portfolio_value({'AAPL': 1, 'ZZZ': 5}, {'AAPL': 100}) == 100", h: 'Use prices.get(t, 0) so a missing ticker does not crash.' },
      { d: 'Empty portfolio is 0', t: "portfolio_value({}, {'AAPL': 100}) == 0" }
    ],
    hints: ['for t in shares: loops over the ticker names.', 'The value of one holding is shares[t] * its price.', 'total = total + shares[t] * prices.get(t, 0)'],
    cards: [
      { q: 'Get the value for key "AAPL" from d', a: 'd["AAPL"]' },
      { q: 'Read a key that might be missing, safely', a: 'd.get(key, default)' },
      { q: 'What does looping over a dictionary give you?', a: 'The keys' }
    ]
  } }
];

/* ---------------- Mini projects (auto-checked) ---------------- */
const minis = [
  { id: 'fees', name: 'Fee drag calculator', tag: 'How much a 1% fee really costs over 30 years', ch: '4', min: 25, difficulty: 1, lessons: ['vars', 'func'],
    why: 'Fees are the first thing a good advisor checks. A "small" 1% fee can eat a quarter of a client\'s money over a career.',
    task: 'Write two functions:\n- `grow_with_fee(start, rate, fee, years)` returns the balance when the fee comes off the rate every year: `start * (1 + rate - fee) ** years`\n- `fee_cost(start, rate, fee, years)` returns how many dollars the fee cost: the no-fee balance minus the with-fee balance\n\nThen print what a 1% fee costs on $10,000 at 7% over 30 years.',
    starter: 'def grow_with_fee(start, rate, fee, years):\n    pass\n\ndef fee_cost(start, rate, fee, years):\n    pass\n\nprint(fee_cost(10000, 0.07, 0.01, 30))\n',
    tests: [
      { d: 'grow_with_fee works', t: 'abs(grow_with_fee(10000, 0.07, 0.01, 30) - 10000 * 1.06 ** 30) < 0.01', h: 'start * (1 + rate - fee) ** years' },
      { d: 'fee_cost compares to no fee', t: 'abs(fee_cost(10000, 0.07, 0.01, 30) - (10000 * 1.07 ** 30 - 10000 * 1.06 ** 30)) < 0.01', h: 'Call grow_with_fee twice: once with fee 0, once with the real fee.' },
      { d: 'A 0% fee costs nothing', t: 'abs(fee_cost(1000, 0.05, 0, 10)) < 1e-9' }
    ],
    hints: ['The no-fee balance is grow_with_fee(start, rate, 0, years).', 'fee_cost = no-fee balance minus with-fee balance.', 'return grow_with_fee(start, rate, 0, years) - grow_with_fee(start, rate, fee, years)'] },
  { id: 'rule72', name: 'Rule of 72 vs reality', tag: 'Test the shortcut for "how long to double?"', ch: '5', min: 25, difficulty: 1, lessons: ['while', 'func'],
    why: 'Advisors use the Rule of 72 in their head all day. Checking it with a real loop shows you when the shortcut is close and when it is off.',
    task: 'Write two functions:\n- `years_to_double(rate)` starts a balance at 1 and uses a **while loop** to count whole years until it reaches at least 2\n- `rule_of_72(rate)` returns `72 / (rate * 100)`\n\nPrint both for 3%, 7% and 12% and compare.',
    starter: 'def years_to_double(rate):\n    balance = 1\n    years = 0\n    # while loop here\n    return years\n\ndef rule_of_72(rate):\n    pass\n\nfor r in [0.03, 0.07, 0.12]:\n    print(r, years_to_double(r), rule_of_72(r))\n',
    tests: [
      { d: '7% doubles in 11 years', t: 'years_to_double(0.07) == 11', h: 'Keep looping while balance < 2. Multiply by (1 + rate) each pass.' },
      { d: '10% doubles in 8 years', t: 'years_to_double(0.10) == 8' },
      { d: '50% doubles in 2 years', t: 'years_to_double(0.5) == 2' },
      { d: 'Rule of 72 math', t: 'abs(rule_of_72(0.08) - 9) < 1e-9', h: '72 / (rate * 100). 8% is 0.08, so 72 / 8 = 9.' }
    ],
    hints: ['while balance < 2:', 'Inside: balance = balance * (1 + rate) and years = years + 1', 'rule_of_72 is one line: return 72 / (rate * 100)'] },
  { id: 'posize', name: 'Position size calculator', tag: 'How many shares to buy so one loss only costs 1%', ch: '3-4', min: 25, difficulty: 2, lessons: ['vars', 'if', 'func'],
    why: 'This is the most important rule in trading: risk a fixed slice of the account per trade. Your Alpaca bot should be doing exactly this.',
    task: 'Write `position_size(account, risk_pct, entry, stop)`:\n- Dollars at risk = `account * risk_pct`\n- Risk per share = `entry - stop`\n- Shares = dollars at risk / risk per share, **rounded down** to a whole number with `int()`\n- If the stop is at or above the entry, return `0` (that is not a valid long trade)\n\n`position_size(10000, 0.01, 50, 48)` returns `50`: risking $100 at $2 a share.',
    starter: 'def position_size(account, risk_pct, entry, stop):\n    pass\n\nprint(position_size(10000, 0.01, 50, 48))\n',
    tests: [
      { d: '$10k, 1%, $2 stop -> 50 shares', t: 'position_size(10000, 0.01, 50, 48) == 50' },
      { d: 'Rounds down', t: 'position_size(10000, 0.01, 33, 30) == 33', h: '100 / 3 = 33.33. int() drops the decimal.' },
      { d: 'Returns a whole number (int)', t: 'type(position_size(25000, 0.02, 100, 95)) is int and position_size(25000, 0.02, 100, 95) == 100', h: 'Wrap the shares math in int().' },
      { d: 'Stop at entry -> 0', t: 'position_size(10000, 0.01, 50, 50) == 0', h: 'Check stop >= entry FIRST, before dividing (dividing by 0 crashes).' },
      { d: 'Stop above entry -> 0', t: 'position_size(10000, 0.01, 50, 52) == 0' }
    ],
    hints: ['Start with: if stop >= entry: return 0', 'risk_dollars = account * risk_pct and per_share = entry - stop', 'return int(risk_dollars / per_share)'] },
  { id: 'ctable', name: 'Compound growth table', tag: 'Year-by-year balances as a list', ch: '5, 8', min: 25, difficulty: 1, lessons: ['for', 'lists', 'func'],
    why: 'Every financial plan has this table. Returning a list instead of printing means you can chart it, compare it, or feed it to the next function.',
    task: 'Write `growth_table(start, rate, years)` that **returns a list** of the year-end balances, each rounded to 2 decimals with `round(x, 2)`.\n\n`growth_table(1000, 0.08, 3)` returns `[1080.0, 1166.4, 1259.71]`\n\nZero years returns an empty list.',
    starter: 'def growth_table(start, rate, years):\n    table = []\n    # loop once per year\n    return table\n\nprint(growth_table(1000, 0.08, 3))\n',
    tests: [
      { d: '3 years at 8%', t: 'growth_table(1000, 0.08, 3) == [1080.0, 1166.4, 1259.71]', h: 'Grow the balance first, then append round(balance, 2).' },
      { d: 'Right length', t: 'len(growth_table(100, 0.05, 10)) == 10' },
      { d: 'Zero years -> empty list', t: 'growth_table(100, 0.1, 0) == []' }
    ],
    hints: ['Keep a running balance = start before the loop.', 'for y in range(years): grow, then append', 'balance = balance * (1 + rate) then table.append(round(balance, 2))'] },
  { id: 'sma', name: 'Simple moving average', tag: 'The most used line on any trading chart', ch: '8', min: 30, difficulty: 2, lessons: ['lists', 'strings', 'for', 'func'],
    why: 'Moving averages are the base of most technical analysis. Building one yourself means you know exactly what the line on your chart is doing.',
    task: 'Write `sma(prices, n)` that **returns a list** with the average of every run of `n` prices in a row.\n\n`sma([1, 2, 3, 4, 5], 3)` returns `[2.0, 3.0, 4.0]`: the averages of [1,2,3], [2,3,4], [3,4,5].\n\nSlicing works on lists just like strings: `prices[i:i + n]`. If there are fewer than n prices, return `[]`.',
    starter: 'def sma(prices, n):\n    out = []\n    # one window per starting index\n    return out\n\nprint(sma([1, 2, 3, 4, 5], 3))\n',
    tests: [
      { d: 'Window of 3', t: 'sma([1, 2, 3, 4, 5], 3) == [2.0, 3.0, 4.0]', h: 'There are len(prices) - n + 1 windows.' },
      { d: 'Window of 2', t: 'sma([10, 20], 2) == [15.0]' },
      { d: 'Too few prices -> []', t: 'sma([1, 2], 3) == []' },
      { d: 'Length is right', t: 'len(sma(list(range(100)), 20)) == 81' }
    ],
    hints: ['for i in range(len(prices) - n + 1):', 'window = prices[i:i + n]', 'out.append(sum(window) / n)'] },
  { id: 'drawdown', name: 'Max drawdown', tag: 'The worst peak-to-bottom drop', ch: '5', min: 30, difficulty: 2, lessons: ['patterns', 'for', 'lists'],
    why: 'Max drawdown is the number that tells a client how bad it can feel. It is on every fund fact sheet, and it is how you should judge your trading bot.',
    task: 'Write `max_drawdown(prices)` that returns the worst drop from a running peak, as a negative decimal.\n\n`max_drawdown([100, 120, 90, 130, 65])` returns `-0.5`: from the 130 peak down to 65.\n\nIf prices only go up, return `0`.',
    starter: 'def max_drawdown(prices):\n    peak = None\n    worst = 0\n    for p in prices:\n        # 1. update the peak\n        # 2. how far below the peak is p?\n        # 3. keep the worst\n        pass\n    return worst\n\nprint(max_drawdown([100, 120, 90, 130, 65]))\n',
    tests: [
      { d: 'Peak 130 to 65 is -50%', t: 'abs(max_drawdown([100, 120, 90, 130, 65]) + 0.5) < 1e-9', h: 'The drop from the peak is (p - peak) / peak.' },
      { d: 'Only up -> 0', t: 'max_drawdown([100, 110, 121]) == 0' },
      { d: 'Uses the running peak, not the first price', t: 'abs(max_drawdown([100, 80, 90, 60]) + 0.4) < 1e-9' },
      { d: 'Uses the running peak, not the overall max', t: 'abs(max_drawdown([50, 40, 100, 90]) + 0.2) < 1e-9', h: 'Update the peak as you go. A later high cannot fix an earlier drop.' }
    ],
    hints: ['if peak is None or p > peak: peak = p', 'dd = (p - peak) / peak', 'if dd < worst: worst = dd'] },
  { id: 'ccpay', name: 'Credit card payoff timer', tag: 'Months until a balance hits $0', ch: '5', min: 30, difficulty: 2, lessons: ['while', 'if', 'func'],
    why: 'Debt payoff is one of the first problems real clients bring. This also shows why minimum payments trap people.',
    task: 'Write `months_to_payoff(balance, apr, payment)`:\n- Each month: `balance = balance * (1 + apr / 12) - payment`, and count the month\n- Stop when the balance is at or below 0, and return the count\n- If the payment is not bigger than the first month\'s interest, the debt never shrinks: return `-1` instead of looping forever\n- A balance of 0 returns 0',
    starter: 'def months_to_payoff(balance, apr, payment):\n    months = 0\n    # check for the never-ending case first\n    # while loop here\n    return months\n\nprint(months_to_payoff(1000, 0.24, 100))\n',
    tests: [
      { d: '0% APR, $1,000 at $100 -> 10 months', t: 'months_to_payoff(1000, 0, 100) == 10' },
      { d: '24% APR, $1,000 at $100 -> 12 months', t: 'months_to_payoff(1000, 0.24, 100) == 12', h: 'Interest first, then subtract the payment, then count.' },
      { d: 'Payment equal to interest -> -1', t: 'months_to_payoff(5000, 0.24, 100) == -1', h: 'First month interest is balance * apr / 12. If payment <= that, return -1.' },
      { d: 'Zero balance -> 0', t: 'months_to_payoff(0, 0.2, 50) == 0' }
    ],
    hints: ['if payment <= balance * apr / 12 and balance > 0: return -1', 'while balance > 0:', 'balance = balance * (1 + apr / 12) - payment then months = months + 1'] },
  { id: 'sharpe', name: 'Sharpe ratio from scratch', tag: 'Return per unit of risk', ch: '5', min: 35, difficulty: 2, lessons: ['patterns', 'func', 'lists'],
    why: 'The Sharpe ratio is how analysts compare a calm 8% to a wild 12%. Building it from loops makes the formula stick.',
    task: 'Write three functions, without importing statistics:\n- `mean(xs)` returns the average\n- `stdev(xs)` returns the **sample** standard deviation: square each distance from the mean, add them, divide by `len(xs) - 1`, then take the square root with `** 0.5`\n- `sharpe(returns, rf)` returns `(mean(returns) - rf) / stdev(returns)`',
    starter: 'def mean(xs):\n    pass\n\ndef stdev(xs):\n    pass\n\ndef sharpe(returns, rf):\n    pass\n\nprint(sharpe([0.10, 0.20, 0.30], 0.05))\n',
    tests: [
      { d: 'mean works', t: 'abs(mean([0.1, 0.2, 0.3]) - 0.2) < 1e-9' },
      { d: 'stdev is the sample version', t: 'abs(stdev([0.1, 0.2, 0.3]) - 0.1) < 1e-9', h: 'Divide by len(xs) - 1, not len(xs).' },
      { d: 'sharpe works', t: 'abs(sharpe([0.1, 0.2, 0.3], 0.05) - 1.5) < 1e-9' },
      { d: 'Built yourself', t: "'statistics' not in code and 'numpy' not in code", h: 'Use loops (or sum and len), not a library.' }
    ],
    hints: ['mean: return sum(xs) / len(xs)', 'stdev: m = mean(xs), then add up (x - m) ** 2 for every x', 'return (total / (len(xs) - 1)) ** 0.5'] },
  { id: 'rsi', name: 'RSI calculator', tag: 'Overbought or oversold? Build the indicator', ch: '5, 8', min: 40, difficulty: 3, lessons: ['lists', 'for', 'if', 'func'],
    why: 'RSI is one of the indicators you already use. Coding it shows you it is just average gains vs average losses, not magic.',
    task: 'Write `rsi(prices, n)` using the **simple** version (plain averages, not Wilder smoothing):\n1. Use the last `n` price changes (the last `n + 1` prices)\n2. avg_gain = sum of the up moves / n, avg_loss = sum of the down moves (as positive numbers) / n\n3. If avg_loss is 0, return 100\n4. RS = avg_gain / avg_loss and RSI = `100 - 100 / (1 + RS)`\n\n`rsi([44, 45, 46, 45, 47], 4)` returns `80.0`',
    starter: 'def rsi(prices, n):\n    recent = prices[-(n + 1):]\n    gains = 0\n    losses = 0\n    # loop over the changes in recent\n    pass\n\nprint(rsi([44, 45, 46, 45, 47], 4))\n',
    tests: [
      { d: 'Mixed moves -> 80', t: 'abs(rsi([44, 45, 46, 45, 47], 4) - 80) < 1e-9', h: 'Changes are +1, +1, -1, +2. Gains 4/4 = 1, losses 1/4 = 0.25.' },
      { d: 'Only up -> 100', t: 'rsi([1, 2, 3, 4, 5], 4) == 100' },
      { d: 'Only down -> 0', t: 'abs(rsi([5, 4, 3, 2, 1], 4)) < 1e-9' },
      { d: 'Even moves -> 50', t: 'abs(rsi([10, 11, 10, 11, 10], 4) - 50) < 1e-9' },
      { d: 'Only uses the last n changes', t: 'abs(rsi([1, 100, 2, 3, 4, 5], 4) - 100 * 0.75 / (0.75 + 24.5)) < 1e-6', h: 'Slice the last n + 1 prices first: prices[-(n + 1):]' }
    ],
    hints: ['for i in range(1, len(recent)): change = recent[i] - recent[i - 1]', 'If change > 0 add it to gains, else add -change to losses.', 'if losses == 0: return 100, else rs = (gains / n) / (losses / n)'] },
  { id: 'closes', name: 'Price file reader', tag: 'Turn CSV text lines into a list of prices', ch: '6-7', min: 25, difficulty: 2, lessons: ['strings', 'lists', 'for'],
    why: 'Every real data project starts by reading a file. This is the step before risk metrics, backtests and charts.',
    task: 'Write `closes(lines)`. `lines` is a list of text lines from a price file. The first line is a header (`date,ticker,close`). **Return a list** of the close prices as floats.\n\n- Skip the header\n- Skip blank lines\n- Lines may end with a newline `\\n`',
    starter: 'def closes(lines):\n    out = []\n    # skip the header, split each line, convert the close\n    return out\n\ndata = ["date,ticker,close", "2026-11-12,SPY,500.5", "2026-11-13,SPY,502"]\nprint(closes(data))\n',
    tests: [
      { d: 'Reads closes', t: "closes(['date,ticker,close', '2026-11-12,SPY,500.5', '2026-11-13,SPY,502']) == [500.5, 502.0]", h: 'Start at lines[1:] to skip the header.' },
      { d: 'Header only -> []', t: "closes(['date,ticker,close']) == []" },
      { d: 'Skips blank lines', t: "closes(['date,ticker,close', '', 'd,SPY,3', '   ']) == [3.0]", h: 'if line.strip() == "": continue' },
      { d: 'Handles newlines', t: "closes(['date,ticker,close\\n', 'd,SPY,1.5\\n']) == [1.5]", h: 'strip() the line before splitting.' }
    ],
    hints: ['for line in lines[1:]:', 'line = line.strip() and skip it if it is empty', 'out.append(float(line.split(",")[2]))'] },
  { id: 'weights', name: 'Portfolio weights', tag: 'What % of the portfolio is each stock?', ch: '9', min: 30, difficulty: 2, lessons: ['dicts', 'func', 'for'],
    why: 'Weights are step one of rebalancing and the first thing a client sees on a statement.',
    task: 'Write `weights(shares, prices)`. Both are dictionaries keyed by ticker. **Return a dictionary** of ticker to its fraction of the total value, rounded to 4 decimals.\n\n`weights({"A": 1, "B": 3}, {"A": 100, "B": 100})` returns `{"A": 0.25, "B": 0.75}`',
    starter: 'def weights(shares, prices):\n    # 1. total value\n    # 2. each ticker value / total\n    pass\n\nprint(weights({"A": 1, "B": 3}, {"A": 100, "B": 100}))\n',
    tests: [
      { d: 'Equal prices', t: "weights({'A': 1, 'B': 3}, {'A': 100, 'B': 100}) == {'A': 0.25, 'B': 0.75}" },
      { d: 'Different prices', t: "weights({'AAPL': 10, 'MSFT': 5}, {'AAPL': 200, 'MSFT': 400}) == {'AAPL': 0.5, 'MSFT': 0.5}" },
      { d: 'Adds to about 1', t: "abs(sum(weights({'X': 3, 'Y': 7, 'Z': 1}, {'X': 9.5, 'Y': 2.25, 'Z': 40}).values()) - 1) < 0.001" }
    ],
    hints: ['First loop: total = total + shares[t] * prices[t]', 'Second loop: out[t] = round(shares[t] * prices[t] / total, 4)', 'Start with out = {} and return out'] },
  { id: 'cross', name: 'Moving-average crossover signals', tag: 'Find the BUY and SELL days', ch: '8', min: 45, difficulty: 3, lessons: ['lists', 'if', 'for', 'func'],
    why: 'This is the classic trend strategy and a building block for the backtester project. Getting the "cross" logic right is the tricky part.',
    task: 'Write `crossovers(prices, fast, slow)`. The average at day `i` is the mean of `prices[i - n + 1 : i + 1]`.\n\nFor every day `i` from `slow` to the end, compare day `i - 1` and day `i`:\n- **BUY** when the fast average goes from at or below the slow one to above it\n- **SELL** when it goes from at or above to below\n\nReturn a list of `(i, "BUY")` or `(i, "SELL")` tuples.',
    starter: 'def avg_at(prices, i, n):\n    window = prices[i - n + 1:i + 1]\n    return sum(window) / n\n\ndef crossovers(prices, fast, slow):\n    signals = []\n    # loop from day slow to the last day\n    return signals\n\nprint(crossovers([5, 4, 3, 2, 3, 4, 5, 6, 5, 4, 3, 2], 2, 4))\n',
    tests: [
      { d: 'Finds the BUY and the SELL', t: "crossovers([5, 4, 3, 2, 3, 4, 5, 6, 5, 4, 3, 2], 2, 4) == [(5, 'BUY'), (9, 'SELL')]", h: 'Compare fast vs slow on day i - 1 AND on day i.' },
      { d: 'No signals in a steady climb', t: 'crossovers(list(range(1, 30)), 3, 5) == []' },
      { d: 'Starts at day slow', t: "all(i >= 5 for i, s in crossovers([9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1], 2, 5))", h: 'Before day slow, the slow average does not have a full day before it.' }
    ],
    hints: ['for i in range(slow, len(prices)):', 'f0, s0 = avg_at(prices, i - 1, fast), avg_at(prices, i - 1, slow), and the same for day i', 'if f0 <= s0 and f1 > s1: BUY. elif f0 >= s0 and f1 < s1: SELL.'] }
];

/* ---------------- More big projects ---------------- */
const projects = [
  { id: 'journal', name: 'Trade journal analyzer', tag: 'Win rate, expectancy and profit factor from your own trades', college: 3, collegePlus: 4, hours: '6-10', perDay: '20-45', difficulty: 2, fit: 3, lessons: ['strings', 'dicts', 'patterns', 'func'],
    why: 'You already have real trades from your Alpaca bot. Analyzing your own data is a story nobody else can tell.',
    standout: 'Strong if you use your real bot trades and write what you changed because of the numbers. A spreadsheet of fake trades is a 2.',
    milestones: ['Export trades to a CSV: date, ticker, side, qty, price', 'Read it and pair each buy with its sell (strings + dicts)', 'Win rate, average win, average loss', 'Expectancy = win rate x avg win - loss rate x avg loss', 'Profit factor and max drawdown of the equity curve', 'One-page write-up: what is working, what to stop doing'] },
  { id: 'dcf', name: 'DCF valuation calculator', tag: 'What is a company worth? Discount its future cash', college: 3, collegePlus: 4, hours: '6-10', perDay: '30-45', difficulty: 3, fit: 4, lessons: ['vars', 'func', 'for', 'lists'],
    why: 'Discounted cash flow is the core valuation method in banking and research. It is the time value of money pointed at a business.',
    standout: 'Pick a real company, pull its free cash flow from the 10-K, and show how the value swings with the growth and discount rate (a sensitivity table). That shows judgment, not just math.',
    milestones: ['present_value(cash, rate, year) as a function', 'Project 5 years of free cash flow at a growth rate (list)', 'Terminal value with the Gordon growth formula', 'Sum the discounted values, divide by shares = value per share', 'Sensitivity table: discount rate vs growth rate', 'Compare to the real stock price and explain the gap'] },
  { id: 'debt', name: 'Debt payoff planner: avalanche vs snowball', tag: 'Which order to pay off debts, and what it saves', college: 2, collegePlus: 4, hours: '4-7', perDay: '20-40', difficulty: 2, fit: 5, lessons: ['while', 'lists', 'dicts', 'func'],
    why: 'Debt is the first problem many real clients bring to a planner. The avalanche vs snowball question has a clear, provable answer.',
    standout: 'Becomes a 4 if real people use it (a family member, a workshop) and you show the dollars and months saved.',
    milestones: ['Store debts as dictionaries: name, balance, apr, minimum', 'One month: charge interest, pay minimums', 'Extra money goes to one target debt', 'Avalanche: highest APR first. Snowball: smallest balance first', 'Compare total interest and months for both', 'Explain when snowball still makes sense (motivation)'] },
  { id: 'divinc', name: 'Dividend income and DRIP planner', tag: 'When can dividends pay a bill? Reinvest vs cash out', college: 2, collegePlus: 3, hours: '3-5', perDay: '20-40', difficulty: 2, fit: 4, lessons: ['vars', 'for', 'func', 'lists'],
    why: 'Income planning for retirees is a big part of wealth management. DRIP is compounding you can see.',
    standout: 'Use real yields and dividend growth for 3 to 5 funds, and answer one clear question, like "how many years until dividends cover $500 a month?"',
    milestones: ['Yearly dividend = shares x price x yield', 'DRIP: buy more shares with each dividend', 'Grow the dividend and price each year', 'Compare DRIP vs taking cash over 20 years', 'Find the year dividends hit a monthly income goal'] }
];

return { stories, newLessons, minis, projects, prereqAdd: { rebal: ['dicts'], risk: ['strings'], backtest: ['strings'] } };
})();
