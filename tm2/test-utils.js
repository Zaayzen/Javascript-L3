// Tests fournis : ne pas les modifier pour faire passer votre code.
function assertTest(condition, message) {
  if (!condition) throw new Error(message);
}

function runSuite(tests) {
  const output = document.querySelector("#test-results");
  let passed = 0;
  const lines = [];
  for (const [name, check] of tests) {
    try { check(); passed++; lines.push(`OK — ${name}`); }
    catch (error) { lines.push(`ECHEC — ${name} : ${error.message}`); }
  }
  lines.push(`\n${passed}/${tests.length} tests réussis.`);
  output.textContent = lines.join("\n");
  console.log(output.textContent);
  return { passed, total: tests.length };
}
