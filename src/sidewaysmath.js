import logic from "logicjs";

const or = logic.or,
  and = logic.and,
  eq = logic.eq,
  run = logic.run,
  lvar = logic.lvar;

const add = logic.add,
  mul = logic.mul;

function is_digit(digit_var) {
  const ALL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const spreadlist = ALL_DIGITS.map((d) =>
    eq(digit_var, d)
  );
  return or(...spreadlist);
}

function getUniqueChars(str) {
  return [...new Set(str.split(""))];
}

class SidewaysExpression {
  constructor(expression, strMap, exponent = 0) {
    this.exponent = exponent;
    this.expression = SidewaysExpression.generateExpression(
      expression,
      exponent
    );
    this.logic_v = lvar(this.expression);
    this.ruleSet = this.calcRuleSet(strMap);
    strMap.set(this.expression, this);
  }

  static generateExpression(baseExpression, exponent) {
    return baseExpression + "0".repeat(exponent);
  }

  calcRuleSet(strMap) {
    const ruleSet = new Set();
    this.calcRuleSetSoFar(strMap, ruleSet);
    return ruleSet;
  }

  calcRuleSetSoFar(strMap, rulesSoFar) {
    if (this.expression.length === 1) {
      const newRule = is_digit(this.logic_v);
      rulesSoFar.add(newRule);
      return;
    }
    if (this.exponent !== 0) {
      const first = this.expression[0];
      const firstExpression = strMap.has(first)
        ? strMap.get(first)
        : new SidewaysExpression(first, strMap);
      firstExpression.ruleSet.forEach((r) =>
        rulesSoFar.add(r)
      );

      const newRule = mul(
        firstExpression.logic_v,
        Math.pow(10, this.exponent),
        this.logic_v
      );

      rulesSoFar.add(newRule);
      return;
    }
    const rest = this.expression.substring(1);
    const restExpression = strMap.has(rest)
      ? strMap.get(rest)
      : new SidewaysExpression(rest, strMap);
    restExpression.ruleSet.forEach((r) =>
      rulesSoFar.add(r)
    );

    const first = SidewaysExpression.generateExpression(
      this.expression[0],
      this.expression.length - 1
    );
    const firstExpression = strMap.has(first)
      ? strMap.get(first)
      : new SidewaysExpression(
          this.expression[0],
          strMap,
          this.expression.length - 1
        );
    firstExpression.ruleSet.forEach((r) =>
      rulesSoFar.add(r)
    );

    const newRule = add(
      restExpression.logic_v,
      firstExpression.logic_v,
      this.logic_v
    );
    rulesSoFar.add(newRule);
    return;
  }
}

function sidewaysMath(str1, str2, str3) {
  const strToSidewaysExpression = new Map();
  new SidewaysExpression(str1, strToSidewaysExpression);
  new SidewaysExpression(str2, strToSidewaysExpression);
  new SidewaysExpression(str3, strToSidewaysExpression);

  const ruleSet = new Set();
  const chars = getUniqueChars(str1 + str2 + str3);

  const str1Expression = strToSidewaysExpression.get(str1);
  const str2Expression = strToSidewaysExpression.get(str2);
  const str3Expression = strToSidewaysExpression.get(str3);
  str1Expression.ruleSet.forEach((r) => ruleSet.add(r));
  str2Expression.ruleSet.forEach((r) => ruleSet.add(r));
  str3Expression.ruleSet.forEach((r) => ruleSet.add(r));
  const finalRule = add(
    str1Expression.logic_v,
    str2Expression.logic_v,
    str3Expression.logic_v
  );
  ruleSet.add(finalRule);

  const goal = and(...ruleSet);
  const [, ...results] = run(
    goal,
    chars.map(
      (c) => strToSidewaysExpression.get(c).logic_v
    ),
    2
  );
  const pairs = chars.map(function (e, i) {
    return [e, results[0][i]];
  });
  return new Map(pairs);
}

// sidewaysMath("egg", "egg", "page") =>
// {
//     "e" : 8
//     "g" : 9
//     "p" : 1
//     "a" : 7
// }

// sidewaysMath("she", "eel", "else") =>
// {
//     "s" : 9
//     "h" : 8
//     "e" : 1
//     "l" : 0
// }
// sidewaysMath("top", "tot", "opt");

export default sidewaysMath;
