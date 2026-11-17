/* Forge round 2: story lessons for the Monte Carlo build steps and every mini project.
   Same format as content.js: scenes {a, p, cap} and concepts {id, s, n, fix, q:[[fmt, question, [choices, FIRST correct], fix?]]}. */
window.FORGE_EXTRA2 = { stories: {
mc0: { title: "Monte Carlo step 1: One year of growth", scenes: [
  { a: "code", p: { lines: ["import random", "MEAN = 0.07", "STDEV = 0.15"] }, cap: "Names in CAPS are **constants**: settings the whole program shares." },
  { a: "machine", p: { name: "one_year(balance)", ins: ["10000"], out: "11240.0" }, cap: "**one_year** takes a balance in and hands back next year's balance." },
  { a: "dist", p: { mid: "7%", l: "-38%", r: "+52%" }, cap: "Each year's return is one draw from **random.gauss(MEAN, STDEV)**." },
  { a: "eval", p: { rows: ["10000 * (1 + r)", "10000 * (1 + 0.124)", "11240.0"] }, cap: "One year of growth is **balance * (1 + r)**." },
  { a: "vs", p: { l: { t: "return", code: "return balance * (1 + r)", n: "Hands the value back to the caller" }, r: { t: "print", code: "print(balance * (1 + r))", n: "Shows it, then gives back None" } }, cap: "Use **return**, not print, so other code can use the answer." },
  { a: "vs", p: { l: { t: "import random", code: "random.gauss(MEAN, STDEV)", n: "Tests can swap the dice" }, r: { t: "from random import gauss", code: "gauss(MEAN, STDEV)", n: "Tests cannot control it" } }, cap: "Write **random.gauss** with the module name so tests can fix the dice." }
 ], concepts: [
  { id: "grow", s: 3, n: "balance * (1 + r)", fix: "Growth is balance times (1 + r). A negative r shrinks it.", q: [
   ["calc", "Balance $10,000 and r = -0.10. What does `balance * (1 + r)` give?", ["9000.0", "11000.0", "-1000.0", "10000.0"], "1 + (-0.10) = 0.90, and 10,000 * 0.90 = 9,000."],
   ["scn", "Which line grows `balance` by the return `r`?", ["balance * (1 + r)", "balance + r", "balance * r", "balance ** r"]],
   ["not", "Which is NOT the same as `balance * (1 + r)`?", ["balance * r", "balance + balance * r", "(1 + r) * balance"], "balance * r is only the gain, not the new balance."]] },
  { id: "ret", s: 4, n: "return vs print", fix: "return hands the value back. print only shows it, and the function gives back None.", q: [
   ["def", "What does `return` do inside a function?", ["Hands a value back to the code that called it", "Prints the value on screen", "Restarts the function", "Saves the value to a file"]],
   ["tf", "True or false: a function that only prints its answer gives back `None`.", ["True", "False"]],
   ["scn", "`x = one_year(10000)` but x is None. Most likely cause?", ["one_year prints the balance instead of returning it", "MEAN is too small", "random was imported twice", "10000 needs quotes"]]] },
  { id: "gauss", s: 2, n: "random.gauss(MEAN, STDEV)", fix: "gauss draws one random return from a bell curve around MEAN. It can be negative.", q: [
   ["def", "What does `random.gauss(MEAN, STDEV)` give you?", ["One random return from a bell curve around MEAN", "Exactly MEAN every time", "A number between MEAN and STDEV", "A whole number"]],
   ["tf", "True or false: one_year can return less than the balance it was given.", ["True", "False"], "A negative draw shrinks the balance. Losing years are part of the model."]] },
  { id: "modname", s: 5, n: "random.gauss, not gauss", fix: "Write import random and call random.gauss(...) so the tests can control the dice.", q: [
   ["scn", "The tests replace `random.gauss` with a fixed value, but your code still gets random numbers. Why?", ["You wrote `from random import gauss`, so your code kept its own copy", "You forgot to return", "MEAN is a constant", "Tests cannot change anything"]],
   ["def", "Which call style lets the tests control your dice?", ["random.gauss(MEAN, STDEV)", "gauss(MEAN, STDEV) after from random import gauss", "random(MEAN, STDEV)", "gauss.random(MEAN)"]]] },
  { id: "consts", s: 0, n: "CAPS constants", fix: "CAPS is a naming habit that says treat this as fixed. Python does not enforce it.", q: [
   ["term", "Names in CAPS like MEAN that hold shared settings are called...", ["Constants", "Loops", "Arguments", "Strings"]],
   ["tf", "True or false: Python stops you from changing a variable named in CAPS.", ["False", "True"]]] }
 ] },
mc1: { title: "Monte Carlo step 2: One full future", scenes: [
  { a: "code", p: { lines: ["def simulate(start, years):", "    balance = start", "    for y in range(years):", "        balance = one_year(balance)", "    return balance"] }, cap: "**simulate** runs one_year once per year and returns the end balance." },
  { a: "loop", p: { head: "for y in range(3):", items: ["y=0", "y=1", "y=2"], acc: "balance", start: "10000", vals: ["10700", "9950", "11240"] }, cap: "Each pass feeds the **new balance** into the next year." },
  { a: "bars", p: { data: [["Start", 10000, "$10k"], ["Y1", 10700, "$10.7k"], ["Y2", 9950, "$9.95k"], ["Y3", 11240, "$11.2k"]] }, cap: "Returns bounce around, so one future is a **bumpy path**." },
  { a: "vs", p: { l: { t: "return after the loop", code: "for y in range(years):\n    balance = one_year(balance)\nreturn balance", n: "Runs every year" }, r: { t: "return inside the loop", code: "for y in range(years):\n    balance = one_year(balance)\n    return balance", n: "Quits after year 1" } }, cap: "Put **return** after the loop, or the function quits after one year." },
  { a: "big", p: { t: "1 run = 1 future", s: "not a forecast" }, cap: "One simulate() call is **one possible future**, not a prediction." }
 ], concepts: [
  { id: "feed", s: 1, n: "Feeding the new balance back", fix: "balance = one_year(balance) saves the result so next year starts from it. Gains and losses compound.", q: [
   ["scn", "Why write `balance = one_year(balance)` instead of just `one_year(balance)`?", ["So next year starts from the new balance", "To print the balance", "Because one_year needs two inputs", "It makes the loop faster"]],
   ["calc", "Start $100. Year 1 is +10%, year 2 is -10%. Final balance?", ["99.0", "100.0", "90.0", "110.0"], "100 * 1.10 = 110, then 110 * 0.90 = 99."],
   ["tf", "True or false: +10% then -10% gets you back to where you started.", ["False", "True"], "The -10% hits the bigger 110, so you end at 99."]] },
  { id: "range", s: 0, n: "range(years)", fix: "range(30) gives 0 to 29: thirty passes.", q: [
   ["calc", "`for y in range(30):` runs how many times?", ["30", "29", "31", "0"]],
   ["def", "In `for y in range(years)`, what does range(years) give?", ["0, 1, 2 and so on up to years - 1", "1 up to years", "Only the number years", "A random year"]]] },
  { id: "retpos", s: 3, n: "Where return goes", fix: "A return inside the loop ends the function on the first pass. Dedent it below the loop.", q: [
   ["scn", "simulate(10000, 30) always looks like one year of growth. Most likely bug?", ["return is indented inside the for loop", "range(30) is wrong", "one_year is missing an import", "balance should be a string"]],
   ["tf", "True or false: a `return` inside a loop ends the whole function the first time it runs.", ["True", "False"]]] },
  { id: "one", s: 4, n: "One run is one future", fix: "Each call draws new random returns, so each run is a different possible future.", q: [
   ["def", "What does one call to simulate() stand for?", ["One possible future for the money", "The average future", "The worst case", "A guaranteed outcome"]],
   ["tf", "True or false: running simulate() twice usually gives two different answers.", ["True", "False"]]] }
 ] },
mc2: { title: "Monte Carlo step 3: Thousands of futures", lab: "vol", scenes: [
  { a: "code", p: { lines: ["finals = []", "for i in range(n):", "    finals.append(simulate(start, years))", "return finals"] }, cap: "Start an **empty list**, then add one result per run." },
  { a: "list", p: { name: "finals", items: ["10.4k", "81.2k", "43.9k", "27.0k"], add: "66.1k" }, cap: "**.append()** adds each future's ending to the end of the list." },
  { a: "fan", p: { n: 30, vol: 0.15, drift: 0.07, steps: 30, seed: 21 }, cap: "**Monte Carlo** means running the same random model many times." },
  { a: "vs", p: { l: { t: "Empty list before the loop", code: "finals = []\nfor i in range(n):\n    finals.append(...)", n: "Keeps all n results" }, r: { t: "Empty list inside the loop", code: "for i in range(n):\n    finals = []\n    finals.append(...)", n: "Wiped every pass, keeps 1" } }, cap: "Create the list **before the loop**, or it resets every pass." },
  { a: "table", p: { rows: [["len(finals)", "10000", "one per run"], ["min(finals)", "$2,140", "worst future"], ["max(finals)", "$412,900", "best future"]] }, cap: "With a list you can measure the **whole range** of outcomes." }
 ], concepts: [
  { id: "append", s: 1, n: ".append()", fix: "append adds one item to the end of the list.", q: [
   ["def", "What does `finals.append(x)` do?", ["Adds x to the end of the list", "Replaces the list with x", "Adds x to every item", "Sorts the list"]],
   ["calc", "finals = [5, 8], then finals.append(3). What is finals now?", ["[5, 8, 3]", "[3, 5, 8]", "[8, 3]", "[3]"]],
   ["scn", "After 3 runs of the loop, finals holds how many items?", ["3", "1", "0", "30"]]] },
  { id: "init", s: 3, n: "Empty list before the loop", fix: "finals = [] goes above the loop. Inside the loop it wipes the list every pass.", q: [
   ["scn", "run_many(10000, 30, 500) returns a list with 1 item. Most likely bug?", ["finals = [] is inside the loop", "append is spelled wrong", "n is too big", "simulate has no return"]],
   ["tf", "True or false: `finals = []` should come before the for loop.", ["True", "False"]]] },
  { id: "mc", s: 2, n: "Monte Carlo", fix: "Monte Carlo runs a random model many times so you see the range and odds of outcomes.", q: [
   ["def", "What is a Monte Carlo simulation?", ["Running a random model many times to see the range of outcomes", "A single best-guess forecast", "A casino betting strategy", "Sorting returns from best to worst"]],
   ["term", "Running the same random model thousands of times is called...", ["Monte Carlo simulation", "Compounding", "Backtesting", "Rebalancing"]],
   ["scn", "Why run 10,000 futures instead of 1?", ["One run is one random path. Many runs show the odds.", "10,000 makes each single run more accurate", "It removes all risk", "Python needs at least 10,000"]]] },
  { id: "range2", s: 4, n: "Measuring the list", fix: "len counts the futures, min is the worst one, max is the best one.", q: [
   ["calc", "What is `len(finals)` after run_many(10000, 30, 2000)?", ["2000", "30", "10000", "1"]],
   ["def", "What does `min(finals)` tell a planner?", ["The worst future in the simulation", "The average future", "The starting balance", "The number of runs"]]] }
 ] },
mc3: { title: "Monte Carlo step 4: Read the results", scenes: [
  { a: "list", p: { name: "s = sorted(finals)", items: ["3k", "6k", "9k", "12k", "15k", "20k", "26k", "34k", "48k", "90k"] }, cap: "**sorted()** lines the futures up from worst to best." },
  { a: "list", p: { name: "s", items: ["3k", "6k", "9k", "12k", "15k", "20k", "26k", "34k", "48k", "90k"], hi: [5], say: ["s[10 // 2]  →  s[5]  →  20k"] }, cap: "The **median** is the middle item: s[n // 2]." },
  { a: "list", p: { name: "s", items: ["3k", "6k", "9k", "12k", "15k", "20k", "26k", "34k", "48k", "90k"], hi: [1], say: ["s[10 // 10]  →  s[1]  →  6k"] }, cap: "**p10** = s[n // 10]: only 10% of futures ended lower." },
  { a: "vs", p: { l: { t: "Floor division //", code: "10 // 4", n: "2, a whole number, safe as an index" }, r: { t: "Division /", code: "10 / 4", n: "2.5, a decimal, crashes as an index" } }, cap: "Use **//** for positions, because list indexes must be whole numbers." },
  { a: "code", p: { lines: ["losses = 0", "for f in finals:", "    if f < start:", "        losses = losses + 1", "prob_loss = losses / len(finals)"] }, cap: "**prob_loss** = futures that lost money divided by all futures." },
  { a: "big", p: { t: "12%", s: "chance of ending below $10,000" }, cap: "Clients understand **odds** better than averages." }
 ], concepts: [
  { id: "sorted", s: 0, n: "sorted()", fix: "Positions only mean worst-to-best after sorting. sorted puts the smallest first.", q: [
   ["def", "Why sort finals before picking the median?", ["Positions only mean worst-to-best after sorting", "Sorting makes the numbers bigger", "Python can only index sorted lists", "It removes duplicates"]],
   ["tf", "True or false: `sorted(finals)` puts the smallest number first.", ["True", "False"]]] },
  { id: "median", s: 1, n: "Median: s[n // 2]", fix: "The median is the middle of the sorted list: half did better, half did worse.", q: [
   ["calc", "s has 10,000 sorted futures. Which index is the median?", ["5000", "10000", "1000", "500"]],
   ["def", "What is the median of the futures?", ["The middle outcome: half did better, half did worse", "The average of all outcomes", "The most common outcome", "The best outcome"]],
   ["not", "Which is NOT true about the median here?", ["It is a promised result", "Half the futures ended above it", "It is s[n // 2] of the sorted list"]]] },
  { id: "p10", s: 2, n: "p10: the bad-luck future", fix: "p10 is s[n // 10]. Only 10% of futures ended below it.", q: [
   ["calc", "n = 1000 sorted futures. p10 is which index?", ["100", "10", "900", "500"]],
   ["scn", "A client asks what a bad-luck outcome looks like. Which number do you show?", ["p10, s[n // 10]", "The median", "max(finals)", "The starting balance"]],
   ["def", "What does the 10th percentile mean?", ["Only 10% of futures ended lower", "A 10% average return", "The 10th best future", "90% of futures ended lower"]]] },
  { id: "floordiv", s: 3, n: "// vs /", fix: "// gives a whole number, which is what a list index needs. / gives a decimal.", q: [
   ["calc", "What is `7 // 2`?", ["3", "3.5", "4", "1"]],
   ["scn", "`s[n / 2]` crashes with a TypeError. Fix?", ["Use n // 2 so the index is a whole number", "Sort the list twice", "Put quotes around n", "Use n * 2"]]] },
  { id: "ploss", s: 4, n: "prob_loss", fix: "Count futures below start, then divide by how many futures there are. The answer is 0 to 1.", q: [
   ["calc", "100 futures, 12 ended below start. What is prob_loss?", ["0.12", "12", "0.88", "1.2"]],
   ["scn", "Which line counts a losing future?", ["if f < start:", "if f > start:", "if f == start:", "if start < 0:"]],
   ["tf", "True or false: `losses / len(finals)` gives a fraction from 0 to 1.", ["True", "False"]]] }
 ] },
mc4: { title: "Monte Carlo step 5: Run it like a planner", scenes: [
  { a: "code", p: { lines: ["finals = run_many(10000, 30, 10000)", "median, p10, loss = summarize(finals, 10000)"] }, cap: "One line runs **10,000 futures**, and one line sums them up." },
  { a: "table", p: { rows: [["f\"${x:,.0f}\"", "$56,413", "x = 56412.7, money"], ["f\"{y:.1%}\"", "1.3%", "y = 0.013, percent"]] }, cap: "Inside an f-string, **format codes** turn raw numbers into money and percents." },
  { a: "code", p: { lines: ["print(f\"Median: ${median:,.0f}\")", "print(f\"Worst 10%: ${p10:,.0f}\")", "print(f\"Chance of loss: {loss:.1%}\")"], out: ["Median: $56,400", "Worst 10%: $21,100", "Chance of loss: 1.3%"] }, cap: "Three **labeled lines** a client can read in five seconds." },
  { a: "bars", p: { data: [["Run 1", 56400, "$56.4k"], ["Run 2", 56100, "$56.1k"], ["Run 3", 56700, "$56.7k"]] }, cap: "Rerun it: with 10,000 futures the answer **barely moves**." },
  { a: "vs", p: { l: { t: "10 runs", code: "run_many(10000, 30, 10)", n: "Median jumps around a lot" }, r: { t: "10,000 runs", code: "run_many(10000, 30, 10000)", n: "Median holds steady" } }, cap: "More runs make the estimate **stable**, not the future certain." }
 ], concepts: [
  { id: "money", s: 1, n: "Money format :,.0f", fix: ", adds thousands commas and .0f rounds to whole dollars.", q: [
   ["calc", "x = 56412.7. What does `f\"${x:,.0f}\"` print?", ["$56,413", "$56412.7", "$56,412.70", "56,413"]],
   ["def", "What does the `,` do in `{x:,.0f}`?", ["Adds thousands commas", "Rounds to 0 places", "Adds a dollar sign", "Splits the number"]]] },
  { id: "pct", s: 1, n: "Percent format :.1%", fix: ":.1% multiplies by 100, adds a % sign and keeps 1 decimal.", q: [
   ["calc", "What does `f\"{0.013:.1%}\"` print?", ["1.3%", "0.0%", "13%", "0.013%"]],
   ["tf", "True or false: `:.1%` multiplies by 100 for you.", ["True", "False"]]] },
  { id: "stable", s: 3, n: "Stable estimate", fix: "A small wiggle between reruns is normal randomness. It means 10,000 runs is enough.", q: [
   ["scn", "You rerun the sim and the median moves from $56,400 to $56,700. What does that tell you?", ["The estimate is stable. A small wiggle is normal randomness", "The code has a bug", "The market changed", "You need fewer runs"]],
   ["tf", "True or false: running 10,000 futures makes the real future certain.", ["False", "True"], "More runs steady the estimate of the odds. The real future is still random."]] },
  { id: "moreruns", s: 4, n: "Why many runs", fix: "With few runs the summary jumps around. Thousands of runs make it hold still.", q: [
   ["scn", "With only 10 runs, the median jumps from $40k to $70k between reruns. Fix?", ["Run thousands of futures instead of 10", "Lower the stdev", "Sort the list twice", "Use a while loop"]],
   ["def", "How do you know 10,000 runs is enough?", ["The summary numbers barely change when you rerun", "10,000 is a legal minimum", "It covers every possible future", "It removes the randomness"]]] }
 ] },
mc5: { title: "Monte Carlo step 6: Explain it to a client", scenes: [
  { a: "big", p: { t: "$21,100", s: "worst 10% of futures" }, cap: "Say **worst 10%** plainly: 1 in 10 futures ended at or below this." },
  { a: "vs", p: { l: { t: "Sounds like a promise", n: "You will have $56,400." }, r: { t: "Says the odds", n: "Half the futures ended above $56,400." } }, cap: "The **median is not a promise**. It is the middle of many possible futures." },
  { a: "dist", p: { mid: "7%", l: "crash", r: "boom" }, cap: "Real markets have **fat tails**: crashes happen more than a bell curve predicts." },
  { a: "bars", p: { data: [["No fee", 56400, "$56.4k"], ["1% fee", 42800, "$42.8k"]] }, cap: "This model ignores **fees**, and 1% a year takes a big bite." },
  { a: "box", p: { items: [["fees", "1%/yr", "ignored"], ["inflation", "2-3%/yr", "ignored"], ["withdrawals", "none", "ignored"]] }, cap: "Name one **limitation** so the client trusts the rest." }
 ], concepts: [
  { id: "w10", s: 0, n: "Explaining worst 10%", fix: "Worst 10% means 1 in 10 simulated futures ended at or below that number. It is not the floor.", q: [
   ["def", "How do you explain Worst 10%: $21,100 to a client?", ["1 in 10 simulated futures ended at or below $21,100", "You will lose $21,100", "A 10% average return", "The lowest you can possibly end with"]],
   ["scn", "The client asks: is $21,100 the worst that can happen? Best answer?", ["No. 10% of futures did even worse. It is a bad-luck benchmark", "Yes, nothing goes lower", "Yes, the model guarantees it", "No, the worst is the median"]]] },
  { id: "notpromise", s: 1, n: "The median is not a promise", fix: "The median is the middle simulated outcome. Half the futures did worse.", q: [
   ["tf", "True or false: the median is the amount the client will have.", ["False", "True"]],
   ["not", "Which is NOT a fair way to describe the median?", ["A guaranteed result", "The middle simulated outcome", "Half the futures ended above it"]]] },
  { id: "tails", s: 2, n: "Fat tails", fix: "Fat tails means extreme moves happen more often than a bell curve predicts.", q: [
   ["def", "What are fat tails?", ["Extreme moves happen more often than a bell curve predicts", "Returns that are always positive", "Fees that grow over time", "A very long time horizon"]],
   ["term", "Crashes showing up more often than a normal distribution expects is called...", ["Fat tails", "Compounding", "Median drift", "Rebalancing"]]] },
  { id: "fee", s: 3, n: "Fees compound", fix: "A yearly fee comes off every year, so it compounds. Here 1% cuts the median by about 24%.", q: [
   ["scn", "Your model shows $56,400, but the client pays a 1% yearly fee. What happens to the real median?", ["It is lower, because the fee comes off every year", "It stays the same", "It goes up", "It turns negative"]],
   ["tf", "True or false: a 1% yearly fee lowers the 30-year result by only 1%.", ["False", "True"]]] },
  { id: "limits", s: 4, n: "Naming a limitation", fix: "Saying what the model leaves out shows you understand it, and it builds trust.", q: [
   ["not", "Which is NOT a limitation of this simple model?", ["It runs thousands of futures", "It ignores fees", "It ignores inflation", "It assumes a bell curve"]],
   ["tf", "True or false: naming a limitation makes your analysis look weaker to a client.", ["False", "True"]]] }
 ] },

m_fees: { title: "Mini: Fee drag calculator", scenes: [
  { a: "eval", p: { rows: ["10000 * (1 + 0.07 - 0.01) ** 30", "10000 * 1.06 ** 30", "57434.91"] }, cap: "The fee comes off the **rate** every single year." },
  { a: "bars", p: { data: [["No fee", 76123, "$76.1k"], ["1% fee", 57435, "$57.4k"]] }, cap: "A 1% fee costs **$18,688** on $10,000 over 30 years." },
  { a: "vs", p: { l: { t: "Fee off the rate", code: "(1 + rate - fee) ** years", n: "Charged every year" }, r: { t: "Fee off the end", code: "(1 + rate) ** years - fee", n: "Wrong: takes 0.01 off once" } }, cap: "Subtract the fee **inside** the parentheses, before the power." },
  { a: "big", p: { t: "About 25%", s: "of the ending money, gone to a 1% fee" }, cap: "Small yearly fees become a **big total cost**." }
 ], concepts: [
  { id: "inside", s: 2, n: "Fee inside the power", fix: "Write (1 + rate - fee) ** years so the fee is charged every year.", q: [
   ["scn", "Which expression charges a 1% fee every year?", ["start * (1 + rate - fee) ** years", "start * (1 + rate) ** years - fee", "start * (1 + rate) ** (years - fee)", "start - fee * years"]],
   ["tf", "True or false: `(1 + rate) ** years - fee` charges the fee every year.", ["False", "True"]]] },
  { id: "cost", s: 1, n: "fee_cost", fix: "fee_cost is the no-fee balance minus the with-fee balance.", q: [
   ["def", "What should fee_cost return?", ["No-fee balance minus with-fee balance", "The fee rate times years", "The with-fee balance", "0.01"]],
   ["calc", "No-fee $76,123 and with-fee $57,435. What is fee_cost?", ["18688", "133558", "0.01", "57435"]]] },
  { id: "drag", s: 3, n: "Fee drag", fix: "The fee compounds. Here it takes about 25% of the ending balance.", q: [
   ["tf", "True or false: a 1% fee takes about 1% of your money over 30 years.", ["False", "True"]],
   ["scn", "Why do good advisors check fees first?", ["A small yearly fee compounds into a big share of the money", "Fees are only paid once", "Fees only matter for day trades", "Fees raise returns"]]] }
 ] },
m_rule72: { title: "Mini: Rule of 72 vs reality", scenes: [
  { a: "eval", p: { rows: ["72 / (0.07 * 100)", "72 / 7", "10.29"] }, cap: "**Rule of 72**: divide 72 by the rate in % to guess the years to double." },
  { a: "code", p: { lines: ["years = 0", "balance = 1", "while balance < 2:", "    balance = balance * (1 + rate)", "    years = years + 1"] }, cap: "A **while loop** keeps growing until the money has doubled." },
  { a: "loop", p: { head: "while balance < 2:", items: ["1.07", "1.14", "1.23", "1.97", "2.10"], acc: "years", start: "0", vals: ["1", "2", "3", "10", "11"] }, cap: "After 10 years it is **1.97**, still under 2, so the loop runs once more." },
  { a: "vs", p: { l: { t: "Rule of 72", code: "72 / 7", n: "10.29 years" }, r: { t: "while loop", code: "while balance < 2:", n: "11 whole years" } }, cap: "The rule is a quick **estimate**; the loop counts whole years." }
 ], concepts: [
  { id: "r72", s: 0, n: "Rule of 72", fix: "72 divided by the rate in percent estimates the years to double.", q: [
   ["calc", "Rule of 72 at 6%. About how many years to double?", ["12", "6", "72", "432"]],
   ["def", "What is the Rule of 72?", ["72 divided by the rate in % estimates the years to double", "Money doubles every 72 years", "Rates above 72% double money", "A 72-day trading rule"]]] },
  { id: "cond", s: 1, n: "while balance < 2", fix: "The loop repeats while the condition is True and stops the moment it turns False.", q: [
   ["scn", "Which line keeps looping until the money has doubled?", ["while balance < 2:", "while balance > 2:", "while balance == 2:", "while years < 72:"]],
   ["tf", "True or false: the loop stops as soon as `balance < 2` becomes False.", ["True", "False"]]] },
  { id: "whole", s: 2, n: "Whole years vs estimate", fix: "At 7% the balance is 1.97 after 10 years, so the loop needs year 11. The rule says 10.29.", q: [
   ["calc", "At 7%, the balance is 1.97 after 10 years and 2.10 after 11. What does the loop return?", ["11", "10", "10.29", "2"]],
   ["tf", "True or false: the loop and the Rule of 72 always give exactly the same answer.", ["False", "True"]]] }
 ] },
m_posize: { title: "Mini: Position size calculator", scenes: [
  { a: "box", p: { items: [["account", "10000", ""], ["risk_pct", "0.01", ""], ["entry", "50", ""], ["stop", "48", ""]] }, cap: "A position size starts with **how much you are willing to lose**." },
  { a: "eval", p: { rows: ["10000 * 0.01", "100.0  dollars at risk"] }, cap: "**Dollars at risk** = account * risk_pct." },
  { a: "eval", p: { rows: ["100 / (50 - 48)", "100 / 2", "int(50.0)  →  50 shares"] }, cap: "Shares = dollars at risk / **risk per share**, rounded down." },
  { a: "flow", p: { val: "stop = 52, entry = 50", checks: [["if stop >= entry:", true], ["else:", null]], out: "return 0" }, cap: "A stop at or above the entry is **not a valid long trade**, so return 0." }
 ], concepts: [
  { id: "risk", s: 1, n: "Dollars at risk", fix: "Dollars at risk = account * risk_pct. 1% of $10,000 is $100.", q: [
   ["calc", "Account $20,000, risk 2%. Dollars at risk?", ["400.0", "40.0", "2000.0", "200.0"]],
   ["def", "What does risk_pct = 0.01 mean?", ["Lose at most 1% of the account if the stop hits", "Buy 1% of the shares", "The stock must move 1%", "A 1% fee"]]] },
  { id: "shares", s: 2, n: "Shares = risk / per-share risk", fix: "Divide dollars at risk by (entry - stop), then int() rounds down.", q: [
   ["calc", "Risking $100 with entry 50 and stop 47. How many shares?", ["33", "33.33", "34", "2"]],
   ["scn", "Why round shares DOWN with int()?", ["Rounding up would risk more than you planned", "Python cannot store decimals", "Brokers only sell even numbers", "It makes the math faster"]]] },
  { id: "invalid", s: 3, n: "Invalid stop", fix: "For a long trade the stop must be below the entry. Otherwise return 0.", q: [
   ["tf", "True or false: position_size(10000, 0.01, 50, 52) should return 0.", ["True", "False"]],
   ["scn", "What would happen without the stop >= entry check when stop = entry?", ["Dividing by entry - stop = 0 crashes", "It returns 100 shares", "It returns a negative account", "Nothing changes"]]] }
 ] },
m_ctable: { title: "Mini: Compound growth table", scenes: [
  { a: "loop", p: { head: "for y in range(3):", items: ["y=0", "y=1", "y=2"], acc: "balance", start: "1000", vals: ["1080.0", "1166.4", "1259.71"] }, cap: "Each pass grows the balance by **one year** of interest." },
  { a: "list", p: { name: "table", items: ["1080.0", "1166.4"], add: "1259.71" }, cap: "**Append** each year-end balance to build the table." },
  { a: "table", p: { rows: [["round(1259.712, 2)", "1259.71", "2 decimals"], ["round(1166.4, 2)", "1166.4", "no extra zeros"]] }, cap: "**round(x, 2)** keeps two decimals, like cents." },
  { a: "flow", p: { val: "years = 0", checks: [["for y in range(0):", false]], out: "return []" }, cap: "Zero years means the loop never runs, so you return an **empty list**." }
 ], concepts: [
  { id: "grow", s: 0, n: "One year per pass", fix: "balance = balance * (1 + rate) inside the loop grows it once per year.", q: [
   ["calc", "Start 1000, rate 0.10. Balance after 2 passes?", ["1210.0", "1200.0", "1100.0", "1020.0"]],
   ["scn", "Your table shows 1080.0 every year. Most likely bug?", ["You compute start * (1 + rate) instead of updating balance", "round is wrong", "range is too big", "append is missing"]]] },
  { id: "appendrow", s: 1, n: "Append each row", fix: "Append inside the loop so every year adds one item.", q: [
   ["tf", "True or false: growth_table(1000, 0.08, 3) returns a list of 3 numbers.", ["True", "False"]],
   ["scn", "Where does `table.append(round(balance, 2))` go?", ["Inside the for loop, after updating balance", "Before the loop", "After the return", "Inside round()"]]] },
  { id: "round", s: 2, n: "round(x, 2)", fix: "round(x, 2) keeps two decimal places.", q: [
   ["calc", "What is `round(1259.7123, 2)`?", ["1259.71", "1259.7", "1260", "1259.72"]],
   ["def", "What does the 2 in `round(x, 2)` mean?", ["Keep 2 decimal places", "Round to the nearest 2", "Round twice", "Keep 2 digits total"]]] }
 ] },
m_sma: { title: "Mini: Simple moving average", scenes: [
  { a: "list", p: { name: "prices", items: ["1", "2", "3", "4", "5"], hi: [0, 1, 2], say: ["prices[0:3]  →  avg 2.0"] }, cap: "A **window** is n prices in a row; here n = 3." },
  { a: "list", p: { name: "prices", items: ["1", "2", "3", "4", "5"], hi: [2, 3, 4], say: ["prices[2:5]  →  avg 4.0"] }, cap: "Slide the window one step at a time with **prices[i:i + n]**." },
  { a: "eval", p: { rows: ["len(prices) - n + 1", "5 - 3 + 1", "3 averages"] }, cap: "There are **len - n + 1** windows, so that many averages." },
  { a: "flow", p: { val: "prices = [1, 2], n = 3", checks: [["if len(prices) < n:", true]], out: "return []" }, cap: "Fewer prices than n means **no full window**, so return []." }
 ], concepts: [
  { id: "window", s: 0, n: "The window", fix: "An n-day average uses exactly n prices in a row.", q: [
   ["calc", "sma([2, 4, 6, 8], 2). What is the first average?", ["3.0", "2.0", "5.0", "4.0"]],
   ["def", "What does a 20-day moving average use?", ["The last 20 prices, averaged", "Every 20th price", "The price 20 days ago", "The highest price in 20 days"]]] },
  { id: "slice", s: 1, n: "prices[i:i + n]", fix: "prices[i:i + n] takes n items starting at i. The end index is not included.", q: [
   ["calc", "prices = [1, 2, 3, 4, 5]. What is `prices[1:4]`?", ["[2, 3, 4]", "[1, 2, 3, 4]", "[2, 3, 4, 5]", "[1, 4]"]],
   ["scn", "Which slice gives the window of n prices starting at i?", ["prices[i:i + n]", "prices[i:n]", "prices[i + n]", "prices[n:i]"]]] },
  { id: "count", s: 2, n: "len - n + 1 windows", fix: "10 prices with n = 3 gives 10 - 3 + 1 = 8 averages.", q: [
   ["calc", "10 prices, n = 3. How many averages?", ["8", "7", "10", "3"]],
   ["scn", "Your loop uses range(len(prices)) and the last averages use short windows. Fix?", ["Use range(len(prices) - n + 1)", "Use range(n)", "Sort the prices", "Divide by len(prices)"]]] }
 ] },
m_drawdown: { title: "Mini: Max drawdown", scenes: [
  { a: "bars", p: { data: [["d1", 100, "100"], ["d2", 120, "120"], ["d3", 90, "90"], ["d4", 130, "130"], ["d5", 65, "65"]] }, cap: "**Drawdown** is the drop from the highest point so far." },
  { a: "loop", p: { head: "for p in prices:", items: ["100", "120", "90", "130", "65"], acc: "peak", start: "0", vals: ["100", "120", "120", "130", "130"] }, cap: "Track the **running peak**: the highest price seen so far." },
  { a: "eval", p: { rows: ["(65 - 130) / 130", "-65 / 130", "-0.5"] }, cap: "Drop = **(price - peak) / peak**, a negative decimal." },
  { a: "vs", p: { l: { t: "From the running peak", code: "(65 - 130) / 130", n: "-0.5, correct" }, r: { t: "From the first price", code: "(65 - 100) / 100", n: "-0.35, misses the real fall" } }, cap: "Measure from the **peak**, not from where you started." }
 ], concepts: [
  { id: "dd", s: 0, n: "What drawdown means", fix: "Drawdown is how far price has fallen from its highest point so far.", q: [
   ["def", "What is max drawdown?", ["The worst fall from a running peak", "The lowest price ever", "The average loss per day", "The total return"]],
   ["tf", "True or false: if prices only go up, max drawdown is 0.", ["True", "False"]]] },
  { id: "peak", s: 1, n: "Running peak", fix: "Update peak = max(peak, p) on every price.", q: [
   ["calc", "Prices 50, 70, 60, 80. What is the running peak after 60?", ["70", "60", "80", "50"]],
   ["scn", "Which line updates the running peak?", ["peak = max(peak, p)", "peak = min(peak, p)", "peak = p", "peak = prices[0]"]]] },
  { id: "drop", s: 2, n: "(price - peak) / peak", fix: "Divide the drop by the peak. 130 to 65 is -0.5.", q: [
   ["calc", "Peak 200, price 150. What is the drop?", ["-0.25", "-50", "-0.33", "0.75"]],
   ["not", "Which is NOT a step in max_drawdown?", ["Measure every drop from the first price", "Track the highest price so far", "Keep the most negative drop"]]] }
 ] },
m_ccpay: { title: "Mini: Credit card payoff timer", scenes: [
  { a: "eval", p: { rows: ["300 * (1 + 0.12 / 12) - 100", "300 * 1.01 - 100", "203.0"] }, cap: "Each month adds **interest**, then subtracts your payment." },
  { a: "loop", p: { head: "while balance > 0:", items: ["m1", "m2", "m3", "m4"], acc: "balance", start: "300", vals: ["203.0", "105.03", "6.08", "-93.86"] }, cap: "The **while loop** counts months until the balance hits 0 or below." },
  { a: "flow", p: { val: "balance 1000, APR 24%, payment 20", checks: [["if payment <= balance * apr / 12:", true]], out: "return -1" }, cap: "If the payment only covers interest, the debt **never shrinks**." },
  { a: "flow", p: { val: "balance = 0", checks: [["while balance > 0:", false]], out: "return 0" }, cap: "A zero balance means the loop **never runs**: 0 months." }
 ], concepts: [
  { id: "month", s: 0, n: "One month", fix: "balance * (1 + apr / 12) - payment. The APR is yearly, so divide by 12.", q: [
   ["calc", "Balance 1000, APR 0.12, payment 200. Balance after month 1?", ["810.0", "800.0", "920.0", "1010.0"]],
   ["scn", "Why divide the APR by 12?", ["APR is a yearly rate and the loop runs monthly", "To make payments smaller", "Credit cards have 12 fees", "Python needs it"]]] },
  { id: "count", s: 1, n: "Counting months", fix: "Add 1 to months every pass and stop when the balance is at or below 0.", q: [
   ["calc", "Balance goes 300, 203, 105.03, 6.08, then -93.86. How many months?", ["4", "3", "5", "300"]],
   ["tf", "True or false: `while balance > 0` stops once the balance is at or below 0.", ["True", "False"]]] },
  { id: "never", s: 2, n: "The infinite-loop guard", fix: "If payment <= the first month's interest, return -1 before looping.", q: [
   ["calc", "Balance 1000, APR 0.24, payment 20. First month's interest?", ["20.0", "240.0", "24.0", "2.0"]],
   ["scn", "What happens without the -1 check when payment equals the interest?", ["The loop runs forever", "It returns 0", "It returns 12", "Python skips the loop"]]] }
 ] },
m_sharpe: { title: "Mini: Sharpe ratio from scratch", scenes: [
  { a: "eval", p: { rows: ["(0.10 + 0.02 + 0.06) / 3", "0.18 / 3", "0.06"] }, cap: "The **mean** is the plain average return." },
  { a: "table", p: { rows: [["(0.10 - 0.06) ** 2", "0.0016", ""], ["(0.02 - 0.06) ** 2", "0.0016", ""], ["(0.06 - 0.06) ** 2", "0.0", ""]] }, cap: "Square each **distance from the mean** so ups and downs both count." },
  { a: "eval", p: { rows: ["(0.0032 / (3 - 1)) ** 0.5", "0.0016 ** 0.5", "0.04"] }, cap: "Divide by **n - 1** for the sample stdev, then take the square root." },
  { a: "eval", p: { rows: ["(0.06 - 0.02) / 0.04", "1.0"] }, cap: "**Sharpe** = extra return over the risk-free rate, per unit of risk." }
 ], concepts: [
  { id: "mean", s: 0, n: "mean", fix: "mean = sum(xs) / len(xs).", q: [
   ["calc", "mean([0.04, 0.08]) is?", ["0.06", "0.12", "0.04", "0.032"]],
   ["scn", "Which line computes the mean?", ["sum(xs) / len(xs)", "sum(xs) / (len(xs) - 1)", "max(xs) - min(xs)", "len(xs) / sum(xs)"]]] },
  { id: "sample", s: 2, n: "Sample stdev: n - 1", fix: "Square the distances, add them, divide by len(xs) - 1, then ** 0.5.", q: [
   ["scn", "Your stdev is a bit too small compared to the test. Most likely bug?", ["You divided by len(xs) instead of len(xs) - 1", "You forgot to sort", "You used ** 2 at the end", "mean is wrong"]],
   ["calc", "What is `0.0016 ** 0.5`?", ["0.04", "0.0008", "0.4", "0.000256"]]] },
  { id: "sharpe", s: 3, n: "Sharpe ratio", fix: "(mean - rf) / stdev: reward above safe cash, per unit of risk.", q: [
   ["calc", "Mean 0.08, rf 0.02, stdev 0.12. Sharpe?", ["0.5", "0.83", "0.06", "2.0"]],
   ["def", "What does a higher Sharpe ratio mean?", ["More return for each unit of risk", "Less return overall", "A safer cash account", "More trades per year"]]] }
 ] },
m_rsi: { title: "Mini: RSI calculator", scenes: [
  { a: "list", p: { name: "prices", items: ["44", "45", "46", "45", "47"], say: ["changes: +1, +1, -1, +2"] }, cap: "RSI looks at the last **n price changes**, so it needs n + 1 prices." },
  { a: "bars", p: { data: [["+1", 1, "+1"], ["+1", 1, "+1"], ["-1", -1, "-1"], ["+2", 2, "+2"]] }, cap: "Split the changes into **gains** and **losses**." },
  { a: "eval", p: { rows: ["avg_gain = 4 / 4 = 1.0", "avg_loss = 1 / 4 = 0.25", "RS = 1.0 / 0.25 = 4.0"] }, cap: "**RS** = average gain divided by average loss." },
  { a: "eval", p: { rows: ["100 - 100 / (1 + 4.0)", "100 - 20", "80.0"] }, cap: "**RSI** squeezes RS onto a 0 to 100 scale. Above 70 is often called overbought." }
 ], concepts: [
  { id: "changes", s: 0, n: "n changes need n + 1 prices", fix: "Each change compares two prices, so n changes use the last n + 1 prices.", q: [
   ["calc", "RSI with n = 14 needs how many prices?", ["15", "14", "13", "28"]],
   ["scn", "Which loop gets the last n changes?", ["for i in range(len(prices) - n, len(prices)): prices[i] - prices[i - 1]", "for p in prices: p - n", "for i in range(n): prices[i]", "for i in range(n + 1): prices[i] * 2"]]] },
  { id: "loss", s: 1, n: "Losses as positive numbers", fix: "Add the down moves as positive numbers, then divide by n.", q: [
   ["calc", "Changes +2, -1, -3, +2 with n = 4. avg_loss?", ["1.0", "-1.0", "0.5", "4.0"]],
   ["tf", "True or false: avg_loss should be a negative number.", ["False", "True"]]] },
  { id: "rsi", s: 3, n: "RSI formula", fix: "RSI = 100 - 100 / (1 + RS). If avg_loss is 0, return 100.", q: [
   ["calc", "RS = 1.0. What is RSI?", ["50.0", "100.0", "1.0", "0.0"]],
   ["scn", "avg_loss is 0. Why return 100 instead of using the formula?", ["RS would divide by zero", "100 is the minimum RSI", "The prices are wrong", "It means the stock fell"]]] }
 ] },
m_closes: { title: "Mini: Price file reader", scenes: [
  { a: "list", p: { name: "lines", items: ["date,ticker,close", "2026-01-02,AAPL,185.6", "", "2026-01-05,AAPL,187.1"] }, cap: "A price file arrives as a **list of text lines**." },
  { a: "code", p: { lines: ["for line in lines[1:]:", "    if not line.strip():", "        continue", "    parts = line.strip().split(\",\")"] }, cap: "Slice **lines[1:]** to skip the header, and skip blank lines." },
  { a: "split", p: { src: "\"2026-01-02,AAPL,185.6\"", parts: ["\"2026-01-02\"", "\"AAPL\"", "\"185.6\""] }, cap: "**.split(\",\")** cuts a row into its columns." },
  { a: "eval", p: { rows: ["float(\"185.6\\n\".strip())", "float(\"185.6\")", "185.6"] }, cap: "**.strip()** removes the newline, then float() turns text into a number." }
 ], concepts: [
  { id: "header", s: 1, n: "Skip the header", fix: "lines[1:] starts from the second line, skipping the header.", q: [
   ["scn", "float() crashes with ValueError: could not convert string to float: 'close'. Fix?", ["Skip the header with lines[1:]", "Use int() instead", "Sort the lines", "Add a newline"]],
   ["calc", "lines has 5 items. How many does `lines[1:]` have?", ["4", "5", "1", "0"]]] },
  { id: "split", s: 2, n: ".split(\",\")", fix: "split(\",\") gives a list of columns. The close is index 2.", q: [
   ["calc", "What is `\"2026-01-02,AAPL,185.6\".split(\",\")[2]`?", ["\"185.6\"", "\"AAPL\"", "185.6 as a number", "\"2026-01-02\""]],
   ["def", "What does `.split(\",\")` return?", ["A list of the pieces between commas", "The first piece only", "A number", "The string with commas removed"]]] },
  { id: "strip", s: 3, n: ".strip() then float()", fix: "strip removes spaces and newlines at the ends. float turns the text into a number.", q: [
   ["tf", "True or false: a blank line still has a newline, so `line.strip()` is an empty string.", ["True", "False"]],
   ["scn", "Why use float() and not int() for prices?", ["Prices have decimals like 185.6", "float is faster", "int cannot read text", "float rounds the price"]]] }
 ] },
m_weights: { title: "Mini: Portfolio weights", scenes: [
  { a: "dict", p: { name: "shares", pairs: [["\"A\"", "1"], ["\"B\"", "3"]], look: 1, say: "shares[\"B\"]  →  3" }, cap: "A **dictionary** looks up a value by its ticker." },
  { a: "eval", p: { rows: ["value = shares[t] * prices[t]", "A: 1 * 100 = 100", "B: 3 * 100 = 300"] }, cap: "Each position's **value** is shares times price." },
  { a: "eval", p: { rows: ["total = 100 + 300", "400"] }, cap: "Add every value to get the **total** portfolio value." },
  { a: "dict", p: { name: "weights", pairs: [["\"A\"", "100 / 400 = 0.25"], ["\"B\"", "300 / 400 = 0.75"]] }, cap: "**Weight** = value / total. The weights always add up to 1." }
 ], concepts: [
  { id: "lookup", s: 0, n: "Dictionary lookup", fix: "d[key] gives the value stored under that key.", q: [
   ["calc", "shares = {\"A\": 1, \"B\": 3}. What is `shares[\"B\"]`?", ["3", "1", "\"B\"", "4"]],
   ["scn", "How do you loop over every ticker in shares?", ["for t in shares:", "for t in range(shares):", "for t in shares[0]:", "while shares:"]]] },
  { id: "total", s: 2, n: "Total first", fix: "You need the total before you can divide, so compute it in a first pass.", q: [
   ["scn", "Why compute the total before any weight?", ["Each weight divides by the total", "Dictionaries need a total", "To sort the tickers", "Totals round the weights"]],
   ["calc", "Values 200, 300 and 500. Total?", ["1000", "500", "333.3", "3"]]] },
  { id: "weight", s: 3, n: "Weight = value / total", fix: "value / total, rounded to 4 decimals. All weights add to 1.", q: [
   ["calc", "Value 300, total 400. Weight?", ["0.75", "0.25", "1.33", "300"]],
   ["tf", "True or false: the weights of a portfolio add up to 1.", ["True", "False"]]] }
 ] },
m_cross: { title: "Mini: Moving-average crossover", scenes: [
  { a: "vs", p: { l: { t: "Fast average", code: "fast = 3", n: "Reacts quickly" }, r: { t: "Slow average", code: "slow = 5", n: "Reacts slowly" } }, cap: "A crossover compares a **fast** average with a **slow** one." },
  { a: "flow", p: { val: "day i - 1: fast <= slow, day i: fast > slow", checks: [["fast went from at or below to above", true]], out: "(i, \"BUY\")" }, cap: "**BUY** when the fast line crosses above the slow line." },
  { a: "flow", p: { val: "day i - 1: fast >= slow, day i: fast < slow", checks: [["fast went from at or above to below", true]], out: "(i, \"SELL\")" }, cap: "**SELL** when the fast line crosses below the slow line." },
  { a: "vs", p: { l: { t: "A cross", code: "prev <= slow and now > slow", n: "Signal once, on the day it flips" } , r: { t: "Just above", code: "now > slow", n: "Signals every single day, wrong" } }, cap: "Compare **yesterday and today**, so you signal only on the flip." }
 ], concepts: [
  { id: "fastslow", s: 0, n: "Fast vs slow", fix: "The fast average uses fewer days, so it reacts to new prices sooner.", q: [
   ["def", "Why does the 3-day average react faster than the 5-day one?", ["It averages fewer days, so each new price matters more", "It uses bigger prices", "It is computed first", "It skips weekends"]],
   ["tf", "True or false: a slower average is smoother.", ["True", "False"]]] },
  { id: "buy", s: 1, n: "BUY signal", fix: "BUY on day i when fast was at or below slow on day i - 1 and is above it on day i.", q: [
   ["scn", "Yesterday fast 10, slow 11. Today fast 12, slow 11. Signal?", ["BUY", "SELL", "No signal", "HOLD"]],
   ["scn", "Yesterday fast 12, slow 11. Today fast 13, slow 11. Signal?", ["No signal", "BUY", "SELL", "BUY twice"], "Fast was already above. A signal only comes on the day it crosses."]] },
  { id: "flip", s: 3, n: "Signal only on the flip", fix: "Check both yesterday and today. now > slow alone fires every day.", q: [
   ["scn", "Your code prints BUY on 40 days in a row. Most likely bug?", ["It only checks today, not yesterday", "slow is too big", "The prices are sorted", "It uses tuples"]],
   ["not", "Which is NOT needed to detect a crossover on day i?", ["The price 30 days ago", "The fast and slow averages on day i - 1", "The fast and slow averages on day i"]]] }
 ] }
} };
